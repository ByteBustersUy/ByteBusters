<?php
session_status() === PHP_SESSION_ACTIVE ?: session_start();
$userName = "<p id='userName'>- ".$_SESSION['userName']." -</p>";
