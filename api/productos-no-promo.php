<?php
include "./db/conexion.php";

$res = $con-> query("SELECT P.*
                    FROM PRODUCTOS P
                    LEFT JOIN PRODUCTOS_has_PROMOCIONES PP ON P.id = PP.PRODUCTOS_id
                    WHERE P.activo = 1
                    AND PP.PRODUCTOS_id IS NULL;"
                    );
$reg = $res->fetchAll(PDO::FETCH_ASSOC);

header("Content-Type: application/json");
echo json_encode($reg,JSON_PRETTY_PRINT);
