<?php
//print_r($_FILES);
$fileTmpPath = $_FILES['archivo']['tmp_name'];
$fileName = $_FILES['archivo']['name'];
// $fileSize = $_FILES['imagen']['size'];
// $fileType = $_FILES['imagen']['type'];
$dir = '../../Ecommerce/images/';
echo $destino = $dir . $fileName; //TODO: id de producto
echo $fileName;
// print_r (move_uploaded_file($fileTmpPath, $destino));
if (move_uploaded_file($fileTmpPath, $destino)) {
    echo "Fue guardado";
}else{
    echo "Error";
}
