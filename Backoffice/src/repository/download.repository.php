<?php
function findAllDataProduct(): array
{
    require realpath(dirname(__FILE__)) . "/../db/conexion.php";
    try {
        $resultado = $con->query("SELECT nombre,descripcion,precio FROM PRODUCTOS");
        $registros = $resultado->fetchAll(PDO::FETCH_ASSOC);
        return $registros;
    } catch (Exception $e) {
        die("ERROR SQL in findAllDataProduct(): " . $e->getMessage());
    }
}
?>