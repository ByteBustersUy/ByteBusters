<?php 
require "./db/conexion.php";

$idProducto = $_GET["id"];

/*
1: obtener los ids de las promos vigentes y activas 
2: obtener los ids de productos
3: obtener todos los productos que tengan promo vigente y activa */
try{
    $consultaRelacion ="SELECT promociones_id AS idpromo,  productos_id AS idproduc  
                        FROM `productos_has_promociones` 
                        WHERE productos_id  
                        IN (".$idProducto.")"."AND promociones_id IN(SELECT id FROM promociones WHERE vigente = 1 AND activo = 1)";

    $res=$con->query($consultaRelacion);
    $reg = $res->fetchAll(PDO::FETCH_ASSOC);
    header("Content-Type: application/json");
    echo json_encode($reg,JSON_PRETTY_PRINT);                  

}catch(Exception $e){
    die("ERROR SQL in promociones.php: " . $e->getMessage());
}

?>