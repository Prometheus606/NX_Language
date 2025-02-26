const vscode = require("vscode");

// Function to read and change settings
function manipulateSettings() {
    // get extension settings
    const extensionSettings = vscode.workspace.getConfiguration("NX_Postprocessor");
    const MOM_Color = extensionSettings.get("MOM_Color");
    const LIB_Color = extensionSettings.get("LIB_Color");
    const var_Color = extensionSettings.get("var_Color");
    const keyword_Color = extensionSettings.get("keyword_Color");
    const keyword_control_Color = extensionSettings.get("keyword_control_Color");
    const comment_Color = extensionSettings.get("comment_Color");
    const quotes_Color = extensionSettings.get("quotes_Color");
  
    const settingValue = {
      textMateRules: [
        {
          scope: "keyword.MOM.commands.tcl",
          settings: {
            foreground: `${MOM_Color}`,
          },
        },
        {
          scope: "keyword.buffer.tcl",
          settings: {
            foreground: `${LIB_Color}`,
          },
        },
        {
          scope: "variable.other.tcl",
          settings: {
            foreground: `${var_Color}`,
          },
        },
        {
          scope: "keyword.other.tcl",
          settings: {
            foreground: `${keyword_Color}`,
          },
        },
        {
          scope: "keyword.control.tcl",
          settings: {
            foreground: `${keyword_control_Color}`,
          },
        },
        {
          scope: "comment.line.number-sign.tcl",
          settings: {
            foreground: `${comment_Color}`,
          },
        },
        {
          scope: "string.quoted.double.tcl",
          settings: {
            foreground: `${quotes_Color}`,
          },
        },
      ],
    };
  
    const editorConfig = vscode.workspace.getConfiguration("editor");
  
    // Set multiple settings
    Promise.all([
      editorConfig.update(
        "tokenColorCustomizations",
        settingValue,
        vscode.ConfigurationTarget.Global
      ),
    ])
      .then(() => {
        // vscode.window.showInformationMessage('Settings updated successfully');
      })
      .catch((error) => {
        vscode.window.showErrorMessage(`Error updating settings: ${error}`);
      });
    }

module.exports = {manipulateSettings}