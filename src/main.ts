let clickTimeout: number | null = null;
let isWaitingForDoubleClick = false;

function handleClick(event: MouseEvent): void {
	const target = event.target as HTMLElement;
	const link = target.closest('a[href]') as HTMLAnchorElement;

	if (!link) {
		return;
	}

	event.preventDefault();
	event.stopPropagation();

	if (isWaitingForDoubleClick) {
		return;
	}

	isWaitingForDoubleClick = true;

	if (clickTimeout !== null) {
		clearTimeout(clickTimeout);
	}

	clickTimeout = window.setTimeout(() => {
		// Single click detected
		const href = link.getAttribute('href');
		if (href) {
			const absoluteUrl = new URL(href, window.location.href).href;
			const linkTarget = link.getAttribute('target') || '_self';

			if (linkTarget === '_self' || linkTarget === '') {
				window.location.href = absoluteUrl;
			} else {
				window.open(absoluteUrl, linkTarget);
			}
		}
		isWaitingForDoubleClick = false;
		clickTimeout = null;
	}, 300);
}

function handleDoubleClick(event: MouseEvent): void {
	const target = event.target as HTMLElement;
	const link = target.closest('a[href]') as HTMLAnchorElement;

	if (!link) {
		return;
	}

	event.preventDefault();
	event.stopPropagation();

	if (clickTimeout !== null) {
		clearTimeout(clickTimeout);
		clickTimeout = null;
	}

	isWaitingForDoubleClick = false;

	const href = link.getAttribute('href');
	if (!href) {
		return;
	}

	const absoluteUrl = new URL(href, window.location.href).href;

	window.open(absoluteUrl, '_blank');
}

function init(): void {
	document.addEventListener('dblclick', handleDoubleClick, true);
	document.addEventListener('click', handleClick, true);
	console.log('Double-Click New Tab UserScript loaded successfully');
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', init);
} else {
	init();
}
