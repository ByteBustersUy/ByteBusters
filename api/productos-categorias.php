<?php 
include "./db/conexion.php";


$categoriaId = $_GET['id'];

$consulta ="SELECT productos_id FROM productos_has_categorias WHERE categorias_id = ". $categoriaId;


$res= $con->query("SELECT * FROM productos WHERE id in (".$consulta.")");
$reg = $res->fetchAll(PDO::FETCH_ASSOC);


header("Content-Type: application/json");
echo json_encode($reg,JSON_PRETTY_PRINT);


 
    







?>