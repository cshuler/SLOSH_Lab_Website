const fs = require("fs");
const { parse } = require("csv-parse/sync");

const publicationTopics = [
  "Groundwater & Coastal Systems",
  "Nutrient Loading & Reef Impacts",
  "Climate Change & Sea Level Rise"
];

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
    return publicationTopics.map((topic) => ({
      id: topic.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      label: topic,
      items: []
    }));
  }

  const file = fs.readFileSync(filePath);
  const rows = parse(file, {
    columns: true,
    skip_empty_lines: true
  }).map(normalizePublication);

  const grouped = rows.reduce((acc, row) => {
    const key = publicationTopics.includes(row.topic.trim()) ? row.topic.trim() : publicationTopics[0];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push({
      title: row.title,
      details: row.details
    });
    return acc;
  }, {});

  return publicationTopics.map((topic) => ({
    id: topic.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    label: topic,
    items: grouped[topic] || []
  }));
};
