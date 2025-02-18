const vscode = require("vscode");

class TclFormatter {
  provideDocumentFormattingEdits(document) {
    const edits = [];
    for (let i = 0; i < document.lineCount; i++) {
      const line = document.lineAt(i);
      const formatted = line.text.replace(/\s+/g, " ").trim(); // Entfernt unnötige Leerzeichen
      if (formatted !== line.text) {
        edits.push(vscode.TextEdit.replace(line.range, formatted));
      }
    }
    return edits;
  }
}

module.exports = TclFormatter;
