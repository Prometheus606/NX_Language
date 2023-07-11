//this script contains all tcl and NX (mom variables, MOM Commands and Buffer commands) commands, including documentation and a few snippets.
//it is a extension for coding postprocessors with Siemens NX Postconfigurator.
//Creator: Niklas Beitler

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");



function add_to_all_words(word, all_words) {

    if (typeof word !== "string") {
        return null;
    }

    word = word.replace(/[\[\]@{}"']/g, "");

    if (word.length <= 2 || word.startsWith("%")) {
        return null;
    }

    if (!all_words.includes(word)) {
        all_words.push(word);
        return word;
    }
    
    return null

    
}

//Helper function to remove strings from the given line (if it is in quotes)
function remove_strings_from_line(line) {
    line = line.replace(/'([^']+)'/g, "").trim();
    return line.replace(/"([^"]+)"/g, "").trim();
}

function activate(context) {

 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 //words, that will be suggested all the time   

 let command_provider = vscode.languages.registerCompletionItemProvider('NX', {
     provideCompletionItems(document, position, token, context) {

         //String
         const string = new vscode.CompletionItem('string', vscode.CompletionItemKind.Method);
         string.commitCharacters = [' '];
         string.documentation = new vscode.MarkdownString('Commands for string manipulation');

         //File
         const file = new vscode.CompletionItem('file', vscode.CompletionItemKind.Method);
         file.commitCharacters = [' '];
         file.documentation = new vscode.MarkdownString('Commands for file functions'); 

         //join
         const join = new vscode.CompletionItem('join', vscode.CompletionItemKind.Method);
         join.insertText = new vscode.SnippetString('join ${1:string1} ${2:""}$0');
         join.documentation = new vscode.MarkdownString("Join converts a Tcl list into a string. It glues together the elements of a list using a supplied string as element separator. Default is a space.");


 
         const after = new vscode.CompletionItem('after ', vscode.CompletionItemKind.Method);
         after.documentation = new vscode.MarkdownString("");

         const append = new vscode.CompletionItem('append ', vscode.CompletionItemKind.Method);
         append.documentation = new vscode.MarkdownString("appends values to the value stored in a variable.\n\nappend (variable)\n(value)");

         const array = new vscode.CompletionItem('array ', vscode.CompletionItemKind.Method);
         array.documentation = new vscode.MarkdownString("Manipulate array variables");

         const auto_execok = new vscode.CompletionItem('auto_execok ', vscode.CompletionItemKind.Method);
         auto_execok.documentation = new vscode.MarkdownString("");

         const auto_import = new vscode.CompletionItem('auto_import ', vscode.CompletionItemKind.Method);
         auto_import.documentation = new vscode.MarkdownString("");

         const auto_load = new vscode.CompletionItem('auto_load ', vscode.CompletionItemKind.Method);
         auto_load.documentation = new vscode.MarkdownString("");

         const auto_mkindex = new vscode.CompletionItem('auto_mkindex ', vscode.CompletionItemKind.Method);
         auto_mkindex.documentation = new vscode.MarkdownString("");

         const auto_mkindex_old = new vscode.CompletionItem('auto_mkindex_old ', vscode.CompletionItemKind.Method);
         auto_mkindex_old.documentation = new vscode.MarkdownString("");

         const auto_qualify = new vscode.CompletionItem('auto_qualify ', vscode.CompletionItemKind.Method);
         auto_qualify.documentation = new vscode.MarkdownString("");

         const auto_reset = new vscode.CompletionItem('auto_reset ', vscode.CompletionItemKind.Method);
         auto_reset.documentation = new vscode.MarkdownString("");

         const bgerror = new vscode.CompletionItem('bgerror ', vscode.CompletionItemKind.Method);
         bgerror.documentation = new vscode.MarkdownString("");

         const binary = new vscode.CompletionItem('binary ', vscode.CompletionItemKind.Method);
         binary.documentation = new vscode.MarkdownString("");

         const cd = new vscode.CompletionItem('cd ', vscode.CompletionItemKind.Method);
         cd.documentation = new vscode.MarkdownString("Changes the current directory to dirName if dirName is given,\nor to the $HOME directory if dirName is not given.\nIf dirName is a tilde ~, cd changes the working\ndirectory to the users home directory. If dirName starts with\na tilde, then the rest of the characters are treated\nas a login id, and cd changes the working directory\nto that user's $HOME.\n\ncd (dirname)");

         const clock = new vscode.CompletionItem('clock', vscode.CompletionItemKind.Method);
         clock.documentation = new vscode.MarkdownString("clock - Obtain and manipulate dates and times.");

         const close = new vscode.CompletionItem('close ', vscode.CompletionItemKind.Method);
         close.documentation = new vscode.MarkdownString("Closes a file opened at runtime.\n\nclose ($filename)");

         const concat = new vscode.CompletionItem('concat ', vscode.CompletionItemKind.Method);
         concat.documentation = new vscode.MarkdownString("");

         const dde = new vscode.CompletionItem('dde ', vscode.CompletionItemKind.Method);
         dde.documentation = new vscode.MarkdownString("");

         const encoding = new vscode.CompletionItem('encoding ', vscode.CompletionItemKind.Method);
         encoding.documentation = new vscode.MarkdownString("");

         const eof = new vscode.CompletionItem('eof ', vscode.CompletionItemKind.Method);
         eof.documentation = new vscode.MarkdownString("");

         const error = new vscode.CompletionItem('error ', vscode.CompletionItemKind.Method);
         error.documentation = new vscode.MarkdownString("");

         const eval_ = new vscode.CompletionItem('eval ', vscode.CompletionItemKind.Method);
         eval_.documentation = new vscode.MarkdownString("Eval takes one or more arguments, which together comprise a\nTcl script containing one or more commands.\n\neval (arg) (arg)");

         const exec = new vscode.CompletionItem('exec ', vscode.CompletionItemKind.Method);
         exec.documentation = new vscode.MarkdownString("This command treats its arguments as the specification of one or more subprocesses to execute. The arguments take the form of a standard shell pipeline where each arg becomes one word of a command, and each distinct command becomes a subprocess.\n\exec (arg) (arg)");

         const expr = new vscode.CompletionItem('expr ', vscode.CompletionItemKind.Method);
         expr.documentation = new vscode.MarkdownString("The expr command concatenates args, separated by a space, into\nan expression, and evaluates that expression, returning its value\n\nexpr (arg)\n(arg)");

         const fblocked = new vscode.CompletionItem('fblocked ', vscode.CompletionItemKind.Method);
         fblocked.documentation = new vscode.MarkdownString("");

         const fconfigure = new vscode.CompletionItem('fconfigure ', vscode.CompletionItemKind.Method);
         fconfigure.documentation = new vscode.MarkdownString("");

         const fcopy = new vscode.CompletionItem('fcopy ', vscode.CompletionItemKind.Method);
         fcopy.documentation = new vscode.MarkdownString("");

         const fileevent = new vscode.CompletionItem('fileevent ', vscode.CompletionItemKind.Method);
         fileevent.documentation = new vscode.MarkdownString("");

         const filename = new vscode.CompletionItem('filename ', vscode.CompletionItemKind.Method);
         filename.documentation = new vscode.MarkdownString("");

         const flush = new vscode.CompletionItem('flush ', vscode.CompletionItemKind.Method);
         flush.documentation = new vscode.MarkdownString("");

         const format = new vscode.CompletionItem('format ', vscode.CompletionItemKind.Method);
         format.insertText = new vscode.SnippetString("format ${1:%d} ${2:string}$0")
         format.documentation = new vscode.MarkdownString("Format a string in the style of sprintf\n\nformat (formatString) (arg) (arg) ...");

         const gets = new vscode.CompletionItem('gets ', vscode.CompletionItemKind.Method);
         gets.documentation = new vscode.MarkdownString("Read a line from a channel (a file, commandline input).\n\ngets (variable) Line");

         const glob = new vscode.CompletionItem('glob ', vscode.CompletionItemKind.Method);
         glob.documentation = new vscode.MarkdownString("");

         const global = new vscode.CompletionItem('global ', vscode.CompletionItemKind.Method);
         global.documentation = new vscode.MarkdownString("Access global variables.\n\nglobal (variable)");

         const history = new vscode.CompletionItem('history ', vscode.CompletionItemKind.Method);
         history.documentation = new vscode.MarkdownString("");

         const http = new vscode.CompletionItem('http ', vscode.CompletionItemKind.Method);
         http.documentation = new vscode.MarkdownString("");

         const incr = new vscode.CompletionItem('incr ', vscode.CompletionItemKind.Method);
         incr.documentation = new vscode.MarkdownString("Increment the value of a variable.\n\nincr (variable) (value)");

         const info_ = new vscode.CompletionItem('info', vscode.CompletionItemKind.Method);
         info_.documentation = new vscode.MarkdownString("Return information about the state of the Tcl interpreter.\n\ninfo (option) (arg) (arg)");

         const interp = new vscode.CompletionItem('interp ', vscode.CompletionItemKind.Method);
         interp.documentation = new vscode.MarkdownString("");

         const lappend = new vscode.CompletionItem('lappend ', vscode.CompletionItemKind.Method);
         lappend.documentation = new vscode.MarkdownString("Append list elements onto a variable.\n\nlappend (variable) (value) (value)");

         const library = new vscode.CompletionItem('library ', vscode.CompletionItemKind.Method);
         library.documentation = new vscode.MarkdownString("");

         const lindex = new vscode.CompletionItem('lindex ', vscode.CompletionItemKind.Method);
         lindex.documentation = new vscode.MarkdownString("Retrieve an element from a list.\n\nlindex (list) (index)");

         const linsert = new vscode.CompletionItem('linsert ', vscode.CompletionItemKind.Method);
         linsert.documentation = new vscode.MarkdownString("appends values to the value stored in a variable.\n\nappend (variable) (value)");

         const list_ = new vscode.CompletionItem('list ', vscode.CompletionItemKind.Method);
         list_.documentation = new vscode.MarkdownString("'Create a list.\n\nlist (arg) (arg)'");

         const llength = new vscode.CompletionItem('llength ', vscode.CompletionItemKind.Method);
         llength.documentation = new vscode.MarkdownString("Count the number of elements in a list.\n\nllength (list)");

         const load = new vscode.CompletionItem('load ', vscode.CompletionItemKind.Method);
         load.documentation = new vscode.MarkdownString("");

         const lrange = new vscode.CompletionItem('lrange ', vscode.CompletionItemKind.Method);
         lrange.documentation = new vscode.MarkdownString("Return one or more adjacent elements from a list.\n\nlrange (list) (first) (last)");

         const lreplace = new vscode.CompletionItem('lreplace ', vscode.CompletionItemKind.Method);
         lreplace.documentation = new vscode.MarkdownString("Replace elements in a list with new elements.\n\nlreplace (list) (first) (last) (element) (element) ...");

         const lsearch = new vscode.CompletionItem('lsearch ', vscode.CompletionItemKind.Method);
         lsearch.documentation = new vscode.MarkdownString("See if a list contains a particular element.\n\nlsearch (variable) (value)");

         const lset = new vscode.CompletionItem('lset ', vscode.CompletionItemKind.Method);
         lset.documentation = new vscode.MarkdownString("Change an element in a list.\n\nlset (variable) (index) (new value)");

         const lsort = new vscode.CompletionItem('lsort ', vscode.CompletionItemKind.Method);
         lsort.documentation = new vscode.MarkdownString("Sort the elements of a list.\n\nappend (options) (list)");

         const memory = new vscode.CompletionItem('memory ', vscode.CompletionItemKind.Method);
         memory.documentation = new vscode.MarkdownString("");

         const msgcat = new vscode.CompletionItem('msgcat ', vscode.CompletionItemKind.Method);
         msgcat.documentation = new vscode.MarkdownString("");

         const namespace = new vscode.CompletionItem('namespace ', vscode.CompletionItemKind.Method);
         namespace.documentation = new vscode.MarkdownString("create and manipulate contexts for commands and variables.");

         const open_ = new vscode.CompletionItem('open ', vscode.CompletionItemKind.Method);
         open_.documentation = new vscode.MarkdownString("Open a file-based or command pipeline channel.\nmodes:w,a,r,w+,a+,r+\n\nopen (filename) (mode)");

         const package_ = new vscode.CompletionItem('package', vscode.CompletionItemKind.Method);
         package_.documentation = new vscode.MarkdownString("Facilities for package loading and version control.\n\nappend (variable) (value)");

         const parray = new vscode.CompletionItem('parray ', vscode.CompletionItemKind.Method);
         parray.documentation = new vscode.MarkdownString("");

         const pid = new vscode.CompletionItem('pid ', vscode.CompletionItemKind.Method);
         pid.documentation = new vscode.MarkdownString("");

         const pkg_create = new vscode.CompletionItem('pkg::create ', vscode.CompletionItemKind.Method);
         pkg_create.documentation = new vscode.MarkdownString("");

         const pkg_mkIndex = new vscode.CompletionItem('pkg_mkIndex ', vscode.CompletionItemKind.Method);
         pkg_mkIndex.documentation = new vscode.MarkdownString("");

         const puts = new vscode.CompletionItem('puts ', vscode.CompletionItemKind.Method);
         puts.documentation = new vscode.MarkdownString("Write to a channel.\n\nputs (text)");

         const pwd = new vscode.CompletionItem('pwd ', vscode.CompletionItemKind.Method);
         pwd.documentation = new vscode.MarkdownString("");

         const regexp = new vscode.CompletionItem('regexp ', vscode.CompletionItemKind.Method);
         regexp.documentation = new vscode.MarkdownString("");

         const regsub = new vscode.CompletionItem('regsub ', vscode.CompletionItemKind.Method);
         regsub.documentation = new vscode.MarkdownString("");

         const re_syntax = new vscode.CompletionItem('re_syntax ', vscode.CompletionItemKind.Method);
         re_syntax.documentation = new vscode.MarkdownString("");

         const read = new vscode.CompletionItem('read ', vscode.CompletionItemKind.Method);
         read.documentation = new vscode.MarkdownString("Read from a channel.\n\nread (variable or file)");

         const registry = new vscode.CompletionItem('registry ', vscode.CompletionItemKind.Method);
         registry.documentation = new vscode.MarkdownString("");

         const rename = new vscode.CompletionItem('rename ', vscode.CompletionItemKind.Method);
         rename.documentation = new vscode.MarkdownString("Rename or delete a command.\n\nrename (oldname) (newname)");

         const resource = new vscode.CompletionItem('resource ', vscode.CompletionItemKind.Method);
         resource.documentation = new vscode.MarkdownString("");

         const scan = new vscode.CompletionItem('scan ', vscode.CompletionItemKind.Method);
         scan.documentation = new vscode.MarkdownString("Parse string using conversion specifiers in the style of sscanf.");

         const seek = new vscode.CompletionItem('seek ', vscode.CompletionItemKind.Method);
         seek.documentation = new vscode.MarkdownString("");

         const set = new vscode.CompletionItem('set ', vscode.CompletionItemKind.Method);
         set.documentation = new vscode.MarkdownString("Read and write variables.\n\nset (variablenname) (value)");

         const socket = new vscode.CompletionItem('socket ', vscode.CompletionItemKind.Method);
         socket.documentation = new vscode.MarkdownString("");

         const SafeBase = new vscode.CompletionItem('SafeBase ', vscode.CompletionItemKind.Method);
         SafeBase.documentation = new vscode.MarkdownString("");

         const source = new vscode.CompletionItem('source ', vscode.CompletionItemKind.Method);
         source.documentation = new vscode.MarkdownString("Evaluate a file or resource as a Tcl script");

         const split = new vscode.CompletionItem('split ', vscode.CompletionItemKind.Method);
         split.documentation = new vscode.MarkdownString("Split a string into a proper Tcl list.\n\nsplit (string) (splitchars)");

         const stdin = new vscode.CompletionItem('stdin ', vscode.CompletionItemKind.Method);
         stdin.documentation = new vscode.MarkdownString("A part of stdio, this file handle is opened by\ndefault for each application making use of the stdio package\nof code. It is also the name of the standard\ninput channel in Tcl (though Tcl doesn't use stdio). This\ninput file may correspond to a disk file, pipe, terminal\ndevice, or other construct.To refer to the stdin filehandle in\nTcl, use the string stdin as the channel name when\nusing gets.");

         const stdout = new vscode.CompletionItem('stdout ', vscode.CompletionItemKind.Method);
         stdout.documentation = new vscode.MarkdownString("a part of stdio, this filehandle is opened by default\nfor each application making use of the stdio package of\ncode.This output file may correspond to a disk file, pipe,\nterminal device, or other construct.To refer to this output filehandle\nin Tcl, use the string stdout when using puts.");

         const subst = new vscode.CompletionItem('subst ', vscode.CompletionItemKind.Method);
         subst.documentation = new vscode.MarkdownString("");

         const Tcl = new vscode.CompletionItem('Tcl ', vscode.CompletionItemKind.Method);
         Tcl.documentation = new vscode.MarkdownString("");

         const tcl_endOfWord = new vscode.CompletionItem('tcl_endOfWord ', vscode.CompletionItemKind.Method);
         tcl_endOfWord.documentation = new vscode.MarkdownString("");

         const tcl_findLibrary = new vscode.CompletionItem('tcl_findLibrary ', vscode.CompletionItemKind.Method);
         tcl_findLibrary.documentation = new vscode.MarkdownString("");

         const tcl_startOfNextWord = new vscode.CompletionItem('tcl_startOfNextWord ', vscode.CompletionItemKind.Method);
         tcl_startOfNextWord.documentation = new vscode.MarkdownString("");

         const tcl_startOfPreviousWord = new vscode.CompletionItem('tcl_startOfPreviousWord ', vscode.CompletionItemKind.Method);
         tcl_startOfPreviousWord.documentation = new vscode.MarkdownString("");

         const tcl_wordBreakAfter = new vscode.CompletionItem('tcl_wordBreakAfter ', vscode.CompletionItemKind.Method);
         tcl_wordBreakAfter.documentation = new vscode.MarkdownString("");

         const tcl_wordBreakBefore = new vscode.CompletionItem('tcl_wordBreakBefore ', vscode.CompletionItemKind.Method);
         tcl_wordBreakBefore.documentation = new vscode.MarkdownString("");

         const tcltest = new vscode.CompletionItem('tcltest ', vscode.CompletionItemKind.Method);
         tcltest.documentation = new vscode.MarkdownString("");

         const tclvars = new vscode.CompletionItem('tclvars ', vscode.CompletionItemKind.Method);
         tclvars.documentation = new vscode.MarkdownString("");

         const tell = new vscode.CompletionItem('tell ', vscode.CompletionItemKind.Method);
         tell.documentation = new vscode.MarkdownString("");

         const time = new vscode.CompletionItem('time ', vscode.CompletionItemKind.Method);
         time.documentation = new vscode.MarkdownString("");

         const trace = new vscode.CompletionItem('trace ', vscode.CompletionItemKind.Method);
         trace.documentation = new vscode.MarkdownString("");

         const unknown = new vscode.CompletionItem('unknown ', vscode.CompletionItemKind.Method);
         unknown.documentation = new vscode.MarkdownString("");

         const unset = new vscode.CompletionItem('unset ', vscode.CompletionItemKind.Method);
         unset.documentation = new vscode.MarkdownString("Delete variables.\n\nunset (variables");

         const update = new vscode.CompletionItem('update ', vscode.CompletionItemKind.Method);
         update.documentation = new vscode.MarkdownString("");

         const uplevel = new vscode.CompletionItem('uplevel ', vscode.CompletionItemKind.Method);
         uplevel.documentation = new vscode.MarkdownString("");

         const upvar = new vscode.CompletionItem('upvar ', vscode.CompletionItemKind.Method);
         upvar.documentation = new vscode.MarkdownString("");

         const variable = new vscode.CompletionItem('variable ', vscode.CompletionItemKind.Method);
         variable.documentation = new vscode.MarkdownString("create and initialize a namespace variable.");

         const vwait = new vscode.CompletionItem('vwait ', vscode.CompletionItemKind.Method);
         vwait.documentation = new vscode.MarkdownString("Process events until a variable is written.\n\nvwait (varname)");

         const argv = new vscode.CompletionItem('argv', vscode.CompletionItemKind.Method);
         argv.documentation = new vscode.MarkdownString("argument list");

         const argc = new vscode.CompletionItem('argc', vscode.CompletionItemKind.Method);
         argc.documentation = new vscode.MarkdownString("argument count");

         const arg0 = new vscode.CompletionItem('arg0', vscode.CompletionItemKind.Method);
         arg0.documentation = new vscode.MarkdownString("programmname");

         const Vmov = new vscode.CompletionItem('VMOV ', vscode.CompletionItemKind.Interface);
         Vmov.documentation = new vscode.MarkdownString("This function copies a vector or matrix to an other\none.\n\n\nVMOV (n) (p1) (p2)");

         const Hiset = new vscode.CompletionItem('hiset ', vscode.CompletionItemKind.Interface);
         Hiset.documentation = new vscode.MarkdownString("This function checks if a variable is set or not.\n\n\nhiset\n(v1)");

         const Isset = new vscode.CompletionItem('isset ', vscode.CompletionItemKind.Interface);
         Isset.documentation = new vscode.MarkdownString("\n\nisset (v1)");

         const OutputAdr = new vscode.CompletionItem('OUTPUT_adr ', vscode.CompletionItemKind.Interface);
         OutputAdr.documentation = new vscode.MarkdownString("This function provides a way to check nc code addresses\nbefore writing the to the nc code.\n\n\nOUTPUT_adr (args)");




         // return all completion items as array
         return [string, file, join, after, append, array, auto_execok, auto_import, auto_load, auto_mkindex, auto_mkindex_old, auto_qualify, auto_reset, bgerror, binary, cd, 
                clock, close, concat, dde, encoding, eof, error, eval_, exec, expr, argv, argc, arg0, set, socket, variable, time, trace, list_, info_, package_, open_,  
                fblocked, fconfigure, fcopy, fileevent, filename, flush, format, gets, glob, global, history, http, incr, interp, lappend, lindex, linsert, llength, load, 
                lrange, lreplace, lsearch, lset, lsort, msgcat, namespace, parray, pid, pkg_create, pkg_mkIndex, puts, pwd, regexp, regsub, re_syntax, read, registry, rename, 
                resource, scan, stdin, stdout, seek, SafeBase, source, split, subst, Tcl, tcl_endOfWord, tcl_startOfNextWord, tcl_startOfPreviousWord, 
                tcl_wordBreakAfter, tcl_wordBreakBefore, tcltest, tclvars, tell, unknown, unset, update, uplevel, upvar, vwait, tcl_findLibrary, library, memory,
                
                //special lib commands
                Vmov, Hiset, Isset, OutputAdr

                

     ];
     }
 });

 const eq_provider = vscode.languages.registerCompletionItemProvider('NX', {
    provideCompletionItems(document, position) {
    // get all text until the `position` and check if it reads `vec `
    // and if so then complete with the vec commands.
    let linePrefix = document.lineAt(position).text.substr(0, position.character);
    if (!linePrefix.endsWith('EQ')) {
        //return undefined;
    }


        const EqIsEqual = new vscode.CompletionItem('EQ_is_equal ', vscode.CompletionItemKind.Interface);
        EqIsEqual.documentation = new vscode.MarkdownString("This function checks if two given values are equal within\na given tolerance.\n\n\nEQ_is_equal (s) (t) (tol)");

        const EqIsGe = new vscode.CompletionItem('EQ_is_ge ', vscode.CompletionItemKind.Interface);
        EqIsGe.documentation = new vscode.MarkdownString("This function checks if value1 is greater or equal (_ge)\nthan value 2 within a given tolerance.\n\n\nEQ_is_ge (s) (t) (tol)");

        const EqIsGt = new vscode.CompletionItem('EQ_is_gt ', vscode.CompletionItemKind.Interface);
        EqIsGt.documentation = new vscode.MarkdownString("This function checks if value1 is greater than (_gt) value\n2 within a given tolerance.\n\n\nEQ_is_gt (s) (t) (tol)");

        const EqIsLe = new vscode.CompletionItem('EQ_is_le ', vscode.CompletionItemKind.Interface);
        EqIsLe.documentation = new vscode.MarkdownString("This function checks if value1 is less or equal (_le)\nthan value 2 within a given tolerance.\n\n\nEQ_is_le (s) (t) (tol)");

        const EqIsLt = new vscode.CompletionItem('EQ_is_lt ', vscode.CompletionItemKind.Interface);
        EqIsLt.documentation = new vscode.MarkdownString("This function checks if value1 is less than (_lt) value\n2 within a given tolerance.\n\n\nEQ_is_lt (s) (t) (tol)");

        const EqIsZero = new vscode.CompletionItem('EQ_is_zero ', vscode.CompletionItemKind.Interface);
        EqIsZero.documentation = new vscode.MarkdownString("This function checks if a given value is zero within\na given tolerance.\n\n\nEQ_is_zero (s) (tol)");



    // return all completion items as array
    return [EqIsEqual, EqIsGe, EqIsGt, EqIsLe, EqIsLt, EqIsZero];
    }
}, "Q"
);

    	const vec_provider = vscode.languages.registerCompletionItemProvider('NX', {
        provideCompletionItems(document, position) {
        // get all text until the `position` and check if it reads `vec `
        // and if so then complete with the vec commands.
        let linePrefix = document.lineAt(position).text.substr(0, position.character);
        if (!linePrefix.endsWith('VEC')) {
            //return undefined;
        }

            const Vec3Add = new vscode.CompletionItem('VEC3_add ', vscode.CompletionItemKind.Interface);
            Vec3Add.documentation = new vscode.MarkdownString("This function performs a vector addition.\nVEC3_add(u,v,w)   w =\nu + v   Vector addition\n\n\nVEC3_add (u) (v) (w)");

            const Vec3Cross = new vscode.CompletionItem('VEC3_cross ', vscode.CompletionItemKind.Interface);
            Vec3Cross.documentation = new vscode.MarkdownString("This function calculates the vector cross product.\nVEC3_cross(u,v,w)   w\n= ( u X v )   Vector cross\nproduct\n\n\nVEC3_cross (u) (v) (w)");

            const Vec3Dot = new vscode.CompletionItem('VEC3_dot ', vscode.CompletionItemKind.Interface);
            Vec3Dot.documentation = new vscode.MarkdownString("This function calculates the vector dot product of normalized input\nvectors.\nVEC3_dot(u,v)   (u dot v)   Vector dot\nproduct (u &amp; v normalized)\n\n\nVEC3_dot (u) (v)");

            const Vec3DotA = new vscode.CompletionItem('VEC3_dot_A ', vscode.CompletionItemKind.Interface);
            Vec3DotA.documentation = new vscode.MarkdownString("This function calculates the vector dot product. Input vectors don't\nneed to be normalized.\nVEC3_dot_A(u,v)   (u dot v) \n Vector dot product (u &amp; v not necessarily normalized)\n\n\nVEC3_dot_A\n(u) (v)");

            const Vec3Init = new vscode.CompletionItem('VEC3_init ', vscode.CompletionItemKind.Interface);
            Vec3Init.documentation = new vscode.MarkdownString("This function initialize a vector from a coordinate value. This\nis useful to create a vector\nfrom given variables.\nVEC3_init(x,y,z,w)  \nw = (x, y, z)   Initialize a vector\nfrom\ncoordinates (passed as variables)\n\n\nVEC3_init (x) (y) (z) (w)");

            const Vec3InitS = new vscode.CompletionItem('VEC3_init_s ', vscode.CompletionItemKind.Interface);
            Vec3InitS.documentation = new vscode.MarkdownString("This function initialize a vector from scalar values. This is\nuseful to create a vector\ndirectly from given values.\nVEC3_init_s(x,y,z,w)  \nw = (x, y, z)   Initialize a vector\nfrom\ncoordinates (passed as scalars)\n\n\nVEC3_init_s (x) (y) (z) (w)");

            const Vec3IsEqual = new vscode.CompletionItem('VEC3_is_equal ', vscode.CompletionItemKind.Interface);
            Vec3IsEqual.documentation = new vscode.MarkdownString("This function checks if two given vectors are equal within\na given tolerance.\nVEC3_is_equal(u,v,tol)   (||(u-v)|| ( tol)  \nAre vectors equal?\n\n\nVEC3_is_equal (u) (v) (tol)");

            const Vec3IsZero = new vscode.CompletionItem('VEC3_is_zero ', vscode.CompletionItemKind.Interface);
            Vec3IsZero.documentation = new vscode.MarkdownString("This function checks if a given vector is zero.\nVEC3_is_zero(u,tol) \n (|| u || ( tol)   Is vector\nzero?\n\n\nVEC3_is_zero (u)");

            const Vec3Mag = new vscode.CompletionItem('VEC3_mag ', vscode.CompletionItemKind.Interface);
            Vec3Mag.documentation = new vscode.MarkdownString("VEC3_mag(u)   ( || u || )  \nVector magnitude\n\n\nVEC3_mag (u)");

            const Vec3Negate = new vscode.CompletionItem('VEC3_negate ', vscode.CompletionItemKind.Interface);
            Vec3Negate.documentation = new vscode.MarkdownString("This function negates a given vector.\nVEC3_negate(u,w)   w =\n(-u)   Vector negate\n\n\nVEC3_negate (u) (w)");

            const Vec3Scale = new vscode.CompletionItem('VEC3_scale ', vscode.CompletionItemKind.Interface);
            Vec3Scale.documentation = new vscode.MarkdownString("This function scales a vector by a given scale.\nVEC3_scale(s,u,w) \n w = (s*u)   Vector scale\n\n\nVEC3_scale (s) (u)\n(w)");

            const Vec3Sub = new vscode.CompletionItem('VEC3_sub ', vscode.CompletionItemKind.Interface);
            Vec3Sub.documentation = new vscode.MarkdownString("This function substracts one vector from another vector.\nVEC3_sub(u,v,w)  \nw = u - v   Vector subtraction\n\n\nVEC3_sub (u)\n(v) (w)");

            const Vec3Unitize = new vscode.CompletionItem('VEC3_unitize ', vscode.CompletionItemKind.Interface);
            Vec3Unitize.documentation = new vscode.MarkdownString("This function results the unit vector (or normalized vector) of\nan given vector in space.\nVEC3_unitize(u,w)   *len = ||\nu ||   Vector unitization\n\n\nVEC3_unitize (u) (w)");

            const Vec3RotateArbitaryAxis = new vscode.CompletionItem('VEC3_rotate_arbitary_axis ', vscode.CompletionItemKind.Interface);
            Vec3RotateArbitaryAxis.documentation = new vscode.MarkdownString("This function rotates a vector around an arbitary axis.\n\n\nVEC3_rotate_arbitary_axis (axis)\n(angle) (input_vector) (output_vector)");

            const Vec3DistPointLine = new vscode.CompletionItem('VEC3_dist_point_line ', vscode.CompletionItemKind.Interface);
            Vec3DistPointLine.documentation = new vscode.MarkdownString("This function calculates the shortest distance between a given point\nand a line.\nIt is the distance from the point perpendicular\nto the line.\n\n\nVEC3_dist_point_line (_u) (_v) (_w)");

            const Vec3Angle3points = new vscode.CompletionItem('VEC3_angle_3points ', vscode.CompletionItemKind.Interface);
            Vec3Angle3points.documentation = new vscode.MarkdownString("This function calculates the angle between three points.\n\n\nVEC3_angle_3points (_u) (_v)\n(_w)");

            const Vec3AngleBetween = new vscode.CompletionItem('VEC3_angle_between ', vscode.CompletionItemKind.Interface);
            Vec3AngleBetween.documentation = new vscode.MarkdownString("This function calculates the angle between two vectors. The input\nvectors do not need\nto be unitized.\n\n\nVEC3_angle_between (vec1) (vec2) (return_unit)");

            const Vec3IsParallel = new vscode.CompletionItem('VEC3_is_parallel ', vscode.CompletionItemKind.Interface);
            Vec3IsParallel.documentation = new vscode.MarkdownString("This function checks if two vectors are parallel or not.\n\n\nVEC3_is_parallel\n(u) (v)");



        // return all completion items as array
        return [Vec3Add, Vec3Cross, Vec3Dot, Vec3DotA, Vec3Init, Vec3InitS, Vec3IsEqual, Vec3IsZero, Vec3Mag, Vec3Negate, Vec3Scale,
               Vec3Sub, Vec3Unitize, Vec3RotateArbitaryAxis, Vec3DistPointLine, Vec3Angle3points, Vec3AngleBetween, Vec3IsParallel];
        }
    }, "C"
    );

    const mtx_provider = vscode.languages.registerCompletionItemProvider('NX', {
        provideCompletionItems(document, position) {
        // get all text until the `position` and check if it reads `vec `
        // and if so then complete with the vec commands.
        let linePrefix = document.lineAt(position).text.substr(0, position.character);
        if (!linePrefix.endsWith('MTX')) {
            //return undefined;
        }


            const mtx3InitXYZ = new vscode.CompletionItem('MTX3_init_x_y_z ', vscode.CompletionItemKind.Interface);
            mtx3InitXYZ.documentation = new vscode.MarkdownString("This function initializes a matrix from given x, y and\nz vectors.\nMTX3_init_x_y_z (u, v, w, r) r = (u, v,\nw)   Initialize a matrix from\ngiven x, y and\nz vectors\n\n\nMTX3_init_x_y_z (u) (v) (w) (r)");

            const mtx3IsEqual = new vscode.CompletionItem('MTX3_is_equal ', vscode.CompletionItemKind.Interface);
            mtx3IsEqual.documentation = new vscode.MarkdownString("This function determines if two matrices are equal within mom_system_tolerance.\nMTX3_is_equal(m,n,a)\n  (m == n)   Determine if two\nmatrices\nare equal.\n\n\nMTX3_is_equal (m) (n) (count)");

            const mtx3Multiply = new vscode.CompletionItem('MTX3_multiply ', vscode.CompletionItemKind.Interface);
            mtx3Multiply.documentation = new vscode.MarkdownString("This function multiplies two matrices.\nMTX3_multiply(m, n, r)   r\n= ( m X n )   Matrix multiplication\n\n\nMTX3_multiply\n(m) (n) (r)");

            const mtx3Transpose = new vscode.CompletionItem('MTX3_transpose ', vscode.CompletionItemKind.Interface);
            mtx3Transpose.documentation = new vscode.MarkdownString("This function transposes a matrix.\nMTX3_transpose(m, r)   r =\ntrns(m)   Transpose of matrix\n\n\nMTX3_transpose (m) (r)");

            const mtx3Scale = new vscode.CompletionItem('MTX3_scale ', vscode.CompletionItemKind.Interface);
            mtx3Scale.documentation = new vscode.MarkdownString("This function scales a matrix with factor s.\nMTX3_scale(s,r)  \nr = (s*(u))   Scale a matrix by s\n\n\nMTX3_scale\n(s) (r)");

            const mtx3Sub = new vscode.CompletionItem('MTX3_sub ', vscode.CompletionItemKind.Interface);
            mtx3Sub.documentation = new vscode.MarkdownString("This function substracts one matrix from another matrix.\nMTX3_sub(m,n,r)  \nr = (m - n)   Matrix subtraction\n\n\nMTX3_sub (m)\n(n) (r)");

            const mtx3Add = new vscode.CompletionItem('MTX3_add ', vscode.CompletionItemKind.Interface);
            mtx3Add.documentation = new vscode.MarkdownString("This function performs a matrix addition.\nMTX3_add(m,n,r)   r =\n(m + n)   Matrix addition\n\n\nMTX3_add (m) (n) (r)");

            const mtx3VecMultiply = new vscode.CompletionItem('MTX3_vec_multiply ', vscode.CompletionItemKind.Interface);
            mtx3VecMultiply.documentation = new vscode.MarkdownString("This function performs a vector / matrix multiplication.\nMTX3_vec_multiply(u, m, w)\n  w = (u X m)   Vector/matrix\nmultiplication\n\n\nMTX3_vec_multiply (u) (m) (w)");

            const mtx3X = new vscode.CompletionItem('MTX3_x ', vscode.CompletionItemKind.Interface);
            mtx3X.documentation = new vscode.MarkdownString("This function returns the first column vector (X-vector) of a\nmatrix.\nMTX3_x(m, w)   w = (1st column)  \nFirst column vector of matrix\n\n\nMTX3_x (m) (w)");

            const mtx3Y = new vscode.CompletionItem('MTX3_y ', vscode.CompletionItemKind.Interface);
            mtx3Y.documentation = new vscode.MarkdownString("This function returns the second column vector (Y-vector) of a\nmatrix.\nMTX3_y(m, w)   w = (2nd column)  \nSecond column vector of matrix\n\n\nMTX3_y (m) (w)");

            const mtx3Z = new vscode.CompletionItem('MTX3_z ', vscode.CompletionItemKind.Interface);
            mtx3Z.documentation = new vscode.MarkdownString("This function returns the third column vector (Z-vector) of a\nmatrix.\nMTX3_z(m, w)   w = (3rd column)  \nThird column vector of matrix\n\n\nMTX3_z (m) (w)");



        // return all completion items as array
        return [mtx3InitXYZ, mtx3IsEqual, mtx3Multiply, mtx3Transpose, mtx3Scale, mtx3Sub, mtx3Add, mtx3VecMultiply, mtx3X, mtx3Y, mtx3Z];
        }
    }, "X"
    );


    const mom_variable_provider = vscode.languages.registerCompletionItemProvider('NX', {
        provideCompletionItems(document, position) {
            // get all text until the `position` and check if it reads `mom `
            // and if so then complete with the mom variables.
            let linePrefix = document.lineAt(position).text.substr(0, position.character);
            if (!linePrefix.endsWith('mom')) {
                //return undefined;
            }

            //mom Variables
            const momKin4thAxisAngOffset = new vscode.CompletionItem('mom_kin_4th_axis_ang_offset', vscode.CompletionItemKind.Variable);
            momKin4thAxisAngOffset.documentation = new vscode.MarkdownString("Defines an angular value that is added to the fourth\naxis rotary angle.&nbsp; This is used when a tool axis\nof (0,0,1) does not result in a position of zero\nposition.\n\nNumeric Value");

            const momKin4thAxisCenterOffset = new vscode.CompletionItem('mom_kin_4th_axis_center_offset', vscode.CompletionItemKind.Variable);
            momKin4thAxisCenterOffset.documentation = new vscode.MarkdownString("For four and five axis milling machines.&nbsp; Defines the distance\nfrom the center of the rotary table to machine tool\nzero position.\n\nNumeric Array(3)");

            const momKin4thAxisDirection = new vscode.CompletionItem('mom_kin_4th_axis_direction', vscode.CompletionItemKind.Variable);
            momKin4thAxisDirection.documentation = new vscode.MarkdownString("Defines how the fourth axis rotary positions will be output.&nbsp;\nThe mom variable mom_out_angle_pos(0) will contain the rotary value.&nbsp; For\nexample move table or head from 90 to 45 degrees.\nMAGNITUDE_DETERMINES_DIRECTION would output: Shortest 45, CLW 405, CCLW 45.&nbsp; SIGN_DETERMINES_DIRECTION\nwould output: Shortest -45, CLW 45, CCLW -45.&nbsp;\n\nMAGNITUDE_DETERMINES_DIRECTION, SIGN_DETERMINES_DIRECTION");

            const momKin4thAxisIncrSwitch = new vscode.CompletionItem('mom_kin_4th_axis_incr_switch', vscode.CompletionItemKind.Variable);
            momKin4thAxisIncrSwitch.documentation = new vscode.MarkdownString("Determines whether the fourth axis rotary coordinates will be incremental\nor absolute.&nbsp; This value is toggled ON, OFF in the\nmachine tool dialog in Post Builder.\n\nON (incremental) or OFF (absolute)");

            const momKin4thAxisLeader = new vscode.CompletionItem('mom_kin_4th_axis_leader', vscode.CompletionItemKind.Variable);
            momKin4thAxisLeader.documentation = new vscode.MarkdownString("The leader for the fourth axis.&nbsp; This is typically A,\nB or C.");

            const momKin4thAxisLimitAction = new vscode.CompletionItem('mom_kin_4th_axis_limit_action', vscode.CompletionItemKind.Variable);
            momKin4thAxisLimitAction.documentation = new vscode.MarkdownString("Defines the action that takes place when there is a\nrotary axis violation for the fourth axis.&nbsp; The options are\nto output a warning or to retract to a clearance\nplane, rotate the axis, and re-engage to the part.\n\nWarning or\nRetract / Reengage");

            const momKin4thAxisMaxLimit = new vscode.CompletionItem('mom_kin_4th_axis_max_limit', vscode.CompletionItemKind.Variable);
            momKin4thAxisMaxLimit.documentation = new vscode.MarkdownString("The maximum rotary position of the fourth axis");

            const momKin4thAxisMinIncr = new vscode.CompletionItem('mom_kin_4th_axis_min_incr', vscode.CompletionItemKind.Variable);
            momKin4thAxisMinIncr.documentation = new vscode.MarkdownString("Defines the resolution of your table or head.&nbsp; Enter one\nif your table or head positions to one degree increments.&nbsp;\nFor full contouring axis, enter 0.001.\n\nAny number greater than zero.");

            const momKin4thAxisMinLimit = new vscode.CompletionItem('mom_kin_4th_axis_min_limit', vscode.CompletionItemKind.Variable);
            momKin4thAxisMinLimit.documentation = new vscode.MarkdownString("The minimum rotary position of the fourth axis");

            const momKin4thAxisPlane = new vscode.CompletionItem('mom_kin_4th_axis_plane', vscode.CompletionItemKind.Variable);
            momKin4thAxisPlane.documentation = new vscode.MarkdownString("Defines the plane of rotation of the rotary axis.\n\nXY, ZX,\nYZ");

            const momKin4thAxisRotation = new vscode.CompletionItem('mom_kin_4th_axis_rotation', vscode.CompletionItemKind.Variable);
            momKin4thAxisRotation.documentation = new vscode.MarkdownString("Defines the direction of rotation of the rotary axis.&nbsp; Occasionally,\ntables are installed incorrectly.&nbsp; The setting allows you to compensate\nfor tables that rotate in a non-standard manner.&nbsp; In the\nXY plane, looking down the Z axis from positive to\nnegative, rotation to a larger angle is standard.&nbsp; In the\nZX plane, looking down the Y axis from positive to\nnegative, rotation to a larger angle is standard.  In\nthe YZ plane, looking down the X axis from positive\nto negative, rotation to a larger angle is standard.\n\nSTANDARD, REVERSE");

            const momKin4thAxisType = new vscode.CompletionItem('mom_kin_4th_axis_type', vscode.CompletionItemKind.Variable);
            momKin4thAxisType.documentation = new vscode.MarkdownString("Defines how the rotary axis rotates.&nbsp; If Head, then tool\nitself tilts about a pivot point.&nbsp; If Table, then the\npart rotates.\n\nHead or Table");

            const momKin4thAxisZero = new vscode.CompletionItem('mom_kin_4th_axis_zero', vscode.CompletionItemKind.Variable);
            momKin4thAxisZero.documentation = new vscode.MarkdownString("Defines an offset that will be added to the rotary\nposition. This offset is used when a (0,0,1) tool axis\nresults in an angle other than zero.\n\nNumeric Value");

            const momKin5thAxisAngOffset = new vscode.CompletionItem('mom_kin_5th_axis_ang_offset', vscode.CompletionItemKind.Variable);
            momKin5thAxisAngOffset.documentation = new vscode.MarkdownString("Defines an angular value that is added to the fifth\naxis rotary angle. This is used when a tool axis\nof (0,0,1) does not result in a position of zero\naxis rotation.\n\nNumeric Value");

            const momKin5thAxisCenterOffset = new vscode.CompletionItem('mom_kin_5th_axis_center_offset', vscode.CompletionItemKind.Variable);
            momKin5thAxisCenterOffset.documentation = new vscode.MarkdownString("Defines the distance from the center of rotation of the\nfourth axis to the center of rotation of the fifth\naxis.&nbsp; If the axis vector of the fourth axis passes\nthrough the center of the fifth axis, then this distance\nis zero.\n\nNumeric Array(3)");

            const momKin5thAxisDirection = new vscode.CompletionItem('mom_kin_5th_axis_direction', vscode.CompletionItemKind.Variable);
            momKin5thAxisDirection.documentation = new vscode.MarkdownString("Defines how the fifth axis rotary positions will be output.&nbsp;\nThe mom variable mom_out_angle_pos(1) will contain the rotary value.&nbsp; For\nexample move table or head from 90 to 45 degrees.\nMAGNITUDE_DETERMINES_DIRECTION would output: Shortest 45, CLW 405, CCLW 45.&nbsp; SIGN_DETERMINES_DIRECTION\nwould output: Shortest -45, CLW 45, CCLW -45.&nbsp;\n\nMAGNITUDE_DETERMINES_DIRECTION, SIGN_DETERMINES_DIRECTION");

            const momKin5thAxisIncrSwitch = new vscode.CompletionItem('mom_kin_5th_axis_incr_switch', vscode.CompletionItemKind.Variable);
            momKin5thAxisIncrSwitch.documentation = new vscode.MarkdownString("Determines whether the fifth axis rotary coordinates will be incremental\nor absolute.&nbsp; This value is toggled ON, OFF in the\nmachine tool dialog in Post Builder.\n\nON (incremental) or OFF (absolute)");

            const momKin5thAxisLeader = new vscode.CompletionItem('mom_kin_5th_axis_leader', vscode.CompletionItemKind.Variable);
            momKin5thAxisLeader.documentation = new vscode.MarkdownString("The leader for the fourth axis.&nbsp; This is typically A,\nB or C.");

            const momKin5thAxisLimitAction = new vscode.CompletionItem('mom_kin_5th_axis_limit_action', vscode.CompletionItemKind.Variable);
            momKin5thAxisLimitAction.documentation = new vscode.MarkdownString("Defines the action that takes place when there is a\nrotary axis violation for the fifth axis.&nbsp; The options are\nto output a warning or to retract to a clearance\nplane, rotate the axis, and re-engage to the part.\n\nWarning or\nRetract / Reengage");

            const momKin5thAxisMaxLimit = new vscode.CompletionItem('mom_kin_5th_axis_max_limit', vscode.CompletionItemKind.Variable);
            momKin5thAxisMaxLimit.documentation = new vscode.MarkdownString("The maximum rotary position of the fifth axis.\n\nAny number greater\nthan zero.");

            const momKin5thAxisMinIncr = new vscode.CompletionItem('mom_kin_5th_axis_min_incr', vscode.CompletionItemKind.Variable);
            momKin5thAxisMinIncr.documentation = new vscode.MarkdownString("Defines the resolution of your table or head.&nbsp; Enter one\nif your table or head positions to one degree increments.&nbsp;\nFor full contouring axis, enter 0.001.\n\nAny number greater than zero.");

            const momKin5thAxisMinLimit = new vscode.CompletionItem('mom_kin_5th_axis_min_limit', vscode.CompletionItemKind.Variable);
            momKin5thAxisMinLimit.documentation = new vscode.MarkdownString("The minimum rotary position of the fifth axis");

            const momKin5thAxisPlane = new vscode.CompletionItem('mom_kin_5th_axis_plane', vscode.CompletionItemKind.Variable);
            momKin5thAxisPlane.documentation = new vscode.MarkdownString("Defines the plane of rotation of the rotary axis.\n\nXY, ZX,\nYZ");

            const momKin5thAxisRotation = new vscode.CompletionItem('mom_kin_5th_axis_rotation', vscode.CompletionItemKind.Variable);
            momKin5thAxisRotation.documentation = new vscode.MarkdownString("Defines the direction of rotation of the rotary axis.&nbsp; Occasionally,\ntables are installed incorrectly.&nbsp; The setting allows you to compensate\nfor tables that rotate in a non-standard manner.&nbsp; In the\nXY plane, looking down the Z axis from positive to\nnegative, rotation to a larger angle is standard.&nbsp; In the\nZX plane, looking down the Y axis from positive to\nnegative, rotation to a larger angle is standard.  In\nthe YZ plane, looking down the X axis from positive\nto negative, rotation to a larger angle is standard.\n\nSTANDARD, REVERSE");

            const momKin5thAxisType = new vscode.CompletionItem('mom_kin_5th_axis_type', vscode.CompletionItemKind.Variable);
            momKin5thAxisType.documentation = new vscode.MarkdownString("Defines how the rotary axis rotates.&nbsp; If Head, then tool\nitself tilts about a pivot point.&nbsp; If Table, then the\npart rotates.\n\nHead or Table");

            const momKin5thAxisZero = new vscode.CompletionItem('mom_kin_5th_axis_zero', vscode.CompletionItemKind.Variable);
            momKin5thAxisZero.documentation = new vscode.MarkdownString("Defines an offset that will be added the rotary position.\nThis offset is used when a (0,0,1) tool axis results\nin an angle other than zero.\n\nNumeric Value");

            const momKinArcOutputMode = new vscode.CompletionItem('mom_kin_arc_output_mode', vscode.CompletionItemKind.Variable);
            momKinArcOutputMode.documentation = new vscode.MarkdownString("Defines how circles will be output by the post.&nbsp; Only\ncircles generated in the operation can be output as circles.&nbsp;\nLINEAR will output linear moves based on the tolerances defined\non the arc in the operation.&nbsp; QUADRANT will output circles\nonly on quadrant boundaries.&nbsp; FULL_CIRCLE will output arcs up to\n360 degrees. \n\nFULL_CIRCLE, QUADRANT, LINEAR");

            const momKinArcValidPlanes = new vscode.CompletionItem('mom_kin_arc_valid_planes', vscode.CompletionItemKind.Variable);
            momKinArcValidPlanes.documentation = new vscode.MarkdownString("Defines the planes in which arcs can be output.&nbsp; XYZ\nmeans XY, YZ or ZX.&nbsp; Lathe posts can only output\nin the XZ plane.&nbsp; ANY is not currently available.\n\nXYZ, XY,\nYZ, ZX, ANY");

            const momKinCaxisRotaryPos = new vscode.CompletionItem('mom_kin_caxis_rotary_pos', vscode.CompletionItemKind.Variable);
            momKinCaxisRotaryPos.documentation = new vscode.MarkdownString("Used for mill turns to establish a base C axis\nposition.\n\n0-360");

            const momKinClampTime = new vscode.CompletionItem('mom_kin_clamp_time', vscode.CompletionItemKind.Variable);
            momKinClampTime.documentation = new vscode.MarkdownString("Defines the time to be used in time calculations for\nclamping operations.\n\nAny number greater than or equal to zero.");

            const momKinCoordinateSystemType = new vscode.CompletionItem('mom_kin_coordinate_system_type', vscode.CompletionItemKind.Variable);
            momKinCoordinateSystemType.documentation = new vscode.MarkdownString("Defines the type of coordinate system defined in the operation.&nbsp;\nLOCAL is the default.&nbsp; This coordinate system type can be\nused to define a G54 type work coordinate system.&nbsp; MAIN\ncan be used to output coordinates that are relative to\nthe main or master coordinate system.&nbsp; The main coordinate system\nis defined as the one that defines the machine tool\nzero. CSYS defines a coordinate system that is local, but\nuses a postprocessor that outputs G68 or G7 (cycle 19)\nto define a working coordinate system.\n\nLOCAL, MAIN, or CSYS");

            const momKinDependentHead = new vscode.CompletionItem('mom_kin_dependent_head', vscode.CompletionItemKind.Variable);
            momKinDependentHead.documentation = new vscode.MarkdownString("For lathe only.&nbsp; Defines the name of the dependent head.&nbsp;\nThis name is specified on the TURRET UDE or the\nmachine dialog in the operation.&nbsp; When the dependent head is\nspecified in the operation, the distance from the dependent head\nto the independent head is applied. The distance is defined\nwith the mom variables mom_kin_ind_to_dependent_head_x and mom_kin_ind_to_dependent_head_z\n\nFRONT, REAR, RIGHT, LEFT,\nSIDE, SADDLE, NONE");

            const momKinHelicalArcOutputMode = new vscode.CompletionItem('mom_kin_helical_arc_output_mode', vscode.CompletionItemKind.Variable);
            momKinHelicalArcOutputMode.documentation = new vscode.MarkdownString("Defines how helix motion is output by NX Post.&nbsp; Only\nhelical motion in the operation can be output as helix\nblocks by the post.&nbsp; NX Post will output the helix\nas a series of linear GOTOs, a helix for every\nquadrant, a helix for each 360 degrees or one helix\nfor the entire circle. LINEAR will output the entire helix\nwith linear moves based on the tolerances defined for the\narc in the operation.&nbsp; QUADRANT will output a helix record\nfor each 90 degrees of helix.&nbsp; FULL_CIRCLE will output helix\nrecord for each 360 degrees of helix.&nbsp; END_POINT will ouput\nentire\nhelix&nbsp;\ninto\na\nsingle\nblock.&nbsp;\nEach\npostprocessor\nwill\nthen\nformat the helix data.\n\nFULL_CIRCLE, QUADRANT, LINEAR,END_POINT");

            const momKinHolder1OffsetX = new vscode.CompletionItem('mom_kin_holder1_offset_x', vscode.CompletionItemKind.Variable);
            momKinHolder1OffsetX.documentation = new vscode.MarkdownString("Defines the X value of the offset for the right\nangle head defined by HOLDER,");

            const momKinHolder1OffsetY = new vscode.CompletionItem('mom_kin_holder1_offset_y', vscode.CompletionItemKind.Variable);
            momKinHolder1OffsetY.documentation = new vscode.MarkdownString("Defines the Y value of the offset for the right\nangle head defined by HOLDER,");

            const momKinHolder1OffsetZ = new vscode.CompletionItem('mom_kin_holder1_offset_z', vscode.CompletionItemKind.Variable);
            momKinHolder1OffsetZ.documentation = new vscode.MarkdownString("Defines the Z value of the offset for the right\nangle head defined by HOLDER,");

            const momKinHolder1Orientation = new vscode.CompletionItem('mom_kin_holder1_orientation', vscode.CompletionItemKind.Variable);
            momKinHolder1Orientation.documentation = new vscode.MarkdownString("Defines the orientation of the right angle head.&nbsp; The right\nangle head may be defined along any of the principal\naxes. Up to six holders may be defined.&nbsp; Use the\nmom variables mom_kin_holder1_offset_x, mom_kin_holder1_offset_y and mom_kin_holder1_offset_z to define the distance\nfrom the gage point.&nbsp; The UDE LOAD/HOLDER,n may be used\nto activate the right angle head in an operation.\n\nPOSX, POSY,\nPOSZ, NEGX, NEGY, NEGZ");

            const momKinHolder2OffsetX = new vscode.CompletionItem('mom_kin_holder2_offset_x', vscode.CompletionItemKind.Variable);
            momKinHolder2OffsetX.documentation = new vscode.MarkdownString("Defines the X value of the offset for the right\nangle head defined by HOLDER,");

            const momKinHolder2OffsetY = new vscode.CompletionItem('mom_kin_holder2_offset_y', vscode.CompletionItemKind.Variable);
            momKinHolder2OffsetY.documentation = new vscode.MarkdownString("Defines the Y value of the offset for the right\nangle head defined by HOLDER,");

            const momKinHolder2OffsetZ = new vscode.CompletionItem('mom_kin_holder2_offset_z', vscode.CompletionItemKind.Variable);
            momKinHolder2OffsetZ.documentation = new vscode.MarkdownString("Defines the Z value of the offset for the right\nangle head defined by HOLDER,");

            const momKinHolder2Orientation = new vscode.CompletionItem('mom_kin_holder2_orientation', vscode.CompletionItemKind.Variable);
            momKinHolder2Orientation.documentation = new vscode.MarkdownString("Defines the orientation of the right angle head.&nbsp; The right\nangle head may be defined along any of the principal\naxes. Up to six holders may be defined.&nbsp; Use the\nmom variables mom_kin_holder1_offset_x, mom_kin_holder1_offset_y and mom_kin_holder1_offset_z to define the distance\nfrom the gage point.&nbsp; The UDE LOAD/HOLDER,n may be used\nto activate the right angle head in an operation.\n\nPOSX, POSY,\nPOSZ, NEGX, NEGY, NEGZ");

            const momKinHolder3OffsetX = new vscode.CompletionItem('mom_kin_holder3_offset_x', vscode.CompletionItemKind.Variable);
            momKinHolder3OffsetX.documentation = new vscode.MarkdownString("Defines the X value of the offset for the right\nangle head defined by HOLDER,");

            const momKinHolder3OffsetY = new vscode.CompletionItem('mom_kin_holder3_offset_y', vscode.CompletionItemKind.Variable);
            momKinHolder3OffsetY.documentation = new vscode.MarkdownString("Defines the Y value of the offset for the right\nangle head defined by HOLDER,");

            const momKinHolder3OffsetZ = new vscode.CompletionItem('mom_kin_holder3_offset_z', vscode.CompletionItemKind.Variable);
            momKinHolder3OffsetZ.documentation = new vscode.MarkdownString("Defines the Z value of the offset for the right\nangle head defined by HOLDER,");

            const momKinHolder3Orientation = new vscode.CompletionItem('mom_kin_holder3_orientation', vscode.CompletionItemKind.Variable);
            momKinHolder3Orientation.documentation = new vscode.MarkdownString("Defines the orientation of the right angle head.&nbsp; The right\nangle head may be defined along any of the principal\naxes. Up to six holders may be defined.&nbsp; Use the\nmom variables mom_kin_holder1_offset_x, mom_kin_holder1_offset_y and mom_kin_holder1_offset_z to define the distance\nfrom the gage point.&nbsp; The UDE LOAD/HOLDER,n may be used\nto activate the right angle head in an operation.\n\nPOSX, POSY,\nPOSZ, NEGX, NEGY, NEGZ");

            const momKinHolder4OffsetX = new vscode.CompletionItem('mom_kin_holder4_offset_x', vscode.CompletionItemKind.Variable);
            momKinHolder4OffsetX.documentation = new vscode.MarkdownString("Defines the X value of the offset for the right\nangle head defined by HOLDER,");

            const momKinHolder4OffsetY = new vscode.CompletionItem('mom_kin_holder4_offset_y', vscode.CompletionItemKind.Variable);
            momKinHolder4OffsetY.documentation = new vscode.MarkdownString("Defines the Y value of the offset for the right\nangle head defined by HOLDER,");

            const momKinHolder4OffsetZ = new vscode.CompletionItem('mom_kin_holder4_offset_z', vscode.CompletionItemKind.Variable);
            momKinHolder4OffsetZ.documentation = new vscode.MarkdownString("Defines the Z value of the offset for the right\nangle head defined by HOLDER,");

            const momKinHolder4Orientation = new vscode.CompletionItem('mom_kin_holder4_orientation', vscode.CompletionItemKind.Variable);
            momKinHolder4Orientation.documentation = new vscode.MarkdownString("Defines the orientation of the right angle head.&nbsp; The right\nangle head may be defined along any of the principal\naxes. Up to six holders may be defined.&nbsp; Use the\nmom variables mom_kin_holder1_offset_x, mom_kin_holder1_offset_y and mom_kin_holder1_offset_z to define the distance\nfrom the gage point.&nbsp; The UDE LOAD/HOLDER,n may be used\nto activate the right angle head in an operation.\n\nPOSX, POSY,\nPOSZ, NEGX, NEGY, NEGZ");

            const momKinHolder5OffsetX = new vscode.CompletionItem('mom_kin_holder5_offset_x', vscode.CompletionItemKind.Variable);
            momKinHolder5OffsetX.documentation = new vscode.MarkdownString("Defines the X value of the offset for the right\nangle head defined by HOLDER,");

            const momKinHolder5OffsetY = new vscode.CompletionItem('mom_kin_holder5_offset_y', vscode.CompletionItemKind.Variable);
            momKinHolder5OffsetY.documentation = new vscode.MarkdownString("Defines the Y value of the offset for the right\nangle head defined by HOLDER,");

            const momKinHolder5OffsetZ = new vscode.CompletionItem('mom_kin_holder5_offset_z', vscode.CompletionItemKind.Variable);
            momKinHolder5OffsetZ.documentation = new vscode.MarkdownString("Defines the Z value of the offset for the right\nangle head defined by HOLDER,");

            const momKinHolder5Orientation = new vscode.CompletionItem('mom_kin_holder5_orientation', vscode.CompletionItemKind.Variable);
            momKinHolder5Orientation.documentation = new vscode.MarkdownString("Defines the orientation of the right angle head.&nbsp; The right\nangle head may be defined along any of the principal\naxes. Up to six holders may be defined.&nbsp; Use the\nmom variables mom_kin_holder1_offset_x, mom_kin_holder1_offset_y and mom_kin_holder1_offset_z to define the distance\nfrom the gage point.&nbsp; The UDE LOAD/HOLDER,n may be used\nto activate the right angle head in an operation.\n\nPOSX, POSY,\nPOSZ, NEGX, NEGY, NEGZ");

            const momKinHolder6OffsetX = new vscode.CompletionItem('mom_kin_holder6_offset_x', vscode.CompletionItemKind.Variable);
            momKinHolder6OffsetX.documentation = new vscode.MarkdownString("Defines the X value of the offset for the right\nangle head defined by HOLDER,");

            const momKinHolder6OffsetY = new vscode.CompletionItem('mom_kin_holder6_offset_y', vscode.CompletionItemKind.Variable);
            momKinHolder6OffsetY.documentation = new vscode.MarkdownString("Defines the Y value of the offset for the right\nangle head defined by HOLDER,");

            const momKinHolder6OffsetZ = new vscode.CompletionItem('mom_kin_holder6_offset_z', vscode.CompletionItemKind.Variable);
            momKinHolder6OffsetZ.documentation = new vscode.MarkdownString("Defines the Z value of the offset for the right\nangle head defined by HOLDER,");

            const momKinHolder6Orientation = new vscode.CompletionItem('mom_kin_holder6_orientation', vscode.CompletionItemKind.Variable);
            momKinHolder6Orientation.documentation = new vscode.MarkdownString("Defines the orientation of the right angle head.&nbsp; The right\nangle head may be defined along any of the principal\naxes. Up to six holders may be defined.&nbsp; Use the\nmom variables mom_kin_holder1_offset_x, mom_kin_holder1_offset_y and mom_kin_holder1_offset_z to define the distance\nfrom the gage point.&nbsp; The UDE LOAD/HOLDER,n may be used\nto activate the right angle head in an operation.\n\nPOSX, POSY,\nPOSZ, NEGX, NEGY, NEGZ");

            const momKinIksUsage = new vscode.CompletionItem('mom_kin_iks_usage', vscode.CompletionItemKind.Variable);
            momKinIksUsage.documentation = new vscode.MarkdownString("Defines the version of inverse kinematics processing that is desired.&nbsp;\nThis defines how the X,Y,Z,I,J,K is converted to X,Y,Z,A,B for\nfour and five axis machine tools.&nbsp; A value of 0\nmeans that the legacy IKS (inverse kinematics solver) in NX2\nwill be used.&nbsp; A value of 1 means that the\nnew IKS available only in NX3 and later will be\nused. In Post Builder v3.4 and later mom_kin_iks_usage is set\nto 1 and the new IKS will be used \nNote that non-ortogonal axes and the head object are only\navailable with the new IKS.\n\n0 or 1");

            const momKinIndToDependentHeadX = new vscode.CompletionItem('mom_kin_ind_to_dependent_head_x', vscode.CompletionItemKind.Variable);
            momKinIndToDependentHeadX.documentation = new vscode.MarkdownString("For Lathe only, the distance from the independent head to\nthe dependent head along the X axis.\n\nNumeric Value");

            const momKinIndToDependentHeadZ = new vscode.CompletionItem('mom_kin_ind_to_dependent_head_z', vscode.CompletionItemKind.Variable);
            momKinIndToDependentHeadZ.documentation = new vscode.MarkdownString("For Lathe only, the distance from the independent head to\nthe dependent head along the X axis.\n\nNumeric Value");

            const momKinIndependentHead = new vscode.CompletionItem('mom_kin_independent_head', vscode.CompletionItemKind.Variable);
            momKinIndependentHead.documentation = new vscode.MarkdownString("For lathe only.&nbsp; Defines the name of the independent head.&nbsp;\nThis name is specified on the TURRET UDE or the\nmachine dialog in the operation.&nbsp; When the independent head is\nspecified in the operation the distance from the dependent head\nto the independent head is not applied . \n\nFRONT, REAR,\nRIGHT, LEFT, SIDE, SADDLE, NONE");

            const momKinIsTurboOutput = new vscode.CompletionItem('mom_kin_is_turbo_output', vscode.CompletionItemKind.Variable);
            momKinIsTurboOutput.documentation = new vscode.MarkdownString("Defines whether the post will use the special turbo block\ntemplates and ignore all custom commands for Linear, Circular and\nRapid moves.&nbsp; A special custom command needs to be imported\nfrom POSTBUILD/pblib/custom_command/ directory. Turbo mode will optimize post-process performance by\na factor of 5.\n\nTRUE or FALSE");

            const momKinLinearizationFlag = new vscode.CompletionItem('mom_kin_linearization_flag', vscode.CompletionItemKind.Variable);
            momKinLinearizationFlag.documentation = new vscode.MarkdownString("Defines whether linearization will be on by default. This can\nbe changed during post runtime with the LINTOL UDE.\n\nString");

            const momKinLinearizationTol = new vscode.CompletionItem('mom_kin_linearization_tol', vscode.CompletionItemKind.Variable);
            momKinLinearizationTol.documentation = new vscode.MarkdownString("The default linearization tolerance used when LINTOL/ON is specified or\nlinearization is turned on by default.\n\nAny number greater than zero.");

            const momKinMachineResolution = new vscode.CompletionItem('mom_kin_machine_resolution', vscode.CompletionItemKind.Variable);
            momKinMachineResolution.documentation = new vscode.MarkdownString("Defines the resolution used for rounding all coordinate data.&nbsp; By\ndefault this value is synchronized with the number of digits,\nif you change the number of digits, you must also\nchange this value.\n\nAny number greater than zero.");

            const momKinMachineType = new vscode.CompletionItem('mom_kin_machine_type', vscode.CompletionItemKind.Variable);
            momKinMachineType.documentation = new vscode.MarkdownString("Defines the basic machine type.&nbsp; The type of machine determines\nhow motion and post commands will be processed and output.\n\n3_axis_mill,\n3_axis_mill_turn, 4_axis_head, 4_axis_table,   5_axis_dual_table, 5_axis_dual_head,   5_axis_head_table,\n2_axis_wedm, 4_axis_wedm, 2_axis_lathe.");

            const momKinMaxArcRadius = new vscode.CompletionItem('mom_kin_max_arc_radius', vscode.CompletionItemKind.Variable);
            momKinMaxArcRadius.documentation = new vscode.MarkdownString("Defines largest arc radius that can be programmed.&nbsp; Any arc\nwith a radius larger than the maximum will output as\nlinear gotos.\n\nAny number greater than zero.");

            const momKinMaxFpm = new vscode.CompletionItem('mom_kin_max_fpm', vscode.CompletionItemKind.Variable);
            momKinMaxFpm.documentation = new vscode.MarkdownString("Defines the maximum IPM or MMPM allowed.\n\nAny number greater than\nzero.");

            const momKinMaxFpr = new vscode.CompletionItem('mom_kin_max_fpr', vscode.CompletionItemKind.Variable);
            momKinMaxFpr.documentation = new vscode.MarkdownString("Defines the maximum IPR or MMPR allowed.\n\nAny number greater than\nzero.");

            const momKinMinArcLength = new vscode.CompletionItem('mom_kin_min_arc_length', vscode.CompletionItemKind.Variable);
            momKinMinArcLength.documentation = new vscode.MarkdownString("Defines the smallest arc that can be output before the\npost defaults to linear interpolation.\n\nAny number greater than zero.");

            const momKinMinFpm = new vscode.CompletionItem('mom_kin_min_fpm', vscode.CompletionItemKind.Variable);
            momKinMinFpm.documentation = new vscode.MarkdownString("Defines the minimum IPM or MMPM that can be output.\n\nAny\nnumber greater than zero.");

            const momKinMinFpr = new vscode.CompletionItem('mom_kin_min_fpr', vscode.CompletionItemKind.Variable);
            momKinMinFpr.documentation = new vscode.MarkdownString("Defines the minimum IPR or MMPR that can be output.\n\nAny\nnumber greater than zero.");

            const momKinOutputUnit = new vscode.CompletionItem('mom_kin_output_unit', vscode.CompletionItemKind.Variable);
            momKinOutputUnit.documentation = new vscode.MarkdownString("Defines the units for all coordinate and feedrate output.&nbsp; NX\nPost will convert the input coordinates and feedrates units into\nthe mom_kin_output_unit if they are different.&nbsp;\n\nIN or MM");

            const momKinPivotDistVec = new vscode.CompletionItem('mom_kin_pivot_dist_vec', vscode.CompletionItemKind.Variable);
            momKinPivotDistVec.documentation = new vscode.MarkdownString("For four and five axis tilting head machine tools only.\nDefines the vector from the pivot point of the tilting\nrotary axis to gage point.&nbsp; This vector is added to\nthe tool length to determine the effective length of the\ntool.&nbsp; If the mom variable mom_kin_pivot_gauge_offset is also set, the\nmom variable mom_kin_pivot_dist_vec will be used. If mom_kin_pivot_gauge_offset is set\nand mom_kin_pivot_dist_vec is not set, then the post will use\nthe vector (0,0,mom_kin_pivot_gauge_offset) as the pivot offset vector.\n\nNumeric Array(3)");

            const momKinPivotGaugeOffset = new vscode.CompletionItem('mom_kin_pivot_gauge_offset', vscode.CompletionItemKind.Variable);
            momKinPivotGaugeOffset.documentation = new vscode.MarkdownString("For four and five axis tilting head machine tools only.\nDefines the distance from the pivot point of the tilting\nrotary axis to gage point.&nbsp; This value can be negative.&nbsp;\nThis value is added to the tool length to determine\nthe effective length of the tool.\n\nNumeric Value");

            const momKinRapidFeedRate = new vscode.CompletionItem('mom_kin_rapid_feed_rate', vscode.CompletionItemKind.Variable);
            momKinRapidFeedRate.documentation = new vscode.MarkdownString("Defines the rapid traverse for the machine tool.&nbsp; This value\nis used for time calculations for all rapid and positioning\nmoves.\n\nAny number greater than or equal to zero.");

            const momKinReadAheadNextMotion = new vscode.CompletionItem('mom_kin_read_ahead_next_motion', vscode.CompletionItemKind.Variable);
            momKinReadAheadNextMotion.documentation = new vscode.MarkdownString("Defines whether the post will read ahead for the next\nmotion. If this variable is defined to any value, the\nread ahead will take place.&nbsp; The read ahead will also\nkeep track of all post commands encountered while reading ahead.&nbsp;\nSee the variables in the class Read_Ahead for details.\n\nString");

            const momKinReengageDistance = new vscode.CompletionItem('mom_kin_reengage_distance', vscode.CompletionItemKind.Variable);
            momKinReengageDistance.documentation = new vscode.MarkdownString("Used by the function that automatically retracts and re-engages when\na rotary limit is violated.&nbsp; Establishes the distance above the\npart along the spindle axis to re-engage.\n\nAny number greater than\nor equal to zero.");

            const momKinRetractPlane = new vscode.CompletionItem('mom_kin_retract_plane', vscode.CompletionItemKind.Variable);
            momKinRetractPlane.documentation = new vscode.MarkdownString("Used by the function that automatically retracts and re-engages when\na rotary limit is violated.&nbsp; Establishes either a cylindrical clearance\nfor four axis or a spherical clearance for five axis\ndistance above the part for the tool to retract.&nbsp; The\ndistance is measured from the center.\n\nAny number greater than or\nequal to zero.");

            const momKinRotaryReengageFeedrate = new vscode.CompletionItem('mom_kin_rotary_reengage_feedrate', vscode.CompletionItemKind.Variable);
            momKinRotaryReengageFeedrate.documentation = new vscode.MarkdownString("Used by the function that automatically retracts and re-engages when\na rotary limit is violated.&nbsp; Establishes the Feedrate used to\nre-engage the part after the retraction has taken place.\n\nAny number\ngreater than zero.");

            const momKinSpindleAxis = new vscode.CompletionItem('mom_kin_spindle_axis', vscode.CompletionItemKind.Variable);
            momKinSpindleAxis.documentation = new vscode.MarkdownString("Defines a vector that establishes the spindle axis of the\nmachine tool.&nbsp; For three axis posts it is always (0,0,1).\nMay be set to (1,0,0) or (-1,0,0) for mill turns.&nbsp;\nOtherwise it is set to (0,0,1).&nbsp; Is used for simulated\ncycles, rotary axis re-engage and mill turns.\n\nUnit vector.");

            const momKinToolChangeTime = new vscode.CompletionItem('mom_kin_tool_change_time', vscode.CompletionItemKind.Variable);
            momKinToolChangeTime.documentation = new vscode.MarkdownString("Defines the time to be added to total machine time\nfor tool changes.\n\nAny number greater than or equal to zero.");

            const momKinToolTrackingHeight = new vscode.CompletionItem('mom_kin_tool_tracking_height', vscode.CompletionItemKind.Variable);
            momKinToolTrackingHeight.documentation = new vscode.MarkdownString("For four or five axis milling machines only.&nbsp; Defines the\nheight on the tool where distance calculations will be made.&nbsp;\nThis is very useful when swarfing.&nbsp; The default value is\nzero, which represents the tool tip.\n\nAny number greater than or\nequal to zero.");

            const momKinWireTiltOutputType = new vscode.CompletionItem('mom_kin_wire_tilt_output_type', vscode.CompletionItemKind.Variable);
            momKinWireTiltOutputType.documentation = new vscode.MarkdownString("Defines how the post will output four axis wire EDM.&nbsp;\nIf ANGLES, then mom_pos(3) and mom_pos(4) will represent the Q\nand R words for the Agie type machines.&nbsp; If COORDINATES,\nthen&nbsp; mom_pos(3) and mom_pos(4) will represent the U and V\nvalues for the Mitsubishi type machines or AGIE Vision type\nmachines. These values are incremental from mom_pos(1) and mom_pos(2) respectively.\n\nANGLES,\nCOORDINATES");

            const momKinXAxisLimit = new vscode.CompletionItem('mom_kin_x_axis_limit', vscode.CompletionItemKind.Variable);
            momKinXAxisLimit.documentation = new vscode.MarkdownString("Maximum travel for the X axis. Use the custom command\npb_cmd_check_travel_limits.tcl to generate warnings.\n\nAny number greater than or equal to\nzero.");

            const momKinYAxisLimit = new vscode.CompletionItem('mom_kin_y_axis_limit', vscode.CompletionItemKind.Variable);
            momKinYAxisLimit.documentation = new vscode.MarkdownString("Maximum travel for the Y axis. Use the custom command\npb_cmd_check_travel_limits.tcl to generate warnings.\n\nAny number greater than or equal to\nzero.");

            const momKinZAxisLimit = new vscode.CompletionItem('mom_kin_z_axis_limit', vscode.CompletionItemKind.Variable);
            momKinZAxisLimit.documentation = new vscode.MarkdownString("Maximum travel for the Z axis. Use the custom command\npb_cmd_check_travel_limits.tcl to generate warnings.\n\nAny number greater than or equal to\nzero.");

            const momAuxfun = new vscode.CompletionItem('mom_auxfun', vscode.CompletionItemKind.Variable);
            momAuxfun.documentation = new vscode.MarkdownString("The value entered in AUXFUN UDE.\n\nAny number greater than or\nequal to zero.");

            const momAuxfunText = new vscode.CompletionItem('mom_auxfun_text', vscode.CompletionItemKind.Variable);
            momAuxfunText.documentation = new vscode.MarkdownString("The appended text entered in the AUXFUN UDE.\n\nAny string 66\ncharacters or less.");

            const momAuxfunTextDefined = new vscode.CompletionItem('mom_auxfun_text_defined', vscode.CompletionItemKind.Variable);
            momAuxfunTextDefined.documentation = new vscode.MarkdownString("Flag defining whether AUXFUN appended text has been entered.\n\n0 (no\ntext), 1 (text defined)");

            const momAxisPosition = new vscode.CompletionItem('mom_axis_position', vscode.CompletionItemKind.Variable);
            momAxisPosition.documentation = new vscode.MarkdownString("The axis value for set_axis UDE.\n\nZAXIS or WAXIS");

            const momAxisPositionValue = new vscode.CompletionItem('mom_axis_position_value', vscode.CompletionItemKind.Variable);
            momAxisPositionValue.documentation = new vscode.MarkdownString("The position for the SET/ZAXIS,n or SET/WAXIS,n in the set_axis\nUDE");

            const momAxisPositionValueDefined = new vscode.CompletionItem('mom_axis_position_value_defined', vscode.CompletionItemKind.Variable);
            momAxisPositionValueDefined.documentation = new vscode.MarkdownString("Flag defining if the set_axis position has been defined.\n\n0 (no\ntext), 1 (text defined)");

            const momClampAxis = new vscode.CompletionItem('mom_clamp_axis', vscode.CompletionItemKind.Variable);
            momClampAxis.documentation = new vscode.MarkdownString("The axis option selected from CLAMP UDE.  The AUTO\noption will initiate auto-clamping in Post Builder created four axis\nposts.\n\nXAXIS, YAXIS, ZAXIS, AAXIS, BAXIS, CAXIS, AUTO");

            const momClampStatus = new vscode.CompletionItem('mom_clamp_status', vscode.CompletionItemKind.Variable);
            momClampStatus.documentation = new vscode.MarkdownString("Clamping status of the selected axis.\n\nON, OFF, AXISON, AXISOFF");

            const momClampText = new vscode.CompletionItem('mom_clamp_text', vscode.CompletionItemKind.Variable);
            momClampText.documentation = new vscode.MarkdownString("The appended text entered in the CLAMP UDE.\n\nAny string 66\ncharacters or less.");

            const momClampTextDefined = new vscode.CompletionItem('mom_clamp_text_defined', vscode.CompletionItemKind.Variable);
            momClampTextDefined.documentation = new vscode.MarkdownString("Flag defining whether CLAMP appended text has been entered.\n\n0 (no\ntext), 1 (text defined)");

            const momCoolantMode = new vscode.CompletionItem('mom_coolant_mode', vscode.CompletionItemKind.Variable);
            momCoolantMode.documentation = new vscode.MarkdownString("Defines the type of coolant desired.\n\nON, FLOOD, MIST, TAP, THRU");

            const momCoolantText = new vscode.CompletionItem('mom_coolant_text', vscode.CompletionItemKind.Variable);
            momCoolantText.documentation = new vscode.MarkdownString("The appended text entered in the COOLNT UDE.\n\nAny string 66\ncharacters or less.");

            const momCoolantTextDefined = new vscode.CompletionItem('mom_coolant_text_defined', vscode.CompletionItemKind.Variable);
            momCoolantTextDefined.documentation = new vscode.MarkdownString("Flag defining whether COOLNT appended text has been entered.\n\n0 (no\ntext), 1 (text defined)");

            const momCoordinateOutputMode = new vscode.CompletionItem('mom_coordinate_output_mode', vscode.CompletionItemKind.Variable);
            momCoordinateOutputMode.documentation = new vscode.MarkdownString("For mill turn only. Defines the status of the UDE\nSET/POLAR.  ON means that the output will be in\npolar coordinates. OFF means the output will be in normal\nCartesian coordinates.\n\nON, OFF ");

            const momCutWireText = new vscode.CompletionItem('mom_cut_wire_text', vscode.CompletionItemKind.Variable);
            momCutWireText.documentation = new vscode.MarkdownString("The appended text entered in the CUT/WIRE UDE.\n\nAny string 66\ncharacters or less.");

            const momCutWireTextDefined = new vscode.CompletionItem('mom_cut_wire_text_defined', vscode.CompletionItemKind.Variable);
            momCutWireTextDefined.documentation = new vscode.MarkdownString("Flag defining whether CUT/WIRE appended text has been entered.\n\n0 (no\ntext), 1 (text defined)");

            const momCutcomAdjustRegister = new vscode.CompletionItem('mom_cutcom_adjust_register', vscode.CompletionItemKind.Variable);
            momCutcomAdjustRegister.documentation = new vscode.MarkdownString("The value of the cutcom adjust register in CUTCOM UDE.\n\nAny\nnumber greater than or equal to zero.");

            const momCutcomAdjustRegisterDefined = new vscode.CompletionItem('mom_cutcom_adjust_register_defined', vscode.CompletionItemKind.Variable);
            momCutcomAdjustRegisterDefined.documentation = new vscode.MarkdownString("Flag defining if the cutcom adjust register has been specified\nin CUTCOM UDE.\n\n0 (no), 1 (yes)");

            const momCutcomAngle = new vscode.CompletionItem('mom_cutcom_angle', vscode.CompletionItemKind.Variable);
            momCutcomAngle.documentation = new vscode.MarkdownString("Angle specified for Engage/Retract cutcom method in the machine control\ndialog in the operation.\n\nNumeric Value");

            const momCutcomDistance = new vscode.CompletionItem('mom_cutcom_distance', vscode.CompletionItemKind.Variable);
            momCutcomDistance.documentation = new vscode.MarkdownString("Cutcom distance specified for Engage/Retract cutcom method in the machine\ncontrol dialog in the operation.\n\nAny number greater than or equal\nto zero.");

            const momCutcomMode = new vscode.CompletionItem('mom_cutcom_mode', vscode.CompletionItemKind.Variable);
            momCutcomMode.documentation = new vscode.MarkdownString("Defines the cutcom direction in the CUTCOM UDE.\n\nLEFT, RIGHT, ON\n");

            const momCutcomPlane = new vscode.CompletionItem('mom_cutcom_plane', vscode.CompletionItemKind.Variable);
            momCutcomPlane.documentation = new vscode.MarkdownString("Defines the cutcom plane in the CUTCOM UDE.\n\nNONE, XYPLAN, YZPLAN,\nZXPLAN");

            const momCutcomPlaneOutputFlag = new vscode.CompletionItem('mom_cutcom_plane_output_flag', vscode.CompletionItemKind.Variable);
            momCutcomPlaneOutputFlag.documentation = new vscode.MarkdownString("Flag defining if the cutcom plane has been specified in\nCUTCOM UDE.\n\n0 (no text), 1 (text defined)");

            const momCutcomRegister = new vscode.CompletionItem('mom_cutcom_register', vscode.CompletionItemKind.Variable);
            momCutcomRegister.documentation = new vscode.MarkdownString("The cutcom register defined in the machine control dialog in\nthe operation.  May be overridden by the cutcom register\non the tool.\n\nAny number greater than or equal to zero.");

            const momCutcomRegisterOutputFlag = new vscode.CompletionItem('mom_cutcom_register_output_flag', vscode.CompletionItemKind.Variable);
            momCutcomRegisterOutputFlag.documentation = new vscode.MarkdownString("Flag defining whether the cutcom register has been specified in\nthe machine control dialog in the operation.\n\n0 (no text), 1\n(text defined)");

            const momCutcomText = new vscode.CompletionItem('mom_cutcom_text', vscode.CompletionItemKind.Variable);
            momCutcomText.documentation = new vscode.MarkdownString("The appended text entered in CUTCOM UDE.\n\nAny string 66 characters\nor less.");

            const momCutcomTextDefined = new vscode.CompletionItem('mom_cutcom_text_defined', vscode.CompletionItemKind.Variable);
            momCutcomTextDefined.documentation = new vscode.MarkdownString("Flag defining whether CUTCOM appended text has been entered.\n\n0 (no\ntext), 1 (text defined)");

            const momCutcomType = new vscode.CompletionItem('mom_cutcom_type', vscode.CompletionItemKind.Variable);
            momCutcomType.documentation = new vscode.MarkdownString("The type of cutter compensation requested in the machine control\ndialog.\n\n1 (Retract/Engage), 2 (Wall)");

            const momDefSequenceFrequency = new vscode.CompletionItem('mom_def_sequence_frequency', vscode.CompletionItemKind.Variable);
            momDefSequenceFrequency.documentation = new vscode.MarkdownString("The initial value of the frequency parameter for the SEQUENCE\ncommand in the definition file.\n\nAny number greater than zero.");

            const momDefSequenceIncrement = new vscode.CompletionItem('mom_def_sequence_increment', vscode.CompletionItemKind.Variable);
            momDefSequenceIncrement.documentation = new vscode.MarkdownString("The initial value of the increment parameter for the SEQUENCE\ncommand in the definition file.\n\nAny number greater than zero.");

            const momDefSequenceMaximum = new vscode.CompletionItem('mom_def_sequence_maximum', vscode.CompletionItemKind.Variable);
            momDefSequenceMaximum.documentation = new vscode.MarkdownString("The initial value of the maximum sequence number parameter for\nthe SEQUENCE command in the definition file.\n\nAny number greater than\nzero.");

            const momDefSequenceStart = new vscode.CompletionItem('mom_def_sequence_start', vscode.CompletionItemKind.Variable);
            momDefSequenceStart.documentation = new vscode.MarkdownString("The initial value of the start sequence number for the\nSEQUENCE command in the definition file.\n\nAny number greater than zero.");

            const momDelayMode = new vscode.CompletionItem('mom_delay_mode', vscode.CompletionItemKind.Variable);
            momDelayMode.documentation = new vscode.MarkdownString("Defines the mom variable that will be used for the\ndelay UDE.  Seconds will use mom_delay_value, revolutions will use\nthe mom_delay_revs \n\nSECONDS or REVOLUTIONS");

            const momDelayRevs = new vscode.CompletionItem('mom_delay_revs', vscode.CompletionItemKind.Variable);
            momDelayRevs.documentation = new vscode.MarkdownString("The delay value in revolutions for revolutions mode in the\nDELAY UDE.\n\nAny number greater than zero.");

            const momDelayText = new vscode.CompletionItem('mom_delay_text', vscode.CompletionItemKind.Variable);
            momDelayText.documentation = new vscode.MarkdownString("The appended text entered in DELAY UDE.\n\nAny string 66 characters\nor less.");

            const momDelayTextDefined = new vscode.CompletionItem('mom_delay_text_defined', vscode.CompletionItemKind.Variable);
            momDelayTextDefined.documentation = new vscode.MarkdownString("Flag defining whether DELAY appended text has been entered.\n\n0 (no\ntext), 1 (text defined)");

            const momDelayValue = new vscode.CompletionItem('mom_delay_value', vscode.CompletionItemKind.Variable);
            momDelayValue.documentation = new vscode.MarkdownString("The delay value in seconds for seconds mode in the\nDELAY UDE.\n\nAny number greater than zero.");

            const momFlushGuides = new vscode.CompletionItem('mom_flush_guides', vscode.CompletionItemKind.Variable);
            momFlushGuides.documentation = new vscode.MarkdownString("For Wire EDM only, setting of the FLUSH guide parameter.\n\nNONE,\nUPPER, LOWER, ALL");

            const momFlushPressure = new vscode.CompletionItem('mom_flush_pressure', vscode.CompletionItemKind.Variable);
            momFlushPressure.documentation = new vscode.MarkdownString("For Wire EDM only, setting of the FLUSH pressure parameter.\n\nNONE,\nLOW, MEDIUM, HIGH, REGISTER");

            const momFlushRegister = new vscode.CompletionItem('mom_flush_register', vscode.CompletionItemKind.Variable);
            momFlushRegister.documentation = new vscode.MarkdownString("For Wire EDM only, setting of the FLUSH register parameter.\n\nAny\nnumber greater than or equal to zero.");

            const momFlushTank = new vscode.CompletionItem('mom_flush_tank', vscode.CompletionItemKind.Variable);
            momFlushTank.documentation = new vscode.MarkdownString("For Wire EDM only, setting of the FLUSH/TANK parameter.\n\nIN, OUT");

            const momFlushTankText = new vscode.CompletionItem('mom_flush_tank_text', vscode.CompletionItemKind.Variable);
            momFlushTankText.documentation = new vscode.MarkdownString("The appended text entered in FLUSH/TANK UDE.\n\nAny string 66 characters\nor less.");

            const momFlushTankTextDefined = new vscode.CompletionItem('mom_flush_tank_text_defined', vscode.CompletionItemKind.Variable);
            momFlushTankTextDefined.documentation = new vscode.MarkdownString("Flag defining whether FLUSH/TANK appended text has been entered.\n\n0 (no\ntext), 1 (text defined)");

            const momHeadName = new vscode.CompletionItem('mom_head_name', vscode.CompletionItemKind.Variable);
            momHeadName.documentation = new vscode.MarkdownString("This value is used to switch between posts for linked\nposts.\n\nAny string 66 characters or less.");

            const momHeadNameDefined = new vscode.CompletionItem('mom_head_name_defined', vscode.CompletionItemKind.Variable);
            momHeadNameDefined.documentation = new vscode.MarkdownString("Flag defining whether HEAD has been programmed.\n\n0 (no ), 1\n(yes)");

            const momHeadText = new vscode.CompletionItem('mom_head_text', vscode.CompletionItemKind.Variable);
            momHeadText.documentation = new vscode.MarkdownString("The appended text entered in SELECT/HEAD UDE.\n\nAny string 66 characters\nor less.");

            const momHeadTextDefined = new vscode.CompletionItem('mom_head_text_defined', vscode.CompletionItemKind.Variable);
            momHeadTextDefined.documentation = new vscode.MarkdownString("Flag defining whether SELECT/HEAD appended text has been entered.\n\n0 (no\ntext), 1 (text defined)");

            const momHeadType = new vscode.CompletionItem('mom_head_type', vscode.CompletionItemKind.Variable);
            momHeadType.documentation = new vscode.MarkdownString("Value of the head for the SELECT/HEAD UDE.\n\nFRONT,REAR,RIGHT,LEFT,SIDE,SADDLE");

            const momLoadToolNumberDefined = new vscode.CompletionItem('mom_load_tool_number_defined', vscode.CompletionItemKind.Variable);
            momLoadToolNumberDefined.documentation = new vscode.MarkdownString("Flag defining if the tool number has been specified in\nthe LOAD or TURRET UDE.\n\n0 (no text), 1 (text defined)");

            const momLockAxis = new vscode.CompletionItem('mom_lock_axis', vscode.CompletionItemKind.Variable);
            momLockAxis.documentation = new vscode.MarkdownString("The axis to be locked for the SET/LOCK UDE. \nThe post will convert the FOURTH and FIFTH parameters into\nthe applicable rotary axis (A,B or C). For five axis\nmachine tools with the fifth axis rotation method set to\nreverse, set mom_kin_rotary_axis_method to zero. To do this, uncomment the\nfollowing line in the post builder custom PB_CMD_revise_new_iks file: set\nmom_kin_rotary_axis_method \"ZERO\"\n\nXAXIS, YAXIS, ZAXIS, AAXIS, BAXIS, CAXIS, FOURTH, FIFTH");

            const momLockAxisPlane = new vscode.CompletionItem('mom_lock_axis_plane', vscode.CompletionItemKind.Variable);
            momLockAxisPlane.documentation = new vscode.MarkdownString("The plane to be locked for the SET/LOCK UDE. \nYou must enter a valid plane for five axis machines.\nYou do not need to enter an axis for four\naxis machines.\n\nXYPLAN, YZPLAN, ZXPLAN, NONE.");

            const momLockAxisValue = new vscode.CompletionItem('mom_lock_axis_value', vscode.CompletionItemKind.Variable);
            momLockAxisValue.documentation = new vscode.MarkdownString("The position or angle to lock the axis or plane");

            const momLockAxisValueDefined = new vscode.CompletionItem('mom_lock_axis_value_defined', vscode.CompletionItemKind.Variable);
            momLockAxisValueDefined.documentation = new vscode.MarkdownString("Flag defining wheter the lock axis value has been entered.\n\n0\n(no ), 1 (yes)");

            const momModesText = new vscode.CompletionItem('mom_modes_text', vscode.CompletionItemKind.Variable);
            momModesText.documentation = new vscode.MarkdownString("The appended text entered in the SET/MODE UDE.\n\nAny string 66\ncharacters or less.");

            const momModesTextDefined = new vscode.CompletionItem('mom_modes_text_defined', vscode.CompletionItemKind.Variable);
            momModesTextDefined.documentation = new vscode.MarkdownString("Flag defining whether SET/MODE appended text has been entered.\n\n0 (no\ntext), 1 (text defined)");

            const momNumberOfRanges = new vscode.CompletionItem('mom_number_of_ranges', vscode.CompletionItemKind.Variable);
            momNumberOfRanges.documentation = new vscode.MarkdownString("You can use this variable to define the maximum number\nof ranges for the custom commands PB_CMD_spindle_sfm_range_select  or PB_CMD_spindle_rpm_range_select.\n\n0-9");

            const momOperatorMessage = new vscode.CompletionItem('mom_operator_message', vscode.CompletionItemKind.Variable);
            momOperatorMessage.documentation = new vscode.MarkdownString("The text of the operator message.  The post will\nadd a control out string to the beginning and a\ncontrol out string to the end.  You can specify\nthese in Post Builder. \n\nAny string 66 characters or less.");

            const momOperatorMessageDefined = new vscode.CompletionItem('mom_operator_message_defined', vscode.CompletionItemKind.Variable);
            momOperatorMessageDefined.documentation = new vscode.MarkdownString("Flag defining whether the operator message text has been entered.\n\n0\n(no ), 1 (yes)");

            const momOpskipText = new vscode.CompletionItem('mom_opskip_text', vscode.CompletionItemKind.Variable);
            momOpskipText.documentation = new vscode.MarkdownString("The appended text entered in the OPSKIP UDE.\n\nAny string 66\ncharacters or less.");

            const momOpskipTextDefined = new vscode.CompletionItem('mom_opskip_text_defined', vscode.CompletionItemKind.Variable);
            momOpskipTextDefined.documentation = new vscode.MarkdownString("Flag defining whether OPSKIP appended text has been entered.\n\n0 (no\ntext), 1 (text defined)");

            const momOpstopText = new vscode.CompletionItem('mom_opstop_text', vscode.CompletionItemKind.Variable);
            momOpstopText.documentation = new vscode.MarkdownString("The appended text entered in the OPSTOP UDE.\n\nAny string 66\ncharacters or less.");

            const momOpstopTextDefined = new vscode.CompletionItem('mom_opstop_text_defined', vscode.CompletionItemKind.Variable);
            momOpstopTextDefined.documentation = new vscode.MarkdownString("Flag defining whether OPSTOP appended text has been entered.\n\n0 (no\ntext), 1 (text defined)");

            const momOrigin = new vscode.CompletionItem('mom_origin', vscode.CompletionItemKind.Variable);
            momOrigin.documentation = new vscode.MarkdownString("For four and five axis posts, defines the distance from\nthe origin of the MCS to the center of the\nrotary table. For other posts, an offset from the MCS\norigin to the machine tool coordinate center.\n\nNumeric Array(3)");

            const momOriginText = new vscode.CompletionItem('mom_origin_text', vscode.CompletionItemKind.Variable);
            momOriginText.documentation = new vscode.MarkdownString("The appended text entered in the ORIGIN UDE.\n\nAny string 66\ncharacters or less.");

            const momOriginTextDefined = new vscode.CompletionItem('mom_origin_text_defined', vscode.CompletionItemKind.Variable);
            momOriginTextDefined.documentation = new vscode.MarkdownString("Flag defining whether ORIGIN appended text has been entered.\n\n0 (no\ntext), 1 (text defined)");

            const momOverideOperParam = new vscode.CompletionItem('mom_overide_oper_param', vscode.CompletionItemKind.Variable);
            momOverideOperParam.documentation = new vscode.MarkdownString("From the Cutter Compensation UDE and Tool Length Compensation UDE.\n\n0\n= no, 1 = yes");

            const momParallelToAxis = new vscode.CompletionItem('mom_parallel_to_axis', vscode.CompletionItemKind.Variable);
            momParallelToAxis.documentation = new vscode.MarkdownString("The value of the SET/MODE UDE to control how parallel\naxes will be output in the post.\n\nZAXIS, WAXIS or VAXIS.");

            const momPowerText = new vscode.CompletionItem('mom_power_text', vscode.CompletionItemKind.Variable);
            momPowerText.documentation = new vscode.MarkdownString("The appended text entered in the POWER UDE.\n\nAny string 66\ncharacters or less.");

            const momPowerTextDefined = new vscode.CompletionItem('mom_power_text_defined', vscode.CompletionItemKind.Variable);
            momPowerTextDefined.documentation = new vscode.MarkdownString("Flag defining whether POWER appended text has been entered.\n\n0 (no\ntext), 1 (text defined)");

            const momPowerValue = new vscode.CompletionItem('mom_power_value', vscode.CompletionItemKind.Variable);
            momPowerValue.documentation = new vscode.MarkdownString("For Wire EDM only, the power setting for wire EDM\noperations.\n\nAny number greater than or equal to zero.");

            const momPprint = new vscode.CompletionItem('mom_pprint', vscode.CompletionItemKind.Variable);
            momPprint.documentation = new vscode.MarkdownString("The text of the PPRINT UDE. The post will replace\nthe first \"(\" with a control out string to the\nbeginning and the next \")\" with a control out string.\n You can specify the control out and control in\nstrings in Post Builder. \n\nAny string 66 characters or less.");

            const momPprintDefined = new vscode.CompletionItem('mom_pprint_defined', vscode.CompletionItemKind.Variable);
            momPprintDefined.documentation = new vscode.MarkdownString("Flag defining whether the PPRINT UDE text has been entered.\n\n0\n(no ), 1 (yes)");

            const momPrefun = new vscode.CompletionItem('mom_prefun', vscode.CompletionItemKind.Variable);
            momPrefun.documentation = new vscode.MarkdownString("The value of the PREFUN UDE.\n\nAny number greater than or\nequal to zero.");

            const momPrefunText = new vscode.CompletionItem('mom_prefun_text', vscode.CompletionItemKind.Variable);
            momPrefunText.documentation = new vscode.MarkdownString("The appended text entered in the PREFUN UDE.\n\nAny string 66\ncharacters or less.");

            const momPrefunTextDefined = new vscode.CompletionItem('mom_prefun_text_defined', vscode.CompletionItemKind.Variable);
            momPrefunTextDefined.documentation = new vscode.MarkdownString("Flag defining whether PREFUN appended text has been entered.\n\n0 (no\ntext), 1 (text defined)");

            const momRotateAxisType = new vscode.CompletionItem('mom_rotate_axis_type', vscode.CompletionItemKind.Variable);
            momRotateAxisType.documentation = new vscode.MarkdownString("Defines the axis to be rotated for ROTATE UDE.\n\nTABLE, HEAD,\nAAXIS, BAXIS, CAXIS");

            const momRotationAngle = new vscode.CompletionItem('mom_rotation_angle', vscode.CompletionItemKind.Variable);
            momRotationAngle.documentation = new vscode.MarkdownString("Defines the angle to rotate to for the ROTATE UDE.\n The value may be incremental, absolute or to a\nmodulo 360 angle.\n\nNumeric Value");

            const momRotationAngleDefined = new vscode.CompletionItem('mom_rotation_angle_defined', vscode.CompletionItemKind.Variable);
            momRotationAngleDefined.documentation = new vscode.MarkdownString("Flag defining if the ROTATE angle has been entered.\n\n0 (no\n), 1 (yes)");

            const momRotationDirection = new vscode.CompletionItem('mom_rotation_direction', vscode.CompletionItemKind.Variable);
            momRotationDirection.documentation = new vscode.MarkdownString("Defines the direction to rotate the table for the ROTATE\nUDE.\n\nCLW, CCLW, NONE");

            const momRotationMode = new vscode.CompletionItem('mom_rotation_mode', vscode.CompletionItemKind.Variable);
            momRotationMode.documentation = new vscode.MarkdownString("Defines how the mom_rotation_angle will be applied.\n\nNONE, ABSOLUTE, INCREMENTAL, ATANGLE.");

            const momRotationReferenceMode = new vscode.CompletionItem('mom_rotation_reference_mode', vscode.CompletionItemKind.Variable);
            momRotationReferenceMode.documentation = new vscode.MarkdownString("Defines the status of ROTREF. Currently not used.\n\nON, OFF");

            const momRotationText = new vscode.CompletionItem('mom_rotation_text', vscode.CompletionItemKind.Variable);
            momRotationText.documentation = new vscode.MarkdownString("The appended text entered in the ROTATE UDE.\n\nAny string 66\ncharacters or less.");

            const momRotationTextDefined = new vscode.CompletionItem('mom_rotation_text_defined', vscode.CompletionItemKind.Variable);
            momRotationTextDefined.documentation = new vscode.MarkdownString("Flag defining whether ROTATE appended text has been entered.\n\n0 (no\ntext), 1 (text defined)");

            const momSeqnum = new vscode.CompletionItem('mom_seqnum', vscode.CompletionItemKind.Variable);
            momSeqnum.documentation = new vscode.MarkdownString("The current sequence number.\n\nAny number greater than zero.");

            const momSequenceFrequency = new vscode.CompletionItem('mom_sequence_frequency', vscode.CompletionItemKind.Variable);
            momSequenceFrequency.documentation = new vscode.MarkdownString("The value of the frequency parameter for the SEQNO UDE.\n\nAny\nnumber greater than zero.");

            const momSequenceIncrement = new vscode.CompletionItem('mom_sequence_increment', vscode.CompletionItemKind.Variable);
            momSequenceIncrement.documentation = new vscode.MarkdownString("The value of the increment parameter for the SEQNO UDE.\n\nAny\nnumber greater than zero.");

            const momSequenceMode = new vscode.CompletionItem('mom_sequence_mode', vscode.CompletionItemKind.Variable);
            momSequenceMode.documentation = new vscode.MarkdownString("Defines how the sequence number will be output. ON will\nreinstate the output of the sequence number.  OFF will\nsuppress sequence numbers.  N will turn on sequence numbers\nstarting with N. AUTO is currently not used.\n\nON, OFF, N,\nAUTO.");

            const momSequenceNumber = new vscode.CompletionItem('mom_sequence_number', vscode.CompletionItemKind.Variable);
            momSequenceNumber.documentation = new vscode.MarkdownString("The value for the next sequence number for the SEQNO\nUDE.\n\nAny number greater than zero.");

            const momSequenceText = new vscode.CompletionItem('mom_sequence_text', vscode.CompletionItemKind.Variable);
            momSequenceText.documentation = new vscode.MarkdownString("The appended text entered in the SEQNO UDE.\n\nAny string 66\ncharacters or less.");

            const momSequenceTextDefined = new vscode.CompletionItem('mom_sequence_text_defined', vscode.CompletionItemKind.Variable);
            momSequenceTextDefined.documentation = new vscode.MarkdownString("Flag defining whether SEQNO appended text has been entered.\n\n0 (no\ntext), 1 (text defined)");

            const momSpindleDirection = new vscode.CompletionItem('mom_spindle_direction', vscode.CompletionItemKind.Variable);
            momSpindleDirection.documentation = new vscode.MarkdownString("Defines the direction of the spindle.  With the preference\nupdate post from tool turned on, this value comes from\nthe tool.  Otherwise the direction comes from the SPINDL\nUDE.\n\nCLW, CCLW or NONE");

            const momSpindleMaximumRpm = new vscode.CompletionItem('mom_spindle_maximum_rpm', vscode.CompletionItemKind.Variable);
            momSpindleMaximumRpm.documentation = new vscode.MarkdownString("Defines the maximum spindle rpm allowed in an operation. \nThis value can only be output with the SPINDL UDE.\nIt is not available on the feeds and speeds dialog.\n\nAny\nnumber greater than zero.");

            const momSpindleMaximumRpmDefined = new vscode.CompletionItem('mom_spindle_maximum_rpm_defined', vscode.CompletionItemKind.Variable);
            momSpindleMaximumRpmDefined.documentation = new vscode.MarkdownString("Flag defining whether the SPINDL MAXRPM parameter has been entered.\n\n0\n(no ), 1 (yes)");

            const momSpindleMode = new vscode.CompletionItem('mom_spindle_mode', vscode.CompletionItemKind.Variable);
            momSpindleMode.documentation = new vscode.MarkdownString("Defines the output mode of the spindle.  With the\npreference update post from tool turned on, this value comes\nfrom the tool.  Otherwise the direction comes from the\nSPINDL UDE. \n\nRPM or SFM");

            const momSpindleRange = new vscode.CompletionItem('mom_spindle_range', vscode.CompletionItemKind.Variable);
            momSpindleRange.documentation = new vscode.MarkdownString("Defines a spindle range. This value can be output with\nthe SPINDL UDE.  You can use a custom command\nin Post Builder to automatically derive the spindle range from\nthe rpm.\n\n1 through 9");

            const momSpindleRangeDefined = new vscode.CompletionItem('mom_spindle_range_defined', vscode.CompletionItemKind.Variable);
            momSpindleRangeDefined.documentation = new vscode.MarkdownString("Flag defining whether the SPINDL RANGE parameter has been entered.\n\n0\n(no ), 1 (yes)");

            const momSpindleRpm = new vscode.CompletionItem('mom_spindle_rpm', vscode.CompletionItemKind.Variable);
            momSpindleRpm.documentation = new vscode.MarkdownString("Defines the rpm of the spindle when in RPM mode.\n In SFM mode, represents the equivalent rpm at the\nfirst cut radius.\n\nAny number greater than or equal to zero.");

            const momSpindleSpeed = new vscode.CompletionItem('mom_spindle_speed', vscode.CompletionItemKind.Variable);
            momSpindleSpeed.documentation = new vscode.MarkdownString("The value of either SFM or RPM. \n\nAny number greater\nthan or equal to zero.");

            const momSpindleSpeedDefined = new vscode.CompletionItem('mom_spindle_speed_defined', vscode.CompletionItemKind.Variable);
            momSpindleSpeedDefined.documentation = new vscode.MarkdownString("Flag defining whether the SPINDL speed parameter has been entered.\n\n0\n(no ), 1 (yes)");

            const momSpindleText = new vscode.CompletionItem('mom_spindle_text', vscode.CompletionItemKind.Variable);
            momSpindleText.documentation = new vscode.MarkdownString("The appended text entered in the SPINDL UDE.\n\nAny string 66\ncharacters or less.");

            const momSpindleTextDefined = new vscode.CompletionItem('mom_spindle_text_defined', vscode.CompletionItemKind.Variable);
            momSpindleTextDefined.documentation = new vscode.MarkdownString("Flag defining whether SPINDL appended text has been entered.\n\n0 (no\ntext), 1 (text defined)");

            const momStopText = new vscode.CompletionItem('mom_stop_text', vscode.CompletionItemKind.Variable);
            momStopText.documentation = new vscode.MarkdownString("The appended text entered in the STOP UDE.\n\nAny string 66\ncharacters or less.");

            const momStopTextDefined = new vscode.CompletionItem('mom_stop_text_defined', vscode.CompletionItemKind.Variable);
            momStopTextDefined.documentation = new vscode.MarkdownString("Flag defining whether STOP appended text has been entered.\n\n0 (no\ntext), 1 (text defined)");

            const momToolAdjRegDefined = new vscode.CompletionItem('mom_tool_adj_reg_defined', vscode.CompletionItemKind.Variable);
            momToolAdjRegDefined.documentation = new vscode.MarkdownString("Flag defining if the adjust register parameter has been entered\nin the tool dialog.\n\n0 (no ), 1 (yes)");

            const momToolAdjustRegister = new vscode.CompletionItem('mom_tool_adjust_register', vscode.CompletionItemKind.Variable);
            momToolAdjustRegister.documentation = new vscode.MarkdownString("Value of the tool length adjust register.  Used only\nif update post from tool preference is set to on.\n\nAny\nnumber greater than or equal to zero.");

            const momToolChangeType = new vscode.CompletionItem('mom_tool_change_type', vscode.CompletionItemKind.Variable);
            momToolChangeType.documentation = new vscode.MarkdownString("Defines the type of tool change.  If type is\nAUTO, then the auto tool change event marker will be\nexecuted.  If type is MANUAL, then the manual tool\nchange event marker will be executed.\n\nAUTO or MANUAL. ");

            const momToolHead = new vscode.CompletionItem('mom_tool_head', vscode.CompletionItemKind.Variable);
            momToolHead.documentation = new vscode.MarkdownString("Defines the name of the current head used by a\ntwo turret lathe.\n\nFRONT,REAR,RIGHT,LEFT,SIDE,SADDLE");

            const momToolNumber = new vscode.CompletionItem('mom_tool_number', vscode.CompletionItemKind.Variable);
            momToolNumber.documentation = new vscode.MarkdownString("Defines the tool to be loaded. With the preference update\npost from tool turned on, this value comes from the\ntool. Otherwise the direction comes from the LOAD or TURRET\nUDE.\n\nAny number greater than or equal to zero.");

            const momToolUse = new vscode.CompletionItem('mom_tool_use', vscode.CompletionItemKind.Variable);
            momToolUse.documentation = new vscode.MarkdownString("Defines an array that contains the tool number and machine\ntime for each tool, where tool_use(0,0) represent the tool number\nand tool_use(0,1) represents the machining time for the first tool.\n\nAny\nnumber greater than or equal to zero.");

            const momTranslate = new vscode.CompletionItem('mom_translate', vscode.CompletionItemKind.Variable);
            momTranslate.documentation = new vscode.MarkdownString("The values from the TRANS UDE command");

            const momWorkCoordinateNumber = new vscode.CompletionItem('mom_work_coordinate_number', vscode.CompletionItemKind.Variable);
            momWorkCoordinateNumber.documentation = new vscode.MarkdownString("Value output by the ZERO/N UDE.  This value can\nbe added to 53 to generate the Fanuc coordinate system\ncodes.\n\n0-6");



            return [momKin4thAxisAngOffset, momKin4thAxisCenterOffset, momKin4thAxisDirection, momKin4thAxisIncrSwitch, momKin4thAxisLeader, momKin4thAxisLimitAction, 
                    momKin4thAxisMaxLimit, momKin4thAxisMinIncr, momKin4thAxisMinLimit, momKin4thAxisPlane, momKin4thAxisRotation, momKin4thAxisType, momKin4thAxisZero, momKin5thAxisAngOffset, 
                    momKin5thAxisCenterOffset, momKin5thAxisDirection, momKin5thAxisIncrSwitch, momKin5thAxisLeader, momKin5thAxisLimitAction, momKin5thAxisMaxLimit, 
                    momKin5thAxisMinIncr, momKin5thAxisMinLimit, momKin5thAxisPlane, momKin5thAxisRotation, momKin5thAxisType, momKin5thAxisZero, momKinArcOutputMode, momKinArcValidPlanes, momKinCaxisRotaryPos, momKinClampTime, momKinCoordinateSystemType, 
                    momKinDependentHead, momKinHelicalArcOutputMode, momKinHolder1OffsetX, momKinHolder1OffsetY, momKinHolder1OffsetZ, momKinHolder1Orientation, 
                    momKinHolder2OffsetX, momKinHolder2OffsetY, momKinHolder2OffsetZ, momKinHolder2Orientation, momKinHolder3OffsetX, momKinHolder3OffsetY, 
                    momKinHolder3OffsetZ, momKinHolder3Orientation, momKinHolder4OffsetX, momKinHolder4OffsetY, momKinHolder4OffsetZ, momKinHolder4Orientation, 
                    momKinHolder5OffsetX, momKinHolder5OffsetY, momKinHolder5OffsetZ, momKinHolder5Orientation, momKinHolder6OffsetX, momKinHolder6OffsetY, momKinHolder6OffsetZ, 
                    momKinHolder6Orientation, momKinIksUsage, momKinIndToDependentHeadX, momKinIndToDependentHeadZ, momKinIndependentHead, momKinIsTurboOutput, 
                    momKinLinearizationFlag, momKinLinearizationTol, momKinMachineResolution, momKinMachineType, momKinMaxArcRadius, momKinMaxFpm, momKinMaxFpr, momKinMinArcLength, 
                    momKinMinFpm, momKinMinFpr, momKinOutputUnit, momKinPivotDistVec, momKinPivotGaugeOffset, momKinRapidFeedRate, momKinReadAheadNextMotion, momKinReengageDistance, 
                    momKinRetractPlane, momKinRotaryReengageFeedrate, momKinSpindleAxis, momKinToolChangeTime, momKinToolTrackingHeight, momKinWireTiltOutputType, momKinXAxisLimit, 
                    momKinYAxisLimit, momKinZAxisLimit, momAuxfun, momAuxfunText, momAuxfunTextDefined, momAxisPosition, momAxisPositionValue, momAxisPositionValueDefined, 
                    momClampAxis, momClampStatus, momClampText, momClampTextDefined, momCoolantMode, momCoolantText, momCoolantTextDefined, momCoordinateOutputMode, momCutWireText, 
                    momCutWireTextDefined, momCutcomAdjustRegister, momCutcomAdjustRegisterDefined, momCutcomAngle, momCutcomDistance, momCutcomMode, momCutcomPlane, 
                    momCutcomPlaneOutputFlag, momCutcomRegister, momCutcomRegisterOutputFlag, momCutcomText, momCutcomTextDefined, momCutcomType, momDefSequenceFrequency, 
                    momDefSequenceIncrement, momDefSequenceMaximum, momDefSequenceStart, momDelayMode, momDelayRevs, momDelayText, momDelayTextDefined, momDelayValue, 
                    momFlushGuides, momFlushPressure, momFlushRegister, momFlushTank, momFlushTankText, momFlushTankTextDefined, momHeadName, momHeadNameDefined, momHeadText, 
                    momHeadTextDefined, momHeadType, momLoadToolNumberDefined, momLockAxis, momLockAxisPlane, momLockAxisValue, momLockAxisValueDefined, momModesText, 
                    momModesTextDefined, momNumberOfRanges, momOperatorMessage, momOperatorMessageDefined, momOpskipText, momOpskipTextDefined, momOpstopText, momOpstopTextDefined, 
                    momOrigin, momOriginText, momOriginTextDefined, momOverideOperParam, momParallelToAxis, momPowerText, momPowerTextDefined, momPowerValue, momPprint, 
                    momPprintDefined, momPrefun, momPrefunText, momPrefunTextDefined, momRotateAxisType, momRotationAngle, momRotationAngleDefined, momRotationDirection, 
                    momRotationMode, momRotationReferenceMode, momRotationText, momRotationTextDefined, momSeqnum, momSequenceFrequency, momSequenceIncrement, momSequenceMode, 
                    momSequenceNumber, momSequenceText, momSequenceTextDefined, momSpindleDirection, momSpindleMaximumRpm, momSpindleMaximumRpmDefined, momSpindleMode, 
                    momSpindleRange, momSpindleRangeDefined, momSpindleRpm, momSpindleSpeed, momSpindleSpeedDefined, momSpindleText, momSpindleTextDefined, momStopText, 
                    momStopTextDefined, momToolAdjRegDefined, momToolAdjustRegister, momToolChangeType, momToolHead, momToolNumber, momToolUse, momTranslate, momWorkCoordinateNumber];

        }
    }, "m" // triggered whenever a ' ' is being typed
    );

    const mom_events_provider = vscode.languages.registerCompletionItemProvider('NX', {
        provideCompletionItems(document, position) {
            // get all text until the `position` and check if it reads `package `
            // and if so then complete with the package methods.
            let linePrefix = document.lineAt(position).text.substr(0, position.character);
            if (!linePrefix.endsWith('MOM')) {
                //return undefined;
            }

            //MOM Commands
            const momAbort = new vscode.CompletionItem('MOM_abort', vscode.CompletionItemKind.Event);
            momAbort.documentation = new vscode.MarkdownString("This function causes MOM to terminate with an error \nmessage. For example: MOM_abort \"Error occurred. Postprocessing has been aborted.\"\n\nMOM_abort\n(message)");

            const momAbortEvent = new vscode.CompletionItem('MOM_abort_event', vscode.CompletionItemKind.Event);
            momAbortEvent.documentation = new vscode.MarkdownString("This command immediately aborts the current event and returns processing\ncontrol back to NX.  Use this command if you\ndo not want to return to a calling procedure.\n\nMOM_abort_event (message)");

            const momAddToAddressBuffer = new vscode.CompletionItem('MOM_add_to_address_buffer', vscode.CompletionItemKind.Event);
            momAddToAddressBuffer.documentation = new vscode.MarkdownString("Depending on the start/end attribute specified, this extension will add\n\"value(s)\" to either the address start buffer or the address\nend buffer. Each time that this extension is called, it\nadds to the specified buffer.  When the contents of\nthe address are sent to the output buffer, the contents\nof the address start buffer will precede it and the\ncontents of the end buffer will go after it. \nThe address start buffer and the address end buffer are\ncleared once the they have been sent to the output\nbuffer.\n\nMOM_add_to_address_buffer (address name) (start|end) (value)");

            const momAddToBlockBuffer = new vscode.CompletionItem('MOM_add_to_block_buffer', vscode.CompletionItemKind.Event);
            momAddToBlockBuffer.documentation = new vscode.MarkdownString("Depending on the start/end attribute specified, this extension will add\n\"value(s)\" to either the block start buffer or the block\nend buffer. Each time that this extension is called, it\nadds to the specified buffer.  When the block is\nsent to the output buffer, the contents of the block\nstart buffer will precede it on the line and the\ncontents of the block end buffer will go after it.\n The block start buffer and the block end buffer\nare cleared once the they have been written to the\noutput buffer.\n\nMOM_add_to_block_buffer (block name) (start|end) (value)");

            const momAddToLineBuffer = new vscode.CompletionItem('MOM_add_to_line_buffer', vscode.CompletionItemKind.Event);
            momAddToLineBuffer.documentation = new vscode.MarkdownString("Depending on the start/end attribute specified, this extension will add\n\"value(s)\" to either the line's start buffer or the line's\nend buffer. Each time that this extension is called, it\nadds to the specified buffer.  When the contents of\nthe output buffer are sent to the output file, the\ncontents of the line's start buffer will precede it on\nthe line and the contents of the end buffer will\ngo on the same line after it. The line start\nbuffer, line end buffer, and output buffer are all cleared\nonce the they have been written to the output file.\n\nMOM_add_to_line_buffer\n(start|end)\n(value)");

            const momAskAddressValue = new vscode.CompletionItem('MOM_ask_address_value', vscode.CompletionItemKind.Event);
            momAskAddressValue.documentation = new vscode.MarkdownString("Always returns the absolute address value NOT the incremental value.\n\nMOM_ask_address_value\n(address name)");

            const momAskEnvVar = new vscode.CompletionItem('MOM_ask_env_var', vscode.CompletionItemKind.Event);
            momAskEnvVar.documentation = new vscode.MarkdownString("This extension allows you to determine how environment variable \"variable\nname\" is set.\n\nMOM_ask_env_var (variable name)");

            const momAskEventType = new vscode.CompletionItem('MOM_ask_event_type', vscode.CompletionItemKind.Event);
            momAskEventType.documentation = new vscode.MarkdownString("Returns the name of the current event. This is the\nlast event that the event generator executed");

            const momAskEssExpValue = new vscode.CompletionItem('MOM_ask_ess_exp_value', vscode.CompletionItemKind.Event);
            momAskEssExpValue.documentation = new vscode.MarkdownString("Provides access to the variables of the NX Expression module,\ni.e., it returns the value of the NX Expression variable.\n\nMOM_ask_ess_exp_value\n(variable_name)");

            const momAskInitJunctionXform = new vscode.CompletionItem('MOM_ask_init_junction_xform', vscode.CompletionItemKind.Event);
            momAskInitJunctionXform.documentation = new vscode.MarkdownString("This command returns the transformation matrix of the given Junction\n(name) at its initial state w.r.t the absolute coordinate system\n(ACS).\n\nmom_sim_result (matrix: list of 9) & mom_sim_result1 (origin: list of\n3)");

            const momAskMachineZeroJunctionName = new vscode.CompletionItem('MOM_ask_machine_zero_junction_name', vscode.CompletionItemKind.Event);
            momAskMachineZeroJunctionName.documentation = new vscode.MarkdownString("This command returns the name of the MACHINE_ZERO Junction.\n\nmom_sim_result");

            const momAskOperCsys = new vscode.CompletionItem('MOM_ask_oper_csys', vscode.CompletionItemKind.Event);
            momAskOperCsys.documentation = new vscode.MarkdownString("Fetches the CSYS information of the named operation. Passes the\nresults in three mom variables. mom_result represents the mom_special_output of\nthe CSYS. 0 = None, 1 = Use Main MCS,\n2 = Fixture Offset, 3 = CSYS Rotation. mom_result1 is\na list of 12 doubles containing the mom_csys_matix of the\noperation CSYS. mom_result2 is a list of 12 doubles containing\nthe mom_machine_csys_matrix of the operation.\n\nMOM_ask_oper_csys (operation-name)");

            const momAskSyslogName = new vscode.CompletionItem('MOM_ask_syslog_name', vscode.CompletionItemKind.Event);
            momAskSyslogName.documentation = new vscode.MarkdownString("This command returns the name of syslog file of current\nsession.\n\nString");

            const momCloseOutputFile = new vscode.CompletionItem('MOM_close_output_file', vscode.CompletionItemKind.Event);
            momCloseOutputFile.documentation = new vscode.MarkdownString("This extension allows you to suspend writing output to a\nparticular file until it is opened again\n\nMOM_close_output_file (filename)");

            const momCheckOutLicense = new vscode.CompletionItem('MOM_check_out_license', vscode.CompletionItemKind.Event);
            momCheckOutLicense.documentation = new vscode.MarkdownString("Obtains Flexlm license until the end of the posting job.\n(license) is the string name of a valid license. Returns\n1 (true) for success or 0 (false) for failure.\n\nMOM_check_out_license (license)");

            const momConvertPoint = new vscode.CompletionItem('MOM_convert_point', vscode.CompletionItemKind.Event);
            momConvertPoint.documentation = new vscode.MarkdownString("Converts a point from a tool path position to an\nMCS position in machine tool coordinates. (point) and (vector) are\nTcl arrays of 3. Returns pimary and alternate solutions as\nTcl lists of X, Y, Z, 4th, 5th in the\nvariables mom_post_result for the primary and mom_post_result1 for the alternate.\n\n\nMOM_convert_point (point) (vector)");

            const momDisableAddress = new vscode.CompletionItem('MOM_disable_address', vscode.CompletionItemKind.Event);
            momDisableAddress.documentation = new vscode.MarkdownString("Suppresses all output for an address.  MOM_force ONCE or\nMOM_force ALWAYS are ignored while MOM_disable_address is active. MOM_enable_address cancels\nMOM_disable_address.\n\nMOM_disable_address (Address)");

            const momDisplayMessage = new vscode.CompletionItem('MOM_display_message', vscode.CompletionItemKind.Event);
            momDisplayMessage.documentation = new vscode.MarkdownString("Displays a message dialog box in NX. (type) is the\nstyle of the message box, I|E|W|Q, where I is info,\nE is error, W is warning, and Q is question.\nButton labels are optional. Returns the number of the button\n(1, 2, or 3) that the user clicks.\n\nMOM_display_message (message) (title)\n(type) [(button1)][(button2)][(button3)]");

            const momDoTemplate = new vscode.CompletionItem('MOM_do_template', vscode.CompletionItemKind.Event);
            momDoTemplate.documentation = new vscode.MarkdownString("Generate output based upon the Block Template \"template_name\".  BUFFER\nhas the usual meaning. BUFFER will generate the output value\nfor Block Template \"template_name\" but does not add it to\nthe output buffer, and hence, does not output it to\nthe output file.  CREATE will generate the value for\nBlock Template \"template_name\" but does not output to the output\nbuffer.  This function returns the string created as the\nresult of the template name.\n\nMOM_do_template (template_name) {BUFFER | CREATE}");

            const momEnableAddress = new vscode.CompletionItem('MOM_enable_address', vscode.CompletionItemKind.Event);
            momEnableAddress.documentation = new vscode.MarkdownString("Restores output status for an address that MOM_disable_address suppressed. \nReturns output status to the initial state.\n\nMOM_enable_address (Address)");

            const momForce = new vscode.CompletionItem('MOM_force', vscode.CompletionItemKind.Event);
            momForce.insertText = new vscode.SnippetString('MOM_force once ');
            momForce.documentation = new vscode.MarkdownString("The next time that a block template that contains a\nreference to any of the input address names is evaluated,\nthe word that contains that address will be output regardless\nof its modality attribute.\n\nMOM_force (Always | Once | Off )\n(Address_1 ... Address_n)");

            const momForceBlock = new vscode.CompletionItem('MOM_force_block', vscode.CompletionItemKind.Event);
            momForceBlock.documentation = new vscode.MarkdownString("Example: MOM_force_block Once linear\n\nMOM_force_block (Always | Once | Off )\n(Block_1 ... Block_n)");

            const momIncremental = new vscode.CompletionItem('MOM_incremental', vscode.CompletionItemKind.Event);
            momIncremental.documentation = new vscode.MarkdownString("The next time that a block template that contains a\nreference to any of the input address names is evaluated,\nthe deference (increment) from the previous value is output. \nIf ON, then for each Address_i, always output increment. \nIf OFF, then for each Address_i, always output absolute.\n\nMOM_incremental (ON\n| OFF) (Address_1 ... Address_n)");

            const momLoadDefinitionFile = new vscode.CompletionItem('MOM_load_definition_file', vscode.CompletionItemKind.Event);
            momLoadDefinitionFile.documentation = new vscode.MarkdownString("This will load the definition file given by filename. If\ndata in filename (or any of its included files) matches\ndata already loaded by previous definition files, the duplicate data\nis overridden by the new version. Like any TCL extension,\nthis command may be called from any place in the\nTCL script.\n\nMOM_load_definition_file (filename)");

            const momLoadLatheThreadCycleParams = new vscode.CompletionItem('MOM_load_lathe_thread_cycle_params', vscode.CompletionItemKind.Event);
            momLoadLatheThreadCycleParams.documentation = new vscode.MarkdownString("This command will load the parameters of a lathe threading\ncycle of the current operation.  It returns 1 when\nloading is successful otherwise 0. This command should be called\nafter the desired CSYS is set.\n\n0 or 1");

            const momLogMessage = new vscode.CompletionItem('MOM_log_message', vscode.CompletionItemKind.Event);
            momLogMessage.documentation = new vscode.MarkdownString("This function causes MOM to write a message to the\nsyslog.\n\nMOM_log_message (message)");

            const momOnEventError = new vscode.CompletionItem('MOM_on_event_error', vscode.CompletionItemKind.Event);
            momOnEventError.documentation = new vscode.MarkdownString("If the TCL interpreter reports an error this procedure is\ninvoked prior to raising a system error. The {_debug} procedure\nis invoked only if DEBUG mode is true.  Example:\nThis procedure is invoked by NX.\n\nMOM_on_event_error {_debug}");

            const momOnParseError = new vscode.CompletionItem('MOM_on_parse_error', vscode.CompletionItemKind.Event);
            momOnParseError.documentation = new vscode.MarkdownString("If a syntax error is found in the Definition File\nthese procedures are invoked prior to raising a system error.\nThe {_debug} procedure is invoked only if DEBUG mode is\ntrue.\n\nMOM_on_parse_error {_debug}");

            const momOpenOutputFile = new vscode.CompletionItem('MOM_open_output_file', vscode.CompletionItemKind.Event);
            momOpenOutputFile.documentation = new vscode.MarkdownString("This extension allows you to redirect output to other output\nfiles.  If a file \"filename\" does not exist, a\nnew one will be created with that file name.\n\nMOM_open_output_file (filename)");

            const momOutputLiteral = new vscode.CompletionItem('MOM_output_literal', vscode.CompletionItemKind.Event);
            momOutputLiteral.documentation = new vscode.MarkdownString("Output a list of literals and variables as a single\nline. If BUFFER is present then only place the string\nin the output buffer. Do not send it to the\noutput yet.\n\nMOM_output_literal \"string\" {BUFFER}");

            const momOutputText = new vscode.CompletionItem('MOM_output_text', vscode.CompletionItemKind.Event);
            momOutputText.documentation = new vscode.MarkdownString("This extension will output a list of literals and variables\nas a single line, just like MOM_output_literal except that no\nsequence number will be output. If BUFFER is present then\nonly place the string in the output buffer. Do not\nsend it to the output yet.\n\nMOM_output_text (literal) {BUFFER}");

            const momOutputToListingDevice = new vscode.CompletionItem('MOM_output_to_listing_device', vscode.CompletionItemKind.Event);
            momOutputToListingDevice.documentation = new vscode.MarkdownString("If running in an interactive NX session then output string\nto the NX listing window, otherwise do nothing.\n\nMOM_output_to_listing_device (\"string\")");

            const momPostOperPath = new vscode.CompletionItem('MOM_post_oper_path', vscode.CompletionItemKind.Event);
            momPostOperPath.documentation = new vscode.MarkdownString("Postprocesses the named operation. The output file argument can be\nspecified without a post; the default post is used. When\nthe file name is given without a preceding path, the\nprimary output directory will be used. When a post is\nspecified, the output file argument SAME outputs to the active\noutput file. Returns 1 (True) when the execution is successful,\n0 (False) if it is not successful, and -1 if\nthe post is calling itself. During execution mom_post_oper_path exists and\nhas value 1. The called process uses the same units\nspecifed in the Postprocess dialog box. If a post is\nnamed,\nthe\nreview\nfile\noption\nand\nwarning\noutput\nsetting\nare\ngoverned by the post that is named.\n\nMOM_post_oper_path (operation-name) [(output file)]\n[(postprocessor)] [ (event-handler Tcl file) (definition file)]");

            const momReloadKinematics = new vscode.CompletionItem('MOM_reload_kinematics', vscode.CompletionItemKind.Event);
            momReloadKinematics.documentation = new vscode.MarkdownString("Refresh the event generator with the current values of all\nthe kinematics variables.\n\nInteger");

            const momReloadVariable = new vscode.CompletionItem('MOM_reload_variable', vscode.CompletionItemKind.Event);
            momReloadVariable.documentation = new vscode.MarkdownString("Update the event generator with the current value of variable_name\nin the event handler.\n\nMOM_reload_variable [-a] variable_name");

            const momResetSequence = new vscode.CompletionItem('MOM_reset_sequence', vscode.CompletionItemKind.Event);
            momResetSequence.documentation = new vscode.MarkdownString("A sequence is a block template that is output at\nthe beginning of each line. It will typically be used\nto output sequence numbers but it may also be used\nto output any block template.\n\nMOM_reset_sequence (start) (increment) {frequency}");

            const momRunPostprocess = new vscode.CompletionItem('MOM_run_postprocess', vscode.CompletionItemKind.Event);
            momRunPostprocess.documentation = new vscode.MarkdownString("Runs a separate post process from within a postprocessor on\nthe same operations or programs that are being postprocessed. Returns\n1 (true) when the process execution is successful, 2 (false)\nif there is an execution error, -1 if the post\nis calling itself. You can call the same post that\nis executing, but typically you would use a separate post,\nsuch as a turbo post.\n\nMOM_run_postprocess (event-handler Tcl file) (definition file)\n(output file) current post is calling itself");

            const momRunUserFunction = new vscode.CompletionItem('MOM_run_user_function', vscode.CompletionItemKind.Event);
            momRunUserFunction.documentation = new vscode.MarkdownString("This function causes MOM to call the function named entry_point_name\nin the shared library named shared_library_name. That function can then\nextend the translator from which MOM_run_user_function was called. It will\ndo this by calling a User Function function named UF_MOM_extend_translator(\nparam, \"extension_name\", extension_entry_point ). The param will be passed into\nentry_point_name as the first argument. The signature of entry_point_name is\nthe same as ufusr. The extension_name is the name of\nthe function as it will appear in a TCL script.\nThe extension_entry_point is the actual address of the function to\nbe called by the interpreter when interpreting the extension_name call.\n\nMOM_run_user_function\n(shared_library_name)\n(entry_point_name)");

            const momSetAddressFormat = new vscode.CompletionItem('MOM_set_address_format', vscode.CompletionItemKind.Event);
            momSetAddressFormat.documentation = new vscode.MarkdownString("This function redefines the format to be used for the\n(Address Name) as (Format Name) for outputting in a block.\nThe (Format Name) must be defined in the Definition File.\n\nMOM_set_address_format\n(Address Name) (Format Name)");

            const momSetDebugMode = new vscode.CompletionItem('MOM_set_debug_mode', vscode.CompletionItemKind.Event);
            momSetDebugMode.documentation = new vscode.MarkdownString("This will activate, deactivate, and resume the debugger. Like any\nTCL extension, this command may be called from any place\nin the TCL script.  If ON, the debugger will\nactivate by initializing with data entered in the debugger dialog\nor stdout.  If OFF, the debugger will be deactivated.\n\nMOM_set_debug_mode\n(ON | OFF)");

            const momSetEnvVar = new vscode.CompletionItem('MOM_set_env_var', vscode.CompletionItemKind.Event);
            momSetEnvVar.documentation = new vscode.MarkdownString("Defines NX environment variables. Both arguments are case sensitive. Only\nnew variables can be set. If you attempt to override\npre-existing variables, the command will fail. Variables are unset when\npost process ends. Returns 1 for success, new variable is\ncreated and set. Returns 0 for failure, variable cannot be\ncreated - it probably already existed.\n\nMOM_set_env_var (variable name as string)(variable\nvalue as string)");

            const momSetLineLeader = new vscode.CompletionItem('MOM_set_line_leader', vscode.CompletionItemKind.Event);
            momSetLineLeader.documentation = new vscode.MarkdownString("This function causes MOM to set the line leader to\na string with the indicated status. A line leader is\noutput as the leading character(s) of the output line (i.e.,\nbefore the SEQUENCE).\n\nMOM_set_line_leader (Always | Once | Off ) (\"string\")");

            const momSetSeqOff = new vscode.CompletionItem('MOM_set_seq_off', vscode.CompletionItemKind.Event);
            momSetSeqOff.documentation = new vscode.MarkdownString("Does not output a sequence number. Returns the sequence setting\nat the time the command is executed.\n\nset current_status [MOM_set_seq_off] ...\nif { $current_status == \"on\" } { MOM_set_seq_on }");

            const momSetSeqOn = new vscode.CompletionItem('MOM_set_seq_on', vscode.CompletionItemKind.Event);
            momSetSeqOn.documentation = new vscode.MarkdownString("Allows output of the sequence number if a SEQUENCE specifier\nwas given in the definition file.  Return the sequence\nsetting at the time the command is executed.\n\nset current_status [MOM_set_seq_on]\n ... if { $current_status == \"off\" } { MOM_set_seq_off\n}");

            const momSkipHandlerToEvent = new vscode.CompletionItem('MOM_skip_handler_to_event', vscode.CompletionItemKind.Event);
            momSkipHandlerToEvent.documentation = new vscode.MarkdownString("This command will skip the execution of the event handler\nuntil the given event is encountered. The condition is reset\nat the start-of-path and when the event is met. Motion\ntypes include Engage, Approach, Firstcut, Retract, Return, Rapid, Cut, Stepover,\nDeparture, Traversal, Sidecut, From, Gohome, and Cycle.\n\nMOM_skip_handler_to_event (event or motion-type)");

            const momSuppress = new vscode.CompletionItem('MOM_suppress', vscode.CompletionItemKind.Event);
            momSuppress.insertText = new vscode.SnippetString('MOM_supress once ');
            momSuppress.documentation = new vscode.MarkdownString("The next time that a block template that contains a\nreference to any of the input address names is evaluated,\nthe word that contains the address will not be output\nregardless of its modality attribute.\n\nMOM_suppress (Always | Once | Off\n) (Address_1 ... &gt");

            const momUpdateKinematics = new vscode.CompletionItem('MOM_update_kinematics', vscode.CompletionItemKind.Event);
            momUpdateKinematics.documentation = new vscode.MarkdownString("Maps the following legacy kinematics variables to the current kinematics\nvariables, and is required after specifying them: mom_kin_4th_axis_center_offset, mom_kin_5th_axis_center_offset, mom_kin_pivot_gauge_offset\n\n1\nor 0");
            
            

        return [momAbort, momAbortEvent, momAddToAddressBuffer, momAddToBlockBuffer, momAddToLineBuffer, momAskAddressValue, momAskEnvVar, momAskEventType, momAskEssExpValue, 
            momAskInitJunctionXform, momAskMachineZeroJunctionName, momAskOperCsys, momAskSyslogName, momCloseOutputFile, momCheckOutLicense, momConvertPoint, momDisableAddress, 
            momDisplayMessage, momDoTemplate, momEnableAddress, momForce, momForceBlock, momIncremental, momLoadDefinitionFile, momLoadLatheThreadCycleParams, momLogMessage, 
            momOnEventError, momOnParseError, momOpenOutputFile, momOutputLiteral, momOutputText, momOutputToListingDevice, momPostOperPath, momReloadKinematics, momReloadVariable, 
            momResetSequence, momRunPostprocess, momRunUserFunction, momSetAddressFormat, momSetDebugMode, momSetEnvVar, momSetLineLeader, momSetSeqOff, momSetSeqOn, 
            momSkipHandlerToEvent, momSuppress, momUpdateKinematics]

        }
    }, "M" // triggered whenever a ' ' is being typed
    );

    const lib_provider = vscode.languages.registerCompletionItemProvider('NX', {
        provideCompletionItems(document, position) {
            // get all text until the `position` and check if it reads `package `
            // and if so then complete with the package methods.
            let linePrefix = document.lineAt(position).text.substr(0, position.character);
            if (!linePrefix.endsWith('LIB')) {
                //return undefined;
            }

            //LIB Commands
            const LibGeUi = new vscode.CompletionItem('LIB_GE_ui', vscode.CompletionItemKind.Interface);
            LibGeUi.documentation = new vscode.MarkdownString("Utility to create UI Nodes/Groups\nUI structure elements are defined in\na CONFIG object like any other property.\nThe CONFIG object is\nof special type 'UI_TREE'\n( LIB_GE_CREATE_obj My_UI_elements {UI_TREE} {....} )\nTo Create\nthe individual UI structure elemets within that CONFIG object you\ncan use this utility.\n(like this you are able to define\na UI element in a single, readable line.\nthe needed Property\nstructure will be generated for you)\n\n\nLIB_GE_ui (name) (type) (id_name) (parent)\n(sequence) (groupstat) (access)");

            const LibGeCleanupList = new vscode.CompletionItem('LIB_GE_cleanup_list', vscode.CompletionItemKind.Interface);
            LibGeCleanupList.documentation = new vscode.MarkdownString("This function filters all duplicates from a list and returns\nthe adjusted list.\n\n\nLIB_GE_cleanup_list (list) (newlist) (remove)");

            const LibGeFormatPathNames = new vscode.CompletionItem('LIB_GE_format_path_names', vscode.CompletionItemKind.Interface);
            LibGeFormatPathNames.documentation = new vscode.MarkdownString("This procedure may be used to format pathnames from unix\nformat in windows\nformat and delete double backslash.\n\n\nLIB_GE_format_path_names (pathname) (exclusion) (forced)\n(escape)");

            const LibGeSortValue = new vscode.CompletionItem('LIB_GE_sort_value', vscode.CompletionItemKind.Interface);
            LibGeSortValue.documentation = new vscode.MarkdownString("This function return the smallest or biggest value out of\na list.\n\n\nLIB_GE_sort_value (valuelist) (sequence)");

            const LibGeIsPath = new vscode.CompletionItem('LIB_GE_is_path', vscode.CompletionItemKind.Interface);
            LibGeIsPath.documentation = new vscode.MarkdownString("This function checks if a given pathname is a valid\ndirectoryname or not.\nThe existence of the directory will not be\nchecked, it's only a logical check.\n\n\nLIB_GE_is_path (path)");

            const LibGeIsUncPath = new vscode.CompletionItem('LIB_GE_is_unc_path', vscode.CompletionItemKind.Interface);
            LibGeIsUncPath.documentation = new vscode.MarkdownString("This function checks if a given pathname is a valid\nUNC directoryname or not.\nThe existence of the directory will not\nbe checked, it's only a logical check.\n\n\nLIB_GE_is_unc_path (path)");

            const LibGeSet = new vscode.CompletionItem('LIB_GE_set', vscode.CompletionItemKind.Interface);
            LibGeSet.documentation = new vscode.MarkdownString("This function sets a new global variable 'para1' with the\nvalue 'para2'.\nGrace to this function it's not necessary to define\nthe variable with 'global'.\n\n\nLIB_GE_set (para1) (para2)");

            const LibGeLappend = new vscode.CompletionItem('LIB_GE_lappend', vscode.CompletionItemKind.Interface);
            LibGeLappend.documentation = new vscode.MarkdownString("This function appends the value 'para2' to the global list\n'para1'.\nGrace to this function it's not necessary to define the\nlist 'para1' with 'global'.\n\n\nLIB_GE_lappend (para1) (para2)");

            const LibGeAskTypeSubtype = new vscode.CompletionItem('LIB_GE_ask_type_subtype', vscode.CompletionItemKind.Interface);
            LibGeAskTypeSubtype.documentation = new vscode.MarkdownString("This function returns the tag, type and subtype of a\ngiven path_name.\n\n\nLIB_GE_ask_type_subtype (path_name) (tag) (type) (subtype)");

            const LibGeReadExpressionValue = new vscode.CompletionItem('LIB_GE_read_expression_value', vscode.CompletionItemKind.Interface);
            LibGeReadExpressionValue.documentation = new vscode.MarkdownString("This function reads expression values out of NX. You may\nspecify the error\nhandling in case when the expression is missing.\n\n\nLIB_GE_read_expression_value\n(expression) (defaultValue) (errorHandling) (formatDef)");

            const LibGeMessage = new vscode.CompletionItem('LIB_GE_message', vscode.CompletionItemKind.Interface);
            LibGeMessage.documentation = new vscode.MarkdownString("This is an enhanced string handling function which will be\ncalled internally to output text\nmessages to the NC code. It\nis used for outputting comments, nc inserts, user messages and\nmore.\n\n\nLIB_GE_message (message) (option) (forcelinenumber) (replace_special_characters) (wordwrap)");

            const LibGeTruncateLine = new vscode.CompletionItem('LIB_GE_truncate_line', vscode.CompletionItemKind.Interface);
            LibGeTruncateLine.documentation = new vscode.MarkdownString("This function splits a line into multiple lines if it\noverpasses a defined maximum length.\nThe output command (e.g. MOM_output_literal, MOM_output_text)\nhas to be defined.\n\n\nLIB_GE_truncate_line (command) (leader) (text) (trailer) (length) (suppress)");

            const LibGeMsg = new vscode.CompletionItem('LIB_GE_MSG', vscode.CompletionItemKind.Interface);
            LibGeMsg.documentation = new vscode.MarkdownString("This function translates postprocessor core messages into the desired language.\n\n\nLIB_GE_MSG\n(text) (possibilities) (replace_special_characters)");

            const LibGeStringToupper = new vscode.CompletionItem('LIB_GE_string_toupper', vscode.CompletionItemKind.Interface);
            LibGeStringToupper.documentation = new vscode.MarkdownString("This function converts a string to upper case. Use this\nfunction when working with multibyte\nstrings as the standard tcl function\n&quot;string toupper&quot; causes problems when converting special\ncharacters.\n\n\nLIB_GE_string_toupper (arg) (check)");

            const LibGeStringRangeToupper = new vscode.CompletionItem('LIB_GE_string_range_toupper', vscode.CompletionItemKind.Interface);
            LibGeStringRangeToupper.documentation = new vscode.MarkdownString("This function converts a part of a string to upper\ncase letters.\n\n\nLIB_GE_string_range_toupper (text) (from) (to)");

            const LibGeReplaceSpecialCharacters = new vscode.CompletionItem('LIB_GE_replace_special_characters', vscode.CompletionItemKind.Interface);
            LibGeReplaceSpecialCharacters.documentation = new vscode.MarkdownString("This function converts multibyte text into an other character set.\n\n\nLIB_GE_replace_special_characters\n(text) (special) (interaction)");

            const LibGeCommentConvert = new vscode.CompletionItem('LIB_GE_comment_convert', vscode.CompletionItemKind.Interface);
            LibGeCommentConvert.documentation = new vscode.MarkdownString("This function converts a text in the desired format for\ncomment output to the NC-code.\nThe desired format is controlled with\nthe properties [CONF_GE_msg comment_case] (convert\nto upper or lower case) and\n[CONF_GE_msg\ncomment_replace_character] (replace special characters).\n\n\nLIB_GE_comment_convert (comment)");

            const LibGeErrorMessage = new vscode.CompletionItem('LIB_GE_error_message', vscode.CompletionItemKind.Interface);
            LibGeErrorMessage.documentation = new vscode.MarkdownString("Issues an error message which will be displayed in a\nmessage box during post run.\nNote: the message is formatted with\nPostConfigurator internal functions and may contain text\nto be translated (see\nLIB_GE_MSG). The setting from [CONF_GE_msg comment_case] will also\nbe applied before\nshowing the message dialog.\n\n\nLIB_GE_error_message (msg1) (msg2) (option) (translation) (force)");

            const LibGeAbortMessage = new vscode.CompletionItem('LIB_GE_abort_message', vscode.CompletionItemKind.Interface);
            LibGeAbortMessage.documentation = new vscode.MarkdownString("Issues an abort message that causes the post processing to\nstop. A dialog box will be displayed.\nNote: the message is\nformatted with PostConfigurator internal functions and may contain text\nto be\ntranslated (see LIB_GE_MSG). The setting from [CONF_GE_msg comment_case] will also\nbe\napplied before showing the message dialog.\n\n\nLIB_GE_abort_message (msg1) (msg2) (option) (translation)\n(force)");

            const LibGeMessageDialog = new vscode.CompletionItem('LIB_GE_message_dialog', vscode.CompletionItemKind.Interface);
            LibGeMessageDialog.documentation = new vscode.MarkdownString("Displays a dialog box and waits for user interaction.\nThis function\ncurrently only works on Windows platforms. For other plattforms please\nuse LIB_GE_wish.\n\n\nLIB_GE_message_dialog (args)");

            const LibGeWish = new vscode.CompletionItem('LIB_GE_wish', vscode.CompletionItemKind.Interface);
            LibGeWish.documentation = new vscode.MarkdownString("\n\nLIB_GE_wish (msg) (submsg) (title) (type) (icon) (replace_special_characters)");

            const LibGeReadDatabase = new vscode.CompletionItem('LIB_GE_read_database', vscode.CompletionItemKind.Interface);
            LibGeReadDatabase.documentation = new vscode.MarkdownString("This function reads an acii file based database in NX-library\nstyle. This function automatically\nopens, reads and closes the file. The\nfunction provides error handling in case when the file is\nnot\nexisting.\n\n\nLIB_GE_read_database (environment) (datafile) (variablelist) (formatdescription) (datedescription) (mode)");

            const LibGeCopyVarRange = new vscode.CompletionItem('LIB_GE_copy_var_range', vscode.CompletionItemKind.Interface);
            LibGeCopyVarRange.documentation = new vscode.MarkdownString("This function copies a whole range of global variables (scalars\nand arrays), identified by a prefix,\nto a new range of\nvariables.\nThe new range of variable will be named based on\na defined prefix.\n\n\nLIB_GE_copy_var_range (to_var_prefix) (from_var_prefix)");

            const LibGeTime = new vscode.CompletionItem('LIB_GE_time', vscode.CompletionItemKind.Interface);
            LibGeTime.documentation = new vscode.MarkdownString("This function returns 'time' as formated string, respecting the time\nformat defined in\nthe property [CONF_GE_msg time_format].\n\n\nLIB_GE_time (time)");

            const LibGeDate = new vscode.CompletionItem('LIB_GE_date', vscode.CompletionItemKind.Interface);
            LibGeDate.documentation = new vscode.MarkdownString("This function returns 'date' as formated string, respecting the date\nformat defined in\nthe property [CONF_GE_msg date_format].\n\n\nLIB_GE_date (date)");

            const LibGeCommandBuffer = new vscode.CompletionItem('LIB_GE_command_buffer', vscode.CompletionItemKind.Interface);
            LibGeCommandBuffer.documentation = new vscode.MarkdownString("This function is a very powerful command for expert post\ndevelopers, allowing programmers\nto easyly modify output sequences.\n\n\nLIB_GE_command_buffer (args)");

            const LibGeCommandBufferSnippet = new vscode.CompletionItem('LIB_GE_command_buffer', vscode.CompletionItemKind.Snippet);
            LibGeCommandBufferSnippet.insertText = new vscode.SnippetString("LIB_GE_command_buffer ${1:Buffername}\nLIB_GE_command_buffer {\n\t$0\n\n} @$1\nLIB_GE_command_buffer_output\n")
            LibGeCommandBufferSnippet.documentation = new vscode.MarkdownString("This function is a very powerful command for expert post\ndevelopers, allowing programmers\nto easyly modify output sequences.\n\n\nLIB_GE_command_buffer (args)");


            const LibGeCommandBufferOutput = new vscode.CompletionItem('LIB_GE_command_buffer_output', vscode.CompletionItemKind.Interface);
            LibGeCommandBufferOutput.documentation = new vscode.MarkdownString("Ends the definition of sequences (set by LIB_GE_command_buffer)\nand outputs them.\n\n\nLIB_GE_command_buffer_output\n(args)");

            const LibGeStringAppend = new vscode.CompletionItem('LIB_GE_string_append', vscode.CompletionItemKind.Interface);
            LibGeStringAppend.documentation = new vscode.MarkdownString("This allows to set 'datatype' attribute of a given property\nin a given CONF-object\n\n\nLIB_GE_string_append (string) (number) (subst)");

            const LibGeCreateJsonArray = new vscode.CompletionItem('LIB_GE_create_json_array', vscode.CompletionItemKind.Interface);
            LibGeCreateJsonArray.documentation = new vscode.MarkdownString("This give you an array list for json back\n\n\nLIB_GE_create_json_array (arg)");

            const LibGeCommandBufferEditInsert = new vscode.CompletionItem('LIB_GE_command_buffer_edit_insert', vscode.CompletionItemKind.Interface);
            LibGeCommandBufferEditInsert.documentation = new vscode.MarkdownString("This function allows to insert an element in a command\nbuffer list.\nIt is used to add more output / actions\nto an existing command buffer at a specific position.\nThe new\ncode to execute has to be referenced by a TagName.\n\n\nLIB_GE_command_buffer_edit_insert\n(proc_name) (buffer_name) (code) (tag) (pos) (ref_tag)");

            const LibGeCommandBufferEditRemove = new vscode.CompletionItem('LIB_GE_command_buffer_edit_remove', vscode.CompletionItemKind.Interface);
            LibGeCommandBufferEditRemove.documentation = new vscode.MarkdownString("This function allows to remove an element from a command\nbuffer.\n\n\nLIB_GE_command_buffer_edit_remove (proc_name) (buffer_name) (args)");

            const LibGeCommandBufferEditMove = new vscode.CompletionItem('LIB_GE_command_buffer_edit_move', vscode.CompletionItemKind.Interface);
            LibGeCommandBufferEditMove.documentation = new vscode.MarkdownString("This function allows to resequence the output of a command\nbuffer.\n\n\nLIB_GE_command_buffer_edit_move (proc_name) (buffer_name) (tag) (pos) (ref_tag)");

            const LibGeCommandBufferEditReplace = new vscode.CompletionItem('LIB_GE_command_buffer_edit_replace', vscode.CompletionItemKind.Interface);
            LibGeCommandBufferEditReplace.documentation = new vscode.MarkdownString("This function allows to replace one of the tagged output\nlines of a command buffer\nby an other tagged output\n\n\nLIB_GE_command_buffer_edit_replace (proc_name)\n(buffer_name) (ref_tag) (code) (tag)");

            const LibGeCommandBufferEditAppend = new vscode.CompletionItem('LIB_GE_command_buffer_edit_append', vscode.CompletionItemKind.Interface);
            LibGeCommandBufferEditAppend.documentation = new vscode.MarkdownString("This function allows to append code / output to a\nexisting command buffer\n\n\nLIB_GE_command_buffer_edit_append (proc_name) (buffer_name) (code) (tag)");

            const LibGeCommandBufferEditPrepend = new vscode.CompletionItem('LIB_GE_command_buffer_edit_prepend', vscode.CompletionItemKind.Interface);
            LibGeCommandBufferEditPrepend.documentation = new vscode.MarkdownString("This function allows to prepend code / output to a\nexisting command buffer\n\n\nLIB_GE_command_buffer_edit_prepend (proc_name) (buffer_name) (code) (tag)");

            const LibGeSnapshot = new vscode.CompletionItem('LIB_GE_snapshot', vscode.CompletionItemKind.Interface);
            LibGeSnapshot.documentation = new vscode.MarkdownString("LIB_GE_snapshot allows to CREATE and REUSE a snapshot of a\ngiven set of global variables\nat a given point of time.\n\n\nLIB_GE_snapshot\n(arg1) (arg2)");

            const LibGeConfSetPropertyAccess = new vscode.CompletionItem('LIB_GE_CONF_set_property_access', vscode.CompletionItemKind.Interface);
            LibGeConfSetPropertyAccess.documentation = new vscode.MarkdownString("This function allows to set the 'access' for a given\nproperty in a given CONF-object\nfor a given license level\n\n(only 'downgrading'\nthe access level is permitted)\n\n\nLIB_GE_CONF_set_property_access (object) (properties) (licenses) (access_code) (forceSet)");

            const LibGeConfSetPropertyDatatype = new vscode.CompletionItem('LIB_GE_CONF_set_property_datatype', vscode.CompletionItemKind.Interface);
            LibGeConfSetPropertyDatatype.documentation = new vscode.MarkdownString("This allows to set 'datatype' attribute of a given property\nin a given CONF-object\n\n\nLIB_GE_CONF_set_property_datatype (object) (property) (datatype) (forceSet)");

            const LibGeConfSetPropertyUi = new vscode.CompletionItem('LIB_GE_CONF_set_property_ui', vscode.CompletionItemKind.Interface);
            LibGeConfSetPropertyUi.documentation = new vscode.MarkdownString("This function allows to set 'ui_parent' and 'ui_sequence' attribute of\na given property in a given CONF-object\nThis can be used\nto reorder common properties and UI_TREE properties as well.\n\n\nLIB_GE_CONF_set_property_ui (object)\n(property) (parent) (seq) (forceSet)");

            const LibGeConfAddChain = new vscode.CompletionItem('LIB_GE_CONF_add_chain', vscode.CompletionItemKind.Interface);
            LibGeConfAddChain.documentation = new vscode.MarkdownString("This function allows you to define chains.\n\n\nLIB_GE_CONF_add_chain (chain_id) (ui_name) (ui_descr)\n(ui_sequence)");

            const LibGeConfSetPropertyOptions = new vscode.CompletionItem('LIB_GE_CONF_set_property_options', vscode.CompletionItemKind.Interface);
            LibGeConfSetPropertyOptions.documentation = new vscode.MarkdownString("This function allows to manipulate the displayed options of a\ngiven options property in a given CONF-object\nYou can add/insert new\noptions or remove existing ones.\n(It is in postwriters responsibility that\nthe action to a new option is implemented in the\ncode).\n\n\nLIB_GE_CONF_set_property_options (object) (property) (operation) (opt_id) (opt_name) (pos) (forceSet)");

            const LibConfPropCustomProcBody = new vscode.CompletionItem('LIB_CONF_prop_custom_proc_body', vscode.CompletionItemKind.Interface);
            LibConfPropCustomProcBody.documentation = new vscode.MarkdownString("This function allows to define a custom proc for a\nCONFIG-property directly in the tcl script.\nIf defining the custom proc\nwith the use of this function, the contents of the\ncustom proc will properly be showed in\nthe PostConfigurator UI\n\n\nLIB_CONF_prop_custom_proc_body (code)");

            const LibConfDoPropCustomProc = new vscode.CompletionItem('LIB_CONF_do_prop_custom_proc', vscode.CompletionItemKind.Interface);
            LibConfDoPropCustomProc.documentation = new vscode.MarkdownString("This function is used to execute a proc body stored\nin a CONFIG objects property\n(e.g. defined in a COMMANDBLOCK object\nin PostConfigurator UI)\n\n\nLIB_CONF_do_prop_custom_proc (obj) (prop) (special_syntax) (start_index)");

            const LibGeGenerateChainSelectionConditionVars = new vscode.CompletionItem('LIB_GE_generate_chain_selection_condition_vars', vscode.CompletionItemKind.Interface);
            LibGeGenerateChainSelectionConditionVars.documentation = new vscode.MarkdownString("This function is used to initialize the condition variables used\nto display chain selection conditions\nin the UI. By default for\neach chain a selection condition is added (without explicitly calling\nthis function)\n\n\nLIB_GE_generate_chain_selection_condition_vars (number_of_conditions)");

            const LibFhFormatDatabase = new vscode.CompletionItem('LIB_FH_format_database', vscode.CompletionItemKind.Interface);
            LibFhFormatDatabase.documentation = new vscode.MarkdownString("This function formats the lines in a given .dat file\nto be exactly aligned per each column.\nThe formatted lines are\nreturned as string list. Optionally the dat file can be\nupdated\ndirectly with the formatted lines.\n\n\nLIB_FH_format_database (filename) (overwrite)");

            const LibFhCreateDirectory = new vscode.CompletionItem('LIB_FH_create_directory', vscode.CompletionItemKind.Interface);
            LibFhCreateDirectory.documentation = new vscode.MarkdownString("Creates a new directory if it's not yet existing.\nDirectory can\nbe specified in unix format (directory separator with /) or\nin windows format (separator with  (=escaped backslash)).\n\n\nLIB_FH_create_directory (directory)");

            const LibFhSearchPathRecursively = new vscode.CompletionItem('LIB_FH_search_path_recursively', vscode.CompletionItemKind.Interface);
            LibFhSearchPathRecursively.documentation = new vscode.MarkdownString("This function iterates through subdirectories, starting at a given path\nand gives back\na list of all found sub directories.\n\n\nLIB_FH_search_path_recursively (folders)\n(dirs)");

            const LibFhSearchFileGlob = new vscode.CompletionItem('LIB_FH_search_file_glob', vscode.CompletionItemKind.Interface);
            LibFhSearchFileGlob.documentation = new vscode.MarkdownString("This function searches for a file in a given directory,\nusing globstyle search.\nThis means that the filename can be specified\nwith wildcards (*).\nThe first match is returned.\n\n\nLIB_FH_search_file_glob (pathname) (filename) (resultname)");

            const LibFhFileToList = new vscode.CompletionItem('LIB_FH_file_to_list', vscode.CompletionItemKind.Interface);
            LibFhFileToList.documentation = new vscode.MarkdownString("This function reads a textfile into a string list.\nThe function\ncan be used safely as it opens and closes the\ntextfile automatically and provides\nerrorhandling.\n\n\nLIB_FH_file_to_list (filename) (filename_to_list) (apportion)");

            const LibFhFileWritable = new vscode.CompletionItem('LIB_FH_file_writable', vscode.CompletionItemKind.Interface);
            LibFhFileWritable.documentation = new vscode.MarkdownString("This function checks if a given file is writable or\nnot.\n\n\nLIB_FH_file_writable (file)");

            const LibFhListToFile = new vscode.CompletionItem('LIB_FH_list_to_file', vscode.CompletionItemKind.Interface);
            LibFhListToFile.documentation = new vscode.MarkdownString("This function writes the entry of a given string list\nto a text file.\n\n\nLIB_FH_list_to_file (list) (filename) (fileoption)");

            const LibFhFileToListLineNumbers = new vscode.CompletionItem('LIB_FH_file_to_list_line_numbers', vscode.CompletionItemKind.Interface);
            LibFhFileToListLineNumbers.documentation = new vscode.MarkdownString("This function reads a textfile into a string list with\na maximum of 'counter' lines.\nThis is the same function as\nLIB_FH_file_to_list, with the option to specify the number of lines\nto be read.\n\n\nLIB_FH_file_to_list_line_numbers (filename) (counter)");

            const LibFhCreateFile = new vscode.CompletionItem('LIB_FH_create_file', vscode.CompletionItemKind.Interface);
            LibFhCreateFile.documentation = new vscode.MarkdownString("Creates a textfile with a given directory and filename. A\ngiven variable or list will be written in the textfile.\n\n\nLIB_FH_create_file\n(filename) (fileoption) (filebody)");

            const LibFhCleanupDirectory = new vscode.CompletionItem('LIB_FH_cleanup_directory', vscode.CompletionItemKind.Interface);
            LibFhCleanupDirectory.documentation = new vscode.MarkdownString("Deletes all files in a given directory.\n\n\nLIB_FH_cleanup_directory (directory) (expression)");

            const LibFhOpenFile = new vscode.CompletionItem('LIB_FH_open_file', vscode.CompletionItemKind.Interface);
            LibFhOpenFile.documentation = new vscode.MarkdownString("This function creates a new or opens an existing file,\nspecified with the argument 'name'\nusing the tcl command 'open' and\nthe specified file access type.\nAfter this command, the function LIB_FH_output_literal\nwrites directly to this file.\nThe file will automatically be closed\nat the end of the post processor run.\n\n\nLIB_FH_open_file (name) (access)");

            const LibFhOutputLiteral = new vscode.CompletionItem('LIB_FH_output_literal', vscode.CompletionItemKind.Interface);
            LibFhOutputLiteral.documentation = new vscode.MarkdownString("This function writes text to the last file which was\nopened by LIB_FH_open_file.\nSee there for more information.\n\n\nLIB_FH_output_literal (output)");

            const LibFhEscapeSpecialCharacters = new vscode.CompletionItem('LIB_FH_escape_special_characters', vscode.CompletionItemKind.Interface);
            LibFhEscapeSpecialCharacters.documentation = new vscode.MarkdownString("This function escapes special characters\n\n\nLIB_FH_escape_special_characters (output)");

            const LibFhReverseEscapeSpecialCharacters = new vscode.CompletionItem('LIB_FH_reverse_escape_special_characters', vscode.CompletionItemKind.Interface);
            LibFhReverseEscapeSpecialCharacters.documentation = new vscode.MarkdownString("This function reverses escaped strings back to special characters.\nIt is\nthe opposite function to LIB_FH_escape_special_characters.\n\n\nLIB_FH_reverse_escape_special_characters (output)");

            const LibSpfAbortPostrun = new vscode.CompletionItem('LIB_SPF_abort_postrun', vscode.CompletionItemKind.Interface);
            LibSpfAbortPostrun.documentation = new vscode.MarkdownString("This function can be called to abort the postprocessing.\nIt has\nthe same effect as MOM_abort but is faster, clears messages\nand\ndoes a cleanup handling.\n\n\nLIB_SPF_abort_postrun (text) (once)");

            const LibSpfPretreatmentAddVar = new vscode.CompletionItem('LIB_SPF_pretreatment_add_var', vscode.CompletionItemKind.Interface);
            LibSpfPretreatmentAddVar.documentation = new vscode.MarkdownString("Defines an additional variable which should be stored during pretreatment.\nYou\nshould call this function inside a proc with the name\n'LIB_SPF_pt_additional_variables_xxx'\n'xxx' can be any name, e.g. mycustompost -) LIB_SPF_pt_additional_variables_mycustompost.\n\n\nLIB_SPF_pretreatment_add_var (proc_name)\n(var_name) (eventnumber)");

            const LibSpfPtExists = new vscode.CompletionItem('LIB_SPF_pt_exists', vscode.CompletionItemKind.Interface);
            LibSpfPtExists.documentation = new vscode.MarkdownString("Checks whether a pretreatment variable exists or not\n\n\nLIB_SPF_pt_exists (variable) (sequence)\n(path_name)");

            const LibSpfPtExistsNotEmpty = new vscode.CompletionItem('LIB_SPF_pt_exists_not_empty', vscode.CompletionItemKind.Interface);
            LibSpfPtExistsNotEmpty.documentation = new vscode.MarkdownString("Checks whether a pretreatment variable exists and is not empty\n\n\nLIB_SPF_pt_exists_not_empty\n(variable) (sequence) (path_name)");

            const LibSpfGetPretreatmentEventbased = new vscode.CompletionItem('LIB_SPF_get_pretreatment_eventbased', vscode.CompletionItemKind.Interface);
            LibSpfGetPretreatmentEventbased.documentation = new vscode.MarkdownString("This function accesses variables that have been collected in the\npretreatment postprocessor.\nIf a desired variable does not exist, an empty\nstring is returned.\nIt is mostly the same function as LIB_SPF_get_pretreatment,\nenhanced with the option to only\nconsider variables of an specified\nevent\n\n\nLIB_SPF_get_pretreatment_eventbased (event) (variable) (sequence) (path_name)");

            const LibSpfGetPretreatment = new vscode.CompletionItem('LIB_SPF_get_pretreatment', vscode.CompletionItemKind.Interface);
            LibSpfGetPretreatment.documentation = new vscode.MarkdownString("This function accesses variables that have been collected in the\npretreatment postprocessor.\nIf a desired variable does not exist, an empty\nstring is returned.\n\n\nLIB_SPF_get_pretreatment (variable) (sequence) (path_name)");

            const LibSpfIsVector = new vscode.CompletionItem('LIB_SPF_is_vector', vscode.CompletionItemKind.Interface);
            LibSpfIsVector.documentation = new vscode.MarkdownString("This function checks whether a value is a vector or\npoint or another value.\n\n\nLIB_SPF_is_vector (value)");

            const LibSpfIsMatrixEqual = new vscode.CompletionItem('LIB_SPF_is_matrix_equal', vscode.CompletionItemKind.Interface);
            LibSpfIsMatrixEqual.documentation = new vscode.MarkdownString("This function compares two matrixes and examines if they are\nequal within a specified tolerance.\n\n\nLIB_SPF_is_matrix_equal (Value1) (Value2) (Tolerance) (Elements)");

            const LibSpfIsFloating = new vscode.CompletionItem('LIB_SPF_is_floating', vscode.CompletionItemKind.Interface);
            LibSpfIsFloating.documentation = new vscode.MarkdownString("This function checks whether a value is a floating number\nor not.\nThis function also indicates if a value is noted\nwith decimals but holds an integer value.\n\n\nLIB_SPF_is_floating (value)");

            const LibSpfIsInteger = new vscode.CompletionItem('LIB_SPF_is_integer', vscode.CompletionItemKind.Interface);
            LibSpfIsInteger.documentation = new vscode.MarkdownString("This function detects if a given string represents an integer\nvalue or not.\nBy default the check considers the valid data\ntype format. Optionally it is\npossible to only consider the value\nno matter of the data type.\n\n\nLIB_SPF_is_integer (value) (mode)");

            const LibSpfIsNumber = new vscode.CompletionItem('LIB_SPF_is_number', vscode.CompletionItemKind.Interface);
            LibSpfIsNumber.documentation = new vscode.MarkdownString("This function checks if a given string represents a number\nin a valid TCL format.\nNote: exponential notation is also considered\nas a valid number if checked mathematically (default).\nOptionally you may\ncheck with the argument &quot;character&quot; wich only validates numbers in\nnormal decimal notation.\n\n\nLIB_SPF_is_number (value) (compared)");

            const LibSpfIsNoDecimal = new vscode.CompletionItem('LIB_SPF_is_no_decimal', vscode.CompletionItemKind.Interface);
            LibSpfIsNoDecimal.documentation = new vscode.MarkdownString("This function verifies that a given string contains no numbers.\n\n\nLIB_SPF_is_no_decimal\n(value)");

            const LibSpfIsEmpty = new vscode.CompletionItem('LIB_SPF_is_empty', vscode.CompletionItemKind.Interface);
            LibSpfIsEmpty.documentation = new vscode.MarkdownString("This function checks if a given string is empty (blanks\nare trimmed out before the check).\n\n\nLIB_SPF_is_empty (value)");

            const LibSpfIsPartOfString = new vscode.CompletionItem('LIB_SPF_is_part_of_string', vscode.CompletionItemKind.Interface);
            LibSpfIsPartOfString.documentation = new vscode.MarkdownString("This function checks if one string is a part of\nanother string.\nThe check is case insensitive, but can optionally be\nset to be case sensitive.\n\n\nLIB_SPF_is_part_of_string (string) (part) (case)");

            const LibSpfIsDivisible = new vscode.CompletionItem('LIB_SPF_is_divisible', vscode.CompletionItemKind.Interface);
            LibSpfIsDivisible.documentation = new vscode.MarkdownString("This function checks if a given input value can be\ndivided by 2 (this is the default divider).\nThe check is\ntrue if the divided resulting value is an integer value.\nOptionally\nit is possible to check with another divisor than 2.\n\n\nLIB_SPF_is_divisible\n(value) (divider)");

            const LibSpfArrayToVector = new vscode.CompletionItem('LIB_SPF_array_to_vector', vscode.CompletionItemKind.Interface);
            LibSpfArrayToVector.documentation = new vscode.MarkdownString("This function converts an 3 dimensional array into a list.\nIt is the corresponding\nfunction to LIB_SPF_vector_to_array\n\n\nLIB_SPF_array_to_vector (variable) (elements)");

            const LibSpfVectorToArray = new vscode.CompletionItem('LIB_SPF_vector_to_array', vscode.CompletionItemKind.Interface);
            LibSpfVectorToArray.documentation = new vscode.MarkdownString("This function converts a string list into an 3 dimensional\narray. It is the corresponding\nfunction to LIB_SPF_array_to_vector.\n\n\nLIB_SPF_vector_to_array (delist) (variable) (elements)");

            const LibSpfMatrixToList = new vscode.CompletionItem('LIB_SPF_matrix_to_list', vscode.CompletionItemKind.Interface);
            LibSpfMatrixToList.documentation = new vscode.MarkdownString("This function converts an 9 dimensional matrix into a list.\n\n\nLIB_SPF_matrix_to_list\n(variable) (elements)");

            const LibSpfListReverse = new vscode.CompletionItem('LIB_SPF_list_reverse', vscode.CompletionItemKind.Interface);
            LibSpfListReverse.documentation = new vscode.MarkdownString("This function reverses the order of a list.\n\n\nLIB_SPF_list_reverse (list)");

            const LibSpfListTrimLeft = new vscode.CompletionItem('LIB_SPF_list_trim_left', vscode.CompletionItemKind.Interface);
            LibSpfListTrimLeft.documentation = new vscode.MarkdownString("This function trims empty elements at the beginning of a\nlist.\n\n\nLIB_SPF_list_trim_left (list)");

            const LibSpfListTrimRight = new vscode.CompletionItem('LIB_SPF_list_trim_right', vscode.CompletionItemKind.Interface);
            LibSpfListTrimRight.documentation = new vscode.MarkdownString("This function trims empty elements at the end of a\nlist.\n\n\nLIB_SPF_list_trim_right (list)");

            const LibSpfListTrim = new vscode.CompletionItem('LIB_SPF_list_trim', vscode.CompletionItemKind.Interface);
            LibSpfListTrim.documentation = new vscode.MarkdownString("This function trims empty elements at the beginning and the\nend of a list.\n\n\nLIB_SPF_list_trim (list)");

            const LibSpfListTrimElements = new vscode.CompletionItem('LIB_SPF_list_trim_elements', vscode.CompletionItemKind.Interface);
            LibSpfListTrimElements.documentation = new vscode.MarkdownString("This function trims each element within a list.\n\n\nLIB_SPF_list_trim_elements (list)");

            const LibSpfListNonCommonElements = new vscode.CompletionItem('LIB_SPF_list_non_common_elements', vscode.CompletionItemKind.Interface);
            LibSpfListNonCommonElements.documentation = new vscode.MarkdownString("This function returns a list of elements that are not\ncommen in 2 given lists\n\n\nLIB_SPF_list_non_common_elements (list1) (list2)");

            const LibSpfListToTable = new vscode.CompletionItem('LIB_SPF_list_to_table', vscode.CompletionItemKind.Interface);
            LibSpfListToTable.documentation = new vscode.MarkdownString("Formats a string list into a table form. Every column\nis aligned to the longest element of\nthe respective column.\n\n\nLIB_SPF_list_to_table (in)\n(padding) (firstelement) (leader) (as_list)");

            const LibSpfEliminateZero = new vscode.CompletionItem('LIB_SPF_eliminate_zero', vscode.CompletionItemKind.Interface);
            LibSpfEliminateZero.documentation = new vscode.MarkdownString("This function formats a decimal number into a specified string\nformat and rounds it to the desired number of decimals.\n\n\nLIB_SPF_eliminate_zero\n(value) (decimal_places) (splitter)");

            const LibSpfEliminateZeroInline = new vscode.CompletionItem('LIB_SPF_eliminate_zero_inline', vscode.CompletionItemKind.Interface);
            LibSpfEliminateZeroInline.documentation = new vscode.MarkdownString("This function does the same task as LIB_SPF_eliminate_zero but applies\non every decimal\nexpression within a line/string list.\n\n\nLIB_SPF_eliminate_zero_inline (line) (word_seperator) (max_decimal_place)\n(iterationen)");

            const LibSpfAddWarning = new vscode.CompletionItem('LIB_SPF_add_warning', vscode.CompletionItemKind.Interface);
            LibSpfAddWarning.documentation = new vscode.MarkdownString("This function adds a warning message to the post process\ninfo window.\nThe configuration object 'CONF_SPF_warning' allows to set how warnings\nare being handled.\n\n\nLIB_SPF_add_warning (text) (mode) (function)");

            const LibSpfReadToolAttribute = new vscode.CompletionItem('LIB_SPF_read_tool_attribute', vscode.CompletionItemKind.Interface);
            LibSpfReadToolAttribute.documentation = new vscode.MarkdownString("This function reads tool attribute data from the active tool\nlibrary.\nInternally the standard MOM-command MOM_ask_library_attributes is used, but enriched with\nerror\nhandling.\n\n\nLIB_SPF_read_tool_attribute (attribute) (default) (ind) (cutter_libref)");

            const LibSpfReadPartAttribute = new vscode.CompletionItem('LIB_SPF_read_part_attribute', vscode.CompletionItemKind.Interface);
            LibSpfReadPartAttribute.documentation = new vscode.MarkdownString("This function reads part attribute data from the active part.\nThe\nfunction has error handling.\n\n\nLIB_SPF_read_part_attribute (attribute) (default) (ind) (clear)");

            const LibSpfReadOperAttribute = new vscode.CompletionItem('LIB_SPF_read_oper_attribute', vscode.CompletionItemKind.Interface);
            LibSpfReadOperAttribute.documentation = new vscode.MarkdownString("This function reads operation attribute data from the current operation.\nThe\nfunction has error handling.\n\n\nLIB_SPF_read_oper_attribute (attribute) (default) (ind) (clear)");

            const LibSpfReadProgramviewAttribute = new vscode.CompletionItem('LIB_SPF_read_programview_attribute', vscode.CompletionItemKind.Interface);
            LibSpfReadProgramviewAttribute.documentation = new vscode.MarkdownString("This function reads programview attribute data.\nThe function has error handling.\n\n\nLIB_SPF_read_programview_attribute\n(attribute) (default) (ind) (clear)");

            const LibSpfExtractUdecode = new vscode.CompletionItem('LIB_SPF_extract_udecode', vscode.CompletionItemKind.Interface);
            LibSpfExtractUdecode.documentation = new vscode.MarkdownString("This function returns the option number of an ude, provided\nthat the options start with\na number (an id) and are\nfollowed by - or _\nThis helps you creating language independant\nUDE's as we only consider the id and not the\nname\nafter the - or _\n\n\nLIB_SPF_extract_udecode (ude) (name)");

            const LibSpfRound = new vscode.CompletionItem('LIB_SPF_round', vscode.CompletionItemKind.Interface);
            LibSpfRound.documentation = new vscode.MarkdownString("This function returns the rounded value of a given value.\nThe\nrounding precision is based on the given precision.\n\n\nLIB_SPF_round (value) (precision)");

            const LibSpfMcsVector = new vscode.CompletionItem('LIB_SPF_mcs_vector', vscode.CompletionItemKind.Interface);
            LibSpfMcsVector.documentation = new vscode.MarkdownString("This function transforms a vector from machine coordinate to work\ncoordinate system.\n\n\nLIB_SPF_mcs_vector (input_vector) (output_vector)");

            const LibSpfRadToDeg = new vscode.CompletionItem('LIB_SPF_rad_to_deg', vscode.CompletionItemKind.Interface);
            LibSpfRadToDeg.documentation = new vscode.MarkdownString("This function converts an angular value in radians to an\nangular value in degrees.\n\n\nLIB_SPF_rad_to_deg (angrad)");

            const LibSpfDegToRad = new vscode.CompletionItem('LIB_SPF_deg_to_rad', vscode.CompletionItemKind.Interface);
            LibSpfDegToRad.documentation = new vscode.MarkdownString("This function converts an angular value in degrees to an\nangular value in radians.\n\n\nLIB_SPF_deg_to_rad (angdeg)");

            const LibSpfConvertDecimalToBinary = new vscode.CompletionItem('LIB_SPF_convert_decimal_to_binary', vscode.CompletionItemKind.Interface);
            LibSpfConvertDecimalToBinary.documentation = new vscode.MarkdownString("This function converts decimal values to binary values.\n\n\nLIB_SPF_convert_decimal_to_binary (decimal)");

            const LibSpfConvertHexToString = new vscode.CompletionItem('LIB_SPF_convert_hex_to_string', vscode.CompletionItemKind.Interface);
            LibSpfConvertHexToString.documentation = new vscode.MarkdownString("This function converts a string to a hexadecimal value.\n\nThis function\nconverts an hexadecimal value to a string.\n\n\nLIB_SPF_convert_hex_to_string (hex)");

            const LibSpfConvertToMd5 = new vscode.CompletionItem('LIB_SPF_convert_to_md5', vscode.CompletionItemKind.Interface);
            LibSpfConvertToMd5.documentation = new vscode.MarkdownString("This function converts a string to a md5 value.\n\n\nLIB_SPF_convert_to_md5 (msg)");

            const LibSpfConvertPoint = new vscode.CompletionItem('LIB_SPF_convert_point', vscode.CompletionItemKind.Interface);
            LibSpfConvertPoint.documentation = new vscode.MarkdownString("This function converts the current position (mom_pos and mom_alt_pos) into\nthe desired kinematic system.\nThe mom_out_angle_pos is calculated with the limits\nin the defined configuration, taking into account the\nlimit and mom_kin_(4)5th_axis_direction\nvariables.\n\n\nLIB_SPF_convert_point (option)");

            const LibSpfConvertBinaryToDecimal = new vscode.CompletionItem('LIB_SPF_convert_binary_to_decimal', vscode.CompletionItemKind.Interface);
            LibSpfConvertBinaryToDecimal.documentation = new vscode.MarkdownString("This function converts numbers in binary format to their corresponcance\nin decimal format.\n\n\nLIB_SPF_convert_binary_to_decimal (binary)");

            const LibSpfExistsAddress = new vscode.CompletionItem('LIB_SPF_exists_address', vscode.CompletionItemKind.Interface);
            LibSpfExistsAddress.documentation = new vscode.MarkdownString("This function checks whether the given address is defined in\none of the currently sourced definition files.\nIn order to use\nthis function you have to activate the property [CONF_SPF_advanced_settings parse_def_file].\n\n\nLIB_SPF_exists_address\n(address) (supress_error)");

            const LibSpfAskAddress = new vscode.CompletionItem('LIB_SPF_ask_address', vscode.CompletionItemKind.Interface);
            LibSpfAskAddress.documentation = new vscode.MarkdownString("This function gives you detailled access to the definition elements\nof an address.\nIn order to use this function you have\nto activate the property [CONF_SPF_advanced_settings parse_def_file].\n\n\nLIB_SPF_ask_address (address) (parameter) (supress_error)");

            const LibSpfExistsFormat = new vscode.CompletionItem('LIB_SPF_exists_format', vscode.CompletionItemKind.Interface);
            LibSpfExistsFormat.documentation = new vscode.MarkdownString("This function checks if the given format name is defined\nin one of the currently sourced definition files.\nIn order to\nuse this function you have to activate the property [CONF_SPF_advanced_settings\nparse_def_file].\n\n\nLIB_SPF_exists_format (format) (supress_error)");

            const LibSpfAskFormat = new vscode.CompletionItem('LIB_SPF_ask_format', vscode.CompletionItemKind.Interface);
            LibSpfAskFormat.documentation = new vscode.MarkdownString("This function reads the format definition of the given format\nname out of of the currently sourced definition files.\nIn order\nto use this function you have to activate the property\n[CONF_SPF_advanced_settings parse_def_file].\n\n\nLIB_SPF_ask_format (format) (supress_error)");

            const LibSpfExistsBlockTemplate = new vscode.CompletionItem('LIB_SPF_exists_block_template', vscode.CompletionItemKind.Interface);
            LibSpfExistsBlockTemplate.documentation = new vscode.MarkdownString("This function checks if the given block template name is\ndefined in one of the currently sourced definition files.\nIn order\nto use this function you have to activate the property\n[CONF_SPF_advanced_settings parse_def_file].\n\n\nLIB_SPF_exists_block_template (block_template) (supress_error)");

            const LibSpfAskBlockTemplate = new vscode.CompletionItem('LIB_SPF_ask_block_template', vscode.CompletionItemKind.Interface);
            LibSpfAskBlockTemplate.documentation = new vscode.MarkdownString("This function gives you detailled access to the definition elements\nof a block template.\nIn order to use this function you\nhave to activate the property [CONF_SPF_advanced_settings parse_def_file].\n\n\nLIB_SPF_ask_block_template (block_template) (parameter) (supress_error)");

            const LibSpfCallCycle = new vscode.CompletionItem('LIB_SPF_call_cycle', vscode.CompletionItemKind.Interface);
            LibSpfCallCycle.documentation = new vscode.MarkdownString("This function writes a machining cycle call in the NC\ncode by considering the respective\nformat settings in the PostConfigurator user\ninterface. It is mainly used for Heidenhain\nmultiline cycle output and\nfor Sinumerik cycle output.\n\n\nLIB_SPF_call_cycle (cycle) (prefix) (exclusion) (seperator) (trailer)");

            const LibSpfModuloSign = new vscode.CompletionItem('LIB_SPF_modulo_sign', vscode.CompletionItemKind.Interface);
            LibSpfModuloSign.documentation = new vscode.MarkdownString("Used to detect sign rotary motion with modulo axis\n\n\nLIB_SPF_modulo_sign (first)\n(second) (max_value)");

            const LibSpfAtanPolar = new vscode.CompletionItem('LIB_SPF_atan_polar', vscode.CompletionItemKind.Interface);
            LibSpfAtanPolar.documentation = new vscode.MarkdownString("Utility to convert cartesian coordinate to polar\n\n\nLIB_SPF_atan_polar (v1) (v2)");

            const LibSpfAskDelta4thOr5th = new vscode.CompletionItem('LIB_SPF_ask_delta_4th_or_5th', vscode.CompletionItemKind.Interface);
            LibSpfAskDelta4thOr5th.documentation = new vscode.MarkdownString("This function returns the delta degrees rotation of the axis_no(4\nor 5)\n\n\nLIB_SPF_ask_delta_4th_or_5th (axis_no)");

            const LibSpfAskSmallerOf4th5th = new vscode.CompletionItem('LIB_SPF_ask_smaller_of_4th_5th', vscode.CompletionItemKind.Interface);
            LibSpfAskSmallerOf4th5th.documentation = new vscode.MarkdownString("This function returns the shortest delta degrees rotation out of\n4th and 5th axis.\n\n\nLIB_SPF_ask_smaller_of_4th_5th (axis_no)");

            const LibSpfSetOpToolParamCondition = new vscode.CompletionItem('LIB_SPF_set_op_tool_param_condition', vscode.CompletionItemKind.Interface);
            LibSpfSetOpToolParamCondition.documentation = new vscode.MarkdownString("Utility to check the state of global variables at specific\nposition in the postrun\n\n\nLIB_SPF_set_op_tool_param_condition (param) (args)");

            const LibSpfExecuteOpToolParamCondition = new vscode.CompletionItem('LIB_SPF_execute_op_tool_param_condition', vscode.CompletionItemKind.Interface);
            LibSpfExecuteOpToolParamCondition.documentation = new vscode.MarkdownString("This function executes the predefined condition checks, set in LIB_SPF_op_tool_param_condition\nand LIB_SPF_custom_op_tool_param_condition.\nThe function can be called in any proc. The\nargument has to be the name of the calling proc.\n\n\nLIB_SPF_execute_op_tool_param_condition\n(calling_proc) (position)");

            const LibSpfGetPartnname = new vscode.CompletionItem('LIB_SPF_get_partnname', vscode.CompletionItemKind.Interface);
            LibSpfGetPartnname.documentation = new vscode.MarkdownString("This function returns the partname.\n\n\nLIB_SPF_get_partnname (calling_proc) (position)");

            const LibSpfResetMotionsToZero = new vscode.CompletionItem('LIB_SPF_reset_motions_to_zero', vscode.CompletionItemKind.Interface);
            LibSpfResetMotionsToZero.documentation = new vscode.MarkdownString("This command reset the values of the axis to zero.\nThis is useful to calculate the kinematic\nvalues of the next\noperation based from zero.\n\n\nLIB_SPF_reset_motions_to_zero (option)");

            const LibDcCompleteFormatline = new vscode.CompletionItem('LIB_DC_complete_formatline', vscode.CompletionItemKind.Interface);
            LibDcCompleteFormatline.documentation = new vscode.MarkdownString("Formats a string with repeated characters at a given number.\n\n\nLIB_DC_complete_formatline\n(string) (character)");

            const LibDcFormatString = new vscode.CompletionItem('LIB_DC_format_string', vscode.CompletionItemKind.Interface);
            LibDcFormatString.documentation = new vscode.MarkdownString("Formats a string according to a given pattern witch describes\ncolumns. It defines the length of an\nstring element per column,\nthe alignment and also separators between columns.\n\n\nLIB_DC_format_string (string) (character) (ellipsis)");

            const LibDcCheckVariable = new vscode.CompletionItem('LIB_DC_check_variable', vscode.CompletionItemKind.Interface);
            LibDcCheckVariable.documentation = new vscode.MarkdownString("Checks if a given expression is an existing variable and\ngives back its current value.\nIf it is not an existing\nvariable it gives back the defaulttext\n\n\nLIB_DC_check_variable (variable) (defaulttext)");

            const LibDcTimeFormat = new vscode.CompletionItem('LIB_DC_time_format', vscode.CompletionItemKind.Interface);
            LibDcTimeFormat.documentation = new vscode.MarkdownString("Formats minute values into time format hh:min:sec\n\n\nLIB_DC_time_format (arg1)");

            const LibDcEscapeString = new vscode.CompletionItem('LIB_DC_escape_string', vscode.CompletionItemKind.Interface);
            LibDcEscapeString.documentation = new vscode.MarkdownString("This function escapes an input string in order to be\nfurther used in tcl language\n\n\nLIB_DC_escape_string (arg1)");

            const LibDcEllipsisCharacter = new vscode.CompletionItem('LIB_DC_ellipsis_character', vscode.CompletionItemKind.Interface);
            LibDcEllipsisCharacter.documentation = new vscode.MarkdownString("This function generates a shortened representation of a given string.\nIt is mostly used for\ndisplaying long filenames and paths.\n\n\nLIB_DC_ellipsis_character (string)\n(length) (postion) (placeholder)");

            const LibReturnMove = new vscode.CompletionItem('LIB_RETURN_move', vscode.CompletionItemKind.Interface);
            LibReturnMove.documentation = new vscode.MarkdownString("Writes return motions to the NC-code. Settings for home motions\n(CONF_CTRL_moves return_mode)\nare taken into consideration for the output format of\nthe return motions.\n\n\nLIB_RETURN_move (Addresses) (property)");

            const LibMainOriginCall = new vscode.CompletionItem('LIB_main_origin_call', vscode.CompletionItemKind.Interface);
            LibMainOriginCall.documentation = new vscode.MarkdownString("Writes the active main origin to the NC-code, provided that\nthe property\n[CONF_CTRL_origin use_main] is set to 'On'.\n\n\nLIB_main_origin_call (offset_nbr) (create)");

            const LibIsvIniGetEnvDirInfo = new vscode.CompletionItem('LIB_ISV_ini_get_env_dir_info', vscode.CompletionItemKind.Interface);
            LibIsvIniGetEnvDirInfo.documentation = new vscode.MarkdownString("This function returns the path, defined with the environment variable\nUGII_CAM_CSE_USER_DIR.\nIf the variable is not set it returns an empty\nstring and displays an information in the listing window.\n\n\nLIB_ISV_ini_get_env_dir_info (mode)");

            const LibOutputLocalZeroOffset = new vscode.CompletionItem('LIB_output_local_zero_offset', vscode.CompletionItemKind.Interface);
            LibOutputLocalZeroOffset.documentation = new vscode.MarkdownString("Output the local origin reset and definition only when needed\n(CYCL DEF 7)\n\n\nLIB_output_local_zero_offset (Addresses) (property)");

            const LibStartOfProgramBlkForm = new vscode.CompletionItem('LIB_start_of_program_blk_form', vscode.CompletionItemKind.Interface);
            LibStartOfProgramBlkForm.documentation = new vscode.MarkdownString("This function outputs the BLK FORM definition for simulation purposes\non the heidenhain controller.\nDefault values are -20 inches in XYZ\nup to +20 inches respectively -500mm up to +500mm.\nBlock form\nmay be defined by an UDE with two points. mom_blk_point_1\ndefines the lower left point while\nmom_blk_point_2 defines the upper right\npoint.\nThe whole procedure may be copied to the service layer\nfor customization purposes.\n\n\nLIB_start_of_program_blk_form (Addresses) (property)");

            const LibCtrlCustomCycle800AutoSetKin = new vscode.CompletionItem('LIB_CTRL_custom_cycle800_auto_set_kin', vscode.CompletionItemKind.Interface);
            LibCtrlCustomCycle800AutoSetKin.documentation = new vscode.MarkdownString("Allows to define the kinematics used for cycle800 machine/customer specific\nThe\nkinematics for a specific CYCLE800 _MODE (39,54...) can be implemented\n\nThe\nproc is called from LIB_SPF_KINEMATICS_set_plane_output_kin_ENTRY and gets\n[CONF_S840D_cycle800 _MODE] as argument\n\nThe\nproc returns 0 if the specific mode is not treaten\nin the proc, otherwise 1\n\n\nLIB_CTRL_custom_cycle800_auto_set_kin (mode)");

            const LibCtrlCustomCycle800PlaneOutputKin = new vscode.CompletionItem('LIB_CTRL_custom_cycle800_plane_output_kin', vscode.CompletionItemKind.Interface);
            LibCtrlCustomCycle800PlaneOutputKin.documentation = new vscode.MarkdownString("Allows to define the kinematics used for cycle800 machine/customer specific\nThe\nkinematics for a specific CYCLE800 _MODE (39,54...) can be implemented\n\nThe\nproc is called from LIB_CSYS_plane_output_init and gets\n[CONF_S840D_cycle800 _MODE] as argument\n\nThe\nproc returns 0 if the specific mode is not treaten\nin the proc, otherwise 1\n\n\nLIB_CTRL_custom_cycle800_plane_output_kin (mode)");


            return [LibGeCommandBufferSnippet, LibGeUi, LibGeCleanupList, LibGeFormatPathNames, LibGeSortValue, LibGeIsPath, LibGeIsUncPath, LibGeSet, LibGeLappend, 
                LibGeAskTypeSubtype, LibGeReadExpressionValue, LibGeMessage, LibGeTruncateLine, LibGeMsg, LibGeStringToupper, LibGeStringRangeToupper, LibGeReplaceSpecialCharacters, 
                LibGeCommentConvert, LibGeErrorMessage, LibGeAbortMessage, LibGeMessageDialog, LibGeWish, LibGeReadDatabase, LibGeCopyVarRange, LibGeTime, LibGeDate, 
                LibGeCommandBuffer, LibGeCommandBufferOutput, LibGeStringAppend, LibGeCreateJsonArray, LibGeCommandBufferEditInsert, LibGeCommandBufferEditRemove, 
                LibGeCommandBufferEditMove, LibGeCommandBufferEditReplace, LibGeCommandBufferEditAppend, LibGeCommandBufferEditPrepend, LibGeSnapshot, LibGeConfSetPropertyAccess, 
                LibGeConfSetPropertyDatatype, LibGeConfSetPropertyUi, LibGeConfAddChain, LibGeConfSetPropertyOptions, LibConfPropCustomProcBody, LibConfDoPropCustomProc, 
                LibGeGenerateChainSelectionConditionVars, LibFhFormatDatabase, LibFhCreateDirectory, LibFhSearchPathRecursively, LibFhSearchFileGlob, LibFhFileToList, 
                LibFhFileWritable, LibFhListToFile, LibFhFileToListLineNumbers, LibFhCreateFile, LibFhCleanupDirectory, LibFhOpenFile, LibFhOutputLiteral, 
                LibFhEscapeSpecialCharacters, LibFhReverseEscapeSpecialCharacters, LibSpfAbortPostrun, LibSpfPretreatmentAddVar, LibSpfPtExists, LibSpfPtExistsNotEmpty, 
                LibSpfGetPretreatmentEventbased, LibSpfGetPretreatment, LibSpfIsVector, LibSpfIsMatrixEqual, LibSpfIsFloating, LibSpfIsInteger, LibSpfIsNumber, LibSpfIsNoDecimal, 
                LibSpfIsEmpty, LibSpfIsPartOfString, LibSpfIsDivisible, LibSpfArrayToVector, LibSpfVectorToArray, LibSpfMatrixToList, LibSpfListReverse, LibSpfListTrimLeft, 
                LibSpfListTrimRight, LibSpfListTrim, LibSpfListTrimElements, LibSpfListNonCommonElements, LibSpfListToTable, LibSpfEliminateZero, LibSpfEliminateZeroInline, 
                LibSpfAddWarning, LibSpfReadToolAttribute, LibSpfReadPartAttribute, LibSpfReadOperAttribute, LibSpfReadProgramviewAttribute, LibSpfExtractUdecode, LibSpfRound,  
                LibSpfMcsVector, LibSpfRadToDeg, LibSpfDegToRad, LibSpfConvertDecimalToBinary, LibSpfConvertHexToString, LibSpfConvertToMd5, LibSpfConvertPoint, 
                LibSpfConvertBinaryToDecimal, LibSpfExistsAddress, LibSpfAskAddress, LibSpfExistsFormat, LibSpfAskFormat, LibSpfExistsBlockTemplate, LibSpfAskBlockTemplate, 
                LibSpfCallCycle, LibSpfModuloSign, LibSpfAtanPolar, LibSpfAskDelta4thOr5th, LibSpfAskSmallerOf4th5th, LibSpfSetOpToolParamCondition, LibSpfExecuteOpToolParamCondition, 
                LibSpfGetPartnname, LibSpfResetMotionsToZero, LibDcCompleteFormatline, LibDcFormatString, LibDcCheckVariable, LibDcTimeFormat, LibDcEscapeString, 
                LibDcEllipsisCharacter, LibReturnMove, LibMainOriginCall, LibIsvIniGetEnvDirInfo, LibOutputLocalZeroOffset, LibStartOfProgramBlkForm, 
                LibCtrlCustomCycle800AutoSetKin, LibCtrlCustomCycle800PlaneOutputKin]

        }
    }, "B" // triggered whenever a ' ' is being typed
    );



    const string_provider = vscode.languages.registerCompletionItemProvider('NX', {
        provideCompletionItems(document, position) {
            // get all text until the `position` and check if it reads `string `
            // and if so then complete with the string methods.
            let linePrefix = document.lineAt(position).text.substr(0, position.character);
            if (!linePrefix.endsWith('string ')) {
                return undefined;
            }
            


            const string_trim = new vscode.CompletionItem('trim ', vscode.CompletionItemKind.Method);
            string_trim.documentation = new vscode.MarkdownString("Returns a value equal to string except that any leading or trailing characters present in the string given by chars are removed. If chars is not specified then white space is removed\n\nstring trim (string) (chars)");

            const string_compare = new vscode.CompletionItem('compare', vscode.CompletionItemKind.Method);
            string_compare.insertText = new vscode.SnippetString('compare ${1:string1} ${2:string1}$0');
            string_compare.documentation = new vscode.MarkdownString("compares string to another string");

            const string_index = new vscode.CompletionItem('index ', vscode.CompletionItemKind.Method);
            string_index.documentation = new vscode.MarkdownString("gives back the index of a character or string");

            const string_reverse = new vscode.CompletionItem('reverse ', vscode.CompletionItemKind.Method);
            string_reverse.documentation = new vscode.MarkdownString("Returns a string that is the same length as string but with its characters in the reverse order.");

            const string_toLower = new vscode.CompletionItem('tolower', vscode.CompletionItemKind.Method);
            string_toLower.insertText = new vscode.SnippetString('tolower ${1:string}$0');
            string_toLower.documentation = new vscode.MarkdownString("converts the string in lower case");

            const string_toUpper = new vscode.CompletionItem('toupper', vscode.CompletionItemKind.Method);
            string_toUpper.insertText = new vscode.SnippetString('toupper ${1:string}$0');
            string_toUpper.documentation = new vscode.MarkdownString("converts the string in upper case");

            const string_totitle = new vscode.CompletionItem('totitle ', vscode.CompletionItemKind.Method);
            string_totitle.documentation = new vscode.MarkdownString("Returns a value equal to string except that the first character in string is converted to its Unicode title case variant");

            const string_length = new vscode.CompletionItem('length ', vscode.CompletionItemKind.Method);
            string_length.documentation = new vscode.MarkdownString("Returns a decimal string giving the number of characters in string.");

            const string_repeat = new vscode.CompletionItem('repeat ', vscode.CompletionItemKind.Method);
            string_repeat.documentation = new vscode.MarkdownString("Returns string repeated count number of times.\n\nstring repeat (string) (count)");

            const string_range = new vscode.CompletionItem('range ', vscode.CompletionItemKind.Method);
            string_range.documentation = new vscode.MarkdownString("Returns a range of consecutive characters from string, starting with the character whose index is first and ending with the character whose index is last.\n\nstring range (string) (first) (last)");

            const string_replace = new vscode.CompletionItem('replace ', vscode.CompletionItemKind.Method);
            string_replace.documentation = new vscode.MarkdownString("Removes a range of consecutive characters from string, starting with the character whose index is first and ending with the character whose index is last.\n\nstring replace (string) (first) (last) (newstring)");

            const string_map = new vscode.CompletionItem('map ', vscode.CompletionItemKind.Method);
            string_map.documentation = new vscode.MarkdownString("Replaces substrings in string based on the key-value pairs in mapping. mapping is a list of key value key value ...\n\nstring map {(old) (new) (old) (new)} (string)");

            const string_isLower = new vscode.CompletionItem('is lower ', vscode.CompletionItemKind.Method);
            string_isLower.documentation = new vscode.MarkdownString("Any of the valid string is lower case");

            const string_isUpper = new vscode.CompletionItem('is upper ', vscode.CompletionItemKind.Method);
            string_isUpper.documentation = new vscode.MarkdownString("Any of the valid string is Upper case");

            const string_isAscii = new vscode.CompletionItem('is ascii ', vscode.CompletionItemKind.Method);
            string_isAscii.documentation = new vscode.MarkdownString("Any Unicode character.");

            const string_isInteger = new vscode.CompletionItem('is integer ', vscode.CompletionItemKind.Method);
            string_isInteger.documentation = new vscode.MarkdownString("Any of the valid string is a integer");

            const string_isAlnum = new vscode.CompletionItem('is alnum ', vscode.CompletionItemKind.Method);
            string_isAlnum.documentation = new vscode.MarkdownString("Any Unicode alphabet or digit character.");

            const string_isDigit = new vscode.CompletionItem('is digit ', vscode.CompletionItemKind.Method);
            string_isDigit.documentation = new vscode.MarkdownString("Any Unicode digit character.");

            const string_isDouble = new vscode.CompletionItem('is double ', vscode.CompletionItemKind.Method);
            string_isDouble.documentation = new vscode.MarkdownString("is a double");

            const string_isAlpha = new vscode.CompletionItem('is alpha ', vscode.CompletionItemKind.Method);
            string_isAlpha.documentation = new vscode.MarkdownString("Any Unicode alphabet character.");

            const string_match = new vscode.CompletionItem('match ', vscode.CompletionItemKind.Method);
            string_match.documentation = new vscode.MarkdownString("Determine whether pattern matches string, returning return 1 if it does, 0 if it doesn't.\n\nstring match (pattern) (string)");
   
            return [string_totitle, string_repeat, string_isAlpha, string_trim, string_compare, string_index, string_reverse, string_toLower, string_toUpper, string_length, string_range, string_replace, 
                    string_map, string_isLower, string_isUpper, string_isAscii, string_isInteger, string_isAlnum, string_isDigit, string_isDouble, string_match]

        }
    }, ' ' // triggered whenever a ' ' is being typed
    );





    const file_provider = vscode.languages.registerCompletionItemProvider('NX', {
        provideCompletionItems(document, position) {
            // get all text until the `position` and check if it reads `file `
            // and if so then complete with the file methods.
            let linePrefix = document.lineAt(position).text.substr(0, position.character);
            if (!linePrefix.endsWith('file ')) {
                return undefined;
            }

                const file_split = new vscode.CompletionItem('split ', vscode.CompletionItemKind.Method);
                file_split.documentation = new vscode.MarkdownString("Returns a list whose elements are the path components in name. The first element of the list will have the same path type as name. All other elements will be relative. Path separators will be discarded unless they are needed to ensure that an element is unambiguously relative");

                const file_rename = new vscode.CompletionItem('rename ', vscode.CompletionItemKind.Method);
                file_rename.documentation = new vscode.MarkdownString("The first form takes the file or directory specified by pathname source and renames it to target, moving the file if the pathname target specifies a name in a different directory. If target is an existing directory, then the second form is used. The second form moves each source file or directory into the directory targetDir. Existing files will not be overwritten unless the -force option is specified.\n\nfile rename (-force) (source) (target)");

                const file_dirname = new vscode.CompletionItem('dirname ', vscode.CompletionItemKind.Method);
                file_dirname.documentation = new vscode.MarkdownString("Returns a name comprised of all of the path components in name excluding the last element.");

                const file_isDirectory = new vscode.CompletionItem('is directory ', vscode.CompletionItemKind.Method);
                file_isDirectory.documentation = new vscode.MarkdownString("Returns 1 if file name is a directory, 0 otherwise.");

                const file_join = new vscode.CompletionItem('join ', vscode.CompletionItemKind.Method);
                file_join.documentation = new vscode.MarkdownString("Takes one or more file names and combines them, using the correct path separator for the current platform. If a particular name is relative, then it will be joined to the previous file name argument. Otherwise, any earlier arguments will be discarded, and joining will proceed from the current argument.");

                const file_exists = new vscode.CompletionItem('exists ', vscode.CompletionItemKind.Method);
                file_exists.documentation = new vscode.MarkdownString("Returns 1 if file name exists and the current user has search privileges for the directories leading to it, 0 otherwise.");

                const file_type = new vscode.CompletionItem('type ', vscode.CompletionItemKind.Method);
                file_type.documentation = new vscode.MarkdownString("");

                const file_delete = new vscode.CompletionItem('delete ', vscode.CompletionItemKind.Method);
                file_delete.documentation = new vscode.MarkdownString("Removes the file or directory specified by each pathname argument. Non-empty directories will be removed only if the -force option is specified.\n\nfile delete (-force) (pathname)");

                const file_size = new vscode.CompletionItem('size ', vscode.CompletionItemKind.Method);
                file_size.documentation = new vscode.MarkdownString("Returns a decimal string giving the size of file name in bytes. If the file does not exist or its size cannot be queried then an error is generated.");

                const file_readable = new vscode.CompletionItem('readable ', vscode.CompletionItemKind.Method);
                file_readable.documentation = new vscode.MarkdownString("Returns 1 if file name is readable by the current user, 0 otherwise.");

                const file_writeable = new vscode.CompletionItem('writeable ', vscode.CompletionItemKind.Method);
                file_writeable.documentation = new vscode.MarkdownString("Returns 1 if file name is writable by the current user, 0 otherwise..");

                const file_copy = new vscode.CompletionItem('copy ', vscode.CompletionItemKind.Method);
                file_copy.documentation = new vscode.MarkdownString("The first form makes a copy of the file or directory source under the pathname target. If target is an existing directory, then the second form is used. The second form makes a copy inside targetDir of each source file listed. If a directory is specified as a source, then the contents of the directory will be recursively copied into targetDir. Existing files will not be overwritten unless the -force option is specified\n\nfile copy (-force) (source) (target)");

                const file_mkdir = new vscode.CompletionItem('mkdir ', vscode.CompletionItemKind.Method);
                file_mkdir.documentation = new vscode.MarkdownString("Creates each directory specified.");

                const file_tail = new vscode.CompletionItem('tail ', vscode.CompletionItemKind.Method);
                file_tail.documentation = new vscode.MarkdownString("Returns all of the characters in the last filesystem component of name. Any trailing directory separator in name is ignored. If name contains no separators then returns name");

                const file_extension = new vscode.CompletionItem('extension ', vscode.CompletionItemKind.Method);
                file_extension.documentation = new vscode.MarkdownString("Returns all of the characters in name after and including the last dot in the last element of name. If there is no dot in the last element of name then returns the empty string.");

                const file_isFile = new vscode.CompletionItem('is file ', vscode.CompletionItemKind.Method);
                file_isFile.documentation = new vscode.MarkdownString("Returns 1 if file name is a regular file, 0 otherwise.");


            return [file_writeable, file_readable, file_exists, file_split, file_rename, file_dirname, file_isDirectory, file_join, file_type, file_delete, file_size, file_copy, 
                    file_mkdir, file_extension, file_tail, file_isFile]
        }
    }, ' ' // triggered whenever a ' ' is being typed
    );

    const package_provider = vscode.languages.registerCompletionItemProvider('NX', {
        provideCompletionItems(document, position) {
            // get all text until the `position` and check if it reads `package `
            // and if so then complete with the package methods.
            let linePrefix = document.lineAt(position).text.substr(0, position.character);
            if (!linePrefix.endsWith('package ')) {
                return undefined;
            }

                const package_require = new vscode.CompletionItem('require ', vscode.CompletionItemKind.Method);
                package_require.documentation = new vscode.MarkdownString("This command is typically invoked by Tcl code that wishes to use a particular version of a particular package. The arguments indicate which package is wanted, and the command ensures that a suitable version of the package is loaded into the interpreter. If the command succeeds, it returns the version number that is loaded; otherwise it generates an error.");

                const package_provide = new vscode.CompletionItem('provide ', vscode.CompletionItemKind.Method);
                package_provide.documentation = new vscode.MarkdownString("This command is invoked to indicate that version version of package package is now present in the interpreter.");


            return [package_require, package_provide]
        }
    }, ' ' // triggered whenever a ' ' is being typed
    );

    const clock_provider = vscode.languages.registerCompletionItemProvider('NX', {
        provideCompletionItems(document, position) {
            // get all text until the `position` and check if it reads `package `
            // and if so then complete with the package methods.
            let linePrefix = document.lineAt(position).text.substr(0, position.character);
            if (!linePrefix.endsWith('clock ')) {
                return undefined;
            }

                const clock_scan = new vscode.CompletionItem('scan ', vscode.CompletionItemKind.Method);
                clock_scan.documentation = new vscode.MarkdownString("Scans a time that is expressed as a character string and produces an integer number of seconds");
                clock_scan.insertText = new vscode.SnippetString('scan ${1:variable} -format {${2:%b} ${3:%d}, ${4:%Y}}$0');

                const clock_format = new vscode.CompletionItem('format ', vscode.CompletionItemKind.Method);
                clock_format.documentation = new vscode.MarkdownString("Formats a time that is expressed as an integer number of seconds into a format intended for consumption by users or external programs.");
                clock_format.insertText = new vscode.SnippetString('format ${1:variable} -format ${2:%H}:${3:%M}:${4:%S}$0');

                const clock_seconds = new vscode.CompletionItem('seconds ', vscode.CompletionItemKind.Method);
                clock_seconds.documentation = new vscode.MarkdownString("Returns the current time as an integer number of seconds.");

            return [clock_seconds, clock_format, clock_scan]
        }
    }, ' ' // triggered whenever a ' ' is being typed
    );

    const clock_format_provider = vscode.languages.registerCompletionItemProvider('NX', {
        provideCompletionItems(document, position) {
            // get all text until the `position` and check if it reads `package `
            // and if so then complete with the package methods.
            let linePrefix = document.lineAt(position).text.substr(0, position.character);
            if (!linePrefix.includes('-format ')) {
                return undefined;
            }

            const clock_format_a = new vscode.CompletionItem('%a');
            clock_format_a.insertText = new vscode.SnippetString("a");
            clock_format_a.documentation = new vscode.MarkdownString("Abbreviated weekday name (Mon, Tue, etc.)");

            const clock_format_A = new vscode.CompletionItem('%A');
            clock_format_A.insertText = new vscode.SnippetString("A");
            clock_format_A.documentation = new vscode.MarkdownString("Full weekday name (Monday, Tuesday, etc.)");

            const clock_format_b = new vscode.CompletionItem('%b');
            clock_format_b.insertText = new vscode.SnippetString("b");
            clock_format_b.documentation = new vscode.MarkdownString("Abbreviated month name (Jan, Feb, etc.)");

            const clock_format_B = new vscode.CompletionItem('%B');
            clock_format_B.insertText = new vscode.SnippetString("B");
            clock_format_B.documentation = new vscode.MarkdownString("Full month name (January, February, etc.)");

            const clock_format_d = new vscode.CompletionItem('%d');
            clock_format_d.insertText = new vscode.SnippetString("d");
            clock_format_d.documentation = new vscode.MarkdownString("Day of month");

            const clock_format_j = new vscode.CompletionItem('%j');
            clock_format_j.insertText = new vscode.SnippetString("j");
            clock_format_j.documentation = new vscode.MarkdownString("Julian day of year");

            const clock_format_m = new vscode.CompletionItem('%m');
            clock_format_m.insertText = new vscode.SnippetString("m");
            clock_format_m.documentation = new vscode.MarkdownString("Month number (01-12)");

            const clock_format_y = new vscode.CompletionItem('%y');
            clock_format_y.insertText = new vscode.SnippetString("y");
            clock_format_y.documentation = new vscode.MarkdownString("Year in century");

            const clock_format_Y = new vscode.CompletionItem('%Y');
            clock_format_Y.insertText = new vscode.SnippetString("Y");
            clock_format_Y.documentation = new vscode.MarkdownString("Year with 4 digits");

            const clock_format_H = new vscode.CompletionItem('%H');
            clock_format_H.insertText = new vscode.SnippetString("H");
            clock_format_H.documentation = new vscode.MarkdownString("Hour (00-23)");

            const clock_format_I = new vscode.CompletionItem('%I');
            clock_format_I.insertText = new vscode.SnippetString("I");
            clock_format_I.documentation = new vscode.MarkdownString("Hour (00-12)");

            const clock_format_M = new vscode.CompletionItem('%M');
            clock_format_M.insertText = new vscode.SnippetString("M");
            clock_format_M.documentation = new vscode.MarkdownString("Minutes (00-59)");

            const clock_format_S = new vscode.CompletionItem('%S');
            clock_format_S.insertText = new vscode.SnippetString("S");
            clock_format_S.documentation = new vscode.MarkdownString("Seconds(00-59)");

            const clock_format_p = new vscode.CompletionItem('%p');
            clock_format_p.insertText = new vscode.SnippetString("p");
            clock_format_p.documentation = new vscode.MarkdownString("PM or AM");

            const clock_format_D = new vscode.CompletionItem('%D');
            clock_format_D.insertText = new vscode.SnippetString("D");
            clock_format_D.documentation = new vscode.MarkdownString("ate as \%m/\%d/\%y");

            const clock_format_r = new vscode.CompletionItem('%r');
            clock_format_r.insertText = new vscode.SnippetString("");
            clock_format_r.documentation = new vscode.MarkdownString("Time as \%I:\%M:\%S %p");

            const clock_format_R = new vscode.CompletionItem('%R');
            clock_format_R.insertText = new vscode.SnippetString("");
            clock_format_R.documentation = new vscode.MarkdownString("Time as \%I:\%M");

            const clock_format_T = new vscode.CompletionItem('%T');
            clock_format_T.insertText = new vscode.SnippetString("T");
            clock_format_T.documentation = new vscode.MarkdownString("Time as \%I:\%M:\%S");

            const clock_format_Z = new vscode.CompletionItem('%Z');
            clock_format_Z.insertText = new vscode.SnippetString("Z");
            clock_format_Z.documentation = new vscode.MarkdownString("Time Zone Name");

            return [clock_format_a, clock_format_A, clock_format_b, clock_format_B, clock_format_d, clock_format_j, clock_format_m, clock_format_y, clock_format_Y, 
                clock_format_H, clock_format_I, clock_format_M, clock_format_S, clock_format_p, clock_format_D, clock_format_r, clock_format_R, clock_format_T, clock_format_Z]
        }
    }, '%' // triggered whenever a ' ' is being typed
    );

    const format_provider = vscode.languages.registerCompletionItemProvider('NX', {
        provideCompletionItems(document, position) {
            // get all text until the `position` and check if it reads `package `
            // and if so then complete with the package methods.
            let linePrefix = document.lineAt(position).text.substr(0, position.character);
            if (!linePrefix.endsWith('format %')) {
                return undefined;
            }

            const format_d = new vscode.CompletionItem('%d');
            format_d.insertText = new vscode.SnippetString("d");
            format_d.documentation = new vscode.MarkdownString("Convert integer to signed decimal string.");

            const format_u = new vscode.CompletionItem('%u');
            format_u.insertText = new vscode.SnippetString("u");
            format_u.documentation = new vscode.MarkdownString("Convert integer to unsigned decimal string.");

            const format_i = new vscode.CompletionItem('%i');
            format_i.insertText = new vscode.SnippetString("i");
            format_i.documentation = new vscode.MarkdownString("Convert integer to signed decimal string (equivalent to d).");

            const format_o = new vscode.CompletionItem('%o');
            format_o.insertText = new vscode.SnippetString("o");
            format_o.documentation = new vscode.MarkdownString("Convert integer to unsigned octal string.");

            const format_c = new vscode.CompletionItem('%c');
            format_c.insertText = new vscode.SnippetString("c");
            format_c.documentation = new vscode.MarkdownString("Convert integer to the Unicode character it represents.");

            const format_s = new vscode.CompletionItem('%s');
            format_s.insertText = new vscode.SnippetString("s");
            format_s.documentation = new vscode.MarkdownString("No conversion; just insert string.");

            const format_f = new vscode.CompletionItem('%f');
            format_f.insertText = new vscode.SnippetString(".2f");
            format_f.documentation = new vscode.MarkdownString("Convert number to signed decimal string of the form xx.yyy, where the number of y's is determined by the precision (default: 6). If the precision is 0 then no decimal point is output.");

            return [format_u, format_i, format_o, format_c, format_d, format_s, format_f]
        }
    }, '%' // triggered whenever a ' ' is being typed
    );

    const info_provider = vscode.languages.registerCompletionItemProvider('NX', {
        provideCompletionItems(document, position) {
            // get all text until the `position` and check if it reads `package `
            // and if so then complete with the package methods.
            let linePrefix = document.lineAt(position).text.substr(0, position.character);
            if (!linePrefix.endsWith('info ')) {
                return undefined;
            }

                const info_exists = new vscode.CompletionItem('exists ', vscode.CompletionItemKind.Method);
                info_exists.documentation = new vscode.MarkdownString("Returns 1 if the variable named varName exists in the current context (either as a global or local variable) and has been defined by being given a value, returns 0 otherwise.");

                const info_script = new vscode.CompletionItem('script ', vscode.CompletionItemKind.Method);
                info_script.documentation = new vscode.MarkdownString("returns the name of the innermost file being processed.");

                const info_body = new vscode.CompletionItem('body ', vscode.CompletionItemKind.Method);
                info_body.documentation = new vscode.MarkdownString("Returns the body of procedure procname.");

                const info_commands = new vscode.CompletionItem('commands ', vscode.CompletionItemKind.Method);
                info_commands.documentation = new vscode.MarkdownString("If pattern is not specified, returns a list of names of all the Tcl commands visible.If pattern is specified, only those names matching pattern are returned.\n\ninfo commands (pattern)");

                const info_args = new vscode.CompletionItem('args ', vscode.CompletionItemKind.Method);
                info_args.documentation = new vscode.MarkdownString("Returns a list containing the names of the arguments to procedure procname, in order.");

                const info_default = new vscode.CompletionItem('default ', vscode.CompletionItemKind.Method);
                info_default.documentation = new vscode.MarkdownString("Procname must be the name of a Tcl command procedure and arg must be the name of an argument to that procedure. If arg does not have a default value then the command returns 0. Otherwise it returns 1 and places the default value of arg into variable varname.\n\ninfo default (procname) (args) (varname)");

                const info_errorstack = new vscode.CompletionItem('errorstack ', vscode.CompletionItemKind.Method);
                info_errorstack.documentation = new vscode.MarkdownString("Returns, in a form that is programmatically easy to parse, the function names and arguments at each level from the call stack of the last error in the given interp, or in the current one if not specified.");

                const info_globals = new vscode.CompletionItem('globals ', vscode.CompletionItemKind.Method);
                info_globals.documentation = new vscode.MarkdownString("If pattern is not specified, returns a list of all the names of currently-defined global variables.");
                
                const info_procs = new vscode.CompletionItem('procs ', vscode.CompletionItemKind.Method);
                info_procs.documentation = new vscode.MarkdownString("If pattern is not specified, returns a list of all the names of Tcl command procedures in the current namespace. If pattern is specified, only those procedure names in the current namespace matching pattern are returned.\n\nindo procs (pattern)");

                const info_vars = new vscode.CompletionItem('vars ', vscode.CompletionItemKind.Method);
                info_vars.documentation = new vscode.MarkdownString("If pattern is not specified, returns a list of all the names of currently-visible variables. This includes locals and currently-visible globals. If pattern is specified, only those names matching pattern are returned.\n\ninfo vars (pattern)");

                const info_version = new vscode.CompletionItem('version ', vscode.CompletionItemKind.Method);
                info_version.documentation = new vscode.MarkdownString("Returns the value of the global variable tcl_version, which holds the major and minor version of the Tcl library by default.");


            return [info_exists, info_script, info_body, info_commands, info_args, info_default, info_errorstack, info_globals, info_procs, info_vars, info_version]
        }
    }, ' ' // triggered whenever a ' ' is being typed
    );




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Hover function
//    const hover_provider = vscode.languages.registerHoverProvider('NX', {
//        provideHover(document, position, token) {
//
//            
//
//
//            const range = document.getWordRangeAtPosition(position);
//            const word = document.getText(range);
//
//
//            if (word == "HELLO") {
//
//                return new vscode.Hover({
//                    language: "NX",
//                    value: "Hello Value "
//                });
//            }
//
//          return {
//            contents: ['Hover Content']
//          }
//        }
//      });
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//regognize and suggest variables and prozedures

    const completionLists = {
        variable_names: [],
        proc_names: [],
        global_names: [],
        buffer_names: []

    };

    const variable_provider = vscode.languages.registerCompletionItemProvider('NX', {
        provideCompletionItems(document, position) {

            const variables = [];
            const variable_list = [];

            for (let i = 0; i < document.lineCount; i++) {
                if (document.lineAt(i).text.indexOf("set ") >= 0) {
                    let line = document.lineAt(i).text;
                    line = line.replace(/\[/g, " ");
                    line = line.replace(/\]/g, " ");
                    let splittet_line = line.split(" ");
                    for (let j = 0; j < splittet_line.length; j++) {
                        if (splittet_line[j] == "set") {
                            let variable_index = splittet_line.indexOf("set") + 1;
                            let variable = splittet_line[variable_index];
                            variable = variable.replace(/\[/g, "");
                            variable = variable.replace(/\]/g, "");
                            splittet_line.splice(splittet_line.indexOf("set"), 1);
                            if (variables.indexOf(variable) >= 0) {
                            continue
                            }
                            variables.push(variable)
                            completionLists.variable_names.push(variable);
                        };                        
                    };                   
                };    
            };

            for (let i = 0; i < variables.length; i++) { 
                variable_list.push(new vscode.CompletionItem(variables[i], vscode.CompletionItemKind.Variable))
            }


            return variable_list
        }
    });

    const procedur_provider = vscode.languages.registerCompletionItemProvider('NX', {
        provideCompletionItems(document, position) {

            const procedures = [];
            const proc_list = [];
            
            

            for (let i = 0; i < document.lineCount; i++) {
                if (document.lineAt(i).text.indexOf("proc ") >= 0) {
                    let line = document.lineAt(i).text;
                    let splittet_line = line.split(" ");
                    let procedur_index = splittet_line.indexOf("proc") + 1;
                    let procedur = splittet_line[procedur_index];
                    if (procedures.indexOf(procedur) >= 0) {
                    continue
                    }
                    procedures.push(procedur);
                    completionLists.proc_names.push(procedur);
                };           
            }; 

            for (let i = 0; i < procedures.length; i++) { 
                proc_list.push(new vscode.CompletionItem(procedures[i], vscode.CompletionItemKind.Method))
            }

            return proc_list
        }
    });

    const global_provider = vscode.languages.registerCompletionItemProvider('NX', {
        provideCompletionItems(document, position) {

            const globals = [];
            const global_list = [];

            for (let i = 0; i < document.lineCount; i++) {
                if (document.lineAt(i).text.indexOf("global ") >= 0) {
                    let line = document.lineAt(i).text;
                    let splittet_line = line.split(" ");
                    for (let i = 0; i < splittet_line.length; i++) {
                        if (splittet_line[i] == "global") {
                            continue
                        }else if (globals.indexOf(splittet_line[i]) >= 0) {
                            continue
                        }else {
                            globals.push(splittet_line[i])
                            completionLists.global_names.push(splittet_line[i]);
                        }
                        
                    }
                    
                };           
            }; 

            for (let i = 0; i < globals.length; i++) { 
                global_list.push(new vscode.CompletionItem(globals[i], vscode.CompletionItemKind.Variable))
            }

            return global_list
        }
    });

    const buffer_provider = vscode.languages.registerCompletionItemProvider('NX', {
        provideCompletionItems(document, position) {

            const buffers = [];
            const buffer_list = [];

            for (let i = 0; i < document.lineCount; i++) {
                if (document.lineAt(i).text.indexOf("LIB_GE_command_buffer ") >= 0) {
                    let line = document.lineAt(i).text;
                    let splittet_line = line.split(" ")
                    for (let i = 0; i < splittet_line.length; i++) {
                        if (splittet_line[i] == "LIB_GE_command_buffer") {
                            let buffer_index = splittet_line.indexOf("LIB_GE_command_buffer") + 1;
                            let buffer = splittet_line[buffer_index];
                            if (buffer.indexOf("\{") >= 0) {
                                continue
                            }else if (buffers.indexOf(buffer) >= 0) {
                                continue
                            }else {
                                buffers.push(buffer);
                                completionLists.buffer_names.push(buffer);
                            }
                        }
                        
                    }
                    
                };           
            }; 

            for (let i = 0; i < buffers.length; i++) { 
                buffer_list.push(new vscode.CompletionItem(buffers[i], vscode.CompletionItemKind.Interface))
            }

            return buffer_list
        }
    });



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//word regognization

    const words_provider = vscode.languages.registerCompletionItemProvider('NX', {
        provideCompletionItems(document, position) {

            const word_list = [];
            const words = [];

            const all_words_fix = ["if", "while", "for", "catch", "return", "break", "continue", "switch", "exit", "foreach", "try", "on error", "default", "then", "elseif", "else", "LIB_GE_ui", "LIB_GE_cleanup_list", "LIB_GE_format_path_names", "LIB_GE_sort_value", "LIB_GE_is_path", "LIB_GE_is_unc_path", "LIB_GE_set", "LIB_GE_lappend", "LIB_GE_ask_type_subtype", "LIB_GE_read_expression_value", "LIB_GE_message", "LIB_GE_truncate_line", "LIB_GE_MSG", "LIB_GE_string_toupper", "LIB_GE_string_range_toupper", 
            "LIB_GE_replace_special_characters", "LIB_GE_comment_convert", "LIB_GE_error_message", "LIB_GE_abort_message", "LIB_GE_message_dialog", "LIB_GE_wish", "LIB_GE_read_database", "LIB_GE_copy_var_range", "LIB_GE_time", "LIB_GE_date", "LIB_GE_command_buffer", "LIB_GE_command_buffer_output", "LIB_GE_string_append", "LIB_GE_create_json_array", "LIB_GE_command_buffer_edit_insert", "LIB_GE_command_buffer_edit_remove", "LIB_GE_command_buffer_edit_move", "LIB_GE_command_buffer_edit_replace", "LIB_GE_command_buffer_edit_append", "LIB_GE_command_buffer_edit_prepend", 
            "LIB_GE_snapshot", "LIB_GE_CONF_set_property_access", "LIB_GE_CONF_set_property_datatype", "LIB_GE_CONF_set_property_ui", "LIB_GE_CONF_add_chain", "LIB_GE_CONF_set_property_options", "LIB_CONF_prop_custom_proc_body", "LIB_CONF_do_prop_custom_proc", "LIB_GE_generate_chain_selection_condition_vars", "LIB_FH_format_database", "LIB_FH_create_directory", "LIB_FH_search_path_recursively", "LIB_FH_search_file_glob", "LIB_FH_file_to_list", "LIB_FH_file_writable", "LIB_FH_list_to_file", "LIB_FH_file_to_list_line_numbers", "LIB_FH_create_file", "LIB_FH_cleanup_directory", "LIB_FH_open_file", "LIB_FH_output_literal", "LIB_FH_escape_special_characters", "LIB_FH_reverse_escape_special_characters", "LIB_SPF_abort_postrun", 
            "LIB_SPF_pretreatment_add_var", "LIB_SPF_pt_exists", "LIB_SPF_pt_exists_not_empty", "LIB_SPF_get_pretreatment_eventbased", "LIB_SPF_get_pretreatment", "LIB_SPF_is_vector", "LIB_SPF_is_matrix_equal", "LIB_SPF_is_floating", "LIB_SPF_is_integer", "LIB_SPF_is_number", "LIB_SPF_is_no_decimal", "LIB_SPF_is_empty", "LIB_SPF_is_part_of_string", "LIB_SPF_is_divisible", "LIB_SPF_array_to_vector", "LIB_SPF_vector_to_array", "LIB_SPF_matrix_to_list", "LIB_SPF_list_reverse", "LIB_SPF_list_trim_left", "LIB_SPF_list_trim_right", "LIB_SPF_list_trim", "LIB_SPF_list_trim_elements", "LIB_SPF_list_non_common_elements", "LIB_SPF_list_to_table", "LIB_SPF_eliminate_zero", "LIB_SPF_eliminate_zero_inline", "LIB_SPF_add_warning", "LIB_SPF_read_tool_attribute", "LIB_SPF_read_part_attribute", "LIB_SPF_read_oper_attribute", "LIB_SPF_read_programview_attribute", "LIB_SPF_extract_udecode", "LIB_SPF_round", 
            "EQ_is_equal", "EQ_is_ge", "EQ_is_gt", "EQ_is_le", "EQ_is_lt", "EQ_is_zero", "VEC3_add", "VEC3_cross", "VEC3_dot", "VEC3_dot_A", "VEC3_init", "VEC3_init_s", "VEC3_is_equal", "VEC3_is_zero", "VEC3_mag", "VEC3_negate", "VEC3_scale", "VEC3_sub", "VEC3_unitize", "VEC3_rotate_arbitary_axis", "VEC3_dist_point_line", "VEC3_angle_3points", "VEC3_angle_between", "VEC3_is_parallel", "LIB_SPF_mcs_vector", "MTX3_init_x_y_z", "MTX3_is_equal", "MTX3_multiply", "MTX3_transpose", "MTX3_scale", "MTX3_sub", "MTX3_add", "MTX3_vec_multiply", "MTX3_x", "MTX3_y", "MTX3_z", "VMOV", "hiset", "isset", "OUTPUT_adr", "LIB_SPF_rad_to_deg", "LIB_SPF_deg_to_rad", "LIB_SPF_convert_decimal_to_binary", "LIB_SPF_convert_hex_to_string", "LIB_SPF_convert_to_md5", "LIB_SPF_convert_point", "LIB_SPF_convert_binary_to_decimal", "LIB_SPF_exists_address", "LIB_SPF_ask_address", "LIB_SPF_exists_format", "LIB_SPF_ask_format", "LIB_SPF_exists_block_template", 
            "LIB_SPF_ask_block_template", "LIB_SPF_call_cycle", "LIB_SPF_modulo_sign", "LIB_SPF_atan_polar", "LIB_SPF_ask_delta_4th_or_5th", "LIB_SPF_ask_smaller_of_4th_5th", "LIB_SPF_set_op_tool_param_condition", "LIB_SPF_execute_op_tool_param_condition", "LIB_SPF_get_partnname", "LIB_SPF_reset_motions_to_zero", "LIB_DC_complete_formatline", "LIB_DC_format_string", "LIB_DC_check_variable", "LIB_DC_time_format", "LIB_DC_escape_string", "LIB_DC_ellipsis_character", "LIB_RETURN_move", "LIB_main_origin_call", "LIB_ISV_ini_get_env_dir_info", "LIB_output_local_zero_offset", "LIB_start_of_program_blk_form", "LIB_CTRL_custom_cycle800_auto_set_kin", "LIB_CTRL_custom_cycle800_plane_output_kin", "LIB_SPF_store_mom_vars", "LIB_SPF_restore_mom_vars", "MOM_abort", "MOM_abort_event", "MOM_add_to_address_buffer", "MOM_add_to_block_buffer", "MOM_add_to_line_buffer", "MOM_ask_address_value", "MOM_ask_env_var", "MOM_ask_event_type", "MOM_ask_ess_exp_value", "MOM_ask_init_junction_xform", 
            "MOM_ask_machine_zero_junction_name", "MOM_ask_oper_csys", "MOM_ask_syslog_name", "MOM_close_output_file", "MOM_check_out_license", "MOM_convert_point", "MOM_disable_address", "MOM_display_message", "MOM_do_template", "MOM_enable_address", "MOM_force", "MOM_force_block", "MOM_incremental", "MOM_load_definition_file", "MOM_load_lathe_thread_cycle_params", "MOM_log_message", "MOM_on_event_error", "MOM_on_parse_error", "MOM_open_output_file", "MOM_output_literal", "MOM_output_text", "MOM_output_to_listing_device", "MOM_post_oper_path", "MOM_reload_kinematics", "MOM_reload_variable", "MOM_reset_sequence", "MOM_run_postprocess", "MOM_run_user_function", "MOM_set_address_format", "MOM_set_debug_mode", "MOM_set_env_var", "MOM_set_line_leader", "MOM_set_seq_off", "MOM_set_seq_on", "MOM_skip_handler_to_event", "MOM_suppress", "MOM_update_kinematics", "mom_kin_4th_axis_ang_offset", "mom_kin_4th_axis_center_offset", "mom_kin_4th_axis_direction", "mom_kin_4th_axis_incr_switch", 
            "mom_kin_4th_axis_leader", "mom_kin_4th_axis_limit_action", "mom_kin_4th_axis_max_limit", "mom_kin_4th_axis_min_incr", "mom_kin_4th_axis_min_limit", "mom_kin_4th_axis_plane", "mom_kin_4th_axis_rotation", "mom_kin_4th_axis_type", "mom_kin_4th_axis_zero", "mom_kin_5th_axis_ang_offset", "mom_kin_5th_axis_center_offset", "mom_kin_5th_axis_direction", "mom_kin_5th_axis_incr_switch", "mom_kin_5th_axis_leader", "mom_kin_5th_axis_limit_action", "mom_kin_5th_axis_max_limit", "mom_kin_5th_axis_min_incr", "mom_kin_5th_axis_min_limit", "mom_kin_5th_axis_plane", "mom_kin_5th_axis_rotation", "mom_kin_5th_axis_type", "mom_kin_5th_axis_zero", "mom_kin_arc_output_mode", "mom_kin_arc_valid_planes", "mom_kin_caxis_rotary_pos", "mom_kin_clamp_time", "mom_kin_coordinate_system_type", "mom_kin_dependent_head", "mom_kin_helical_arc_output_mode", "mom_kin_holder1_offset_x", "mom_kin_holder1_offset_y", "mom_kin_holder1_offset_z", "mom_kin_holder1_orientation", "mom_kin_holder2_offset_x", "mom_kin_holder2_offset_y", 
            "mom_kin_holder2_offset_z", "mom_kin_holder2_orientation", "mom_kin_holder3_offset_x", "mom_kin_holder3_offset_y", "mom_kin_holder3_offset_z", "mom_kin_holder3_orientation", "mom_kin_holder4_offset_x", "mom_kin_holder4_offset_y", "mom_kin_holder4_offset_z", "mom_kin_holder4_orientation", "mom_kin_holder5_offset_x", "mom_kin_holder5_offset_y", "mom_kin_holder5_offset_z", "mom_kin_holder5_orientation", "mom_kin_holder6_offset_x", "mom_kin_holder6_offset_y", "mom_kin_holder6_offset_z", "mom_kin_holder6_orientation", "mom_kin_iks_usage", "mom_kin_ind_to_dependent_head_x", "mom_kin_ind_to_dependent_head_z", "mom_kin_independent_head", "mom_kin_is_turbo_output", "mom_kin_linearization_flag", "mom_kin_linearization_tol", "mom_kin_machine_resolution", "mom_kin_machine_type", "mom_kin_max_arc_radius", "mom_kin_max_fpm", "mom_kin_max_fpr", "mom_kin_min_arc_length", "mom_kin_min_fpm", "mom_kin_min_fpr", "mom_kin_output_unit", "mom_kin_pivot_dist_vec", "mom_kin_pivot_gauge_offset", "mom_kin_rapid_feed_rate", 
            "mom_kin_read_ahead_next_motion", "mom_kin_reengage_distance", "mom_kin_retract_plane", "mom_kin_rotary_reengage_feedrate", "mom_kin_spindle_axis", "mom_kin_tool_change_time", "mom_kin_tool_tracking_height", "mom_kin_wire_tilt_output_type", "mom_kin_x_axis_limit", "mom_kin_y_axis_limit", "mom_kin_z_axis_limit", "mom_auxfun", "mom_auxfun_text", "mom_auxfun_text_defined", "mom_axis_position", "mom_axis_position_value", "mom_axis_position_value_defined", "mom_clamp_axis", "mom_clamp_status", "mom_clamp_text", "mom_clamp_text_defined", "mom_coolant_mode", "mom_coolant_text", "mom_coolant_text_defined", "mom_coordinate_output_mode", "mom_cut_wire_text", "mom_cut_wire_text_defined", "mom_cutcom_adjust_register", "mom_cutcom_adjust_register_defined", "mom_cutcom_angle", "mom_cutcom_distance", "mom_cutcom_mode", "mom_cutcom_plane", "mom_cutcom_plane_output_flag", "mom_cutcom_register", "mom_cutcom_register_output_flag", "mom_cutcom_text", "mom_cutcom_text_defined", "mom_cutcom_type", "mom_def_sequence_frequency", 
            "mom_def_sequence_increment", "mom_def_sequence_maximum", "mom_def_sequence_start", "mom_delay_mode", "mom_delay_revs", "mom_delay_text", "mom_delay_text_defined", "mom_delay_value", "mom_flush_guides", "mom_flush_pressure", "mom_flush_register", "mom_flush_tank", "mom_flush_tank_text", "mom_flush_tank_text_defined", "mom_head_name", "mom_head_name_defined", "mom_head_text", "mom_head_text_defined", "mom_head_type", "mom_load_tool_number_defined", "mom_lock_axis", "mom_lock_axis_plane", "mom_lock_axis_value", "mom_lock_axis_value_defined", "mom_modes_text", "mom_modes_text_defined", "mom_number_of_ranges", "mom_operator_message", "mom_operator_message_defined", "mom_opskip_text", "mom_opskip_text_defined", "mom_opstop_text", "mom_opstop_text_defined", "mom_origin", "mom_origin_text", "mom_origin_text_defined", "mom_overide_oper_param", "mom_parallel_to_axis", "mom_power_text", "mom_power_text_defined", "mom_power_value", "mom_pprint", "mom_pprint_defined", "mom_prefun", "mom_prefun_text", "mom_prefun_text_defined", 
            "mom_rotate_axis_type", "mom_rotation_angle", "mom_rotation_angle_defined", "mom_rotation_direction", "mom_rotation_mode", "mom_rotation_reference_mode", "mom_rotation_text", "mom_rotation_text_defined", "mom_seqnum", "mom_sequence_frequency", "mom_sequence_increment", "mom_sequence_mode", "mom_sequence_number", "mom_sequence_text", "mom_sequence_text_defined", "mom_spindle_direction", "mom_spindle_maximum_rpm", "mom_spindle_maximum_rpm_defined", "mom_spindle_mode", "mom_spindle_range", "mom_spindle_range_defined", "mom_spindle_rpm", "mom_spindle_speed", "mom_spindle_speed_defined", "mom_spindle_text", "mom_spindle_text_defined", "mom_stop_text", "mom_stop_text_defined", "mom_tool_adj_reg_defined", "mom_tool_adjust_register", "mom_tool_change_type", "mom_tool_head", "mom_tool_number", "mom_tool_use", "mom_translate", "mom_work_coordinate_number", "after", "append", "array", "auto_execok", "auto_import", "auto_load", "auto_mkindex", "auto_mkindex_old", "auto_qualify", "auto_reset", "bgerror", "binary", "cd", "clock", "close", "concat", "dde", "encoding", "eof", "error", "eval", "exec", "expr", "fblocked", "fconfigure", "fcopy", "file", "fileevent", "filename", "flush", "format", "gets", "glob", "global", "history", "http", "incr", "info", "interp", "join", "lappend", "library", "lindex", "linsert", "list", "llength", "load", "lrange", "lreplace", "lsearch", "lset", "lsort", "memory", "msgcat", "namespace", "open", "package", "parray", "pid", "pkg::create", "pkg_mkIndex", "proc", "puts", "pwd", "range", "regsub", "re_syntax", "read", "registry", "rename", "resource", "scan", "seek", "set", "socket", "SafeBase", "source", "split", "string", "subst", "Tcl", "tcl_endOfWord", "tcl_findLibrary", "tcl_startOfNextWord", "tcl_startOfPreviousWord", "tcl_wordBreakAfter", "tcl_wordBreakBefore", "tcltest", "tclvars", "tell", "time", "trace", "unknown", "unset", "update", "uplevel", "upvar", "variable", "vwait", "regexp", "regsub",
            "format", "scan", "seconds", "require", "provide", "split", "rename", "dirname", "is directory", "join", "exists", "type", "delete", "size", "readable", "writeable", "copy", "mkdir", "tail", "is file", "extension", "trim", "compare", "index", "reverse", "tolower", "toupper", "totitle", "length", "repeat", "match", "range", "replace", "map", "is lower", "is upper", "is ascii", "is digit", "is alpha", "is integer", "is alnum", "is double", "script", "body", "commands", "args", "default", "errorstack", "globals", "procs", "vars", "version"];

            const all_words = all_words_fix.concat(completionLists.variable_names, completionLists.proc_names, completionLists.global_names, completionLists.buffer_names) 

            for (let i = 0; i < document.lineCount; i++) {
                let line = document.lineAt(i).text;
                line = remove_strings_from_line(line);
                let splittet_line = line.split(" ");
                if (splittet_line[0].indexOf("#") >= 0) {continue};     //don't read comments
                for (let j = 0; j < splittet_line.length; j++) {
                    let word = splittet_line[j];
                        let checked_word = add_to_all_words(word, all_words);
                        if (checked_word) {
                            words.push(checked_word)
                        }      
            };
        };

            for (let i = 0; i < words.length; i++) { 
                word_list.push(new vscode.CompletionItem(words[i], vscode.CompletionItemKind.Text))
            };
        

            return word_list
        }
    });




    context.subscriptions.push(eq_provider, vec_provider, mtx_provider, mom_variable_provider, mom_events_provider, lib_provider, 
                            string_provider, clock_format_provider, file_provider, package_provider, clock_provider, format_provider, 
                            info_provider, variable_provider, procedur_provider, global_provider, buffer_provider, words_provider);
}



exports.activate = activate;
//# sourceMappingURL=extension.js.map