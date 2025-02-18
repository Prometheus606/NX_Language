//this script contains all tcl and NX (mom variables, MOM Commands and Buffer commands) commands, including documentation and a few snippets.
//it is a extension for coding postprocessors with Siemens NX Postconfigurator.
//Creator: Niklas Beitler

const vscode = require("vscode");
const TclFormatter = require("./formatter");
const {providerList, command_provider} = require("./provider/commandsProvider");
const {hoverProvider} = require("./provider/hoverProvider");
const {referenceProvider} = require("./provider/referenceProvider");
const {symbolProvider} = require("./provider/symbolProvider");
const {manipulateSettings} = require("./settingsManipulation");
const { 
  words_provider,
  variable_provider,
  buffer_provider,
  global_provider,
  procedur_provider
} = require("./provider/wordsProvider");

let client;
try {
  client = require("./client"); // Lädt client.js
} catch (error) {
  console.error("Fehler beim Laden von client.js:", error);
}

function activate(context) {

  // Falls client.js korrekt geladen wurde, dann starten
  if (client && typeof client.activate === "function") {
    client.activate(context);
  } else {
    console.warn("Client konnte nicht aktiviert werden.");
  }

  manipulateSettings();
  
    context.subscriptions.push(
      command_provider,
      words_provider,
      variable_provider,
      buffer_provider,
      global_provider,
      procedur_provider,
      hoverProvider,
      symbolProvider,
      referenceProvider, // Ergebnis: Mit Shift + F12 siehst du alle Vorkommen einer Funktion.
    );

    providerList.forEach((provider) => {
      context.subscriptions.push(provider);
    });

    // formater einbinden (rechte Maustaste → "Format Document": Code wird formatiert)
    context.subscriptions.push(
      vscode.languages.registerDocumentFormattingEditProvider("tcl", new TclFormatter())
    );

}

function deactivate() {
  return client && typeof client.deactivate === "function" ? client.deactivate() : undefined;
}

module.exports = { activate, deactivate };


