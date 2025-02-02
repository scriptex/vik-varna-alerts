#!/usr/bin/env node

import { config } from 'dotenv';

config();

import { getPageContent, isInvalidEnvironment, sendEmail } from '../public/lib/index.js';

(async () => {
	if (isInvalidEnvironment(process.env)) {
		console.error('Missing environmental variable(s).');

		return;
	}

	try {
		const { ALERTS_PAGE, DATE_SELECTOR, CHILD_CLASSNAME, ALERTS_SELECTOR } = process.env;
		const pages = JSON.parse(ALERTS_PAGE);
		const alerts = [];

		for (const page of pages) {
			const result = await getPageContent({
				url: page,
				dateSelector: DATE_SELECTOR,
				childClassName: CHILD_CLASSNAME,
				contentSelector: ALERTS_SELECTOR
			});

			alerts.push(result);
		}

		const content = alerts.join('');

		await sendEmail(process.env, content || '');

		console.log(!content ? 'No updates found!' : 'Email sent!');
	} catch (error) {
		console.error(error);
	}
})();
