<?php
include "./db/conexion.php";
$cantproducpages=12;
$pagebtn=$_GET['p'];
$ini=$cantproducpages*$pagebtn - $cantproducpages;


$res = $con->query("SELECT * FROM productos WHERE activo = 1 LIMIT $ini,12");
$reg = $res->fetchAll(PDO::FETCH_ASSOC);


header("Content-Type: application/json");
echo json_encode($reg,JSON_PRETTY_PRINT);
?>