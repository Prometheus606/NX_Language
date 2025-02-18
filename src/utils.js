const fs = require("fs");
const path = require("path");

// loads completition items from json file
function loadCompletitionItems() {
  // Pfad zur JSON-Datei
  const jsonPath = path.join(__dirname, "completitionItems.json");

  // Laden der JSON-Datei
  try {
    const data = fs.readFileSync(jsonPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Fehler beim Laden der JSON-Datei:", error);
    return []; // Rückgabe einer leeren Liste im Fehlerfall
  }
}

module.exports = {loadCompletitionItems}