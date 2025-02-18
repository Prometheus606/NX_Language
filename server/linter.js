// ##################### Linter (Fehlersuche für Variablen) #####################
const {rules} = require("./linterRules")


function runLinter(document) {
    const text = document.getText();
    const diagnostics = [];
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
    const pairs = { '{': '}', '(': ')', '"': '"' };
  
    lines.forEach((line, lineNumber) => {
      for (let i = 0; i < line.length; i++) {
        let char = line[i];
        if (char in pairs) {
          if (char === '"' && stack.length > 0 && stack[stack.length - 1].char === '"') {
            stack.pop();
          } else {
            stack.push({ char, line: lineNumber, character: i });
          }
        } else if (Object.values(pairs).includes(char)) {
          if (stack.length === 0 || pairs[stack[stack.length - 1].char] !== char) {
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
    const globalVariables = new Set(); // Alle bekannten globalen Variablen
    let functionScopes = []; // Aktive Funktionen
    let insideFunction = false; // Ist der Parser in einer Funktion?
  
    lines.forEach((line, lineNumber) => {
      // Funktionsbeginn erkennen
      const functionDef = line.match(/^proc\s+(\w+)\s*\{/);
      if (functionDef) {
        insideFunction = true;
        functionScopes.push({ lineNumber, functionName: functionDef[1], localGlobals: new Set() });
      }
  
      // Prüfen, ob eine Funktion endet
      if (insideFunction && line.trim() === "}") {
        insideFunction = false;
      }
  
      // Erfassen globaler Variablen mit `set` außerhalb einer `proc`
      if (!insideFunction) {
        const setMatch = line.match(/set\s+(\w+)/);
        if (setMatch) globalVariables.add(setMatch[1]);
  
        const globalSetMatch = line.match(/set\s+::(\w+)/);
        if (globalSetMatch) globalVariables.add(globalSetMatch[1]);
      }
  
      // Erfassen von globalen Variablen mit `global var1 var2 var3` oder set ::var4
      const globalKeywordMatch = line.match(/global\s+(.+)/);
      const globalSetMatch = line.match(/set\s+::(\w+)/);
      if ((globalKeywordMatch || globalSetMatch) && insideFunction) {
        const currentFunction = functionScopes[functionScopes.length - 1];
        if (globalKeywordMatch) {
            globalKeywordMatch[1].split(/\s+/).forEach(varName => {
                if (varName.trim().length > 0) {
                  currentFunction.localGlobals.add(varName.trim());
                }
              });
        } else if (globalSetMatch) {
            currentFunction.localGlobals.add(globalSetMatch[1]);
        }
        
      }
    });
    
    
  
    // Überprüfung der Variablenverwendung
    lines.forEach((line, lineNumber) => {
      const varPattern = /\$(\??(::)?(\w+))/g;
      let varMatch;
      let currentFunction = functionScopes.find(scope => scope.lineNumber <= lineNumber);
  
      while ((varMatch = varPattern.exec(line)) !== null) {
        const isGlobal = !!varMatch[2]; // Hat die Variable `::` als Präfix?
        const variable = varMatch[3];
        
        // **Korrektur 1:** Wenn `::`-Variable existiert, ist sie automatisch korrekt.
        if (isGlobal && globalVariables.has(variable)) continue;
        
        // **Korrektur 2:** Falls `variable` außerhalb einer `proc` gesetzt wurde, ist sie automatisch global.
        if (!isGlobal && globalVariables.has(variable)) continue;
        
        // **Korrektur 3:** Falls `variable` innerhalb einer `proc` mit `global` markiert wurde, ist sie gültig.
        if (currentFunction && currentFunction.localGlobals.has(variable)) continue;
        
        // **Korrektur 4:** Falls `variable` innerhalb einer anderen `proc` global markiert wurde, ist sie gültig.
        let ExistsInAnotherFunction = false
        functionScopes.forEach(element => {
            if (isGlobal && element.localGlobals.has(variable)) {
                ExistsInAnotherFunction = true
            }
        });
        if (ExistsInAnotherFunction) {
            continue
        }
        
        // Fehlerfall: Die Variable ist weder global noch korrekt deklariert.
        diagnostics.push({
          severity: 1,
          range: {
            start: { line: lineNumber, character: varMatch.index },
            end: { line: lineNumber, character: varMatch.index + variable.length },
          },
          message: `Die Variable '${variable}' ist nicht definiert oder nicht als global markiert.`,
          source: "tcl-linter",
        });
      }
    });
    return { uri: document.uri, diagnostics }
  }

module.exports = {runLinter}