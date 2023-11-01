<?php 
include "./db/conexion.php";


$idProducto = $_GET["id"];

try{
    $consulta ="SELECT promociones_id FROM productos_has_promociones WHERE productos_id IN (". $idProducto .")";
    $res= $con->query("SELECT * FROM promociones WHERE id  in (" .$consulta.");");
    $reg = $res->fetch(PDO::FETCH_ASSOC);
    header("Content-Type: application/json");
    echo json_encode($reg,JSON_PRETTY_PRINT);
}catch(Exception $e){

}




