<?php
require realpath(dirname(__FILE__)) . "/../../utils/validators/hasData.php";
require realpath(dirname(__FILE__)) . "/../../utils/validators/db_types.php";
require realpath(dirname(__FILE__)) . "/../../repository/products.repository.php";


if ($_SERVER["REQUEST_METHOD"] === "POST") {
    session_status() === PHP_SESSION_ACTIVE ?: session_start();

    if (isset($_GET['action'])) {

        if ($_GET['action'] == "add") {
            addProduct();
        } else if ($_GET['action'] == "edit" && isset($_GET['id'])) {
            editProduct($_GET['id']);
        } else if ($_GET['action'] == "delete" && isset($_POST["productId"])) {
            deleteProduct($_POST["productId"]);
        }else if($_GET['action'] == "detail" && isset($_POST["productId"])){
            header("Content-Type: application/json");
            $productData = detailProduct($_POST["productId"]);
            echo json_encode($productData, JSON_PRETTY_PRINT);
        } else {
            die("Invalid action requested");
        }
    }
}

function addProduct()
{
    require realpath(dirname(__FILE__)) . "/../../utils/messages/msg.php";

    try {
        $nombre = htmlspecialchars($_POST['nombre']);
        $imagen = htmlspecialchars($_POST['imagen']);
        $descripcion = htmlspecialchars($_POST['descripcion']);
        $categoria = htmlspecialchars($_POST['categoria']);
        $precio = htmlspecialchars($_POST['precio']);
    } catch (Exception $e) {
        throw new ErrorException($e->getMessage());
    }

    if (!elementsHasData([$nombre, $imagen, $descripcion, $categoria])) {
        die("ERROR: " . $error_messages['!form_data']);
    }

    if (!varchar45($nombre)) {
        die("ERROR: " . $error_messages['!valid_length45']);
    }

    if (!varchar255($descripcion)) {
        die("ERROR: " . $error_messages['!valid_length255']);
    }

    $newProduct = [
        "nombre" => $nombre,
        "imagen" => $imagen,
        "idCategoria" => $categoria,
        "descripcion" => $descripcion,
        "precio" => $precio,
    ];
    $ProductExist = findOneProduct($newProduct['nombre']);
    if ($ProductExist) {
        die("ERROR: " . $error_messages['exist_product'] . ". ('" . $ProductExist['nombre'] . "')");
    }
    saveOneProduct($newProduct);
    header("Location:../../../pages/abm-productos.php");
}

function editProduct(string $productId)
{
    require realpath(dirname(__FILE__)) . "/../../utils/messages/msg.php";

    try {
        $nombre = htmlspecialchars($_POST['nombre']);
        $imagen = htmlspecialchars($_POST['imagen']);
        $descripcion = htmlspecialchars($_POST['descripcion']);
        $categoria = htmlspecialchars($_POST['categoria']);
        $precio = htmlspecialchars($_POST['precio']);

        $updateProduct = [
            "id" => $productId,
            "nombre" => $nombre,
            "imagen" => $imagen,
            "idCategoria" => $categoria,
            "descripcion" => $descripcion,
            "precio" => $precio,
        ];

        updateOneProduct($updateProduct);
        header("Location:../../../pages/abm-productos.php");
    } catch (Exception $e) {
        throw new ErrorException($e->getMessage());
    }
}


function getProductsTableData(): string
{
    $productsData = findAllProducts();
    $productsList = '';
    foreach ($productsData as $product) {
        $category = findProductCategoryByProductId($product['id']);
        $isPromo = findProductPromotionStatus($product['id']);

        if($isPromo == 1){
            $isPromo = "Si";
            $classColor = "promoted-product";
        } else {
            $isPromo = "No";
            $classColor = "";
        }

        $productsList .= '
                            <tr id="' . $product['id'] . '" class="user-select-none align-middle" onclick="selectProductRow(' . $product['id'] . ')">
                                <td class="'.$classColor.' first-in-table">' . $product['nombre'] . '</td>
                                <td class="'.$classColor.'" id="' . $category . '">' . $category . '</td>
                                <td class="'.$classColor.'">$' . $product['precio'] . '</td>
                                <td class="'.$classColor.'">' . $isPromo . '</td>
                                <td><button id="' . $product['id'] . '" class="btn-eye" data-bs-toggle="modal" data-bs-target="#moddalProductsDetail"><i class="fa-solid fa-eye"></i></button></td>
                            </tr>';
    }
    return $productsList;
}

function getOptionsCategoriesHTML(): string
{

    $categories = findAllCategories();
    $options = '';
    foreach ($categories as $category) {
        $options .= '<option value="' . $category['id'] . '">' . $category['nombre'] . '</option>';
    }
    return $options;
}

function detailProduct(int $id): array{
    require realpath(dirname(__FILE__)) . "/../../utils/messages/msg.php";

    $productData = findProductById($id);
    if(!$productData){
        die("ERROR: " . $error_messages['!exist_product']);
    }

    return $productData;
}