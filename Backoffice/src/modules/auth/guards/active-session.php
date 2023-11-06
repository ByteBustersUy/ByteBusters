<?php
session_status() === PHP_SESSION_ACTIVE ?: session_start();
if (!isset($_SESSION) || !$_SESSION["userRolesIds"]){
    header("Location:./login.php");
    exit;
}
?>