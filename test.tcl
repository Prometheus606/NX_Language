

proc test {} {
    if {} {
        set niklas [array set levi] ;#comment
    }
}
# niklas

mom_pos(0)
LIB_GE_ui
MOM_abort
mom_kin_4th_axis_ang_offset
set brot "Daniela"

LIB_GE_command_buffer sdssd
LIB_GE_command_buffer {if {[llength [info commands sdssd]]} {sdssd}} @sdssd
LIB_GE_command_buffer_output


nika1


format %d string