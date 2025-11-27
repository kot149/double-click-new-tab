// Track pending double-click
let clickTimeout: number | null = null;
let isWaitingForDoubleClick = false;

function handleClick(event: MouseEvent): void {
	// Check if the clicked element is a link
	const target = event.target as HTMLElement;
	const link = target.closest('a[href]') as HTMLAnchorElement;

	if (!link) {
		return;
	}

	// Always prevent default for links we're tracking
	event.preventDefault();
	event.stopPropagation();

	// If already waiting for double-click, this is the second click
	if (isWaitingForDoubleClick) {
		// This will be handled by dblclick event
		return;
	}

	// Set flag for first click
	isWaitingForDoubleClick = true;

	// Clear any existing timeout
	if (clickTimeout !== null) {
		clearTimeout(clickTimeout);
	}

	// Wait to see if a double-click occurs
	clickTimeout = window.setTimeout(() => {
		// Single click - navigate in current tab
		const href = link.getAttribute('href');
		if (href) {
			const absoluteUrl = new URL(href, window.location.href).href;
			const linkTarget = link.getAttribute('target') || '_self';

			// If target is _self or empty, navigate in current tab
			// Otherwise open in the specified target (new tab, window, etc.)
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
	// Check if the double-clicked element is a link
	const target = event.target as HTMLElement;
	const link = target.closest('a[href]') as HTMLAnchorElement;

	if (!link) {
		return;
	}

	// Prevent the default double-click behavior
	event.preventDefault();
	event.stopPropagation();

	// Cancel the single-click timer
	if (clickTimeout !== null) {
		clearTimeout(clickTimeout);
		clickTimeout = null;
	}

	isWaitingForDoubleClick = false;

	const href = link.getAttribute('href');
	if (!href) {
		return;
	}

	// Resolve relative URLs
	const absoluteUrl = new URL(href, window.location.href).href;

	// Open the link in a new tab
	window.open(absoluteUrl, '_blank');
}

// Initialize when DOM is ready
function init(): void {
	document.addEventListener('dblclick', handleDoubleClick, true);
	document.addEventListener('click', handleClick, true);
	console.log('Double-Click New Tab UserScript loaded successfully');
}

// Ensure script runs even with strict CSP
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', init);
} else {
	init();
}
