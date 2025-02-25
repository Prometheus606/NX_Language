
const path = require("path");
const vscode = require("vscode");
const { LanguageClient, TransportKind } = require("vscode-languageclient/node");

let client;

function activate(context) {
  const serverModule = context.asAbsolutePath(path.join("server", "server.js"));

  const serverOptions = {
    run: { module: serverModule, transport: TransportKind.stdio },
    debug: { module: serverModule, transport: TransportKind.stdio },
  };

  const clientOptions = {
    documentSelector: [{ language: "tcl" }],
    synchronize: {
      configurationSection: "tclLanguageServer",
      fileEvents: vscode.workspace.createFileSystemWatcher("**/*.tcl"),
    },
    initializationOptions: {
      provideDefinition: true,
    },
  };

  client = new LanguageClient("tclLanguageServer", "Tcl Language Server", serverOptions, clientOptions);
  client.start();
}

function deactivate() {
  return client ? client.stop() : undefined;
}

module.exports = { activate, deactivate };
