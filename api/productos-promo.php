<?php
include "./db/conexion.php";
// $cantproducpages=12;
// $pagebtn=$_GET['p'];
// $ini=$cantproducpages*$pagebtn - $cantproducpages;

$res = $con->query("SELECT * 
                    FROM productos p
                    WHERE activo = 1
                    AND p.id IN (SELECT PRODUCTOS_id FROM PRODUCTOS_has_PROMOCIONES)
                    LIMIT 10");
$reg = $res->fetchAll(PDO::FETCH_ASSOC);

header("Content-Type: application/json");
echo json_encode($reg,JSON_PRETTY_PRINT);
