# TCL and Siemens NX Language Support for VS Studio Code

This extension adds rich language support for the TCL language and some Siemens NX Commands.
Used for Siemens NX Post Konfigurator.

Including so far:

- Syntaxhighlighting
- Tcl Snippets
- Tcl autocomplete
- NX MOM Variables autocomplete
- NX MOM events autocomplete
- NX buffer commands autocomplete
- NX Snippets
- procedures, globals, buffer and variables regognization and autocomplete
- all words regognization and autocomplete

For Highlighting the NX commands, you have to change the "settings.json" file.   
You find it in the search bar above. Type in: >Preferences: Open User Settings (JSON)   
Copy the following code inside this file:   


"editor.tokenColorCustomizations": {
        "textMateRules": [
            {
                "scope": "keyword.MOM.commands.tcl",
                "settings": {
                    "foreground": "#e26fdb"
                }
            },
            {
                "scope": "keyword.buffer.tcl",
                "settings": {
                    "foreground": "#e25c14"
                }
            }
        ]
    }   


Author: Niklas Beitler   
Date: 13. july 2023