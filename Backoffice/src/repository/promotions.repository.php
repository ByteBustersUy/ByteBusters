<?php

function findAllPromos(int $isActive): array
{
    require realpath(dirname(__FILE__)) . "/../db/conexion.php";
    if (isset($isActive) && $isActive == false) {
        try {
            $statement = $con->prepare("SELECT *
                                        FROM PROMOCIONES
                                        ORDER BY fechaInicio ASC");
            $reg = $statement->fetchAll(PDO::FETCH_ASSOC);
            return $reg;
        } catch (Exception $e) {
            die("ERROR SQL in findAllPromos(): " . $e->getMessage());
        }
    } else {
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

function findExistentPromo($descuento, $fechaInicio, $fechaFin, $vigente): array
{
    require realpath(dirname(__FILE__)) . "/../db/conexion.php";
    try {
        $statement = $con->prepare("SELECT *
                                    FROM PROMOCIONES
                                    WHERE descuento = :descuento
                                    AND fechaInicio = :fechaInicio
                                    AND fechaFin = :fechaFin
                                    AND vigente = :vigente
                                    AND activo = :activo");
        $statement->execute(
            array(
                ":descuento" => $descuento,
                ":fechaInicio" => $fechaInicio,
                ":fechaFin" => $fechaFin,
                ":vigente" => $vigente,
                ":activo" => 1
            )
        );
        $reg = $statement->fetch(PDO::FETCH_ASSOC);
        return $reg? $reg : [];
    } catch (Exception $e) {
        die("ERROR SQL in findAllPromos(): " . $e->getMessage());
    }
}

function findOnePromoById($id): array
{
    require realpath(dirname(__FILE__)) . "/../db/conexion.php";
    try {
        $statement = $con->prepare("SELECT *
                                    FROM PROMOCIONES
                                    WHERE id = :id");
        $statement->execute(
            array(":id" => $id)
        );
        $reg = $statement->fetch(PDO::FETCH_ASSOC);
        return $reg;
    } catch (Exception $e) {
        die("ERROR SQL in findAllPromos(): " . $e->getMessage());
    }
}

function updatePromoToExpired($id)
{
    require realpath(dirname(__FILE__)) . "/../db/conexion.php";
    try {
        $statement = $con->prepare("UPDATE PROMOCIONES
                                    SET vigente = :vigente
                                    WHERE id = :id
                                    AND activo = :isActive");
        $statement->execute(array(":vigente" => 0, ":id" => $id, ":isActive" => 1));
        $reg = $statement->fetch(PDO::FETCH_ASSOC);
        return $reg;
    } catch (Exception $e) {
        die("ERROR SQL in findAllPromos(): " . $e->getMessage());
    }
}

function deletePromo($id): bool
{
    require realpath(dirname(__FILE__)) . "/../db/conexion.php";

    try {
        $statement = $con->prepare("UPDATE PROMOCIONES
                                    SET activo = :activo
                                    WHERE id = :id");
        $statement->execute(
            array(
                ":id" => $id,
                ":activo" => 0
            )
        );
        $reg = $statement->fetch(PDO::FETCH_ASSOC);
        return $reg ? true : false;
    } catch (Exception $e) {
        die("ERROR SQL in findAllPromos(): " . $e->getMessage());
    }
}
