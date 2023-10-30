<?php
require_once realpath(dirname(__FILE__)) . "/../../utils/validators/hasData.php";
require realpath(dirname(__FILE__)) . "/../../repository/products.repository.php";
require realpath(dirname(__FILE__)) . "/../../utils/validators/db_types.php";


if ($_SERVER["REQUEST_METHOD"] === "POST") {
    session_status() === PHP_SESSION_ACTIVE ?: session_start();

    if (isset($_GET['action'])) {

        switch ($_GET['action']) {
            case "add":
                addProduct();
                break;
            case "edit":
                editProduct($_GET['id']);
                break;
            case "delete":
                deleteProduct($_POST["productId"]);
                break;
            case "detail":
                detailProduct($_POST["productId"]);
                break;
            case "addDiscount":
                addDiscount($_GET["productId"], $_GET['promoId'], $_GET['status']);
                break;
            default: 
                die("Invalid action requested");
        }
    }
}

function addProduct()
{
    require realpath(dirname(__FILE__)) . "/../../utils/messages/msg.php";

    try {
        $fileTmpPath = htmlspecialchars($_FILES['imagen']['tmp_name']);
        $nombre = htmlspecialchars($_POST['nombre']);
        $descripcion = htmlspecialchars($_POST['descripcion']);
        $categoria = htmlspecialchars($_POST['categoria']);
        $precio = htmlspecialchars($_POST['precio']);
        $idFileName = intval(findLastProductId()) + 1 . ".png";

        $dir = '../../../../Ecommerce/images/';
        echo $destino = $dir . $idFileName; //TODO: id de producto
        echo $idFileName;

        print_r(move_uploaded_file($fileTmpPath, $destino));
        if (move_uploaded_file($fileTmpPath, $destino)) {
            echo "Fue guardado";
        } else {
            echo "Error";
        }
    } catch (Exception $e) {
        throw new ErrorException($e->getMessage());
    }

    if (!elementsHasData([$nombre, $descripcion, $categoria])) {
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
        "imagen" => $idFileName,
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

    if(!$productId){
        throw new Error("ERROR: " . $error_messages['!exist_product']);
    }

    try {
        $nombre = htmlspecialchars($_POST['nombre']);
        $descripcion = htmlspecialchars($_POST['descripcion']);
        $categoria = htmlspecialchars($_POST['categoria']);
        $precio = htmlspecialchars($_POST['precio']);
        $fileTmpPath = $_FILES['imagen']['tmp_name'];
        $fileName = $_FILES['imagen']['name'];
        $dir = realpath(dirname(__FILE__)) . "/../../../../Ecommerce/images/";
        echo $destino = $dir . $productId . ".png";
        echo $productId;
        echo $fileName;
        if (move_uploaded_file($fileTmpPath, $destino)) {
            echo "Fue guardado";
        } else {
            echo "Error";
        }

        $updateProduct = [
            "id" => $productId,
            "nombre" => $nombre,
            "imagen" => $productId . ".png",
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
    require realpath(dirname(__FILE__)) . "/../../repository/promotions.repository.php";

    $productsData = findAllProducts();
    $productsList = '';
    foreach ($productsData as $product) {
        $category = findProductCategoryByProductId($product['id']);
        $promoId = findProductPromotionId($product['id']);

        if ($promoId !== 0) {
            $promo = findOnePromoById($promoId);
            date_default_timezone_set('America/Montevideo');
            if ($promo['fechaFin'] >= date("Y-m-d")) {
                $discount = $promo['descuento'] . "%";
                $classColor = "promoted-product";
            } else {
                updatePromoToExpired($promoId);
            }
        } else {
            $discount = "-";
            $classColor = "";
        }

        $productsList .= '
                            <tr id="' . $product['id'] . '" class="user-select-none align-middle" onclick="selectProductRow(' . $product['id'] . ')">
                                <td class="' . $classColor . ' first-in-table">' . $product['nombre'] . '</td>
                                <td class="' . $classColor . '" id="' . $category . '">' . $category . '</td>
                                <td class="' . $classColor . '">$' . $product['precio'] . '</td>
                                <td promoId="' . $promoId . '" class="' . $classColor . '">' . $discount . '</td>
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

function detailProduct(int $productId)
{
    require realpath(dirname(__FILE__)) . "/../../utils/messages/msg.php";
    require realpath(dirname(__FILE__)) . "/../../repository/promotions.repository.php";
    
    if(!$productId){
        throw new Error("ERROR: " . $error_messages['!exist_product']);
    }

    $product = findProductById($productId);

    if (!elementsHasData($product)) {
        die("ERROR: " . $error_messages['!exist_product']);
    }

    $promoId = findPromoIdByProductId($productId);
    $discount = 0;

    if (hasData($promoId) && $promoId > 0) {
        $promo = findOnePromoById($promoId);
        if (hasData($promo)) {
            $discount = $promo["descuento"];
        }
    }

    $productData = [
        "imagen" => $product['imagen'],
        "nombre" => $product['nombre'],
        "descripcion" => $product['descripcion'],
        "precio" => $product['precio'],
        "descuento" => $discount,
    ];

    header("Content-Type: application/json");
    echo json_encode($productData, JSON_PRETTY_PRINT);
}

function addDiscount(int $productId, int $promoId, int $status)
{
    require realpath(dirname(__FILE__)) . "/../../utils/messages/msg.php";

    if(!$productId){
        die("ERROR: " . $error_messages['!exist_product']);
    }

    if(!$promoId){
        die("ERROR: " . $error_messages['!exist_promo']);
    }

    if(!isset($status)){
        die("ERROR: " . $error_messages['!valid_form']);
    }

    setPromoToProduct($productId, $promoId, $status);
    header("Location:../../../pages/abm-productos.php");
}
