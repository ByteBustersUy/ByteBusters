<?php
require "./db/conexion.php";

if (isset($_GET["id"])) {
    $idProducto = $_GET["id"];
    try {
        $consultaRelacion = "SELECT promociones_id
                        FROM `productos_has_promociones` 
                        WHERE productos_id  
                        IN (" . $idProducto . ")" . "AND promociones_id IN(SELECT id FROM promociones WHERE vigente = 1 AND activo = 1)";

        $res = $con->query($consultaRelacion);
        $reg = $res->fetchAll(PDO::FETCH_ASSOC);
        header("Content-Type: application/json");
        echo json_encode($reg, JSON_PRETTY_PRINT);
    } catch (Exception $e) {
        die("ERROR SQL in promociones.php: " . $e->getMessage());
    }

} else if (isset($_GET["idPromo"])) {
    $idPromo = $_GET["idPromo"];
    try {
        $res = $con->query("SELECT descuento FROM promociones WHERE id IN(" . $idPromo . ")" . " AND vigente = 1 AND activo = 1 ");
        $reg = $res->fetchAll(PDO::FETCH_ASSOC);
        header("Content-Type: application/json");
        echo json_encode($reg, JSON_PRETTY_PRINT);
    } catch (Exception $e) {
        die("ERROR SQL in promociones.php: " . $e->getMessage());
    }
}
