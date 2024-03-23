import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
	await page.goto('https://mentalyc-bennjamin.netlify.app/');
	await page.getByRole('link', { name: 'icon Recordings List' }).click();
	await page.getByRole('button', { name: 'Generate Notes' }).click();
});
