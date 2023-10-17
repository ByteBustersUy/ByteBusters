<?php
include "./db/conexion.php";

$idProducto =  $_GET ['id'];
$res  = $con->query("SELECT * FROM productos WHERE id = $idProducto");
$reg = $res->fetchAll(PDO::FETCH_ASSOC);

header("content-Type: application/json");
echo json_encode($reg, JSON_PRETTY_PRINT);


?>
