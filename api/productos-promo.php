<?php
include "./db/conexion.php";

// $res = $con->query("SELECT * 
//                     FROM productos p
//                     WHERE activo = 1
//                     AND p.id IN (SELECT PRODUCTOS_id FROM PRODUCTOS_has_PROMOCIONES WHERE activo = 1 ORDER BY id DESC)
//                     LIMIT 10");

$res = $con->query("SELECT 
                    P.id AS id,
                    P.nombre AS nombre,
                    P.descripcion AS descripcion,
                    P.imagen AS imagen,
                    P.precio AS precio,
                    PR.descuento AS descuento
                    FROM 
                    PRODUCTOS AS P
                    LEFT JOIN 
                    PRODUCTOS_has_PROMOCIONES AS PP ON P.id = PP.PRODUCTOS_id
                    LEFT JOIN 
                    PROMOCIONES AS PR ON PP.PROMOCIONES_id = PR.id
                    WHERE 
                    P.activo = 1
                    AND PR.vigente = 1
                    AND PR.activo = 1
                    LIMIT 10");
$reg = $res->fetchAll(PDO::FETCH_ASSOC);

header("Content-Type: application/json");
echo json_encode($reg,JSON_PRETTY_PRINT);
