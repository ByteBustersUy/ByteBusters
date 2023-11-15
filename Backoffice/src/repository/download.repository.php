<?php
function findAllProductData(): array
{
    require realpath(dirname(__FILE__)) . "/../db/conexion.php";
    try {
        $resultado = $con->query("SELECT nombre,descripcion,precio FROM PRODUCTOS ORDER BY nombre");
        $registros = $resultado->fetchAll(PDO::FETCH_ASSOC);
        
        return $registros;
    } catch (Exception $e) {
        $con->close();
        die("ERROR SQL in findAllProductData(): " . $e->getMessage());
    }
}
function findProductDataByDateOfPromotion($fechaInicio,$fechaFin)
{

    require realpath(dirname(__FILE__)) . "/../db/conexion.php";
    try{
        $resultado = $con->query("  SELECT id,nombre,descripcion,precio 
                                    FROM PRODUCTOS 
                                    WHERE id 
                                    IN(
                                        SELECT PRODUCTOS_id 
                                        FROM `productos_has_promociones` 
                                        WHERE fecha >= '$fechaInicio'  
                                        AND fecha <= '$fechaFin') ORDER BY `PRODUCTOS`.`nombre` 
                                        ");
        $registros = $resultado->fetchAll(PDO::FETCH_ASSOC);
        return $registros;
    }catch(Exception $e) {
        
        die("ERROR SQL in findProductDataByDateOfPromotion(): " . $e->getMessage());
    }
}

function findDiscountByProductId(int $productId)
{
    require realpath(dirname(__FILE__)) . "/../db/conexion.php";
    try{
        $res = $con->prepare("SELECT descuento
                                FROM PROMOCIONES 
                                WHERE id 
                                IN(
                                    SELECT PROMOCIONES_id 
                                    FROM PRODUCTOS_has_PROMOCIONES
                                    WHERE PRODUCTOS_id = :productId 
                                    )
                            ");
        $res->execute([":productId" => $productId]);
        $reg = $res->fetch(PDO::FETCH_ASSOC);
        return $reg ? $reg["descuento"] : 0;
    }catch(Exception $e) {
        $con->close();
        die("ERROR SQL in findDiscountByProductId(): " . $e->getMessage());
    }
}
