//this script contains all tcl and NX (mom variables, MOM Commands and Buffer commands) commands, including documentation and a few snippets.
//it is a extension for coding postprocessors with Siemens NX Postconfigurator.
//Creator: Niklas Beitler

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const fs = require('fs');
const path = require('path');

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//first, the given word is checked. if it is not a string, or the length is less than 2, nothing happens.
//if special characters in the string, they will be removed
//if the given word not contains in the all_words list, it will append there and the word will be returned
//the return word will suggest in intellisense
//the all_word list contains all the suggested words, so that no word will be double
function add_to_all_words(word, all_words) {
    if (typeof word !== "string") {return null}
    word = word.split("(")[0]
    word = word.replace(/[\[\]{}()$'".@\\\/:!?=&%+*-;,]/g, "").trim();
    if (word.length <= 2 || word.startsWith("%") || word.startsWith("_") || (Number(word))) {return null;}
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

//checks if the given word already contain in the list. if so, than will be true returned, else will false be returned.
function is_double(word, word_list) {
    for (let i = 0; i < word_list.length; i++) {
        if (word_list[i].toString() === word.toString()) {return true}     
    }
    return false
}

// Function to read and change settings
function manipulateSettings() {
        
    // get extension settings
    const extensionSettings = vscode.workspace.getConfiguration("NX_Language")
    const MOM_Color = extensionSettings.get("MOM_Color");
    const LIB_Color = extensionSettings.get("LIB_Color");

    const settingValue = {
        "textMateRules": [
            {
                "scope": "keyword.MOM.commands.tcl",
                "settings": {
                    "foreground": `${MOM_Color}`
                }
            },
            {
                "scope": "keyword.buffer.tcl",
                "settings": {
                    "foreground": `${LIB_Color}`
                }
            }
        ]
    }   

    const config = vscode.workspace.getConfiguration("editor");
    config.update("tokenColorCustomizations", settingValue, vscode.ConfigurationTarget.Global)
        .then(() => {
            // vscode.window.showInformationMessage('Settings updated successfully');
        }, (error) => {
            vscode.window.showErrorMessage(`Error updating settings: ${error}`);
        });
}

// loads completition items from json file
function loadCompletitionItems() {
    // Pfad zur JSON-Datei
    const jsonPath = path.join(__dirname, 'completitionItems.json');
    
    // Laden der JSON-Datei
    try {
        const data = fs.readFileSync(jsonPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Fehler beim Laden der JSON-Datei:', error);
        return []; // Rückgabe einer leeren Liste im Fehlerfall
    }
}

// icon Map for completionItems
const iconMapping = {
    Method: vscode.CompletionItemKind.Method,
    Variable: vscode.CompletionItemKind.Variable,
    File: vscode.CompletionItemKind.File,
    Interface: vscode.CompletionItemKind.Interface,
    Class: vscode.CompletionItemKind.Class,
    Color: vscode.CompletionItemKind.Color,
    Constant: vscode.CompletionItemKind.Constant,
    Constructor: vscode.CompletionItemKind.Constructor,
    Keyword: vscode.CompletionItemKind.Keyword,
    Module: vscode.CompletionItemKind.Module,
    Field: vscode.CompletionItemKind.Field,
    Function: vscode.CompletionItemKind.Function,
    Event: vscode.CompletionItemKind.Event,
    Property: vscode.CompletionItemKind.Property,
    Text: vscode.CompletionItemKind.Text,
    Snippet: vscode.CompletionItemKind.Snippet,
    Value: vscode.CompletionItemKind.Value
};

// read json file
const completitionItems = loadCompletitionItems()
let providerList = []


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function activate() {

    manipulateSettings()

 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 //words, that will be suggested all the time   

 let command_provider = vscode.languages.registerCompletionItemProvider('NX', {
     provideCompletionItems(document, position, token, context) {

        let itemList = []

        completitionItems.simpleCompletitionItems.forEach(item => {
            const icon = iconMapping[item.icon];
            if (icon !== undefined) {
                const _ = new vscode.CompletionItem(item.command, icon);
                if (item.snippet) _.insertText = new vscode.SnippetString(item.snippet);
                if (item.triggers) _.commitCharacters = item.triggers;
                    else _.commitCharacters = [' '];

                _.documentation = new vscode.MarkdownString(item.docu);
                itemList.push(_);
            }
        });

        return itemList;
     }
 }
 );

// loop throu the provider in the json file and creates an provider each
 for (const key in completitionItems.provideCompletionItems) {
    if (completitionItems.provideCompletionItems.hasOwnProperty(key)) {
        const provider = completitionItems.provideCompletionItems[key];
        
        const __provider = vscode.languages.registerCompletionItemProvider('NX', {
            provideCompletionItems(document, position) {
                // Check if the line prefix matches the key (provider name)
                let linePrefix = document.lineAt(position).text.substr(0, position.character);
                if (!["mom", "MOM", "LIB", "VEC", "MTX", "EQ"].includes(key)) {
                    if (["-format "].includes(key)) {
                        if (!linePrefix.includes(key)) return undefined
                    } else {
                        if (!linePrefix.endsWith(key)) return undefined
                    }
                }
                

                let itemList = [];
                    provider.forEach(item => {
                        const icon = iconMapping[item.icon];
                        if (icon !== undefined) {
                            const _ = new vscode.CompletionItem(item.command, icon);
                            if (item.snippet) _.insertText = new vscode.SnippetString(item.snippet);
                            if (item.triggers) _.commitCharacters = item.triggers;
                                else _.commitCharacters = [' '];
                            _.documentation = new vscode.MarkdownString(item.docu);
                            itemList.push(_);
                        }
                    });
                    return itemList; 

            }
            
        }, key.charAt(key.length - 1) // Use the last character of the key as the trigger character
        );

        providerList.push(__provider)
    }
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//regognize and suggest variables and prozedures

    const completionLists = {
        //lists for the names. they are needed for avoid double intellisense items. they will be filled in the matching provider
        variable_names: [],
        proc_names: [],
        buffer_names: [],
        global_names: []

    };

    const variable_provider = vscode.languages.registerCompletionItemProvider('NX', {
        provideCompletionItems(document, position) {

            const variables = [];
            

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
                            variable = variable.split("(")[0]
                            variable = variable.replace(/[\[\]$]/g, "").trim();
                            if (variable.indexOf("::") >= 0 || variable.indexOf("$$") >= 0) {continue} //namespace variablen nicht lesen
                            splittet_line.splice(splittet_line.indexOf("set"), 1);
                            if (!is_double(variable, variables)) {
                                variables.push(variable);
                                completionLists.variable_names.push(variable);
                            }
                        };                        
                    };                   
                };    
            };

            const variable_list = [];
            for (let i = 0; i < variables.length; i++) { 
                variable_list.push(new vscode.CompletionItem(variables[i], vscode.CompletionItemKind.Variable))
            }

            return variable_list
        }
    });

    const procedur_provider = vscode.languages.registerCompletionItemProvider('NX', {
        provideCompletionItems(document, position) {

            const procedures = [];
            

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
                };           
            }; 

            const proc_list = [];
            for (let i = 0; i < procedures.length; i++) { 
                proc_list.push(new vscode.CompletionItem(procedures[i], vscode.CompletionItemKind.Method))
            }

            return proc_list
        }
    });

    const global_provider = vscode.languages.registerCompletionItemProvider('NX', {
        provideCompletionItems(document, position) {

            const globals = [];
            
            for (let i = 0; i < document.lineCount; i++) {
                if (document.lineAt(i).text.indexOf("global ") >= 0) {
                    let line = document.lineAt(i).text;
                    let splittet_line = line.split(" ");
                    for (let i = 0; i < splittet_line.length; i++) {
                        const global = splittet_line[i].trim();
                        if (global === "global" || global.startsWith("$")) {
                            continue
                        }else if (!is_double(global, globals) && !is_double(global, completionLists.variable_names)) {
                            global = global.split("(")[0]
                            globals.push(global);
                            completionLists.global_names.push(global);
                        }
                        
                    }
                    
                };           
            }; 

            const global_list = [];
            for (let i = 0; i < globals.length; i++) { 
                global_list.push(new vscode.CompletionItem(globals[i], vscode.CompletionItemKind.Variable))
            }

            return global_list
        }
    });

    const buffer_provider = vscode.languages.registerCompletionItemProvider('NX', {
        provideCompletionItems(document, position) {

            const buffers = [];
            
            for (let i = 0; i < document.lineCount; i++) {
                if (document.lineAt(i).text.indexOf("LIB_GE_command_buffer ") >= 0) {
                    let line = document.lineAt(i).text;
                    let splittet_line = line.split(" ")
                    for (let i = 0; i < splittet_line.length; i++) {
                        if (splittet_line[i] === "LIB_GE_command_buffer") {
                            let buffer_index = splittet_line.indexOf("LIB_GE_command_buffer") + 1;
                            let buffer = splittet_line[buffer_index].trim();
                            if (buffer.indexOf("\{") >= 0) {
                                continue
                            }else if (!is_double(buffer, buffers)) {
                                buffers.push(buffer);
                                completionLists.buffer_names.push(buffer);
                            }
                        }
                        
                    }
                    
                };           
            }; 

            const buffer_list = [];
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
            
            const words = [];

            //words, that be all the time in the list, because they are suggestet any time
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
            "format", "scan", "seconds", "require", "provide", "split", "rename", "dirname", "is directory", "join", "exists", "type", "delete", "size", "readable", "writeable", "copy", "mkdir", "tail", "is file", "extension", "trim", "compare", "index", "reverse", "tolower", "toupper", "totitle", "length", "repeat", "match", "range", "replace", "map", "is lower", "is upper", "is ascii", "is digit", "is alpha", "is integer", "is alnum", "is double", "script", "body", "commands", "args", "default", "errorstack", "globals", "procs", "vars", "version", "-all", "-format", "-exact", "-force", "-observer", "-ersioncxanguageode"];

            //combined all word lists in one big list
            const all_words = all_words_fix.concat(completionLists.variable_names, completionLists.proc_names, completionLists.buffer_names, completionLists.global_names) 
                
            //get current word, for not suggesting it
            //let current_word = document.lineAt(position).text.substr(0, position.character).split(" ");
            //current_word = current_word[current_word.length -1]

                for (let i = 0; i < document.lineCount; i++) {
                    let line = document.lineAt(i).text;
                    line = remove_strings_from_line(line);
                    let splittet_line = line.split(" ");
                    if (splittet_line[0].indexOf("#") >= 0) {continue};     //don't read comments
                    for (let j = 0; j < splittet_line.length; j++) {
                        let word = splittet_line[j].trim();
                        let checked_word = add_to_all_words(word, all_words);
                        if (checked_word) {
                            words.push(checked_word)
                        }      
                    };
                };

                const word_list = [];
                for (let h = 0; h < words.length; h++) { 
                    word_list.push(new vscode.CompletionItem(words[h], vscode.CompletionItemKind.Text))
                };

            return word_list
        }
    
    });



context.subscriptions.push(command_provider, words_provider, variable_provider, buffer_provider, global_provider, procedur_provider)
providerList.forEach(provider => {
    context.subscriptions.push(provider)
})
}



exports.activate = activate;
//# sourceMappingURL=extension.js.map
