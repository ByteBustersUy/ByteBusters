<?php
include "./db/conexion.php";

$reg=[];
$productsPorPagina = isset($_GET["ppp"])? $_GET["ppp"] : 12;
$pagina = isset($_GET["pagina"]) && is_numeric($_GET["pagina"]) ? $_GET["pagina"] : 1;
$offset = ($pagina - 1)* $productsPorPagina;

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    try {
        $data = json_decode(file_get_contents('php://input'), true);
        $value = $data['value'];

        $valorData = '%' . $value . '%';
        $stmt = $con->prepare("SELECT * FROM PRODUCTOS WHERE nombre LIKE :valor LIMIT :limite OFFSET :offset");
        $stmt->bindParam(':valor', $valorData, PDO::PARAM_STR);
        $stmt->bindParam(':limite', $productsPorPagina, PDO::PARAM_INT);
        $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
        $stmt->execute();

        $reg = $stmt->fetchAll(PDO::FETCH_ASSOC);
        header("Content-Type: application/json");
        echo json_encode($reg, JSON_PRETTY_PRINT);
    } catch (Exception $e) { }
}

?>