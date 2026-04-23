const fs = require("fs");
const { parse } = require("csv-parse/sync");

function normalizePublication(row) {
  const title = row.Title || row.title || "Untitled publication";
  const details = row.Details || row.details || "";
  const explicitTopic = row.Topic || row.topic || "";
  const explicitYear = row.Year || row.year || "";
  const yearInDetails = details.match(/(19|20)\d{2}/);
  const year = explicitYear || (yearInDetails ? yearInDetails[0] : "");

  return {
    title,
    details,
    topic: explicitTopic || (year ? String(year) : "General")
  };
}

module.exports = () => {
  const filePath = __dirname + "/publications.csv";

  if (!fs.existsSync(filePath)) {
    return [];
  }

  const file = fs.readFileSync(filePath);
  const rows = parse(file, {
    columns: true,
    skip_empty_lines: true
  }).map(normalizePublication);

  const grouped = rows.reduce((acc, row) => {
    const key = row.topic.trim() || "General";
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push({
      title: row.title,
      details: row.details
    });
    return acc;
  }, {});

  return Object.keys(grouped)
    .sort((a, b) => b.localeCompare(a, undefined, { numeric: true }))
    .map((topic) => ({
      id: topic.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      label: topic,
      items: grouped[topic]
    }));
};
