<?php
ob_end_clean();

require realpath(dirname(__FILE__)) . '/../../repository/download.repository.php';
require('FPDF/fpdf.php');
$fechaIni = $_GET['fechaInicio'];
$fechaFin = $_GET['fechaFin'];
class pdfDownload extends FPDF
{

    // Cabecera de página
    function Header()
    {
        // Arial bold 15
        $this->SetFont('Arial', 'B', 15);
        // Movernos a la derecha
        $this->Cell(50);
        // Título
        $this->Cell(20, 10, utf8_decode('Catalogo Productos Promocionados'), 0, 0);
        // Salto de línea
        $this->Ln(20);

        $this->Cell(75, 10, utf8_decode('Nombre'), 1, 0, 'C');
        $this->Cell(85, 10, utf8_decode('Descripcion'), 1, 0, 'C');
        $this->Cell(20, 10, utf8_decode('Precio'), 1, 0, 'C');
        $this->Cell(10, 10, utf8_decode('%'), 1, 1, 'C');
    }

    // Pie de página
    function Footer()
    {
        // Posición: a 1,5 cm del final
        $this->SetY(-15);
        // Arial italic 8
        $this->SetFont('Arial', 'I', 8);
        // Número de página
        $this->Cell(0, 10, mb_convert_encoding('Página ', 'ISO-8859-1', 'UTF-8') . $this->PageNo() . '/{nb}', 0, 0, 'C');
    }
}

$pdf = new pdfDownload();
$pdf->AliasNbPages();
$pdf->AddPage();
$pdf->SetFont('Times', '', 12);


//$data = findAllDataProduct();
$registros = findProductDataByDateOfPromotion($fechaIni, $fechaFin);
foreach ($registros as $reg) {
    $productname = '';
    $productdesc = '';
    $productpresi = '';
    $recortename = substr($reg["nombre"], 0, 35);
    $productname .= $recortename;
    $recortedesc = substr($reg["descripcion"], 0, 40);
    $productdesc .= "  " . $recortedesc . "...";
    $productpresi .= $reg["precio"];
    $descuento = findDiscountByProductId($reg['id']);

    $pdf->Ln();

    $pdf->Cell(75, 10, mb_convert_encoding($productname, 'ISO-8859-1', 'UTF-8'), 1, 0);
    $pdf->Cell(85, 10, mb_convert_encoding($productdesc, 'ISO-8859-1', 'UTF-8'), 1, 0,);
    $pdf->Cell(20, 10, "$" . mb_convert_encoding($productpresi, 'ISO-8859-1', 'UTF-8'), 1, 0, 'C');
    $pdf->Cell(10, 10, mb_convert_encoding($descuento, 'ISO-8859-1', 'UTF-8'), 1, 0, 'C');
}
$pdf->Output();
