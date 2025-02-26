// Liste der Regeln mit Regex, Severity & Fehlermeldung
  // serverity --> 1: Error, 2: warning, 3: info
  const rules = [
    {
      regex: /(\$::?\d+\w*|::\d+\w*|\$\d+\w*)/,
      severity: 1,
      message: "Variablen dürfen nicht mit einer Zahl beginnen",
    },
    {
      regex: /[^a-zA-Z]set\s+(::)?\d+\w*/,
      severity: 1,
      message: "Variablenamen nach 'set' dürfen nicht mit einer Zahl beginnen",
    },
    // ❌ Funktionsnamen dürfen keine Sonderzeichen enthalten
    {
      regex: /proc\s+([^\w_]\w*)/,
      severity: 1,
      message:
        "Funktionsnamen müssen mit einem Buchstaben oder Unterstrich beginnen",
    },

    // ❌ Verwendung von globalen Variablen ohne explizite Deklaration
    {
      regex: /global\s+\d+\w*/,
      severity: 2,
      message: "Globale Variablen sollten nicht mit einer Zahl beginnen",
    },

    // ⚠️ Warnung: Variablen sollten nicht mit Großbuchstaben beginnen (Best Practice)
    {
      regex: /set\s+[A-Z]\w*/,
      severity: 2,
      message:
        "Variablennamen sollten nicht mit Großbuchstaben beginnen (Best Practice)",
    },

    // ❌ Fehlendes `return` in Funktionen
    {
      regex: /proc\s+\w+\s*\{[^}]*\}\s*\{(?![^}]*\breturn\b)[^}]*\}/,
      severity: 3,
      message: "Funktion enthält kein 'return'-Statement",
    },

    // ❌ `expr`-Befehl ohne geschlossene Klammern
    {
      regex: /expr\s*\([^)]*$/,
      severity: 1,
      message: "Fehlende schließende Klammer in 'expr'",
    },

    // ⚠️ Warnung: `[expr]` sollte nicht ohne `set` verwendet werden
    {
      regex: /\[[^set][^]]*\s*expr\s+[^]]*\]/,
      severity: 3,
      message: "Der 'expr'-Befehl sollte immer mit 'set' verwendet werden",
    },

    // ❌ Nutzung von `[exec]`, was unsicher sein kann
    {
      regex: /\[exec\s+[^]]*\]/,
      severity: 3,
      message: "Verwenden von 'exec' kann unsicher sein (Sicherheitsrisiko!)",
    },
  ];

  module.exports = {rules}