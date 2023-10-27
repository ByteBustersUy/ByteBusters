<?php
$fileTmpPath = $_FILES['archivo']['tmp_name'];
$fileName = $_FILES['archivo']['name'];
$dir = '../../Ecommerce/images/';
echo $destino = $dir . $fileName;
echo $fileName;
if (move_uploaded_file($fileTmpPath, $destino)) {
    echo "Fue guardado";
}else{
    echo "Error";
}
