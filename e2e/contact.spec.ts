import { test, expect } from "@playwright/test";

test.describe("Contact form", () => {
  test.beforeEach(async ({ page }) => {
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      });
    });
  });

  test("submits message and shows success feedback", async ({ page }) => {
    await page.goto("/#contact");

    await page.locator("#contact-name").fill("Test User");
    await page.locator("#contact-email").fill("test@example.com");
    await page.locator("#contact-subject").fill("E2E inquiry");
    await page
      .locator("#contact-message")
      .fill("This is an automated Playwright test message.");

    await page.getByRole("button", { name: /send message/i }).click();

    await expect(page.getByRole("status")).toContainText(/sent successfully/i);
    await expect(page.locator("#contact-name")).toHaveValue("");
  });

  test("shows validation error for invalid email", async ({ page }) => {
    await page.goto("/#contact");

    await page.locator("#contact-name").fill("Test User");
    await page.locator("#contact-email").fill("not-an-email");
    await page.locator("#contact-subject").fill("Bad email test");
    await page.locator("#contact-message").fill("Testing client-side validation.");

    await page.getByRole("button", { name: /send message/i }).click();

    // Browser native validation prevents submit — email field stays invalid
    await expect(page.locator("#contact-email")).toBeFocused();
  });
});
