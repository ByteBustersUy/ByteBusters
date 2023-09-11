<?php

include "./db/conexion.php";

$pagina = $_GET['p'];
$lista = ($pagina * 20) - 20;



$sql="SELECT id,nombre,precio,imagen  FROM productos limit $lista, 20";

$res = $con->query($sql);
$reg = $res->fetchAll(PDO::FETCH_ASSOC);

header("Content-Type: application/json");
echo json_encode($reg,JSON_PRETTY_PRINT);

?>