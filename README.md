# Double-Click New Tab

A UserScript to double-click a link to open it in a new tab.

# Features

- Double-click a link to open it in a new tab
- Single-click a link to open it in the current tab, while respecting `target="_blank"` attribute and other existing event listeners
- Ignores links with `data:` protocol

## Installation

1. Install [Tampermonkey](https://tampermonkey.net/)
2. Install the UserScript:
   - [Download from Releases](https://github.com/kot149/double-click-new-tab/releases)
   - Or [Direct Install](https://github.com/kot149/double-click-new-tab/releases/latest/download/double-click-new-tab.user.js)

## Usage

Simply double-click on any link to open it in a new tab.

## Development

1. Install [Bun](https://bun.sh/)
2. Install dependencies
   ```sh
   bun install
   ```
3. Run in development mode
   ```sh
   bun run dev
   ```
4. Build
   ```sh
   bun run build
   ```

**Tech Stack:** TypeScript, Vite
