<?php
require '../src/modules/auth/guards/active-session.php';
require '../src/modules/auth/guards/check-permissions.php';
require '../src/utils/actions.php';
checkPermissionss($actions["gestionar-promociones"]);
?>

<!DOCTYPE html>
<html lang="es" style="overflow: scroll">

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
            require "./components/options.php";
            echo $options;
            ?>
        </div>
        <?php
        require "./components/userName.php";
        echo $userName;
        ?>
        <h1>GESTIÓN DE PROMOCIONES</h1>
    </div>
    <div class="container frame">
        <div class="row">
            <div class="col-sm-6 col-md-4 col-lg-3">
                <a id="btnAddPromo" data-bs-toggle="modal" data-bs-target="#moddalPromotions">
                    <div class="card-add-promotion">
                        <i id="addPromotionIcon" class="fa-solid fa-plus"></i>
                    </div>
                </a>
            </div>
            <?php
            require "./../src/modules/promotions/abm-promotions.php";
            echo getAllPromotionCards();
            ?>
        </div>
        <button id="btnBanners" class="btn-banners link-options" onclick="location.href='banner.php'">Configurar publicidad</button>
        <footer>
            <?php
            require "./components/footer.php";
            echo $footer;
            ?>
        </footer>
        <!-- Modal -->
        <div class="modal fade" id="moddalPromotions" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div id="modalContent" class="modal-content">
                    <div class="modal-header">
                        <h2 class="modal-title fs-5" id="exampleModalLabel">Crear promoción</h2>
                        <button id="btnCloseModal" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="formAbmPromotions" class="form-abm" action="../src/modules/promotions/abm-promotions.php" method="post">
                            <input id="descuento" type="number" name="descuento" placeholder="Descuento (%)" required autocomplete="off">
                            <input id="fechaInicio" type="date" name="fechaInicio" required autocomplete="off">
                            <input id="fechaFin" type="date" name="fechaFin" required autocomplete="off">
                            <label id="errorMessageModal"></label>
                            <div class="buttons">
                                <button id="btnCancelModal" type="button" data-bs-dismiss="modal" aria-label="Close">CANCELAR</button>
                                <button id="btnSubmitModal" type="submit">ACEPTAR</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <script src="../js/abm-promociones.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>
</body>

</html>