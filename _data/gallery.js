const fs = require("fs");
const path = require("path");

const galleryRoot = path.join(__dirname, "..", "images", "gallery");
const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp", ".heic", ".heif"]);

function isImageFile(fileName) {
  return imageExtensions.has(path.extname(fileName).toLowerCase());
}

function toGalleryUrl(filePath) {
  const relativePath = path.relative(path.join(__dirname, ".."), filePath).split(path.sep).join("/");
  return `/${relativePath}`;
}

function getAltText(fileName) {
  return path.basename(fileName, path.extname(fileName)).replace(/[._-]+/g, " ").replace(/\s+/g, " ").trim();
}

function collectSection(directoryPath, title) {
  const entries = fs.readdirSync(directoryPath, { withFileTypes: true });
  const items = entries
    .filter((entry) => entry.isFile() && isImageFile(entry.name))
    .map((entry) => {
      const filePath = path.join(directoryPath, entry.name);

      return {
        src: toGalleryUrl(filePath),
        alt: getAltText(entry.name) || title || "Gallery image",
      };
    })
    .sort((left, right) => left.alt.localeCompare(right.alt));

  return items.length > 0 ? { title, items } : null;
}

function collectGallerySections(directoryPath, relativeDir = "") {
  const entries = fs.readdirSync(directoryPath, { withFileTypes: true });
  const fileSection = collectSection(directoryPath, relativeDir ? relativeDir : null);
  const childSections = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const childDirectoryPath = path.join(directoryPath, entry.name);
      const childRelativeDir = relativeDir ? path.join(relativeDir, entry.name) : entry.name;

      return collectGallerySections(childDirectoryPath, childRelativeDir);
    })
    .flat()
    .filter(Boolean);

  return [fileSection, ...childSections].filter(Boolean);
}

module.exports = collectGallerySections(galleryRoot);
