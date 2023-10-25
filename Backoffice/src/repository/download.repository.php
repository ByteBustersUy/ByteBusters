<?php
function findAllDataProduct(): array
{
    require realpath(dirname(__FILE__)) . "/../db/conexion.php";
    try {
        $resultado = $con->query("SELECT nombre,descripcion,precio FROM PRODUCTOS");
        $registros = $resultado->fetchAll(PDO::FETCH_ASSOC);
        
        return $registros;
    } catch (Exception $e) {
        $con->close();
        die("ERROR SQL in findAllDataProduct(): " . $e->getMessage());
    }
}
