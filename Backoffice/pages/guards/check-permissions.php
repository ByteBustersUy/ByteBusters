<?php
require_once '../../src/modules/users/abm-permisos.php';
session_start();

if ($_SESSION["userRolesIds"]){
    header("Location:./login.php");
    exit;
}
?>