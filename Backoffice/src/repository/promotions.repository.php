<?php

function findAllPromos(): array
{
    require realpath(dirname(__FILE__)) . "/../db/conexion.php";
    try {
        $statement = $con->prepare("SELECT *
                                    FROM PROMOCIONES
                                    WHERE activo = :isActive
                                    ORDER BY fechaInicio ASC");
        $statement->execute(array(":isActive" => 1));
        $reg = $statement->fetchAll(PDO::FETCH_ASSOC);
        return $reg;
    } catch (Exception $e) {
        die("ERROR SQL in findAllPromos(): " . $e->getMessage());
    }
}

function saveOnePromotion(int $descuento, string $fechaInicio, string $fechaFin): bool
{
    require realpath(dirname(__FILE__)) . "/../db/conexion.php";
    try {
        $statement = $con->prepare("INSERT INTO PROMOCIONES (descuento, fechaInicio, fechaFin)
                                    VALUES (:descuento, :fechaInicio, :fechaFin)");
        $statement->execute(
            array(
                ":descuento" => $descuento,
                ":fechaInicio" => $fechaInicio,
                ":fechaFin" => $fechaFin
            )
        );
        return true;
    } catch (Exception $e) {
        return false;
    }
}

function findOnePromo($descuento) {
    require realpath(dirname(__FILE__)) . "/../db/conexion.php";
    try {
        $statement = $con->prepare("SELECT *
                                    FROM PROMOCIONES
                                    WHERE descuento = :descuento
                                    AND activo = :isActive");
        $statement->execute(array(":descuento" => $descuento, ":isActive" => 1));
        $reg = $statement->fetchAll(PDO::FETCH_ASSOC);
        return $reg;
    } catch (Exception $e) {
        die("ERROR SQL in findAllPromos(): " . $e->getMessage());
    }
}

function updateOnePromo($descuento){
    require realpath(dirname(__FILE__)) . "/../db/conexion.php";
    try {
        $statement = $con->prepare("UPDATE PROMOCIONES
                                    SET vigente = :vigente
                                    WHERE descuento = :descuento
                                    AND activo = :isActive");
        $statement->execute(array(":vigente" => 0, ":descuento" => $descuento, ":isActive" => 1));
        $reg = $statement->fetchAll(PDO::FETCH_ASSOC);
        return $reg;
    } catch (Exception $e) {
        die("ERROR SQL in findAllPromos(): " . $e->getMessage());
    }
}
