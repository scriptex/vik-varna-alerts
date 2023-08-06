import type { VercelRequest, VercelResponse } from '@vercel/node';

import { getHTMLContent, getPageContent, isInvalidEnvironment } from '../lib/index.js';

export default async function handler(_: VercelRequest, res: VercelResponse) {
	if (isInvalidEnvironment(process.env)) {
		res.status(400).send('Missing environmental variable(s).');

		return;
	}

	try {
		const { ALERTS_PAGE, DATE_SELECTOR, CHILD_CLASSNAME, ALERTS_SELECTOR } = process.env;

		const alerts = await getPageContent({
			url: ALERTS_PAGE!,
			dateSelector: DATE_SELECTOR!,
			childClassName: CHILD_CLASSNAME!,
			contentSelector: ALERTS_SELECTOR!
		});

		return res.status(200).send(getHTMLContent(alerts ?? ''));
	} catch (error) {
		return res.status(500).send(error);
	}
}
