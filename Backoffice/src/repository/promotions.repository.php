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
            $con->close();
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
            $con->close();
            die("ERROR SQL in findAllPromos(): " . $e->getMessage());
        }
    }
}


function findActiveAndValidPromos(): array
{
    require realpath(dirname(__FILE__)) . "/../db/conexion.php";
    try {
        $statement = $con->prepare("SELECT *
                                        FROM PROMOCIONES
                                        WHERE activo = :isActive
                                        AND vigente = :isValid
                                        ORDER BY fechaInicio ASC");
        $statement->execute(array(":isActive" => 1, "isValid" => 1));
        $reg = $statement->fetchAll(PDO::FETCH_ASSOC);

        return $reg;
    } catch (Exception $e) {
        $con->close();
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
        $con->close();
        return false;
    }
}

function findExistentPromo(int $descuento, string $fechaInicio, string $fechaFin, int $vigente): array
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

        return $reg ? $reg : [];
    } catch (Exception $e) {
        $con->close();
        die("ERROR SQL in findExistentPromo(): " . $e->getMessage());
    }
}

function findOnePromoById(int $promoId): array
{
    require realpath(dirname(__FILE__)) . "/../db/conexion.php";
    try {
        $statement = $con->prepare("SELECT *
                                    FROM PROMOCIONES
                                    WHERE id = :id");
        $statement->execute(
            array(":id" => $promoId)
        );
        $reg = $statement->fetch(PDO::FETCH_ASSOC);

        return $reg;
    } catch (Exception $e) {
        $con->close();
        die("ERROR SQL in findOnePromoById(): " . $e->getMessage());
    }
}

function findPromoIdByProductId(int $productId): int
{
    require realpath(dirname(__FILE__)) . "/../db/conexion.php";
    try {
        $statement = $con->prepare("SELECT PROMOCIONES_id
                                    FROM PRODUCTOS_has_PROMOCIONES
                                    WHERE PRODUCTOS_id = :id
                                    ORDER BY PROMOCIONES_id DESC
                                    ");
        $statement->execute(
            array(":id" => $productId)
        );
        $reg = $statement->fetch();

        return $reg ? $reg['PROMOCIONES_id'] : 0;
    } catch (Exception $e) {
        $con->close();
        die("ERROR SQL in findPromoIdByProductId(): " . $e->getMessage());
    }
}

function updatePromoToExpired(int $promoId)
{
    require realpath(dirname(__FILE__)) . "/../db/conexion.php";
    try {
        $statement = $con->prepare("UPDATE PROMOCIONES
                                    SET vigente = :vigente
                                    WHERE id = :id
                                    AND activo = :isActive");
        $statement->execute(array(":vigente" => 0, ":id" => $promoId, ":isActive" => 1));
        $reg = $statement->fetch(PDO::FETCH_ASSOC);

        return $reg;
    } catch (Exception $e) {
        $con->close();
        die("ERROR SQL in updatePromoToExpired(): " . $e->getMessage());
    }
}

function deletePromo(int $promoId): bool
{
    require realpath(dirname(__FILE__)) . "/../db/conexion.php";

    try {
        $statement = $con->prepare("UPDATE PROMOCIONES
                                    SET activo = :activo
                                    WHERE id = :id");
        $statement->execute(
            array(
                ":id" => $promoId,
                ":activo" => 0
            )
        );
        $reg = $statement->fetch(PDO::FETCH_ASSOC);

        return $reg ? true : false;
    } catch (Exception $e) {
        $con->close();
        die("ERROR SQL in deletePromo(): " . $e->getMessage());
    }
}
