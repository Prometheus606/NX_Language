// ##################### Linter (Fehlersuche für Variablen) #####################
const { rules } = require("./linterRules");
const { loadCompletitionItems, loadIgnoreItems, getFilesInWorkspace } = require("../utils");
const vscode = require('vscode');

// let globalVariables = new Set(); // Alle bekannten globalen Variablen
// let functionScopes = []; // Aktive Funktionen
// let diagnostics = [];

// async function test(document) {
//   globalVariables = new Set(); // Alle bekannten globalen Variablen
//   functionScopes = []; // Aktive Funktionen
//   diagnostics = [];
//   const files = getFilesInWorkspace(vscode.workspace.workspaceFolders)
//   for (const file of files) {
//     let document = await vscode.workspace.openTextDocument(file);
//     await runLinter(document)
//   }
//   return {diagnostics}
// }

async function runLinter(document) {
  const text = document.getText();
  const diagnostics = [];
  let globalVariables = new Set(); // Alle bekannten globalen Variablen
  let functionScopes = []; // Aktive Funktionen
  const lines = text.split("\n");

  // Regeln für allgemeine Linter-Überprüfung aus der rules datei
  lines.forEach((line, lineNumber) => {
    rules.forEach(({ regex, severity, message }) => {
      const match = line.match(regex);
      if (match) {
        const index = line.indexOf(match[0]);
        diagnostics.push({
          severity: severity,
          range: {
            start: { line: lineNumber, character: index },
            end: { line: lineNumber, character: index + match[0].length },
          },
          message: message,
          source: "tcl-linter",
        });
      }
    });
  });

  // ==================== Klammern ===============================
  // Überprüfung auf ausgeglichene Klammern und Anführungszeichen
  let stack = [];
  const pairs = { "{": "}", "(": ")", '"': '"' };

  lines.forEach((line, lineNumber) => {
    for (let i = 0; i < line.length; i++) {
      let char = line[i];
      if (char in pairs) {
        if (
          char === '"' &&
          stack.length > 0 &&
          stack[stack.length - 1].char === '"'
        ) {
          stack.pop();
        } else {
          stack.push({ char, line: lineNumber, character: i });
        }
      } else if (Object.values(pairs).includes(char)) {
        if (
          stack.length === 0 ||
          pairs[stack[stack.length - 1].char] !== char
        ) {
          diagnostics.push({
            severity: 1,
            range: {
              start: { line: lineNumber, character: i },
              end: { line: lineNumber, character: i + 1 },
            },
            message: `Fehlende öffnende Klammer oder Anführungszeichen für '${char}'.`,
            source: "tcl-linter",
          });
        } else {
          stack.pop();
        }
      }
    }
  });

  // Falls Klammern oder Anführungszeichen übrig bleiben
  stack.forEach(({ char, line, character }) => {
    diagnostics.push({
      severity: 1,
      range: {
        start: { line: line, character: character },
        end: { line: line, character: character + 1 },
      },
      message: `Fehlende schließende Klammer oder Anführungszeichen für '${char}'.`,
      source: "tcl-linter",
    });
  });

  // ================== Variablen erkennung ================================
  let insideFunction = false; // Ist der Parser in einer Funktion?
  let braceCount = 0;

  // get variables from completitionItems json file
  const completitionItems = loadCompletitionItems();
  completitionItems.provideCompletionItems.mom.forEach((item) => {
    if (item.command) {
      globalVariables.add(item.command);
    }
  });

  // get variables from dictionary json file
  const ignoreDictionary = loadIgnoreItems();
  ignoreDictionary.forEach((item) => {
      globalVariables.add(item);
  });

  // read variables in all files in workspace
  const files = getFilesInWorkspace(vscode.workspace.workspaceFolders)
  for (const file of files) {
    let document = await vscode.workspace.openTextDocument(file);
    const text = document.getText();
    const lines = text.split("\n");
    let insideFunction = false; // Ist der Parser in einer Funktion?
    let braceCount = 0;

    lines.forEach((line, lineNumber) => {
      const functionDef = line.match(/^proc\s+(\w+)\s*\{([^}]*)\}/);
    if (functionDef) {
        insideFunction = true;
        braceCount = 1; // Start-Klammer erkannt

        const functionName = functionDef[1];
        const args = functionDef[2]
            .split(/\s+/)
            .filter(arg => arg.trim() !== ""); // Leere Einträge filtern

        functionScopes.push({
            lineNumber,
            functionName,
          localGlobals: new Set(args), // Argumente als lokale Variablen speichern
          loopScopes: [], 
        });
    }

    // Klammern zählen
    braceCount += (line.match(/{/g) || []).length;
    braceCount -= (line.match(/}/g) || []).length;

    // Prüfen, ob eine Funktion endet
    if (insideFunction && braceCount === 0) {
        insideFunction = false;
      }
      
      // Erfassen globaler Variablen mit `set` außerhalb einer `proc`
      if (!insideFunction) {
        const setMatch = line.match(/set\s+(\w+)/);
        if (setMatch) globalVariables.add(setMatch[1]);

        const globalSetMatch = line.match(/set\s+::(\w+)/);
        if (globalSetMatch) globalVariables.add(globalSetMatch[1]);
      }

      // Erfassen von `global var1 var2`
      const globalKeywordMatch = line.match(/^\s*global\s+(.+)/);
      if (globalKeywordMatch && insideFunction) {
        const currentFunction = functionScopes[functionScopes.length - 1];
        globalKeywordMatch[1].split(/\s+/).forEach((varName) => {
          if (varName.trim().length > 0) {
            currentFunction.localGlobals.add(varName.trim());
            globalVariables.add(varName.trim()); // Direkt auch als global markieren
          }
        });
      }
    });
  }
  document = await vscode.workspace.openTextDocument(document);

  lines.forEach((line, lineNumber) => {
    // Funktionsbeginn erkennen
    const functionDef = line.match(/^proc\s+(\w+)\s*\{([^}]*)\}/);
    if (functionDef) {
        insideFunction = true;
        braceCount = 1; // Start-Klammer erkannt

        const functionName = functionDef[1];
        const args = functionDef[2]
            .split(/\s+/)
            .filter(arg => arg.trim() !== ""); // Leere Einträge filtern

        functionScopes.push({
            lineNumber,
            functionName,
          localGlobals: new Set(args), // Argumente als lokale Variablen speichern
          loopScopes: [], 
        });
    }

    // Klammern zählen
    braceCount += (line.match(/{/g) || []).length;
    braceCount -= (line.match(/}/g) || []).length;

    // Prüfen, ob eine Funktion endet
    if (insideFunction && braceCount === 0) {
        insideFunction = false;
    }
  });

  // Durchgang 1: Erfassen globaler Variablen
    lines.forEach((line, lineNumber) => {
      // Erfassen globaler Variablen mit `set` außerhalb einer `proc`
      if (!insideFunction) {
        const setMatch = line.match(/set\s+(\w+)/);
        if (setMatch) globalVariables.add(setMatch[1]);

        const globalSetMatch = line.match(/set\s+::(\w+)/);
        if (globalSetMatch) globalVariables.add(globalSetMatch[1]);
      }

      // Erfassen von `global var1 var2`
      const globalKeywordMatch = line.match(/^\s*global\s+(.+)/);
      if (globalKeywordMatch && insideFunction) {
        const currentFunction = functionScopes[functionScopes.length - 1];
        globalKeywordMatch[1].split(/\s+/).forEach((varName) => {
          if (varName.trim().length > 0) {
            currentFunction.localGlobals.add(varName.trim());
            globalVariables.add(varName.trim()); // Direkt auch als global markieren
          }
        });
      }
    });

  // Überprüfung der Variablenverwendung
  lines.forEach((line, lineNumber) => {
    const varPattern = /(?<!\\)\$(\??(::)?(\w+))/g;
    let varMatch;
    let currentFunction = functionScopes.length > 0 ? functionScopes[functionScopes.length - 1] : null;

    // Erfassen lokaler Variablen mit `set` innerhalb einer `proc`
    if (insideFunction) {
      const setMatch = line.match(/set\s+(\w+)/);
      if (setMatch) currentFunction.localGlobals.add(setMatch[1]);

      const globalSetMatch = line.match(/set\s+::(\w+)/);
      if (globalSetMatch) currentFunction.localGlobals.add(globalSetMatch[1]);
  }

    // Foreach-Schleife erkennen
    const foreachMatch = line.match(/^\s*foreach\s+(\w+)\s+\S+\s*\{/);
    if (foreachMatch && insideFunction) {
        const loopVar = foreachMatch[1];
        

        // Neuen Loop-Scope erstellen
        currentFunction.loopScopes.push({
            lineNumber,
            loopVariables: new Set([loopVar]),
        });
      
    }

    // For-Schleife erkennen (Format: for {set i 0} {$i < 10} {incr i} { )
    const forMatch = line.match(/^\s*for\s*\{\s*set\s+(\w+)\s+/);
    if (forMatch && insideFunction) {
        const loopVar = forMatch[1];

        currentFunction.loopScopes.push({
            lineNumber,
            loopVariables: new Set([loopVar]),
        });
    }

    // Funktionsaufrufe mit return variable
    customFuncMatches = [
      line.match(/^\s*MTX3_add\s+(\S+)\s+(\S+)\s+(\S+)/),
      line.match(/^\s*MTX3_multiply\s+(\S+)\s+(\S+)\s+(\S+)/),
      line.match(/^\s*MTX3_vec_multiply\s+(\S+)\s+(\S+)\s+(\S+)/),
      line.match(/^\s*MTX3_x\s+(\S+)\s+(\S+)\s+(\S+)/),
      line.match(/^\s*MTX3_y\s+(\S+)\s+(\S+)\s+(\S+)/),
      line.match(/^\s*MTX3_z\s+(\S+)\s+(\S+)\s+(\S+)/),
      line.match(/^\s*MTX3_transpose\s+(\S+)\s+(\S+)/),
      line.match(/^\s*MTX3_transpose\s+(\S+)\s+(\S+)/),
      line.match(/^\s*VEC3_add\s+(\S+)\s+(\S+)\s+(\S+)/),
      line.match(/^\s*MTX3_init_x_y_z\s+(\S+)\s+(\S+)\s+(\S+)\s+(\S+)/),
      line.match(/^\s*VEC3_init\s+(\S+)\s+(\S+)\s+(\S+)\s+(\S+)/),
      line.match(/^\s*VEC3_init_s\s+(\S+)\s+(\S+)\s+(\S+)\s+(\S+)/),
      line.match(/^\s*Cx\w*\s+"get"\s+(\S+)/),
    ];
    customFuncMatches.forEach(customFuncMatch => {
      if (customFuncMatch && insideFunction && currentFunction) {
          const returnVar = customFuncMatch[customFuncMatch.length - 1]; // Letzte Variable ist der Return-Wert
          currentFunction.localGlobals.add(returnVar); 
        }
    });
    
      // Prüfen, ob eine Schleife endet und die Variablen entfernen
      if (insideFunction && line.trim() === "}") {
        if (currentFunction.loopScopes.length > 0) {
          let lastLoopScope = currentFunction.loopScopes.pop();
          
          for (let varName of lastLoopScope.loopVariables) {
            currentFunction.localGlobals.delete(varName);
          }
        }
      }


    while ((varMatch = varPattern.exec(line)) !== null) {
      const isGlobal = !!varMatch[2]; // Hat die Variable `::` als Präfix?
      const variable = varMatch[3];

      // **Korrektur 1:** Wenn `::`-Variable existiert, ist sie automatisch korrekt.
      if (isGlobal && globalVariables.has(variable)) continue;

      // **Korrektur 2:** Falls `variable` außerhalb einer `proc` gesetzt wurde, ist sie automatisch global.
      if (!isGlobal && globalVariables.has(variable)) continue;

      // **Korrektur 3:** Falls `variable` innerhalb einer `proc` mit `global` markiert wurde, ist sie gültig.
      if (currentFunction && currentFunction.localGlobals.has(variable)) continue;
      
      if (
        currentFunction &&
        currentFunction.loopScopes.some(scope => scope.loopVariables.has(variable))
      ) continue;
    
      
      // **Korrektur 4:** Falls `variable` innerhalb einer anderen `proc` global markiert wurde, ist sie gültig.
      let ExistsInAnotherFunction = functionScopes.some(scope => scope.localGlobals.has(variable));
      if (ExistsInAnotherFunction) continue;
    
      // Fehlerfall: Die Variable ist weder global noch korrekt deklariert.
      diagnostics.push({
        severity: 1,
        range: {
          start: { line: lineNumber, character: varMatch.index },
          end: {
            line: lineNumber,
            character: varMatch.index + variable.length,
          },
        },
        message: `Die Variable '${variable}' ist nicht definiert oder nicht als global markiert.`,
        source: "tcl-linter",
      });
    }
  });
  return { uri: document.uri, diagnostics };
}

module.exports = { runLinter };
