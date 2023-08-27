const path = require("path");
const fs = require("fs");
const solc = require("solc");

const jimmipointPath = path.resolve(__dirname, "contracts", "jimmipoint.sol");
const source = fs.readFileSync(jimmipointPath, "utf8");

module.exports = solc.compile(source, 1).contracts[":jimmipoint"];
