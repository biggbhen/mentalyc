import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
	await page.goto('https://mentalyc-bennjamin.netlify.app/');
	await page.getByRole('button', { name: 'Start Recording icon' }).click();
});
