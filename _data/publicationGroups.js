const fs = require("fs");
const { parse } = require("csv-parse/sync");

const publicationTopics = [
  "Groundwater & Coastal Systems",
  "Nutrient Loading & Reef Impacts",
  "Climate Change & Sea Level Rise"
];

function normalizePublication(row) {
  const title = row.Title || row.title || "Untitled publication";
  const citation = row.Citation || row.citation || "";
  const link = row["Link/DOI"] || row["Link/doi"] || row.link || "";
  const description = row.Subject || row.subject || "";
  const details = row.Details || row.details || citation || "";
  const explicitTopic = row.Topic || row.topic || "";
  const explicitYear = row.Year || row.year || "";
  const yearsInDetails = [...details.matchAll(/(19|20)\d{2}/g)].map((match) => Number(match[0]));
  const year = explicitYear || (yearsInDetails.length ? String(Math.max(...yearsInDetails)) : "");

  return {
    title,
    description,
    details,
    link,
    topic: explicitTopic || (year ? String(year) : "General"),
    year
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
      description: row.description,
      details: row.details,
      link: row.link,
      year: row.year
    });
    return acc;
  }, {});

  for (const topic of publicationTopics) {
    const items = grouped[topic] || [];
    grouped[topic] = items.sort((left, right) => {
      const leftYear = Number(left.year) || 0;
      const rightYear = Number(right.year) || 0;
      return rightYear - leftYear;
    });
  }

  return publicationTopics.map((topic) => ({
    id: topic.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    label: topic,
    items: grouped[topic] || []
  }));
};
