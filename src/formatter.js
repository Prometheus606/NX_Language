const vscode = require("vscode");

class TclFormatter {
  provideDocumentFormattingEdits(document) {
    const edits = [];
    let indentLevel = 0;
    const indentSize = 2; // Anzahl der Leerzeichen pro Einrückung

    for (let i = 0; i < document.lineCount; i++) {
      let line = document.lineAt(i);
      let text = line.text.trim();

      if (text === "") continue; // Leere Zeilen ignorieren

      // Verringere Einrückung, wenn eine schließende Klammer am Anfang der Zeile steht
      if (text.startsWith("}")) {
        indentLevel = Math.max(0, indentLevel - 1);
      }

      // Setze den korrekt formatierten Text mit richtiger Einrückung
      const formatted = " ".repeat(indentLevel * indentSize) + text;

      if (formatted !== line.text) {
        edits.push(vscode.TextEdit.replace(line.range, formatted));
      }

      // Erhöhe die Einrückung, wenn eine öffnende Klammer `{` vorhanden ist
      if (text.endsWith("{")) {
        indentLevel++;
      }
    }

    return edits;
  }
}

module.exports = TclFormatter;
