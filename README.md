# Retart Images

This repository contains the image assets for the "Retart" NFT collection.

All images (both raster and vector) are 500×500 pixels.

## Contents

- `pngs/` — The original NFT artwork exported as PNG images. Files are organized by token ID (e.g. `123.png`). These are the full, original images.
- `svgs/` — Vectorized versions with the background removed. Each SVG contains only the character artwork (no background), useful for scalable use in web or design projects. Files are named by token ID (e.g. `123.svg`).
- `sprite.svg` — Combined SVG sprite containing all icons from `svgs/` directory. Each icon is accessible with ID format `retart-{tokenId}` (e.g. `retart-1`, `retart-123`). Icons are sorted in ascending order by token ID.

## Image details

- Size: 500 × 500 pixels
- PNGs: full original images per token id
- SVGs: background-removed vector character artwork per token id

## Where the collection lives

- OpenSea: https://opensea.io/collection/retarted
- X (formerly Twitter): https://x.com/retartwurl

## Usage

- Use the PNGs when you need the original pixel artwork.
- Use the SVGs when you need scalable, background-free artwork for web pages, overlays, or print.
- Use the SVG sprite (`sprite.svg`) for efficient loading of multiple icons via `<use>` tags.
- File names follow token IDs: replace `<id>` with a token number, for example:

  - `pngs/<id>.png`
  - `svgs/<id>.svg`

### SVG Sprite Usage

The `sprite.svg` file contains all SVG icons as reusable symbols. This allows for efficient loading and usage of multiple icons:

**Icon ID Format:** `retart-{tokenId}` (e.g., `retart-1`, `retart-123`, `retart-399`)

**Sorted Order:** Icons are organized in ascending order by token ID (1 → 399)

```html
<!-- Include the sprite (can be hidden) -->
<svg style="display: none;">
  <use href="sprite.svg#retart-1"></use>
</svg>

<!-- Use any icon by its token ID -->
<svg width="500" height="500">
  <use href="sprite.svg#retart-1" />
</svg>

<svg width="100" height="100">
  <use href="sprite.svg#retart-123" />
</svg>
```

### Generating the SVG Sprite

To regenerate the sprite.svg file from the svgs directory:

```bash
# Install dependencies (first time only)
bun install

# Generate sprite.svg (automatically sorted in ascending order)
bun run sprite
```

This will create/update `sprite.svg` with all SVG files from the `svgs/` directory, with IDs in the format `retart-{tokenId}` sorted in ascending order.

## Previewing locally

Open any PNG or SVG in your browser or image editor. For a quick HTML preview, place an image tag in a simple HTML file:

```html
<img src="pngs/123.png" width="500" height="500" alt="Retart #123" />
<img src="svgs/123.svg" width="500" height="500" alt="Retart #123" />
```

## Contributing

If you have additional optimized assets, corrections, open an issue or a pull request and include which token IDs are affected and what the change is.

## Contact

For questions about the collection, reach out via official retart X: https://x.com/retartwurl

---

Last updated: 2025-11-03
