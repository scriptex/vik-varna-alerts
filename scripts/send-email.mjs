#!/usr/bin/env node

import { config } from 'dotenv';

config();

import { isInvalidEnvironment, sendEmail } from '../public/lib/index.js';
import { collect } from '../public/lib/collect.js';

(async () => {
	if (isInvalidEnvironment(process.env)) {
		console.error('Missing environmental variable(s).');

		return;
	}

	try {
		const alerts = await collect(false);

		await sendEmail(process.env, alerts);

		console.log(!alerts ? 'No updates found!' : 'Email sent!');
	} catch (error) {
		console.error(error);
	}
})();
