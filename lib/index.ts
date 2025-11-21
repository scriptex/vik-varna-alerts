import * as cheerio from 'cheerio';
import { SendSmtpEmail, CreateSmtpEmail, TransactionalEmailsApi } from '@sendinblue/client';

import type { IncomingMessage } from 'node:http';

export type PageContentOptions = {
	url: string;
	dateSelector: string;
	childClassName: string;
	contentSelector: string;
	keywordsString: string;
};

const style = `
body {
    font-family: sans-serif;
    font-size: 100%;
    line-height: 1.35;
    margin: 0;
}

main {
	min-height: calc(100vh - 4.75rem);
    max-width: 900px;
    padding: 1rem;
    margin: auto;
}

h1 {
	margin-bottom: 1em;
}

h1:not(:first-child) {
	margin: 1em 0;
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
	
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/github-fork-ribbon-css/0.2.3/gh-fork-ribbon.min.css"
	/>

	<link rel="shortcut icon" type="image/x-icon" href="https://atanas.info/images/favicon/favicon.ico" />

    <style>${style}</style>

	<script src="https://unpkg.com/scriptex-socials" async></script>
	
	<script>
		(function(d, h, m){
			var js, fjs = d.getElementsByTagName(h)[0];
			if (d.getElementById(m)){return;}
			js = d.createElement(h); js.id = m;
			js.onload = function(){
				window.makerWidgetComInit({
				position: "left",          
				widget: "egtvfprlpcdjg1i4-8syknhxgseddkfli-j45otk13qspl7fts"                
			})};
			js.src = "https://makerwidget.com/js/embed.js";
			fjs.parentNode.insertBefore(js, fjs)
		}(document, "script", "dhm"))
	</script>
</head>
<body>
	<a
		href="https://github.com/scriptex/vik-varna-alerts/"
		title="See code on Github"
		class="github-fork-ribbon"
		data-ribbon="See code on Github"
	>
		See code on Github
	</a>

    <main>${text}</main>

	<footer>
		<social-links></social-links>
	</footer>
</body>
</html>`;
}

export async function getPageContent({
	url,
	dateSelector,
	childClassName,
	contentSelector,
	keywordsString
}: PageContentOptions): Promise<string> {
	const page = await fetch(url);
	const html = await page.text();
	const now = new Date();
	const $ = cheerio.load(html);

	let keywords: string[] = [];

	try {
		keywords = JSON.parse(keywordsString);
	} catch (e) {
		console.error(e);
	}

	now.setHours(0);
	now.setMinutes(0);
	now.setSeconds(0);
	now.setMilliseconds(0);

	let result = '';
	let isEmpty = true;

	$(contentSelector)
		.children()
		.each((_, el) => {
			const $child = $(el);

			if (!$child.hasClass(childClassName)) {
				result += $child.html();
			} else {
				const [day, month, year] = $child.find(dateSelector).text().replace(' г.', '').split('.');

				const date = new Date(
					Number(year),
					Number(month.startsWith('0') ? month[1] : month) - 1,
					Number(day)
				).getTime();

				const childText = $child.text().toLowerCase().trim();
				const hasMatch =
					Array.isArray(keywords) && keywords.length > 0
						? keywords.some(keyword => childText.includes(keyword.toLowerCase().trim()))
						: true;

				if (date >= now.getTime() && hasMatch) {
					result += $child.html();
					isEmpty = false;
				}
			}
		});

	return isEmpty ? '' : result;
}

export function isInvalidEnvironment(env: NodeJS.ProcessEnv) {
	return (
		!env.EMAIL_TO ||
		!env.EMAIL_FROM ||
		!env.ALERTS_PAGE ||
		!env.EMAIL_SUBJECT ||
		!env.DATE_SELECTOR ||
		!env.ALERTS_SELECTOR ||
		!env.CHILD_CLASSNAME ||
		!env.SENDINBLUE_API_KEY ||
		!env.KEYWORDS
	);
}

export async function sendEmail(
	env: NodeJS.ProcessEnv,
	htmlContent: string
): Promise<{ response: IncomingMessage; body: CreateSmtpEmail } | void> {
	if (!htmlContent) {
		return;
	}

	const sendSMTPEmail = new SendSmtpEmail();
	const transactionalEmailsAPI = new TransactionalEmailsApi();

	transactionalEmailsAPI['authentications']['apiKey'].apiKey = env.SENDINBLUE_API_KEY || '';

	sendSMTPEmail.to = [{ email: env.EMAIL_TO! }];
	sendSMTPEmail.sender = { email: env.EMAIL_FROM };
	sendSMTPEmail.subject = env.EMAIL_SUBJECT;
	sendSMTPEmail.htmlContent = htmlContent;

	return await transactionalEmailsAPI.sendTransacEmail(sendSMTPEmail);
}
