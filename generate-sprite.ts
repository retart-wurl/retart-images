#!/usr/bin/env bun
import { readdir, readFile, writeFile } from "fs/promises";
import { join } from "path";

const SVGS_DIR = "./svgs";
const FACE_SVGS_DIR = "./face-svgs";
const OUTPUT_FILE = "./sprite.svg";

interface SVGContent {
  id: string;
  content: string;
}

/**
 * Extracts the viewBox attribute from SVG content.
 */
function extractViewBox(svgContent: string): string | null {
  const viewBoxMatch = svgContent.match(/viewBox="([^"]*)"/);
  return viewBoxMatch ? viewBoxMatch[1] : null;
}

/**
 * Extracts inner content from SVG by removing the <svg> tags.
 */
function extractSVGContent(svgContent: string): string {
  // Remove <svg> and </svg> tags, extract only the inner content
  const contentMatch = svgContent.match(/<svg[^>]*>([\s\S]*)<\/svg>/);
  return contentMatch ? contentMatch[1].trim() : "";
}

/**
 * Generates an SVG sprite file.
 */
async function generateSprite() {
  console.log("🚀 Starting SVG sprite generation...");

  try {
    // Read all SVG files from the svgs directory
    const files = await readdir(SVGS_DIR);
    const svgFiles = files.filter((file) => file.endsWith(".svg"));

    console.log(`📁 Found ${svgFiles.length} SVG files in svgs directory.`);

    // Read all SVG files from the face-svgs directory
    const faceFiles = await readdir(FACE_SVGS_DIR);
    const faceSvgFiles = faceFiles.filter((file) => file.endsWith(".svg"));

    console.log(
      `📁 Found ${faceSvgFiles.length} SVG files in face-svgs directory.`
    );

    if (svgFiles.length === 0 && faceSvgFiles.length === 0) {
      console.log("⚠️  No SVG files found.");
      return;
    }

    // Sort files in ascending order by numeric value
    svgFiles.sort((a, b) => {
      const numA = parseInt(a.replace(".svg", ""), 10);
      const numB = parseInt(b.replace(".svg", ""), 10);
      return numA - numB;
    });

    // Process all SVG files
    const svgContents: SVGContent[] = [];

    for (const file of svgFiles) {
      const filePath = join(SVGS_DIR, file);
      const content = await readFile(filePath, "utf-8");
      const tokenId = file.replace(".svg", "");
      const id = `retart-${tokenId}`;
      const viewBox = extractViewBox(content);
      const innerContent = extractSVGContent(content);

      // Wrap with <symbol> tag
      const symbolContent = `  <symbol id="${id}"${
        viewBox ? ` viewBox="${viewBox}"` : ""
      }>
${innerContent}
  </symbol>`;

      svgContents.push({
        id,
        content: symbolContent,
      });
    }

    // Process all face SVG files
    for (const file of faceSvgFiles) {
      const filePath = join(FACE_SVGS_DIR, file);
      const content = await readFile(filePath, "utf-8");
      const id = file.replace(".svg", ""); // Use filename as-is
      const viewBox = extractViewBox(content);
      const innerContent = extractSVGContent(content);

      // Wrap with <symbol> tag
      const symbolContent = `  <symbol id="${id}"${
        viewBox ? ` viewBox="${viewBox}"` : ""
      }>
${innerContent}
  </symbol>`;

      svgContents.push({
        id,
        content: symbolContent,
      });
    }

    // Generate sprite SVG
    const spriteContent = `<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
${svgContents.map((svg) => svg.content).join("\n")}
</svg>
`;

    // Save file
    await writeFile(OUTPUT_FILE, spriteContent, "utf-8");

    console.log(`✅ Sprite generated successfully: ${OUTPUT_FILE}`);
    console.log(`📊 Total ${svgContents.length} symbols included.`);
    console.log(
      `📋 ID range: ${svgContents[0]?.id} ~ ${
        svgContents[svgContents.length - 1]?.id
      }`
    );
    console.log("\nUsage example:");
    console.log(`<svg><use href="sprite.svg#${svgContents[0]?.id}" /></svg>`);
  } catch (error) {
    console.error("❌ An error occurred:", error);
    process.exit(1);
  }
}

// Execute script
generateSprite();
