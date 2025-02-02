import { getPageContent } from './index.js';

export const collect = async (includeTitles: boolean) => {
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

		if (includeTitles) {
			const { origin, pathname, searchParams } = new URL(page);
			const url = `${origin}${pathname}?${Array.from(searchParams.entries())
				.map(([key, value]) => `${key}=${value}`)
				.join('&amp;')}`;

			alerts.push(`<h1><a href="${url}" target="_blank">${url}</a></h1>`);
		}

		alerts.push(result);
	}

	return alerts.join('');
};
