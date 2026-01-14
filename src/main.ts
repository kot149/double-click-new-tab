const DOUBLE_CLICK_TIMEOUT_MS = 250;

let clickTimeout: number | null = null;
let isWaitingForDoubleClick = false;
let isSingleClickExecuted = false;

function handleClick(event: MouseEvent): void {
	const target = event.target as HTMLElement;
	const link = target.closest('a[href]') as HTMLAnchorElement;

	if (!link || link.href.startsWith('data:')) {
		return;
	}

	if (isSingleClickExecuted) {
		isSingleClickExecuted = false;
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
		isSingleClickExecuted = true;
		link.click();
		isWaitingForDoubleClick = false;
		clickTimeout = null;
	}, DOUBLE_CLICK_TIMEOUT_MS);
}

function handleDoubleClick(event: MouseEvent): void {
	const target = event.target as HTMLElement;
	const link = target.closest('a[href]') as HTMLAnchorElement;

	if (!link || link.href.startsWith('data:')) {
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
