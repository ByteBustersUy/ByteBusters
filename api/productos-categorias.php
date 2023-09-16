<?php 
include "./db/conexion.php";


$categoria = $_GET['categoria'];

$res = $con->query("SELECT id FROM categorias WHERE nombre = ". $categoria);
$reg = $res->fetchAll(PDO::FETCH_ASSOC);

$id = $reg[0]['id'];



$res = $con->query("SELECT * FROM productos_has_categorias WHERE categorias_id = ". $id);




$reg = $res->fetchAll(PDO::FETCH_ASSOC);

header("Content-Type: application/json");
echo json_encode($reg,JSON_PRETTY_PRINT);


 
    







?>