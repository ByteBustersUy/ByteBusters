<?php
session_start();
if (!isset($_SESSION) || !$_SESSION["userRolesIds"]){
    header("Location:./login.php");
    exit;
}
?>