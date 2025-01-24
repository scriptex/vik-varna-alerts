import type { VercelRequest, VercelResponse } from '@vercel/node';

import { getHTMLContent, getPageContent, isInvalidEnvironment } from '../lib/index.js';

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

			const { origin, pathname, searchParams } = new URL(page);
			const url = `${origin}${pathname}?${Array.from(searchParams.entries())
				.map(([key, value]) => `${key}=${value}`)
				.join('&amp;')}`;

			alerts.push(`<h1><a href="${url}" target="_blank">${url}</a></h1>`);
			alerts.push(result);
		}

		return res.status(200).send(getHTMLContent(alerts.join('')));
	} catch (error) {
		return res.status(500).send(error);
	}
}
