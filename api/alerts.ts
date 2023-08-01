import * as cheerio from 'cheerio';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const { EMAIL_TO, EMAIL_FROM, ALERTS_PAGE, EMAIL_SUBJECT, ALERTS_SELECTOR, SENDINBLUE_API_KEY } = process.env;

export default async function handler(_: VercelRequest, res: VercelResponse) {
	if (!EMAIL_TO || !EMAIL_FROM || !ALERTS_PAGE || !EMAIL_SUBJECT || !ALERTS_SELECTOR || !SENDINBLUE_API_KEY) {
		res.status(400).send('Missing environmental variable(s).');

		return;
	}

	try {
		const page = await fetch(ALERTS_PAGE);
		const html = await page.text();
		const $ = cheerio.load(html);
		const alerts = $(ALERTS_SELECTOR);
		const htmlContent = `
<html>
<head>
	<style>
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
	}
	</style>

	<meta name="viewport" content="width=device-width, initial-scale=1" />
</head>

<body>
	<main>
	${alerts.html()}
	</main>
</body>
</html>
`;

		return res.status(200).send(htmlContent);
	} catch (error) {
		return res.status(500).send(error);
	}
}
