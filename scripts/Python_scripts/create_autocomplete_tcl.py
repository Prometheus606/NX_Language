#dieses script erstellt ein txt file mit befehlen für den javascript language provider. 
#Es werden die tcl befehle aus der datei tcl_commands gelesen, dann wird der dazugehörige beschreibungstext 
#aus der datei tcl_command_descriptions ausgelesen.
#am ende wird alles zusammen mit der richtigen formatierung in die text datei tcl_commands.txt geschrieben.
#Eventuell ist etwas Nacharbeit in der Datei nötig.




def read():
    #liest die tcl_commands.tcl datei
    try:
        with open(r"..\tcl_commands.txt") as command_file:
            commands = command_file.readlines()
            command_list = []
            for command in commands:
                command = command.replace("\n", "")
                command_list.append(command)

        return command_list
    
    except:
        print ("Fehler beim lesen")
        exit()  
    



def write(command_list, file_name, icon):
    #schreibt den js code in die datei
    try:
        #erstellt die tcl_commands datei mit den javascript befehlen
        with open(file_name + ".txt", "w") as command_file:
            
            for command in command_list: 
                if command == "" or command == " " or command == "\n" or command == "    ":
                    continue
                
                command_description = get_description(command) 
                
                
                                   
                command_file.write('const ' + command + ' = new vscode.CompletionItem(\'' + command + '\', vscode.CompletionItemKind.'+ icon + ');\n')
                command_file.write(command + '.documentation = new vscode.MarkdownString("' + command_description + '");\n\n')    
                
        #erstellt die return datei, mit den keywords, für den return befehl in javascript
        #with open(file_name + ".return", "w") as return_file:
            
         #   for command in command_list: 
          #      if command == "" or command == " " or command == "\n" or command == "    ":
           #         continue
                       
            #    return_file.write(command + ", ")   
       
    except:
        print ("Fehler beim schreiben")
    


def get_description(key):
    #zieht die richtige zeile aus der beschreibungsdatei
    try:
        with open(r"..\tcl_command_description.txt") as description_file:
            descriptions = description_file.readlines()     
            for description in descriptions:
                description = description.replace("\n", "")
                if key in description:
                    description = convert_description(description)
                    return description
    except:
        print("fehler beim holen der beschreibung")
        
        
def convert_description(description):
    #konvertiert die beschreibungs zeile, damit alles unnötige entfernt wird, und das richtige format hat.
    
    if not "'" in description:
        description = ""
        return description
    #unnötiges vorne und hinten abschneiden    
    description = description[description.index("'") + 1 : -1]

    #dieser teil sorgt dafür, dass genügend zeilenumbrüche vorhanden sind. die 0 sagt aus,
    #das jedes 10. word einen umbruch bekommt. um das zu ändern, z.b auf jedes 12. wort,
    #müssen die beiden letzten nullen auf den wert 2 geändert werden.
    #dass funktioniert bei 10 - 19 wörtern.
    old_description = description.split(" ")
    description = ""
    for word in range(0, len(old_description)):
        if word == 0:
            description = description + old_description[word]
        elif "0" in str(word):
            description = description +  "\\n" + old_description[word]
        else:
            description = description + " " + old_description[word]
    
    return description



def main():
    write(read(), "tcl_commands", "Method")
    
    
if __name__ == "__main__":
    main()

    

 
