const fs = require("fs");
const { parse } = require("csv-parse/sync");

function loadThemes() {
  const filePath = __dirname + "/ResearchThemes.csv";

  if (!fs.existsSync(filePath)) {
    return [];
  }

  const rows = parse(fs.readFileSync(filePath), {
    columns: true,
    skip_empty_lines: true
  });

  return rows
    .map((row) => {
      const key = Object.keys(row).find((field) => field && field.trim().toLowerCase() === "research_theme");
      const value = key ? row[key] : "";
      return typeof value === "string" ? value.trim() : "";
    })
    .filter(Boolean);
}

function getValue(row, keys) {
  for (const key of keys) {
    const matchingKey = Object.keys(row).find((rowKey) => rowKey && rowKey.trim() === key);
    if (matchingKey !== undefined && row[matchingKey] !== undefined && row[matchingKey] !== null) {
      const value = String(row[matchingKey]).trim();
      if (value) return value;
    }
  }
  return "";
}

function normalizePublication(row) {
  const title = getValue(row, ["Title", "title"]) || "Untitled publication";
  const citation = getValue(row, ["Citation", "citation"]) || "";
  const link = getValue(row, ["Link/DOI", "Link/doi", "link"]) || "";
  const description = getValue(row, ["Description", "description", "Subject", "subject"]) || "";
  const details = getValue(row, ["Details", "details"]) || citation || "";
  const explicitTopic = getValue(row, ["Research_Theme", "Research Theme", "Theme", "theme", "Topic", "topic"]) || "";
  const explicitYear = getValue(row, ["Year", "year"]) || "";
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
  const publicationTopics = loadThemes();

  if (!fs.existsSync(filePath)) {
    return publicationTopics.map((topic) => ({
      id: topic.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      label: topic,
      items: []
    }));
  }

  const file = fs.readFileSync(filePath);
  const rows = parse(file, {
    columns: (header) => header.map((field) => String(field).trim()),
    skip_empty_lines: true,
    bom: true
  }).map(normalizePublication);

  const grouped = rows.reduce((acc, row) => {
    const normalizedTopic = row.topic.trim();
    const key = publicationTopics.includes(normalizedTopic) ? normalizedTopic : (publicationTopics[0] || "General");
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
