const puppeteer = require("puppeteer");
const prompt = require("prompt-sync")();

/* Enter Your LinkedIn Credentials from commandline */
const email = prompt("Enter your email address: ");
const password = prompt("Enter your password: ");

const linkedinBot = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--start-maximized"],
    defaultViewport: null,
  });
  const page = await browser.newPage();
  await page.goto("https://www.linkedin.com/");
  await page.goto("https://www.linkedin.com/login");

  await page.focus("input[name=session_key]");
  await page.keyboard.type(email);

  await page.focus("input[name=session_password]");
  await page.keyboard.type(password);

  await page.click('button[type="submit"]');
  await page.waitForNavigation();

  await page.click("#mynetwork-tab-icon");
  await page.waitForNavigation();
  await page.waitForSelector('[data-control-name="people_connect"]');

  await page.$$eval('[data-control-name="people_connect"]', (elements) =>
    elements.forEach((element) => element.click())
  );

  await browser.close();
};

linkedinBot();
