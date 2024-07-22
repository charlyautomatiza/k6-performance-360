// Para tener un browser en primer plano -> K6_BROWSER_HEADLESS=false
import { browser } from 'k6/browser';
import { check } from 'k6';

export const options = {
  scenarios: {
    ui: {
      executor: 'shared-iterations',
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
  thresholds: {
    checks: ['rate>0.9'], // The rate of successful checks should be higher than 90%
  }
}

export default async function () {
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto('https://test.k6.io/my_messages.php');

    await page.locator('input[name="login"]').type('admin');
    await page.locator('input[name="password"]').type('123');

    await Promise.all([
      page.waitForNavigation(),
      page.locator('input[type="submit"]').click(),
    ]);

    const header = await page.locator("h2").textContent();
    check(header, {
      header: (h) => h == "Welcome, admin!",
    });
  } finally {
    await page.close();
  }
}
