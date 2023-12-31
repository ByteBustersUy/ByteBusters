<?php
require '../src/modules/auth/guards/active-session.php';
require '../src/modules/auth/guards/check-permissions.php';
require '../src/utils/actions.php';
checkPermissionss($actions["descargar-documentos"]);
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../styles/normalize.css">
    <link rel="icon" type="image/x-icon" href="../favicon.ico" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
    <link rel="stylesheet" href="../styles/style.css">
    <title>Ecommerce Manager</title>
</head>

<body>
    <div>
        <div class="link-options-div">
            <?php
            // require "./../src/modules/downloads/catalogoAllProduc.php";
            //require "./../src/modules/downloads/catalogoProducPromo.php";
            require "./components/options.php";
            echo $options;
            ?>
        </div>
        <?php
        require "./components/userName.php";
        echo $userName;
        ?>
        <h1>DESCARGAS</h1>
    </div>
    <div class="container frame">
        <div class="row contenedor-descargas">
            <!-- columnas... -->
            <div class="col-12 col-sm-9 div-descarga">
                <h4>CATÁLOGO DE PRODUCTOS DE LA EMPRESA</h4>
                <form action="./../src/modules/downloads/catalogoallProduc.php" method="get">
                    <button type="submit" value="Descargar"><i class="fa-solid fa-angles-down icono-descarga"></i></button>
                </form>
            </div>
            <div class="col-12 col-sm-9 div-descarga">
                <h4>CATÁLOGO DE PRODUCTOS PROMOCIONADOS</h4>
                <form action="./../src/modules/downloads/catalogoProducPromo.php" method="get">

                    <div class='d-flex'></div>
                    <label class="lbl-fecha-descarga">Desde: </label>
                    <input name="fechaInicio" type="date" class="secl-fecha">
                    <label class="lbl-fecha-descarga">Hasta: </label>
                    <input name="fechaFin" type="date" class="secl-fecha">
                    <button class="submitinput" type="submit" value="Descargar"><i class="fa-solid fa-angles-down icono-descarga"></i></button>
            </div>

            </form>
        </div>
    </div>
    </div>
    <footer>
        <?php
        require "./components/footer.php";
        echo $footer;
        ?>
    </footer>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>
</body>

</html>