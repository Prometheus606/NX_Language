const {
  createConnection,
  TextDocuments,
  ProposedFeatures,
  TextDocumentSyncKind
} = require('vscode-languageserver/node');
const { TextDocument } = require('vscode-languageserver-textdocument');


// ======================== helper functions ===========================

function getWordAtPosition(text, position) {
  const lines = text.split("\n");
  const line = lines[position.line];
  if (!line) return null;

  const matches = [...line.matchAll(/\b\w+\b/g)];
  return matches.find(({ index, 0: word }) => 
    index !== undefined && index <= position.character && index + word.length >= position.character
  )?.[0] || null;
}

function updateFunctionDefinitions(document) {
  functionDefinitions.clear();
  const text = document.getText();

  const regex = /^\s*proc\s+(\w+)\s*\{[^}]*\}\s*\{/gm;

  let match;
  if (match && match.index !== undefined) {
    while ((match = regex.exec(text)) !== null) {
      const functionName = match[1];
      const linesBefore = text.substring(0, match.index).split("\n");
      const startLine = linesBefore.length - 1;
      
      functionDefinitions.set(functionName, {
        uri: document.uri,
        range: {
          start: { line: startLine, character: 0 },
          end: { line: startLine, character: functionName.length }
        }
      });
    }
  }
}

// ======================== Server ===========================


const connection = createConnection(ProposedFeatures.all);
const documents = new TextDocuments(TextDocument);
const functionDefinitions = new Map();

connection.onInitialize(() => {
  return {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Incremental,
      definitionProvider: true,
    },
  };
});

// ##################### "Go to Definition" Handler #####################
connection.onDefinition((params) => {
  const { textDocument, position } = params;
  const document = documents.get(textDocument.uri);
  if (!document) {
    console.log("Dokument nicht gefunden!");
    return null;
  }

  const text = document.getText();
  const wordAtPosition = getWordAtPosition(text, position);

  if (wordAtPosition && functionDefinitions.has(wordAtPosition)) {
    return functionDefinitions.get(wordAtPosition);
  }

  console.log("Keine Definition gefunden.");
  return null;
});


// Server starten
documents.listen(connection);
connection.listen();
