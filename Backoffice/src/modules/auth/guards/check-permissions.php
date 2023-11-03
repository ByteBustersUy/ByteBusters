<?php

function checkPermissionss(string $action)
{
    session_status() === PHP_SESSION_ACTIVE ?: session_start();
    require realpath(dirname(__FILE__)) . "/../../../repository/users.repository.php";

    $validActions = findActionsByRolesId($_SESSION['userRolesIds']);

    foreach ($validActions as $validAction) {
        if ($validAction == $action) {
            return;
        }
    }
    header("HTTP/1.1 401 Unauthorized");
    echo "<!DOCTYPE html>
        <html lang='en'>
            <head>
                <meta charset='UTF-8'>
                <meta name='viewport' content='width=device-width, initial-scale=1.0'>
                <title>Error 401 - No autorizado</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                    }   
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                        background-color: #ffffff;
                        box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
                        margin-top: 50px;
                    }
                    h1 {
                        color: #ff4444;
                    }
                </style>
            </head>
            <body>
                <div class='container'>
                    <h1>Error 401 - No autorizado</h1>
                    <p>Lo sentimos, no tiene permiso para acceder a esta página.</p>
                </div>
            </body>
        </html>";
    exit;
}
