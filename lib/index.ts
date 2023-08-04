import * as cheerio from 'cheerio';
import { SendSmtpEmail, CreateSmtpEmail, TransactionalEmailsApi } from '@sendinblue/client';

import type { IncomingMessage } from 'node:http';

const style = `
body {
    font-family: sans-serif;
    font-size: 100%;
    line-height: 1.35;
    margin: 0;
}

main {
    max-width: 900px;
    padding: 1rem;
    margin: auto;
}

a {
    color: #ef4c23;
}

h1,
h2,
p,
.list-item-date,
.list-item-text {
    margin: 0 0 1rem;
}

h1 {
    text-align: center;
}

.list-item {
    padding-top: 1rem;
    border-top: 1px solid;
}

.list-item-date {
    font-style: italic;
}

.pages {
    text-align: center;
}

.pages a {
    text-decoration: none;
    min-width: 1.5rem;
    display: inline-block;
    vertical-align: top;
    padding: 0.25rem;
    border: 1px solid;
    margin: 0 0.5rem 0.5rem;
    background: rgba(0,0,0,0.2);
}`;

export function getHTMLContent(text: string) {
	return `
<html>
<head>
    <title>ВиК Варна | Съобщения за аварии</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>${style}</style>
</head>
<body>
    <main>${text}</main>
</body>
</html>`;
}

export async function getPageContent(url: string, selector: string) {
	const page = await fetch(url);
	const html = await page.text();
	const $ = cheerio.load(html);

	return $(selector);
}

export function isInvalidEnvironment(env: NodeJS.ProcessEnv) {
	return (
		!env.EMAIL_TO ||
		!env.EMAIL_FROM ||
		!env.ALERTS_PAGE ||
		!env.EMAIL_SUBJECT ||
		!env.ALERTS_SELECTOR ||
		!env.SENDINBLUE_API_KEY
	);
}

export async function sendEmail(
	env: NodeJS.ProcessEnv,
	htmlContent: string
): Promise<{ response: IncomingMessage; body: CreateSmtpEmail }> {
	const sendSMTPEmail = new SendSmtpEmail();
	const transactionalEmailsAPI = new TransactionalEmailsApi();

	transactionalEmailsAPI['authentications']['apiKey'].apiKey = env.SENDINBLUE_API_KEY || '';

	sendSMTPEmail.to = [{ email: env.EMAIL_TO! }];
	sendSMTPEmail.sender = { email: env.EMAIL_FROM };
	sendSMTPEmail.subject = env.EMAIL_SUBJECT;
	sendSMTPEmail.htmlContent = htmlContent;

	return await transactionalEmailsAPI.sendTransacEmail(sendSMTPEmail);
}
