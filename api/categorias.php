<?php
include "./db/conexion.php";

$res = $con->query("SELECT * FROM productos_has_categorias  WHERE categorias_id=3");
$reg = $res->fetchAll(PDO::FETCH_ASSOC);


header("Content-Type: application/json");
echo json_encode($reg,JSON_PRETTY_PRINT);
?>