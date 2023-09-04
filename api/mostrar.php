<?php
include "./db/conexion.php";

$res = $con->query("SELECT * FROM productos LIMIT 12; WHERE activo = 1 ");
$reg = $res->fetchAll(PDO::FETCH_ASSOC);


header("Content-Type: application/json");
echo json_encode($reg,JSON_PRETTY_PRINT);
?>