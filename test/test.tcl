proc Daniela { } {
    set niklas 0
    puts $niklas

MTX3_add m n a
MTX3_init_x_y_z 1 99 3 b
MTX3_multiply q w c
MTX3_vec_multiply q w d
MTX3_x w ww e
MTX3_y w rr f
MTX3_z w gg g
MTX3_transpose w h

VEC3_add t z i
VEC3_init a s d j
VEC3_init_s a s d k

$a
$b
$c
$d
$e
$f
$g
$h
$i
$j
$k

CxCoolant "get" cxCoolantList
$cxCoolantList 

}

