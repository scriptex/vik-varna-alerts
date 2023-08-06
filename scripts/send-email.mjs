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

		const alerts = await getPageContent({
			url: ALERTS_PAGE,
			dateSelector: DATE_SELECTOR,
			childClassName: CHILD_CLASSNAME,
			contentSelector: ALERTS_SELECTOR
		});

		await sendEmail(process.env, alerts || '');

		console.log('Email sent!');
	} catch (error) {
		console.error(error);
	}
})();
