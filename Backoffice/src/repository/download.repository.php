<?php
function findAllProductData(): array
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
function findProductDataByDateOfPromotion($fechaInicio,$fechaFin)
{

    require realpath(dirname(__FILE__)) . "/../db/conexion.php";
    try{
        $resultado = $con->query("  SELECT nombre,descripcion,precio 
                                    FROM PRODUCTOS 
                                    WHERE id 
                                    IN(
                                        SELECT PRODUCTOS_id 
                                        FROM `productos_has_promociones` 
                                        WHERE fecha >= '$fechaInicio'  
                                        AND fecha <= '$fechaFin')
                                        ");
        $registros = $resultado->fetchAll(PDO::FETCH_ASSOC);
       return $registros;
    }catch(Exception $e) {
        $con->close();
        die("ERROR SQL in findAllDataProduct(): " . $e->getMessage());
    }


}
