import * as cheerio from 'cheerio';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { SendSmtpEmail, TransactionalEmailsApi } from '@sendinblue/client';

const sendSMTPEmail = new SendSmtpEmail();
const transactionalEmailsAPI = new TransactionalEmailsApi();

const { EMAIL_TO, EMAIL_FROM, ALERTS_PAGE, EMAIL_SUBJECT, ALERTS_SELECTOR, SENDINBLUE_API_KEY } = process.env;

transactionalEmailsAPI['authentications']['apiKey'].apiKey = SENDINBLUE_API_KEY || '';

export default async function handler(req: VercelRequest, res: VercelResponse) {
	if (!EMAIL_TO || !EMAIL_FROM || !ALERTS_PAGE || !EMAIL_SUBJECT || !ALERTS_SELECTOR || !SENDINBLUE_API_KEY) {
		res.status(400).send('Missing environmental variable(s).');

		return;
	}

	const page = await fetch(ALERTS_PAGE);
	const html = await page.text();
	const $ = cheerio.load(html);
	const alerts = $(ALERTS_SELECTOR);
	const htmlContent = alerts.html();

	sendSMTPEmail.to = [{ email: EMAIL_TO }];
	sendSMTPEmail.sender = { email: EMAIL_FROM };
	sendSMTPEmail.subject = EMAIL_SUBJECT;
	sendSMTPEmail.htmlContent = htmlContent || '';

	try {
		await transactionalEmailsAPI.sendTransacEmail(sendSMTPEmail);

		return res.status(200).send(htmlContent);
	} catch (error) {
		return res.status(500).send(error);
	}
}
