import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
	await page.goto('https://mentalyc-bennjamin.netlify.app/');
	await page.getByRole('button', { name: 'Start Recording icon' }).click();
	await page.getByLabel('Client Name').click();
	await page.getByLabel('Client Name').fill('jerry');
	await page.getByLabel('Session Title').click();
	await page.getByLabel('Session Title').fill('session two');
	await page.getByLabel('Record').click();
	await page.getByLabel('Stop').click();
	await page.getByRole('button', { name: 'Save' }).click();
	await page
		.locator('div')
		.filter({ hasText: 'Record a new sessionClient' })
		.nth(1)
		.click();
});
