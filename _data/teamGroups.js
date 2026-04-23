const fs = require("fs");
const { parse } = require("csv-parse/sync");

function classifyTitle(title) {
  const normalized = (title || "").toLowerCase();

  if (normalized.includes("undergraduate") || normalized.includes("intern")) {
    return "Undergraduate Students";
  }

  if (normalized.includes("graduate") || normalized.includes("master") || normalized.includes("phd")) {
    return "Graduate Students";
  }

  if (normalized.includes("postdoc")) {
    return "Postdoctoral Researchers";
  }

  if (normalized.includes("pi") || normalized.includes("faculty") || normalized.includes("specialist")) {
    return "Faculty";
  }

  if (normalized.includes("analyst") || normalized.includes("staff") || normalized.includes("specialist") || normalized.includes("engineer") || normalized.includes("researcher")) {
    return "Research Staff";
  }

  return "Affiliates";
}

module.exports = () => {
  const file = fs.readFileSync(__dirname + "/team.csv");
  const rows = parse(file, {
    columns: true,
    skip_empty_lines: true
  });

  const groups = rows.reduce((acc, row) => {
    const title = row.Title || "Team member";
    const groupName = classifyTitle(title);

    if (!acc[groupName]) {
      acc[groupName] = [];
    }

    acc[groupName].push({
      firstName: (row["First Name"] || "").trim(),
      lastName: (row["Last Name"] || "").trim(),
      title,
      description: row.Description || "",
      linkedIn: row.LinkedIn || "",
      image: row.Image || ""
    });

    return acc;
  }, {});

  const order = [
    "Faculty",
    "Postdoctoral Researchers",
    "Graduate Students",
    "Undergraduate Students",
    "Research Staff",
    "Affiliates"
  ];

  return order
    .filter((name) => groups[name] && groups[name].length)
    .map((name) => ({
      name,
      members: groups[name]
    }));
};
