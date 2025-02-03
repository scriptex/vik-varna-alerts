import type { VercelRequest, VercelResponse } from '@vercel/node';

import { getHTMLContent, isInvalidEnvironment } from '../lib/index.js';
import { collect } from '../lib/collect.js';

export default async function handler(_: VercelRequest, res: VercelResponse) {
	if (isInvalidEnvironment(process.env)) {
		res.status(400).send('Missing environmental variable(s).');

		return;
	}

	try {
		const alerts = await collect(true);

		return res.status(200).send(getHTMLContent(alerts));
	} catch (error) {
		return res.status(500).send(error);
	}
}
