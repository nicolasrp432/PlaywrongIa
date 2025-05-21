// @ts-check
import { test, expect } from '@playwright/test';

/**
 * Basic end-to-end tests for the PlaywrongIA application
 */
test.describe('PlaywrongIA Application', () => {
  test.beforeEach(async ({ page }) => {
    // Go to the homepage before each test
    await page.goto('/');
  });

  test('should have the correct title', async ({ page }) => {
    // Check that the page title contains the app name
    await expect(page).toHaveTitle(/PlaywrongIA/);
  });

  test('should display the navbar with logo', async ({ page }) => {
    // Check that the navbar contains the logo
    const logo = page.locator('nav span.text-netflix-red');
    await expect(logo).toBeVisible();
    await expect(logo).toHaveText('PlaywrongIA');
  });

  test('should navigate to search page', async ({ page }) => {
    // Click on the search form in the navbar
    await page.fill('input[placeholder="Buscar películas..."]', 'test');
    await page.press('input[placeholder="Buscar películas..."]', 'Enter');
    
    // Check that we're on the search page
    await expect(page).toHaveURL(/\/search\?q=test/);
    
    // Check that the search page contains the search form
    const searchHeading = page.locator('h1:has-text("Buscar Películas")');
    await expect(searchHeading).toBeVisible();
  });

  test('should display movie sections on homepage', async ({ page }) => {
    // Wait for the movie sections to load
    await page.waitForSelector('.section-title');
    
    // Check that there are genre sections
    const sections = await page.locator('.section-title').all();
    expect(sections.length).toBeGreaterThanOrEqual(3); // We should have at least 3 genre sections
  });

  test('should navigate to movie details page when clicking on a movie', async ({ page }) => {
    // Wait for movies to load
    await page.waitForSelector('.movie-card');
    
    // Click on the first movie
    await page.locator('.movie-card').first().click();
    
    // Check that we're on a movie detail page
    await expect(page.url()).toContain('/movie/');
    
    // Check that the movie detail page contains the expected elements
    await expect(page.locator('h1')).toBeVisible(); // Movie title
    await expect(page.locator('a:has-text("Volver al inicio")')).toBeVisible();
  });

  test('should show login button for unauthenticated users', async ({ page }) => {
    // Check that the login button is visible
    const loginButton = page.locator('button:has-text("Iniciar Sesión")');
    await expect(loginButton).toBeVisible();
  });

  test('should have a footer with links', async ({ page }) => {
    // Check that the footer is visible
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    
    // Check that the footer contains links
    const links = await footer.locator('a').all();
    expect(links.length).toBeGreaterThan(0);
  });
});
