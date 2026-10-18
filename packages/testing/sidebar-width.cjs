#!/usr/bin/env node
/**
 * sidebar-width.cjs — the sidebar column's drag, read against Claude's own
 * numbers (D66).
 *
 * Registered in the lane's scenario table (packages/testing/scenarios.cjs).
 *
 * The skin takes the host's resize gesture over whole
 * (packages/client/src/features/sidebar-width/sidebar-width.ts): the host's own
 * floor of 264px is stood down, and the bounds and the state machine are the
 * ones Claude Desktop ships — the floor is 200px, a drag past half of it folds
 * the column while the button is still down, a press on the handle with no
 * travel is the collapse toggle, and nothing eases the follow.
 *
 * The scenario drives real pointer input through the lane's own browser, which
 * is the only way to reach the gesture: the skin's handlers answer
 * `pointerdown`/`pointerrawupdate` on the window, and the host's handle is an
 * 8px strip the reader grabs. Three readings carry the weight: the track grows
 * by exactly the pointer's own travel, a gesture that crosses the fold line
 * twice ends with the column expanded, and a press with no travel toggles it.
 * A build that clamped to the host's floor, eased the follow or dropped the
 * press affordance fails on one of them.
 */
'use strict'
const { bound } = require('./bounds.cjs')

/** The host's own parts and the contract for its resize strip. */
const SIDEBAR = {
  frame: '[data-dsh-claude-part~="layout-frame"]',
  toggle: '[data-dsh-claude-part~="sidebar-toggle"]',
  handle: '[data-side="sidebar"]',
  collapsedMarker: 'data-sidebar-collapsed',
}

/** The drag's own lower bound, which is Claude's: the column may not go narrower. */
const FLOOR_PX = bound('sidebarWidthFloorPx')
/** How far the track may stand from the pointer's own travel: one grid line of rounding. */
const SLACK_PX = bound('sidebarWidthFollowSlackPx')
/** How far the pointer travels per step, and how many steps a drag takes. */
const STEP_PX = 8
const STEP_MS = 18

/** The frame's first grid track as the skin wrote it, and whether the column stands folded. */
async function readColumn(page) {
  return page.evaluate((sidebar) => {
    const frame = document.querySelector(sidebar.frame)
    if (frame === null) return null
    const track = (frame.style.gridTemplateColumns ?? '').trim().split(/\s+/)[0] ?? ''
    return {
      track: parseFloat(track),
      collapsed: frame.hasAttribute(sidebar.collapsedMarker),
      skinOwns: frame.hasAttribute('data-dsh-claude-sidebar-dragging'),
    }
  }, SIDEBAR)
}

/** Where the host's resize strip stands right now; the host unmounts it while folded. */
async function handleBox(page) {
  const box = await page.locator(SIDEBAR.handle).boundingBox()
  if (box === null) return null
  return { x: box.x + box.width / 2, y: box.y + box.height / 2 }
}

/**
 * Drag the handle by a signed number of steps from a fresh grab on its centre,
 * reading the column once per step so every write the skin makes is seen, and
 * optionally reading it again at a turning point before the button comes up.
 */
async function drag(page, steps, reading) {
  const grab = await handleBox(page)
  if (grab === null) return null
  await page.mouse.move(grab.x, grab.y)
  await page.waitForTimeout(60)
  await page.mouse.down()
  await page.waitForTimeout(40)
  const travelled = steps * STEP_PX
  for (let i = 1; i <= Math.abs(steps); i += 1) {
    await page.mouse.move(grab.x + Math.sign(steps) * i * STEP_PX, grab.y)
    await page.waitForTimeout(STEP_MS)
  }
  const during = await readColumn(page)
  const turned = reading === undefined ? null : await reading(grab)
  await page.mouse.up()
  await page.waitForTimeout(250)
  return { travelled, during, turned, after: await readColumn(page), grab }
}

function sidebarWidthScenario({ check }) {
  /** The width the column stood at before the first drag, which the checks read against. */
  let start = null
  let follow = null
  let foldedThenOut = null
  let pressed = null

  return {
    script: 'greeting',
    prompt: 'hello there',
    async beforeSend({ page }) {
      start = await readColumn(page)
      // One drag to the right: the track has to grow by the pointer's own travel.
      const right = await drag(page, 5)
      follow = { start, right }
      // Out of a fresh grab, cross the fold line and come back inside one gesture.
      const grab = await handleBox(page)
      if (grab !== null) {
        await page.mouse.move(grab.x, grab.y)
        await page.waitForTimeout(60)
        await page.mouse.down()
        await page.waitForTimeout(40)
        const toFold = Math.ceil((await readColumn(page)).track / STEP_PX) + 1
        for (let i = 1; i <= toFold; i += 1) {
          await page.mouse.move(grab.x - i * STEP_PX, grab.y)
          await page.waitForTimeout(STEP_MS)
        }
        const folded = await readColumn(page)
        for (let i = 1; i <= toFold; i += 1) {
          await page.mouse.move(grab.x - (toFold - i) * STEP_PX, grab.y)
          await page.waitForTimeout(STEP_MS)
        }
        const backOut = await readColumn(page)
        await page.mouse.up()
        await page.waitForTimeout(250)
        foldedThenOut = { folded, backOut, after: await readColumn(page) }
      }
      // A press on the handle with no travel at all: the toggle itself.
      const press = await handleBox(page)
      if (press !== null) {
        const before = await readColumn(page)
        await page.mouse.move(press.x, press.y)
        await page.waitForTimeout(60)
        await page.mouse.down()
        await page.waitForTimeout(80)
        await page.mouse.up()
        await page.waitForTimeout(300)
        pressed = { before: before.collapsed, after: (await readColumn(page)).collapsed }
      }
    },
    async assert({ session }) {
      const grewBy = follow === null || follow.right === null || follow.start === null
        ? null
        : follow.right.after.track - follow.start.track
      const held = follow === null || follow.right === null ? null : follow.right.after.track - follow.right.during.track
      return [
        check('展开的侧栏站在皮肤自己的下限上，而不是宿主自己的 264px',
          start !== null && !start.collapsed && Math.abs(start.track - FLOOR_PX) <= SLACK_PX,
          JSON.stringify(start)),
        check('把手向右拖一把，网格首轨长出同样的距离',
          grewBy !== null && Math.abs(grewBy - follow.right.travelled) <= SLACK_PX,
          JSON.stringify({ grewBy, travelled: follow === null || follow.right === null ? null : follow.right.travelled })),
        check('松手之后宽度不再回跳，栏也仍然展开',
          held !== null && Math.abs(held) <= SLACK_PX && follow.right.after.collapsed === false,
          JSON.stringify({ afterRelease: held, after: follow === null ? null : follow.right.after })),
        check('同一次手势里越过下限一半即当场收起',
          foldedThenOut !== null && foldedThenOut.folded.collapsed,
          JSON.stringify(foldedThenOut === null ? null : foldedThenOut.folded)),
        check('同一次手势里回拖过线即当场弹出，宽度自下限续起',
          foldedThenOut !== null && !foldedThenOut.backOut.collapsed && !foldedThenOut.after.collapsed &&
            foldedThenOut.after.track >= FLOOR_PX,
          JSON.stringify(foldedThenOut === null ? null : { backOut: foldedThenOut.backOut, after: foldedThenOut.after })),
        check('把手上没有位移的按下与松开就是收张开关',
          pressed !== null && pressed.before !== pressed.after,
          JSON.stringify(pressed)),
        check('控制台没有异常', session.problems.length === 0, session.problems.slice(0, 3).join(' | ')),
      ]
    },
  }
}

module.exports = { sidebarWidthScenario }
