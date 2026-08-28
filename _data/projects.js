const fs = require("fs");
const { parse } = require("csv-parse/sync");

function normalizeRow(row) {
  const normalized = {};

  for (const [key, value] of Object.entries(row)) {
    normalized[key.trim()] = value;
  }

  return {
    ...normalized,
    Research_Theme: normalized.Research_Theme || normalized["Research Theme"] || normalized.Theme || "",
    "Project name": normalized["Project name"] || normalized["Project Name"] || normalized.Name || "",
    Description: normalized.Description || normalized.description || "",
    "Team members": normalized["Team members"] || normalized["Team Members"] || normalized["Team"] || "",
    "Relevant links": normalized["Relevant links"] || normalized["Relevant Links"] || normalized.Link || ""
  };
}

module.exports = () => {
  const filePath = __dirname + "/projects.csv";

  if (!fs.existsSync(filePath)) {
    return [];
  }

  const file = fs.readFileSync(filePath);

  return parse(file, {
    columns: true,
    skip_empty_lines: true
  }).map(normalizeRow);
};
