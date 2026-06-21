

# Meme Generator

Live demo: https://noykatzav.github.io/noykatzav-meme-generator/

A small, client-side meme generator built with plain HTML, CSS and JavaScript. Pick an image, add and format text lines, move and resize text on a canvas, and save or download your meme.

This repo is a single-page static app intended for learning and a light demo of DOM + Canvas manipulation and modular JavaScript (controllers + services).

## Key features

- Browse a gallery of images (square and various aspect ratios).
- Add multiple text lines with per-line formatting (font size, alignment, color, stroke).
- Drag and reposition text directly on the canvas.
- Export the final meme as an image file (download).

## Tech stack

- Plain HTML5, CSS3 (modular styles under `styles/`).
- Vanilla JavaScript organized into controllers and services under `js/`.
- Uses the Canvas 2D API to render images and text.

## Repo layout (important files)

- `index.html` — single page entry.
- `styles/` — CSS split into base, components and setup.
- `js/` — application JavaScript
	- `gallery.controller.js` — gallery UI and image selection
	- `meme.controller.js` — meme editor UI and canvas wiring
	- `services/` — small services for meme data, storage and utils
		- `gallery.service.js`
		- `meme.service.js`
		- `storage.service.js`
		- `util.service.js`
- `meme-imgs/` — sample images used by the gallery; two folders (square / various aspect ratios).

## How to run (quick)

Because this is a static site, you can just open `index.html` in your browser or serve the folder over a tiny local server (recommended to avoid CORS issues when loading images in some browsers).

Open directly (macOS):

```bash
open index.html
```

Serve with Python (recommended):

```bash
# from the project root (zsh)
python3 -m http.server 8000
# then open http://localhost:8000 in your browser
```

Or use a lightweight Node zero-config server:

```bash
npx serve .
```

## Development notes

- Edit UI/logic: `js/meme.controller.js` and `js/services/meme.service.js`.
- Gallery images are stored in `meme-imgs/` — add or remove images there. Filenames should be unique.
- Styling is split across `styles/` for easier organization; `styles/components/meme-editor.css` contains editor-specific rules.
- No build step is required — changes to files are visible right away when reloading the page.

### Data shape (quick contract)

- Meme object (used by `meme.service`):
	- id: number
	- selectedImgId: number (image identifier)
	- lines: array of text line objects
		- txt: string
		- size: number
		- align: 'left' | 'center' | 'right'
		- color: string (fill)
		- stroke: string
		- pos: { x: number, y: number }

Edge cases to keep in mind:

- Empty text or very long text — text should wrap or scale.
- Different image aspect ratios — text positioning should be relative to canvas size.
- High-DPI / retina screens — canvas scaling may be necessary for crisp rendering.

## Manual testing / smoke test

1. Start a local server and open the app.
2. In the gallery, pick an image.
3. Add a text line, change color/size, then drag it on the canvas.
4. Click the download/export button and confirm an image file is saved.

If any step fails, check the browser console for errors and verify image paths under `meme-imgs/`.

## Accessibility & responsiveness

- The app is styled responsively; testers should verify behavior on mobile and narrow viewports.
- Consider adding keyboard controls for selecting/moving text and aria labels for buttons if you need full accessibility compliance.

## Next improvements (suggested)

- Add undo/redo history for edits.
- Implement text wrapping and auto-scaling for long lines.
- Persist user-created memes to localStorage and show a 'My Memes' gallery.
- Add unit tests for service logic.

## Credits

Created by Noy Katzav as a Fullstack sprint submission. Project structure and naming were kept intentionally simple to focus on core functionality.

## License

This repository is offered under the MIT License — feel free to reuse and adapt.

