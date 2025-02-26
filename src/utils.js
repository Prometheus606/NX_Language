const fs = require("fs");
const path = require("path");

function readJsonFile(fileName) {
  const jsonPath = path.join(__dirname, fileName);

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
  const blacklistedFiles = ["lib_sourcing.tcl", "lib_pretreatment.tcl"];
  if (!workspaceFolders || workspaceFolders.length == 0) return files;

  function readDir(dir) {
    const items = fs.readdirSync(dir);
    items.forEach((item) => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        readDir(fullPath); // Rekursiv in Unterverzeichnisse
      } else if (
        fullPath.endsWith(".tcl") &&
        !blacklistedFiles.includes(item)
      ) {
        files.push(fullPath); // Nur .tcl-Dateien hinzufügen
      }
    });
  }

  for (const folder of workspaceFolders) {
    readDir(folder.uri.fsPath);
  }

  return files;
}

module.exports = { readJsonFile, getFilesInWorkspace };