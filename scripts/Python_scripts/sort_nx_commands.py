#dieses script zieht die nx befehle aus der nx_commands.tcl und sortiert sie in die drei kategorien:
#MOM Variablen, MOM Befehle und Buffer befehle.
#diese befehle werden in eine zeile geschrieben, damit sie einfach in die datei nx.tmLanguage geschrieben werden, für Syntax Highlighting.



def read():
    try:
        with open(r"C:\Users\niklas.beitler\OneDrive - d.u.h.Group\Desktop\Extension\src\nx_commands.tcl") as command_file:
            commands = command_file.readlines()
                 
    except:
        print ("Fehler")
        
    return commands



def write(MOM, mom, lib):
    try:
        with open(r".\src\Python_scripts\MOM_commands_temp.tcl","a") as MOM_file:      
            for i in MOM:
                MOM_file.write(i)
                MOM_file.write("|")
        with open(r".\src\Python_scripts\mom_variables_temp.tcl","a") as mom_file:      
            for i in mom:
                mom_file.write(i)
                mom_file.write("|")
        with open(r".\src\Python_scripts\lib_temp.tcl","a") as lib_file:      
            for i in lib:
                lib_file.write(i)
                lib_file.write("|")
                 
    except:
        print ("Fehler")
        
    
def convert_commands(commands):
    MOM = []
    mom = []
    lib = []
    for command in commands:
        command = command.replace("\n", "")
        if command == "":
            continue
        if "*" in command:
            continue
        if "MOM" in command:
            if command[0:3].isupper():
                MOM.append(command)  
        elif "mom" in command:  
            if command[0:6].islower():
                mom.append(command)
        else:
            lib.append(command) 
            
            
            
    return MOM, mom, lib
           
    
    
if __name__ == "__main__":
    MOM, mom, lib = convert_commands(read())
    write(MOM, mom, lib)