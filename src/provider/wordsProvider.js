const vscode = require("vscode");
const { readJsonFile, getFilesInWorkspace } = require("../utils");

// read json file
const completitionItems = readJsonFile("completitionItems.json");

//words, that be all the time in the list, because they are suggestet any time
let all_words_fix = [];
for (const object in completitionItems) {
  const completionItem = completitionItems[object];
  if (Array.isArray(completionItem)) {
    completionItem.forEach((item) => {
      all_words_fix.push(item.command);
    });
  } else {
    for (const item in completionItem) {
      const element = completionItem[item];
      element.forEach((i) => {
        all_words_fix.push(i.command);
      });
    }
  }
}

//first, the given word is checked. if it is not a string, or the length is less than 2, nothing happens.
//if special characters in the string, they will be removed
//if the given word not contains in the all_words list, it will append there and the word will be returned
//the return word will suggest in intellisense
//the all_word list contains all the suggested words, so that no word will be double
function add_to_all_words(word, all_words) {
  if (typeof word !== "string") {
    return null;
  }
  word = word.split("(")[0];
  word = word.replace(/[\[\]{}()$'".@\\\/:!?=&%+*-;,]/g, "").trim();
  if (
    word.length <= 2 ||
    word.startsWith("%") ||
    word.startsWith("_") ||
    Number(word)
  ) {
    return null;
  }
  if (!all_words.includes(word)) {
    all_words.push(word);
    return word;
  }
  return null;
}

//Helper function to remove strings from the given line (if it is in quotes)
function remove_strings_from_line(line) {
  line = line.replace(/'([^']+)'/g, "").trim();
  return line.replace(/"([^"]+)"/g, "").trim();
}

//checks if the given word already contain in the list. if so, than will be true returned, else will false be returned.
function is_double(word, word_list) {
  for (let i = 0; i < word_list.length; i++) {
    if (word_list[i].toString() === word.toString()) {
      return true;
    }
  }
  return false;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//regognize and suggest variables and prozedures

const completionLists = {
  //lists for the names. they are needed for avoid double intellisense items. they will be filled in the matching provider
  variable_names: [],
  proc_names: [],
  buffer_names: [],
  global_names: [],
};

let files = getFilesInWorkspace(vscode.workspace.workspaceFolders);

const variable_provider = vscode.languages.registerCompletionItemProvider(
  "tcl",
  {
    async provideCompletionItems(document, position) {
      const variables = [];
      if (!files || files.length == 0) {
        files = [document.uri];
      }
      for (const file of files) {
        let document = await vscode.workspace.openTextDocument(file);

        for (let i = 0; i < document.lineCount; i++) {
          if (document.lineAt(i).text.indexOf("set ") >= 0) {
            let line = document.lineAt(i).text;
            line = line.replace(/\[/g, " ");
            line = line.replace(/\]/g, " ");
            let splittet_line = line.split(" ");
            for (let j = 0; j < splittet_line.length; j++) {
              if (splittet_line[j] === "set") {
                let variable_index = splittet_line.indexOf("set") + 1;
                let variable = splittet_line[variable_index];
                variable = variable.split("(")[0];
                variable = variable.replace(/[\[\]$]/g, "").trim();
                if (variable.indexOf("$$") >= 0) continue; //namespace variablen nicht lesen
                if (variable.indexOf("::") >= 0) {
                  variable = variable.replace("::", "").trim();
                }
                splittet_line.splice(splittet_line.indexOf("set"), 1);
                if (!is_double(variable, variables)) {
                  variables.push(variable);
                  completionLists.variable_names.push(variable);
                }
              }
            }
          }
        }
      }

      const variable_list = [];
      for (let i = 0; i < variables.length; i++) {
        variable_list.push(
          new vscode.CompletionItem(
            variables[i],
            vscode.CompletionItemKind.Variable
          )
        );
      }

      return variable_list;
    },
  }
);

const procedur_provider = vscode.languages.registerCompletionItemProvider(
  "tcl",
  {
    async provideCompletionItems(document, position) {
      const procedures = [];
      if (!files || files.length == 0) {
        files = [document.uri];
      }
      for (const file of files) {
        let document = await vscode.workspace.openTextDocument(file);

        for (let i = 0; i < document.lineCount; i++) {
          if (document.lineAt(i).text.indexOf("proc ") >= 0) {
            let line = document.lineAt(i).text;
            let splittet_line = line.split(" ");
            let procedur_index = splittet_line.indexOf("proc") + 1;
            let procedur = splittet_line[procedur_index].trim();
            if (!is_double(procedur, procedures)) {
              procedures.push(procedur);
              completionLists.proc_names.push(procedur);
            }
          }
        }
      }

      const proc_list = [];
      for (let i = 0; i < procedures.length; i++) {
        proc_list.push(
          new vscode.CompletionItem(
            procedures[i],
            vscode.CompletionItemKind.Method
          )
        );
      }

      return proc_list;
    },
  }
);

const global_provider = vscode.languages.registerCompletionItemProvider("tcl", {
  async provideCompletionItems(document, position) {
    const globals = [];
    if (!files || files.length == 0) {
      files = [document.uri];
    }
    for (const file of files) {
      let document = await vscode.workspace.openTextDocument(file);

      for (let i = 0; i < document.lineCount; i++) {
        if (document.lineAt(i).text.indexOf("global ") >= 0) {
          let line = document.lineAt(i).text;
          let splittet_line = line.split(" ");
          for (let i = 0; i < splittet_line.length; i++) {
            let global = splittet_line[i].trim();
            if (global === "global" || global.startsWith("$")) {
              continue;
            } else if (
              !is_double(global, globals) &&
              !is_double(global, completionLists.variable_names)
            ) {
              global = global.split("(")[0];
              globals.push(global);
              completionLists.global_names.push(global);
            }
          }
        }
      }
    }

    const global_list = [];
    for (let i = 0; i < globals.length; i++) {
      global_list.push(
        new vscode.CompletionItem(
          globals[i],
          vscode.CompletionItemKind.Variable
        )
      );
    }

    return global_list;
  },
});

const buffer_provider = vscode.languages.registerCompletionItemProvider("tcl", {
  async provideCompletionItems(document, position) {
    const buffers = [];
    if (!files || files.length == 0) {
      files = [document.uri];
    }
    for (const file of files) {
      let document = await vscode.workspace.openTextDocument(file);

      for (let i = 0; i < document.lineCount; i++) {
        if (document.lineAt(i).text.indexOf("LIB_GE_command_buffer ") >= 0) {
          let line = document.lineAt(i).text;
          let splittet_line = line.split(" ");
          for (let i = 0; i < splittet_line.length; i++) {
            if (splittet_line[i] === "LIB_GE_command_buffer") {
              let buffer_index =
                splittet_line.indexOf("LIB_GE_command_buffer") + 1;
              let buffer = splittet_line[buffer_index].trim();
              if (buffer.indexOf("{") >= 0) {
                continue;
              } else if (!is_double(buffer, buffers)) {
                buffers.push(buffer);
                completionLists.buffer_names.push(buffer);
              }
            }
          }
        }
      }
    }

    const buffer_list = [];
    for (let i = 0; i < buffers.length; i++) {
      buffer_list.push(
        new vscode.CompletionItem(
          buffers[i],
          vscode.CompletionItemKind.Interface
        )
      );
    }

    return buffer_list;
  },
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//word regognization

const words_provider = vscode.languages.registerCompletionItemProvider("tcl", {
  async provideCompletionItems(document, position) {
    const words = [];

    //combined all word lists in one big list
    const all_words = all_words_fix.concat(
      completionLists.variable_names,
      completionLists.proc_names,
      completionLists.buffer_names,
      completionLists.global_names
    );

    if (!files || files.length == 0) {
      files = [document.uri];
    }
    for (const file of files) {
      let document = await vscode.workspace.openTextDocument(file);

      //get current word, for not suggesting it
      //let current_word = document.lineAt(position).text.substr(0, position.character).split(" ");
      //current_word = current_word[current_word.length -1]

      for (let i = 0; i < document.lineCount; i++) {
        let line = document.lineAt(i).text;
        line = remove_strings_from_line(line);
        let splittet_line = line.split(" ");
        if (splittet_line[0].indexOf("#") >= 0) {
          continue;
        } //don't read comments
        for (let j = 0; j < splittet_line.length; j++) {
          let word = splittet_line[j].trim();
          let checked_word = add_to_all_words(word, all_words);
          if (checked_word) {
            words.push(checked_word);
          }
        }
      }
    }

    const word_list = [];
    for (let h = 0; h < words.length; h++) {
      word_list.push(
        new vscode.CompletionItem(words[h], vscode.CompletionItemKind.Text)
      );
    }

    return word_list;
  },
});

module.exports = {
    words_provider,
    variable_provider,
    buffer_provider,
    global_provider,
    procedur_provider
}