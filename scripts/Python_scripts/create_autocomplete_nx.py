#dieses script erstellt ein txt file mit befehlen für den javasscript language provider. 
#Es werden die Siemens NX Befehle aus der datei nx_commands gelesen, dann wird der dazugehörige beschreibungstext 
#aus der datei nx_command_descriptions ausgelesen.
#am ende wird alles zusammen mit der richtigen formatierung in die drei text dateien mom_variables.txt, mom_commands.txt und lib_commands.txt geschrieben.
#Eventuell ist etwas Nacharbeit in der Datei nötig.




def read():
    #liest die nx_commands.tcl datei
    try:
        with open(r"..\nx_commands.txt") as command_file:
            commands = command_file.readlines()
                 
    except:
        print ("Fehler beim lesen")
        
    return commands



def write(command_list, file_name, icon, trigger):
    #schreibt den js code in die datei
    try:
        #erstellt die drei textdatein mit dem javascript inhalt
        with open(file_name + ".txt", "w") as command_file:
            
            for command in command_list: 
                if command == "" or command == " " or command == "\n" or command == "    ":
                    continue
                
                command_key = create_key_for_description(command).replace("Doc", "")
                description_key = create_key_for_description(command)
                command_description = get_description(description_key) 
                
                                   
                command_file.write('const ' + command_key + ' = new vscode.CompletionItem(\'' + command + '\', vscode.CompletionItemKind.'+ icon + ');\n')
                command_file.write(command_key + '.documentation = new vscode.MarkdownString("' + command_description + '");\n\n')    
                
                # command_file.write('{"command": "' + command + '", "icon": "' + icon + '", "triggers":["' + trigger + '"], "docu": "' + command_description + '"},\n')
                
                
                
        #erstellt eine zeile mit den keywords, für den return befehhl im javascript file
        #with open(file_name + ".return", "w") as return_file:
            
         #   for command in command_list: 
          #      if command == "" or command == " " or command == "\n" or command == "    ":
           #         continue
                
                
            #    command_key = create_key_for_description(command).replace("Doc", "")
             #   command_key.replace("\n", "")
                       
            #        return_file.write(command_key + ", ")   
       
    except:
        print ("Fehler beim schreiben")
        
    
def convert_commands(commands):
    #unterteilt die ganze command_liste in drei bereiche und speichert die 
    #commands in die jeweilige liste
    MOM = []
    mom = []
    lib = []
    for command in commands:
        command = command.replace("\n", "")
        if command == "":
            continue
        elif "* *" in command:
            continue
        elif "MOM" in command:
            if command[0:3].isupper():
                MOM.append(command)  
        elif "mom" in command:  
            if command[0:6].islower():
                mom.append(command)
        else:
            lib.append(command) 
            
            
            
    return MOM, mom, lib


def create_key_for_description(command):
    #Erstellt den Description key aus dem Command namen, um an die beschreibung zu kommen
    command = command.lower()
    key = ""
    for i in range(0, len(command)):    
        if i == 0:
            if command[i] == "m":
                key = key + command[i]
            else:
                key = key + command[i].upper()
        elif command[i] == "_":
            continue
        elif command[i - 1] == "_":
            key = key + command[i].upper()
        else:
            key = key + command[i]
    key = key + "Doc"
    return key





def get_description(key):
    #zieht die richtige zeile aus der beschreibungsdatei
    try:
        with open(r"..\nx_command_descriptions.txt") as description_file:
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
    description = description.replace("\\", "")
    description = description.replace(r"<br>", "\\n")
    description = description.replace("&lt;", "(")
    description = description.replace("&gt;", ")")
    description = description.replace(r"'+'", "\\n\\n")
    description = description.replace(r"' + '", "\\n\\n")
    description = description.replace("\"", "\\\"")
    
    
    if "'.pvalues();" in description:
        description = description.replace("'.pvalues();", "'")
    
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
    MOM, mom, lib = convert_commands(read())
    write(MOM, "MOM_commands", "Event", "M")
    write(mom, "mom_variables", "Variable", "m")
    write(lib, "lib_commands", "Interface", "B")
    
    
if __name__ == "__main__":
    main()

    

 
