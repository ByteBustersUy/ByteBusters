<?php

function findAllDiscounts(): array{
    require realpath(dirname(__FILE__)) . "/../db/conexion.php";
    try {
        $statement = $con->prepare("SELECT descuento
                                    FROM PROMOCIONES
                                    WHERE activo = :isActive");
        $statement->execute(array(":isActive" => 1));
        $reg = $statement->fetch(PDO::FETCH_ASSOC);
        return $reg;
    } catch (Exception $e) {
        die("ERROR SQL in findAllDiscounts(): " . $e->getMessage());
    }
}

?>