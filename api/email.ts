import type { VercelRequest, VercelResponse } from '@vercel/node';

import { sendEmail, getPageContent, isInvalidEnvironment } from '../lib/index.js';

export default async function handler(_: VercelRequest, res: VercelResponse) {
	if (isInvalidEnvironment(process.env)) {
		res.status(400).send('Missing environmental variable(s).');

		return;
	}

	try {
		const alerts = await getPageContent(process.env.ALERTS_PAGE!, process.env.ALERTS_SELECTOR!);

		await sendEmail(process.env, alerts.html() || '');

		return res.status(200).send('Email sent!');
	} catch (error) {
		return res.status(500).send(error);
	}
}
