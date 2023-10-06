<?php
include "./db/conexion.php";


$reg=[];
if (isset($_GET['id'])){
    $id = $_GET['id'];

    $res = $con->prepare("SELECT * FROM productos WHERE id = :id");
    $res->execute([":id" => $id]);
    $reg = $res->fetchAll(PDO::FETCH_ASSOC);

}

header("Conection-Type: application/json");
echo json_encode($reg, JSON_PRETTY_PRINT);
