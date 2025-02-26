// words from completitionsItems.json, that will be suggested all the time
  
const vscode = require("vscode");
const { readJsonFile } = require("../utils");

// icon Map for completionItems
const iconMapping = {
  Method: vscode.CompletionItemKind.Method,
  Variable: vscode.CompletionItemKind.Variable,
  File: vscode.CompletionItemKind.File,
  Interface: vscode.CompletionItemKind.Interface,
  Class: vscode.CompletionItemKind.Class,
  Color: vscode.CompletionItemKind.Color,
  Constant: vscode.CompletionItemKind.Constant,
  Constructor: vscode.CompletionItemKind.Constructor,
  Keyword: vscode.CompletionItemKind.Keyword,
  Module: vscode.CompletionItemKind.Module,
  Field: vscode.CompletionItemKind.Field,
  Function: vscode.CompletionItemKind.Function,
  Event: vscode.CompletionItemKind.Event,
  Property: vscode.CompletionItemKind.Property,
  Text: vscode.CompletionItemKind.Text,
  Snippet: vscode.CompletionItemKind.Snippet,
  Value: vscode.CompletionItemKind.Value,
};

// read json file
const completitionItems = readJsonFile("completitionItems.json");
let providerList = [];


let command_provider = vscode.languages.registerCompletionItemProvider("tcl", {
    provideCompletionItems(document, position, token, context) {
    let itemList = [];

    completitionItems.simpleCompletitionItems.forEach((item) => {
        const icon = iconMapping[item.icon];
        if (icon !== undefined) {
        const _ = new vscode.CompletionItem(item.command, icon);
        if (item.snippet)
            _.insertText = new vscode.SnippetString(item.snippet);
        if (item.triggers) _.commitCharacters = item.triggers;
        else _.commitCharacters = [" "];

        _.documentation = new vscode.MarkdownString(item.docu);
        itemList.push(_);
        }
    });

    return itemList;
    },
});

// loop throu the provider in the json file and creates an provider each
for (const key in completitionItems.provideCompletionItems) {
    if (completitionItems.provideCompletionItems.hasOwnProperty(key)) {
    const provider = completitionItems.provideCompletionItems[key];

    const __provider = vscode.languages.registerCompletionItemProvider(
        "tcl",
        {
        provideCompletionItems(document, position) {
            // Check if the line prefix matches the key (provider name)
            let linePrefix = document
            .lineAt(position)
            .text.substr(0, position.character);
            if (!["mom", "MOM", "LIB", "VEC", "MTX", "EQ"].includes(key)) {
            if (["-format "].includes(key)) {
                if (!linePrefix.includes(key)) return [];
            } else {
                if (!linePrefix.endsWith(key)) return [];
            }
            }

            let itemList = [];
            provider.forEach((item) => {
            const icon = iconMapping[item.icon];
            if (icon !== undefined) {
                const _ = new vscode.CompletionItem(item.command, icon);
                if (item.snippet)
                _.insertText = new vscode.SnippetString(item.snippet);
                // if (item.triggers) _.commitCharacters = item.triggers;
                // else _.commitCharacters = [" "];
                _.documentation = new vscode.MarkdownString(item.docu);
                itemList.push(_);
            }
            });

            return itemList;
        },
        },
        key.charAt(key.length - 1) // Use the last character of the key as the trigger character
    );

    providerList.push(__provider);
    }
}

module.exports = {providerList, command_provider}