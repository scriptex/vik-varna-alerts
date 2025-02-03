import type { VercelRequest, VercelResponse } from '@vercel/node';

import { sendEmail, isInvalidEnvironment } from '../lib/index.js';
import { collect } from '../lib/collect.js';

export default async function handler(_: VercelRequest, res: VercelResponse) {
	if (isInvalidEnvironment(process.env)) {
		res.status(400).send('Missing environmental variable(s).');

		return;
	}

	try {
		const alerts = await collect(false);

		await sendEmail(process.env, alerts);

		return res.status(200).send(!alerts ? 'No updates found!' : 'Email sent!');
	} catch (error) {
		return res.status(500).send(error);
	}
}
