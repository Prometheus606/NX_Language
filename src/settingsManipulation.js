const vscode = require("vscode");

// Function to read and change settings
function manipulateSettings() {
    // get extension settings
    const extensionSettings = vscode.workspace.getConfiguration("NX_Postprocessor");
    const MOM_Color = extensionSettings.get("MOM_Color");
    const LIB_Color = extensionSettings.get("LIB_Color");
  
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