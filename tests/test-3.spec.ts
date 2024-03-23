import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
	await page.goto('https://mentalyc-bennjamin.netlify.app/');
	await page.getByRole('button', { name: 'Start Recording icon' }).click();
	await page.getByLabel('Client Name').click();
	await page.getByLabel('Client Name').click();
	await page.getByLabel('Client Name').fill('ben');
	await page.getByLabel('Session Title').click();
	await page.getByLabel('Session Title').fill('session');
	await page.getByLabel('Record').click();
	await page.getByLabel('Stop').click();
	await page.getByRole('button', { name: 'Save' }).click();
});
