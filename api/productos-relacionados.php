<?php
include "./db/conexion.php";

$id = $_GET['id'];


$res = $con->prepare("SELECT CATEGORIAS_id FROM productos_has_categorias WHERE productos_id = :id");
$res->bindValue(':id', $id, PDO::PARAM_INT);
$res->execute();
$categoryId = $res->fetchColumn();


$res = $con->prepare("SELECT * FROM productos_has_categorias WHERE CATEGORIAS_id = :categoryId AND productos_id NOT IN (:id) LIMIT 4");
$res->bindValue(':categoryId', $categoryId, PDO::PARAM_INT);
$res->bindValue(':id', $id, PDO::PARAM_INT);
$res->execute();
$reg = $res->fetchAll(PDO::FETCH_ASSOC);

header("Content-Type: application/json");
echo json_encode($reg, JSON_PRETTY_PRINT);
?>
