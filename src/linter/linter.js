// ##################### Linter (Fehlersuche für Variablen) #####################
const { rules } = require("./linterRules");
const { readJsonFile, getFilesInWorkspace } = require("../utils");
const vscode = require("vscode");

async function runLinter(document) {
  const text = document.getText();
  const diagnostics = [];
  let globalVariables = new Set(); // Alle bekannten globalen Variablen
  let functionScopes = []; // Aktive Funktionen
  const lines = text.split("\n");
  let insideFunction = false; // Ist der Parser in einer Funktion?
  let braceCount = 0;

  // Regeln für allgemeine Linter-Überprüfung aus der rules datei
  lines.forEach((line, lineNumber) => {
    if (line.trim().startsWith("#")) line = "";
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
    if (line.trim().startsWith("#")) line = "";

    for (let i = 0; i < line.length; i++) {
      let char = line[i];

      // Prüfe, ob das Zeichen durch einen Backslash maskiert ist
      let escaped = false;
      let backslashCount = 0;
      for (let j = i - 1; j >= 0 && line[j] === "\\"; j--) {
        backslashCount++;
      }
      escaped = backslashCount % 2 !== 0; // Falls ungerade Anzahl, ist das Zeichen maskiert

      if (!escaped) {
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

  // get variables from completitionItems json file
  const completitionItems = readJsonFile("completitionItems.json");
  completitionItems.provideCompletionItems.mom.forEach((item) => {
    if (item.command) {
      globalVariables.add(item.command);
    }
  });

  // get variables from linterignore json file
  const ignoreDictionary = readJsonFile("linterignore.json");
  ignoreDictionary.forEach((item) => {
    globalVariables.add(item);
  });

  // get variables from linterignore_custom json file
  const ignoreDictionaryCustom = readJsonFile("linterignore_custom.json");
  ignoreDictionaryCustom.forEach((item) => {
    globalVariables.add(item);
  });

  // read variables in all files in workspace
  let files = getFilesInWorkspace(vscode.workspace.workspaceFolders);
  if (!files || files.length == 0) {
    files = [document.uri];
  }
  for (const file of files) {
    let document = await vscode.workspace.openTextDocument(file);
    const text = document.getText();
    const lines = text.split("\n");
    let insideFunction = false; // Ist der Parser in einer Funktion?
    let braceCount = 0;

    lines.forEach((line, lineNumber) => {
      if (line.trim().startsWith("#")) line = "";
      const functionDef = line.match(/^proc\s+(\w+)\s*\{([\s\S]*)\}/);
      if (functionDef) {
        insideFunction = true;
        braceCount = 1; // Start-Klammer erkannt
        const functionName = functionDef[1];
        const rawArgs = functionDef[2].trim();

        let args = [];
        let regex = /\{(\w+)\s+[^}]+\}|(\w+)/g;
        let match;

        while ((match = regex.exec(rawArgs)) !== null) {
          if (match[1]) {
            // Falls eine Liste erkannt wurde, das erste Wort extrahieren
            args.push(match[1]);
          } else if (match[2]) {
            // Einzelne Argumente hinzufügen
            args.push(match[2]);
          }
        }

        functionScopes.push({
          lineNumber,
          functionName,
          localGlobals: new Set(args), // Argumente als lokale Variablen speichern
          loopScopes: [],
          scopeStack: [],
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
      }

      const globalSetMatch = line.match(/set\s+::(\w+)/);
      if (globalSetMatch) globalVariables.add(globalSetMatch[1]);

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

  insideFunction = false;
  braceCount = 0;
  let currentFunction;
  // Überprüfung der Variablenverwendung
  lines.forEach((line, lineNumber) => {
    if (line.trim().startsWith("#")) line = "";
    const varPattern = /(?<!\\)\$(\??(::)?(\w+))/g;
    let varMatch;

    const functionDef = line.match(/^proc\s+(\w+)\s*\{([\s\S]*)\}/);
    if (functionDef) {
      insideFunction = true;
      braceCount = 1; // Start-Klammer erkannt
      const functionName = functionDef[1];
      currentFunction = functionScopes.find(
        (i) => i.functionName == functionName
      );
    }

    // Klammern zählen
    braceCount += (line.match(/{/g) || []).length;
    braceCount -= (line.match(/}/g) || []).length;

    // Prüfen, ob eine Funktion endet
    if (insideFunction && braceCount === 0) {
      insideFunction = false;
    }

    // Erfassen lokaler Variablen mit `set` innerhalb einer `proc`
    if (insideFunction && currentFunction) {
      const setMatch = line.match(/set\s+(\w+)/);
      if (setMatch) currentFunction.localGlobals.add(setMatch[1]);

      const globalSetMatch = line.match(/set\s+::(\w+)/);
      if (globalSetMatch) currentFunction.localGlobals.add(globalSetMatch[1]);
    }

    // Foreach-Schleife erkennen
    const foreachMatch = line.match(/^\s*foreach\s+(\w+)\s+\S+\s*/);
    if (foreachMatch && insideFunction && currentFunction) {
      const loopVar = foreachMatch[1];

      // **Neuen Loop-Scope erstellen (für `{}`-Blöcke sichtbar machen)**
      currentFunction.scopeStack.push({
        type: "foreach",
        lineNumber,
        loopVariables: new Set([loopVar]),
        parentVariables: new Set([...currentFunction.localGlobals]),
      });
    }

    // ForEach-Schleife erkennen mit dem format foreach {key value} ...
    const foreachMatch1 = line.match(/^\s*foreach\s+\{(\w+)\s+(\w+)\}\s*/);
    if (foreachMatch1 && insideFunction && currentFunction) {
      const loopVars = [foreachMatch1[1], foreachMatch1[2]];

      // **Neuen For-Loop-Scope erstellen (für `{}`-Blöcke sichtbar machen)**
      currentFunction.scopeStack.push({
        type: "foreach",
        lineNumber,
        loopVariables: new Set(loopVars),
        parentVariables: new Set([...currentFunction.localGlobals]),
      });
    }

    // For-Schleife erkennen
    const forMatch = line.match(/^\s*for\s*\{\s*set\s+(\w+)\s+/);
    if (forMatch && insideFunction && currentFunction) {
      const loopVar = forMatch[1];

      // **Neuen For-Loop-Scope erstellen (für `{}`-Blöcke sichtbar machen)**
      currentFunction.scopeStack.push({
        type: "for",
        lineNumber,
        loopVariables: new Set([loopVar]),
        parentVariables: new Set([...currentFunction.localGlobals]),
      });
    }

    // **Allgemeine `{`-Blöcke erkennen (if, while, etc.)**
    if (line.trim().endsWith("{") && insideFunction && currentFunction) {
      currentFunction.scopeStack.push({
        type: "block",
        lineNumber,
        loopVariables: new Set(),
        parentVariables: new Set([...currentFunction.localGlobals]),
      });
    }

    // **Block-Ende `}` erkennen**
    if (insideFunction && currentFunction && line.trim() === "}") {
      if (currentFunction.scopeStack.length > 0) {
        let lastScope = currentFunction.scopeStack.pop();
        for (let varName of lastScope.loopVariables) {
          currentFunction.localGlobals.delete(varName);
        }
      }
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
      line.match(/^\s*VMOV\s+(\S+)\s+(\S+)\s+(\S+)/),
      line.match(/^\s*Cx\w*\s+"get"\s+(\S+)/),
      line.match(/^\s*upvar\s+(\S+)\s+(\S+)/),
    ];
    customFuncMatches.forEach((customFuncMatch) => {
      if (customFuncMatch && insideFunction && currentFunction) {
        const returnVar = customFuncMatch[customFuncMatch.length - 1]; // Letzte Variable ist der Return-Wert
        currentFunction.localGlobals.add(returnVar);
      }
    });

    // **Variable-Verwendung überprüfen**
    while ((varMatch = varPattern.exec(line)) !== null) {
      const isGlobal = !!varMatch[2]; // Hat die Variable `::` als Präfix?
      const variable = varMatch[3];

      if (isGlobal && globalVariables.has(variable)) continue;
      if (!isGlobal && globalVariables.has(variable)) continue;
      if (
        insideFunction &&
        currentFunction &&
        currentFunction.localGlobals.has(variable)
      ) {
        continue;
      } else {
        if (currentFunction && !currentFunction.localGlobals.has(variable)) {
        }
      }

      // Überprüfung innerhalb verschachtelter `{}`-Blöcke
      if (
        insideFunction &&
        currentFunction &&
        currentFunction.scopeStack.some(
          (scope) =>
            scope.loopVariables.has(variable) ||
            scope.parentVariables.has(variable)
        )
      )
        continue;

      // let ExistsInAnotherFunction = functionScopes.some((scope) =>
      //   scope.localGlobals.has(variable)
      // );
      // if (ExistsInAnotherFunction) continue;

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
