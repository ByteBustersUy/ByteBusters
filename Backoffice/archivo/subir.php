<?php
//print_r($_FILES);
$fileTmpPath = $_FILES['imagen']['tmp_name'];
$fileName = $_FILES['imagen']['name'];
// $fileSize = $_FILES['imagen']['size'];
// $fileType = $_FILES['imagen']['type'];
$dir = './imagenes/';
echo $destino = $dir . $fileName; //TODO: id de producto

// print_r (move_uploaded_file($fileTmpPath, $destino));
if (move_uploaded_file($fileTmpPath, $destino)) {
    echo "Fue guardado";
}else{

    echo "Error";
}
