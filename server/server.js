const {
    createConnection,
    TextDocuments,
    ProposedFeatures
  } = require('vscode-languageserver/node');

  function getWordAtPosition(text, position) {
    const lines = text.split("\n");
    const line = lines[position.line];
    const match = line.match(/\b\w+\b/g);
    return match ? match.find((word) => line.indexOf(word) <= position.character && line.indexOf(word) + word.length >= position.character) : null;
  }
  
  const connection = createConnection(ProposedFeatures.all);
  const documents = new TextDocuments();

  // connection.onInitialize((params) => {
  //   return {
  //     capabilities: {
  //       textDocumentSync: 1,
  //       completionProvider: {
  //         resolveProvider: true
  //       }
  //     }
  //   };
  // });

  // ########################## get definition of proc ###########################
  const functionDefinitions = new Map();
documents.onDidChangeContent((change) => {
  const text = change.document.getText();
  functionDefinitions.clear(); // Lösche vorherige Einträge

  const regex = /^proc\s+(\w+)\s*\{[^}]*\}\s*\{/gm;
  let match;
  while ((match = regex.exec(text)) !== null) {
    const functionName = match[1];
    const startLine = text.substring(0, match.index).split("\n").length - 1;
    
    functionDefinitions.set(functionName, {
      uri: change.document.uri,
      range: {
        start: { line: startLine, character: 0 },
        end: { line: startLine, character: functionName.length }
      }
    });
    console.log(`${functionDefinitions}`);
  }
});


  // ########################## go to definition of proc (press strg and hover over proc name) ###########################
  connection.onDefinition((params) => {
    const { textDocument, position } = params;
    const document = documents.get(textDocument.uri);
    const text = document.getText();
    const wordAtPosition = getWordAtPosition(text, position);
  
    if (functionDefinitions.has(wordAtPosition)) {
      return functionDefinitions.get(wordAtPosition);
    }
  
    return null;
  });

  // ########################## linter ###########################
  // documents.onDidChangeContent((change) => {
  //   const text = change.document.getText();
  //   const diagnostics = [];
  
  //   const invalidVars = text.match(/\$\d+/g); // Variablen dürfen nicht mit einer Zahl beginnen
  //   if (invalidVars) {
  //     invalidVars.forEach((match) => {
  //       const index = text.indexOf(match);
  //       diagnostics.push({
  //         severity: 1, // Error
  //         range: {
  //           start: { line: 0, character: index },
  //           end: { line: 0, character: index + match.length }
  //         },
  //         message: `Ungültiger Variablenname: ${match}`,
  //         source: "tcl-linter"
  //       });
  //     });
  //   }
  
  //   connection.sendDiagnostics({ uri: change.document.uri, diagnostics });
  // });
  

documents.listen(connection);
connection.listen();
  