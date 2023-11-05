<?php 
include "./db/conexion.php";

$nombre = urldecode($_GET['nombre']);


$consulta ="SELECT id,nombre,imagen,precio FROM productos WHERE nombre LIKE '%".$nombre."%'";

$res= $con->query($consulta);
$reg = $res->fetchAll(PDO::FETCH_ASSOC);

header("Content-Type: application/json");
echo json_encode($reg,JSON_PRETTY_PRINT);
?>
