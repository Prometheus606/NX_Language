const vscode = require("vscode");

  // reference finden
  const referenceProvider = vscode.languages.registerReferenceProvider("tcl", {
    provideReferences(document, position, context, token) {
      const wordRange = document.getWordRangeAtPosition(position);
      const word = document.getText(wordRange);
      const references = [];
  
      for (let i = 0; i < document.lineCount; i++) {
        const line = document.lineAt(i);
        if (line.text.includes(word)) {
          references.push(new vscode.Location(document.uri, new vscode.Position(i, line.text.indexOf(word))));
        }
      }
  
      return references;
    },
  });

module.exports = {referenceProvider}