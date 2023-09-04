<?php
function findAllDataProduct(): array
{
    require realpath(dirname(__FILE__)) . "/../db/conexion.php";
    try {
        $statement = $con->prepare("SELECT nombre,descripcion,precio FROM PRODUCTOS");
        $statement->execute();
        $reg = $statement->fetch(PDO::FETCH_ASSOC);
        return $reg ? $reg : [];
    } catch (Exception $e) {
        die("ERROR SQL in findAllDataProduct(): " . $e->getMessage());
    }
}
?>