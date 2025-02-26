const fs = require("fs");
const path = require("path");

// loads completition items from json file
function loadCompletitionItems() {
  const jsonPath = path.join(__dirname, "completitionItems.json");

  try {
    const data = fs.readFileSync(jsonPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Fehler beim Laden der JSON-Datei:", error);
    return []; // Rückgabe einer leeren Liste im Fehlerfall
  }
}

// loads ignore items from dictionary json file
function loadIgnoreItems() {
  const jsonPath = path.join(__dirname, "dictionary.json");

  try {
    const data = fs.readFileSync(jsonPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Fehler beim Laden der JSON-Datei:", error);
    return []; // Rückgabe einer leeren Liste im Fehlerfall
  }
}

// Funktion zum Durchsuchen des Workspace-Verzeichnisses
function getFilesInWorkspace(workspaceFolders) {
  let files = [];
  const blacklistedFiles = ["lib_sourcing.tcl", "lib_pretreatment.tcl"]
  
  function readDir(dir) {
    const items = fs.readdirSync(dir);
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        readDir(fullPath); // Rekursiv in Unterverzeichnisse
      } else if (fullPath.endsWith('.tcl') && !blacklistedFiles.includes(item)) {
        files.push(fullPath); // Nur .tcl-Dateien hinzufügen
      }
    });
  }
  
  for (const folder of workspaceFolders) {
    readDir(folder.uri.fsPath);
  }

  return files;
}

module.exports = {loadCompletitionItems, loadIgnoreItems, getFilesInWorkspace}