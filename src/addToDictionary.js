const vscode = require("vscode");
const fs = require("fs");
const path = require("path");

async function addWordToDictionary(word, extensionPath) {
    const filePath = path.join(
      extensionPath,
      "src",
      "linterignore_custom.json"
    );
    
    let words = [];
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        words = JSON.parse(content);
    }
    
  if (!words.includes(word)) {
      words.push(word);
      fs.writeFileSync(filePath, JSON.stringify(words, null, 2));
      vscode.window.showInformationMessage(`"${word}" wurde zum Wörterbuch hinzugefügt.`);
  } else {
      vscode.window.showInformationMessage(`"${word}" ist bereits im Wörterbuch.`);
  }
}

function add2Dictionary(extensionPath) {
    const addWord2Dictionary = vscode.commands.registerCommand('extension.addWordToDictionary', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;

        const selection = editor.document.getText(editor.selection);
        if (selection) {
            await addWordToDictionary(selection, extensionPath);
        } else {
            vscode.window.showErrorMessage('Bitte ein Wort markieren.');
        }
    });
    return addWord2Dictionary
}

module.exports = { add2Dictionary }
