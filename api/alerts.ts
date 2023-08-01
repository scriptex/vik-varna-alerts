import * as cheerio from 'cheerio';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const { EMAIL_TO, EMAIL_FROM, ALERTS_PAGE, EMAIL_SUBJECT, ALERTS_SELECTOR, SENDINBLUE_API_KEY } = process.env;

export default async function handler(_: VercelRequest, res: VercelResponse) {
	if (!EMAIL_TO || !EMAIL_FROM || !ALERTS_PAGE || !EMAIL_SUBJECT || !ALERTS_SELECTOR || !SENDINBLUE_API_KEY) {
		res.status(400).send('Missing environmental variable(s).');

		return;
	}

	try {
		const page = await fetch(ALERTS_PAGE);
		const html = await page.text();
		const $ = cheerio.load(html);
		const alerts = $(ALERTS_SELECTOR);
		const htmlContent = alerts.html();

		return res.status(200).send(htmlContent);
	} catch (error) {
		return res.status(500).send(error);
	}
}
