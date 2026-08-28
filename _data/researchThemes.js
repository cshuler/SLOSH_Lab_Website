const fs = require("fs");
const { parse } = require("csv-parse/sync");

module.exports = () => {
  const filePath = __dirname + "/ResearchThemes.csv";

  if (!fs.existsSync(filePath)) {
    return [];
  }

  const file = fs.readFileSync(filePath);
  const rows = parse(file, {
    columns: (header) => header.map((field) => String(field).trim()),
    skip_empty_lines: true,
    bom: true
  });

  const themes = rows
    .map((row) => {
      const key = Object.keys(row).find((field) => field && field.trim().toLowerCase() === "research_theme");
      const value = key ? row[key] : "";
      return typeof value === "string" ? value.trim() : "";
    })
    .filter(Boolean);

  return [...new Set(themes)];
};
