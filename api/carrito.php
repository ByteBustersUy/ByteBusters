<?php
include "./db/conexion.php";

$consulta = $_GET['c'];
$sql="SELECT id,nombre,precio,imagen  FROM productos WHERE id in (".$consulta.")";

$res = $con->query($sql);
$reg = $res->fetchAll(PDO::FETCH_ASSOC);


header("Content-Type: application/json");
echo json_encode($reg,JSON_PRETTY_PRINT);
?>