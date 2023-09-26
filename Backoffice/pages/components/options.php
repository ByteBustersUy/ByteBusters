<?php
$options = "";
$disabled = 'style="filter: brightness(50%); cursor: not-allowed; user-select: none;"';

if ($_SERVER['REQUEST_URI'] === "/ByteBusters/Backoffice/pages/menu.php") {
    $options .= "<a class='link-options' ".$disabled."'><i class='fa-solid fa-left-long'></i> Volver atrás</a>";
}else{
    $options .= "<a class='link-options' href='./menu.php'><i class='fa-solid fa-left-long'></i> Volver atrás</a>";
}

$options .= "<a class='link-options' href=./login.php> Cerrar Sesión</a>";
