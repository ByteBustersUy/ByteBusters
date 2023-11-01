<?php
function findOneProduct(string $nombre): array
{
    require realpath(dirname(__FILE__)) . "/../db/conexion.php";
    try {
        $statement = $con->prepare("SELECT * FROM PRODUCTOS WHERE nombre = :nombre");
        $statement->execute(array(':nombre' => $nombre));
        $reg = $statement->fetch(PDO::FETCH_ASSOC);

        return $reg ? $reg : [];
    } catch (Exception $e) {
        $con->close();
        die("ERROR SQL in findOneProduct(): " . $e->getMessage());
    }
}

function findProductById(int $id): array
{
    require realpath(dirname(__FILE__)) . "/../db/conexion.php";
    try {
        $statement = $con->prepare("SELECT * FROM PRODUCTOS WHERE id = :id");
        $statement->execute(array(':id' => $id));
        $reg = $statement->fetch(PDO::FETCH_ASSOC);

        return $reg ? $reg : [];
    } catch (Exception $e) {
        $con->close();
        die("ERROR SQL in findOneProduct(): " . $e->getMessage());
    }
}

function findAllProducts(): array
{
    require realpath(dirname(__FILE__)) . "/../db/conexion.php";
    try {
        $res = $con->prepare("SELECT * FROM PRODUCTOS WHERE activo = :isActive ORDER BY nombre ASC");
        $res->execute([':isActive' => 1]);
        $reg = $res->fetchAll(PDO::FETCH_ASSOC);

        return $reg ? $reg : [];
    } catch (Exception $e) {
        $con->close();
        die("ERROR SQL in findAllProducts(): " . $e->getMessage());
    }
}

function findAllCategories(): array
{
    require realpath(dirname(__FILE__)) . "/../db/conexion.php";
    try {
        $res = $con->query("SELECT * FROM CATEGORIAS ORDER BY id ASC");
        $reg = $res->fetchAll(PDO::FETCH_ASSOC);

        return $reg ? $reg : [];
    } catch (Exception $e) {
        $con->close();
        die("ERROR SQL in findAllCategories(): " . $e->getMessage());
    }
}

function findLastProductId(): string
{
    require realpath(dirname(__FILE__)) . "/../db/conexion.php";
    try {
        $res = $con->query("SELECT id FROM PRODUCTOS ORDER BY id DESC");
        $reg = $res->fetch(PDO::FETCH_ASSOC);
        return $reg['id'] ? $reg['id'] : '';
    } catch (Exception $e) {
        $con->close();
        die("ERROR SQL in findLastProductId(): " . $e->getMessage());
    }
}

function findProductCategoryByProductId(string $productId): string
{
    require realpath(dirname(__FILE__)) . "/../db/conexion.php";
    try {
        $con->beginTransaction();
        $statement = $con->prepare("SELECT CATEGORIAS_id FROM PRODUCTOS_has_CATEGORIAS WHERE PRODUCTOS_id = :productId");
        $statement->execute(array(':productId' => $productId));
        $reg = $statement->fetch(PDO::FETCH_ASSOC);

        if (!empty($reg)) {
            $statement = $con->prepare("SELECT nombre FROM CATEGORIAS WHERE id = :categoryId");
            $statement->execute(array(':categoryId' => $reg['CATEGORIAS_id']));
            $reg = $statement->fetch(PDO::FETCH_ASSOC);
            $con->commit();
            return $reg['nombre'] ? $reg['nombre'] : '';
        }

        return '';
    } catch (Exception $e) {
        $con->rollback();
        $con->close();
        die("ERROR SQL in findProductCategoryByProductId(): " . $e->getMessage());
    }
}
function findProductPromotionId(string $productId): int
{
    require realpath(dirname(__FILE__)) . "/../db/conexion.php";
    try {
        $statement = $con->prepare("SELECT * FROM PRODUCTOS_has_PROMOCIONES WHERE PRODUCTOS_id = :productId ORDER BY fecha DESC");
        $statement->execute(array(':productId' => $productId));
        $reg = $statement->fetch(PDO::FETCH_ASSOC);

        return $reg ? $reg["PROMOCIONES_id"] : 0;
    } catch (Exception $e) {
        $con->close();
        die("ERROR SQL in findProductPromotionId(): " . $e->getMessage());
    }
}

function updateOneProduct(array $updatedData)
{
    require realpath(dirname(__FILE__)) . "/../db/conexion.php";

    try {
        $con->beginTransaction();
        $statement = $con->prepare("UPDATE PRODUCTOS SET  nombre = :nombre,
        descripcion = :descripcion, imagen = :imagen, precio = :precio WHERE id = :id
        AND activo = :activo");

        $reg = $statement->execute([
            ':nombre' => $updatedData['nombre'],
            ':descripcion' => $updatedData['descripcion'],
            ':imagen' => $updatedData['imagen'],
            ':precio' => $updatedData['precio'],
            ':id' => $updatedData['id'],
            ':activo' => 1,
        ]);

        $statement = $con->prepare("UPDATE PRODUCTOS_has_CATEGORIAS SET PRODUCTOS_id = :prodId, CATEGORIAS_id = :catId WHERE PRODUCTOS_id = :prodId");
        $statement->execute([
            ':prodId' => $updatedData['id'],
            ':catId' => $updatedData['idCategoria']
        ]);
        $con->commit();

        return $reg ? true : false;
    } catch (Exception $e) {
        $con->rollback();
        $con->close();
        die("ERROR SQL: " . $e->getMessage());
    }
}

function saveOneProduct(array $newProduct): bool
{
    require realpath(dirname(__FILE__)) . "/../db/conexion.php";
    include realpath(dirname(__FILE__)) . "/../utils/messages/msg.php";
    session_status() === PHP_SESSION_ACTIVE ?: session_start();

    try {
        $con->beginTransaction();

        $statement = $con->prepare("INSERT INTO PRODUCTOS (nombre,descripcion,imagen,precio,USUARIO_ci) VALUES (:nombre, :descripcion, :imagen, :precio, :USUARIO_ci)");
        $statement->execute([
            ':nombre' => $newProduct['nombre'],
            ':descripcion' => $newProduct['descripcion'],
            ':imagen' => $newProduct['imagen'],
            ':precio' => $newProduct['precio'],
            ':USUARIO_ci' => $_SESSION['userCi'],
        ]);

        $newProductId = intval(findLastProductId()) + 1;
        $statement = $con->prepare("INSERT INTO PRODUCTOS_has_CATEGORIAS (PRODUCTOS_id,CATEGORIAS_id) VALUES (:prodId, :catId)");
        $statement->execute([
            ':prodId' => $newProductId,
            ':catId' => $newProduct['idCategoria']
        ]);

        $con->commit();
        return true;
    } catch (Exception $e) {
        $con->rollback();
        echo ("ERROR SQL in saveOneProduct(): " . $e->getMessage());
        return false;
    }
}

function deleteProduct(string $productId): bool
{
    require realpath(dirname(__FILE__)) . "/../db/conexion.php";
    include realpath(dirname(__FILE__)) . "/../utils/messages/msg.php";
    
    if(!$productId){
        throw new Error("ERROR: " . $error_messages['!exist_product']);
    }
    
    try {
        $statement = $con->prepare("UPDATE PRODUCTOS SET activo = :isActive WHERE id = :id");
        $statement->execute([
            ':isActive' => 0,
            ':id' => $productId
        ]);

        return true;
    } catch (Exception $e) {

        echo ("ERROR SQL in Delete Product(): " . $e->getMessage());
        return false;
    }
}

function setPromoToProduct(int $productId, int $promoId): bool
{
    require realpath(dirname(__FILE__)) . "/../db/conexion.php";

    try {
        $statement = $con->prepare("INSERT INTO PRODUCTOS_has_PROMOCIONES (PROMOCIONES_id, PRODUCTOS_id) VALUES (:promoId, :productId)");
        $statement->execute([
            ':promoId' => $promoId,
            ':productId' => $productId
        ]);
        return true;
    } catch (Exception $e) {
        echo ("ERROR SQL in setPromoToProduct(): " . $e->getMessage());
        return false;
    }

}

function checkproductHasValidPromotion(int $productId): bool
{
    require realpath(dirname(__FILE__)) . "/../db/conexion.php";
    include realpath(dirname(__FILE__)) . "/../utils/messages/msg.php";

    try {
        $statement = $con->prepare("SELECT *
                                    FROM PROMOCIONES
                                    WHERE
                                    id IN (SELECT PROMOCIONES_id FROM PRODUCTOS_has_PROMOCIONES
                                    WHERE PRODUCTOS_id = :productId)
                                    AND vigente = 1
                                    AND activo = 1");
        $statement->execute([':productId' => $productId]);
        $reg = $statement->fetch(PDO::FETCH_ASSOC);
        return $reg['id'] ? true : false;
    } catch (Exception $e) {
        echo ("ERROR SQL in checkproductHasPromotion(): " . $e->getMessage());
        return false;
    }
}

function checkPromoIsAlreadyAssigned(int $productId, int $promoId): bool
{
    require realpath(dirname(__FILE__)) . "/../db/conexion.php";
    include realpath(dirname(__FILE__)) . "/../utils/messages/msg.php";

    try {
        $statement = $con->prepare("SELECT * FROM PRODUCTOS_has_PROMOCIONES WHERE PRODUCTOS_id = :productId AND PROMOCIONES_id = :promoId");
        $statement->execute([
            ':promoId' => $promoId,
            ':productId' => $productId,
        ]);
        $reg = $statement->fetch(PDO::FETCH_ASSOC);
        return $reg['PRODUCTOS_id'] ? true : false;
    } catch (Exception $e) {
        echo ("ERROR SQL in checkPromoIsAlreadyAssigned(): " . $e->getMessage());
        return false;
    }
}