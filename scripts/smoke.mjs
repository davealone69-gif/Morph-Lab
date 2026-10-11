// Browser smoke test for the current MORPH LAB app (not the retired Sky Cores UI).
// Requires a completed production build in dist/ (pnpm build).
import { spawn } from 'node:child_process'
import { mkdirSync } from 'node:fs'
import { chromium } from 'playwright'

const port = 4300 + Math.floor(Math.random() * 500)
const url = `http://127.0.0.1:${port}/`
const out = process.env.SHOTS_DIR ?? 'shots'
mkdirSync(out, { recursive: true })

const server = spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--port', String(port), '--strictPort', '--host', '127.0.0.1'], { stdio: 'ignore' })
let browser
let serverStopped = false
const errors = []
const guard = setTimeout(() => fail('timed out waiting for smoke test'), 120_000)

function cleanup() {
  clearTimeout(guard)
  if (!serverStopped) {
    serverStopped = true
    try { server.kill('SIGTERM') } catch {}
  }
}
async function fail(message) {
  console.error(`smoke: FAIL — ${message}`)
  await browser?.close().catch(() => {})
  cleanup()
  process.exit(1)
}
async function waitForServer() {
  for (let i = 0; i < 80; i += 1) {
    try { if ((await fetch(url)).ok) return } catch {}
    await new Promise(resolve => setTimeout(resolve, 250))
  }
  throw new Error('Vite preview did not start')
}

try {
  await waitForServer()
  browser = await chromium.launch({ args: ['--no-sandbox', '--ignore-gpu-blocklist', '--use-gl=swiftshader', '--enable-webgl'] })
  const context = await browser.newContext({ viewport: { width: 412, height: 915 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true })
  const page = await context.newPage()
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
  page.on('pageerror', error => errors.push(String(error)))
  page.on('response', response => { if (response.status() >= 400) errors.push(`HTTP ${response.status()} ${response.url()}`) })

  await page.goto(url, { waitUntil: 'networkidle' })
  await page.waitForSelector('.app-shell')
  await page.waitForSelector('#screen-content .upload-zone')
  await page.waitForSelector('#game')
  await page.screenshot({ path: `${out}/01-morph-lab-home.png` })

  for (const [tab, expected] of [
    ['world', '.world-card'],
    ['wardrobe', '.wardrobe-card'],
    ['quests', '.quest-card'],
    ['settings', '[data-setting="lowPower"]'],
    ['lab', '#name-input'],
  ]) {
    await page.locator(`.mobile-nav [data-action="tab"][data-tab="${tab}"]`).click()
    await page.waitForSelector(`#screen-content ${expected}`)
  }

  await page.locator('.mobile-nav [data-action="tab"][data-tab="world"]').click()
  const worldCard = page.locator('[data-action="world"][data-world="ashen-conservatory"]')
  await worldCard.evaluate(element => element.scrollIntoView({ block: 'center', behavior: 'instant' }))
  await worldCard.click({ position: { x: 12, y: 12 } })
  await page.waitForFunction(() => document.querySelector('#scene-title')?.textContent?.includes('ASHEN CONSERVATORY'))

  await page.locator('.mobile-nav [data-action="tab"][data-tab="wardrobe"]').click()
  await page.locator('[data-action="outfit"][data-outfit="rift-warden"]').click()
  await page.waitForFunction(() => document.querySelector('#profile-archetype')?.textContent?.includes('RIFT WARDEN'))

  await page.locator('.mobile-nav [data-action="tab"][data-tab="settings"]').click()
  const lowPower = page.locator('[data-setting="lowPower"]')
  await lowPower.check()
  await page.waitForFunction(() => localStorage.getItem('morphlab.profile.v2') !== null)
  await page.screenshot({ path: `${out}/02-morph-lab-settings.png` })

  await page.locator('.mobile-nav [data-action="tab"][data-tab="lab"]').click()
  await page.locator('#name-input').fill('SMOKE TEST AVATAR')
  await page.locator('[data-action="morph"]').click()
  await page.waitForFunction(() => document.querySelector('#profile-name')?.textContent === 'SMOKE TEST AVATAR')

  await page.locator('[data-action="play"]').click()
  await page.waitForFunction(() => document.querySelector('#mode-pill')?.textContent === 'EXPLORATION')
  await page.locator('[data-action="pause"]').click()
  await page.waitForFunction(() => document.querySelector('#mode-pill')?.textContent === 'PAUSED')
  await page.screenshot({ path: `${out}/03-morph-lab-paused.png` })

  if (errors.length) throw new Error(`browser errors:\n  ${errors.join('\n  ')}`)
  await context.close()
  await browser.close()
  cleanup()
  console.log(`smoke: PASS — MORPH LAB navigation, world selection, wardrobe, settings persistence, morph action and play/pause verified; screenshots in ${out}/`)
} catch (error) {
  await fail(error?.message ?? String(error))
}
