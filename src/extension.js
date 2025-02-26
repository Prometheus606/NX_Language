//this script contains all tcl and NX (mom variables, MOM Commands and Buffer commands) commands, including documentation and a few snippets.
//it is a extension for coding postprocessors with Siemens NX Postconfigurator.
//Creator: Niklas Beitler

const vscode = require("vscode");
const TclFormatter = require("./formatter");
const {providerList, command_provider} = require("./provider/commandsProvider");
const {hoverProvider} = require("./provider/hoverProvider");
const {referenceProvider} = require("./provider/referenceProvider");
const {symbolProvider} = require("./provider/symbolProvider");
const { manipulateSettings } = require("./settingsManipulation");
const { add2Dictionary } = require("./addToDictionary")
const { runLinter } = require('./linter/linter');
const { 
  words_provider,
  variable_provider,
  buffer_provider,
  global_provider,
  procedur_provider
} = require("./provider/wordsProvider");

async function lintDocument(document, diagnosticsCollection) {
  if (document.languageId !== 'tcl') return;

  let results = await runLinter(document);

  const severitys = {
    1: vscode.DiagnosticSeverity.Error,
    2: vscode.DiagnosticSeverity.Warning,
    3: vscode.DiagnosticSeverity.Information,
    4: vscode.DiagnosticSeverity.Hint,
  }

  let diagnostics = results.diagnostics.map(error => {
    let range = new vscode.Range(error.range.start.line, error.range.start.character, error.range.end.line, error.range.end.character);
      return new vscode.Diagnostic(range, error.message, severitys[error.severity]);
  });

  diagnosticsCollection.set(document.uri, diagnostics);
}

function activate(context) {

  if (!context) {
    vscode.window.showErrorMessage("Error: context is not defined1!");
    return;
  }

  let client;
  try {
    client = require("./client");
    if (client && typeof client.activate === "function") {
      client.activate(context);
    }
  } catch (error) {
    console.error("Fehler beim Laden von client.js:", error);
  }

  manipulateSettings();

  // start linter
  let diagnosticsCollection = vscode.languages.createDiagnosticCollection('tcl-linter');
  vscode.workspace.onDidOpenTextDocument(doc => lintDocument(doc, diagnosticsCollection));
  vscode.workspace.onDidChangeTextDocument(event => lintDocument(event.document, diagnosticsCollection));
  vscode.workspace.textDocuments.forEach(doc => lintDocument(doc, diagnosticsCollection));
  
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
      add2Dictionary(context.extensionPath),
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


