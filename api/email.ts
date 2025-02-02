import type { VercelRequest, VercelResponse } from '@vercel/node';

import { sendEmail, getPageContent, isInvalidEnvironment } from '../lib/index.js';

export default async function handler(_: VercelRequest, res: VercelResponse) {
	if (isInvalidEnvironment(process.env)) {
		res.status(400).send('Missing environmental variable(s).');

		return;
	}

	try {
		const { ALERTS_PAGE, DATE_SELECTOR, CHILD_CLASSNAME, ALERTS_SELECTOR } = process.env;
		const pages = JSON.parse(ALERTS_PAGE!);
		const alerts = [];

		for (const page of pages) {
			const result = await getPageContent({
				url: page,
				dateSelector: DATE_SELECTOR!,
				childClassName: CHILD_CLASSNAME!,
				contentSelector: ALERTS_SELECTOR!
			});

			alerts.push(result);
		}

		const content = alerts.join('');

		await sendEmail(process.env, content || '');

		return res.status(200).send(!content ? 'No updates found!' : 'Email sent!');
	} catch (error) {
		return res.status(500).send(error);
	}
}
