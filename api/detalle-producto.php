<?php
include "./db/conexion.php";

 $idProduct = $_GET['id'];

$res = $con->query("SELECT * FROM productos WHERE id = $idProduct");
$reg = $res->fetchAll(PDO::FETCH_ASSOC);

header("Content-Type: application/json");
echo json_encode($reg, JSON_PRETTY_PRINT);
?>