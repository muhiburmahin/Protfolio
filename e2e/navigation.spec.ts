import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("home page loads with main sections", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("#home")).toBeVisible();
    await expect(page.locator("#projects")).toBeVisible();
    await expect(page.locator("#contact")).toBeVisible();
  });

  test("hash navigation scrolls to contact section", async ({ page }) => {
    await page.goto("/");

    await page.locator('a[href="#contact"]').first().click();
    await expect(page.locator("#contact")).toBeInViewport();
  });

  test("project case study page and back link", async ({ page }) => {
    await page.goto("/projects/medistore");

    await expect(
      page.getByRole("heading", { name: /MediStore/i })
    ).toBeVisible();

    await page.getByRole("link", { name: /back to projects/i }).click();
    await expect(page).toHaveURL(/\/#projects|\/$/);
    await expect(page.locator("#projects")).toBeVisible();
  });
});
