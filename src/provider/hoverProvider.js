// hover funktion
const vscode = require("vscode");
const { readJsonFile } = require("../utils");

// read json file
const completitionItems = readJsonFile("completitionItems.json");

const hoverProvider = vscode.languages.registerHoverProvider("tcl", {
  provideHover(document, position) {
    const wordRange = document.getWordRangeAtPosition(position);
    const word = document.getText(wordRange);

    const descriptions = {}
    for (const key in completitionItems) {
        const completionItem = completitionItems[key];
        if (Array.isArray(completionItem)) {
            completionItem.forEach(item => {
                if (item.command && item.docu) {
                    descriptions[item.command] = item.docu;
                }
            });
        } else {
            for (const subKey in completionItem) {
                const element = completionItem[subKey];
                if (Array.isArray(element)) {
                    element.forEach(i => {
                        if (i.command && i.docu) {
                            descriptions[i.command] = i.docu;
                        }
                    });
                }
            }
        }
    }

    if (descriptions[word]) {
      return new vscode.Hover(`**${word}**: ${descriptions[word]}`);
    }
  },
});

module.exports = {hoverProvider}