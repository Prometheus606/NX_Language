
set test1 1


proc testProc1 {} {
    global test7
    puts $test1 ;# ist richtig, passt
    puts $::test1 ;# ist richtig, passt
    puts $::test3 ;# soll meckern, passt
    puts $test3 ;# soll meckern, passt
    puts $test4 ;# soll meckern, passt nicht -
    puts $::test4 ;# ist richtig, passt
    puts $test6 ;# soll meckern, passt nicht -
    puts $::test6 ;# ist richtig
    puts $::test2 ;# soll meckern, passt
    puts $test2 ;# soll meckern, passt
    puts $test7 ;# soll nicht meckern
}




proc testProc2 {} {
    global test6
    global test7

    set test3 5
    set ::test4 6
    set test6 5
    set test7 10

}
  

#------------------------------------------------------------
proc Daniela {} {
  #------------------------------------------------------------
  LIB_GE_command_buffer hansgeorg
  LIB_GE_command_buffer {

    set registry $::levi

  } @hansgeorg
  LIB_GE_command_buffer_output
}

# niklas
set hans ""

mom_pos(0)
LIB_GE_ui
MOM_abort
mom_kin_4th_axis_ang_offset
set 2brot "Daniela"

puts $::2brot
puts ::2brot

LIB_GE_command_buffer sdssd
LIB_GE_command_buffer {if {[llength [info commands sdssd]]} {sdssd}} @sdssd
LIB_GE_command_buffer_output


format %d string


daniela
Daniela


#------------------------------------------------------------
proc + {} {
  #------------------------------------------------------------

}



MOM_suppress once
















test
