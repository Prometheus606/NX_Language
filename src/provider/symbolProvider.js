const vscode = require("vscode");

// funktionen übersicht in outline ansicht
const symbolProvider = vscode.languages.registerDocumentSymbolProvider("tcl", {
    provideDocumentSymbols(document) {
      const symbols = [];
      const procRegex = /^proc (\w+)/; // Sucht nach Funktionen
      const bufferRegex = /LIB_GE_command_buffer (\w+)/; // Sucht nach Buffern

      for (let i = 0; i < document.lineCount; i++) {
        const line = document.lineAt(i).text;
        const bufferMatch = bufferRegex.exec(line);
        const procMatch = procRegex.exec(line);
        if (procMatch) {
          const symbol = new vscode.DocumentSymbol(
            procMatch[1],
            "Function",
            vscode.SymbolKind.Function,
            new vscode.Range(i, 0, i, line.length),
            new vscode.Range(i, 0, i, line.length)
          );
          symbols.push(symbol);
        }
        if (bufferMatch) {
          const symbol = new vscode.DocumentSymbol(
            bufferMatch[1],
            "Buffer",
            vscode.SymbolKind.Interface,
            new vscode.Range(i, 0, i, line.length),
            new vscode.Range(i, 0, i, line.length)
          );
          symbols.push(symbol);
        }
      }
      return symbols;
    }
  });

module.exports = symbolProvider