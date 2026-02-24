const fs = require("fs");
const { parse } = require("csv-parse/sync");

module.exports = () => {
  const file = fs.readFileSync(__dirname + "/team.csv");

  return parse(file, {
    columns: true,
    skip_empty_lines: true
  });
};
