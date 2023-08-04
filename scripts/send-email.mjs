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
		const alerts = await getPageContent(process.env.ALERTS_PAGE, process.env.ALERTS_SELECTOR);

		await sendEmail(process.env, alerts.html() || '');

		console.log('Email sent!');
	} catch (error) {
		console.error(error);
	}
})();
