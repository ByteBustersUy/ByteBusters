<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
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
        <h1>GESTIÓN DE PRODUCTOS</h1>
    </div>
    <div class="container frame">
        <div class="row">
            <div class="col-lg-2 ">
                <div class="items">
                    <a id="btnAddProduct" data-bs-toggle="modal" data-bs-target="#moddalProducts">
                        <div class="btn-abm">
                            <i class="fa-solid fa-square-plus"></i>
                        </div>
                    </a>
                    <a id="btnEditProduct" class="disabled">
                        <div class="btn-abm">
                            <i class="fa-solid fa-pen"></i>
                        </div>
                    </a>
                    <a id="btnDeleteProduct" class="disabled">
                        <div class="btn-abm">
                            <i class="fa-solid fa-trash"></i>
                        </div>
                    </a>
                </div>
            </div>
            <div class="col-lg-9">
                <div class="table-options">
                    
                    <input id="searchTerm" type="text" placeholder="Buscar producto" onkeyup="doSearch()" />
                    <select class="filter-list" name="filter" id="filter" onchange="orderProductByPromo();">
                        <option selected hidden value="">Filtrar</option>
                        <option value="Si">Promocionado</option>
                        <option value="No">No Promocionado</option>
                    </select>
                </div>
                <div class="table-frame">
                    <table class="table table-dark table-hover">
                        <thead class="sticky-top">
                            <tr>
                                <th onclick="sortTable(0, 'str')" class="user-select-none first-in-table" scope="col">Nombre del producto</th>
                                <th onclick="sortTable(1, 'str')" class="user-select-none" scope="col">Categoría</th>
                                <th onclick="sortTable(2, 'int')" class="user-select-none" scope="col">Precio $</th>
                                <th onclick="sortTable(3, 'str')" class="user-select-none" scope="col">Promo</th>
                                <th class="user-select-none" scope="col">Detalle</th>
                            </tr>
                        </thead>
                        <tbody id="datos">
                            <?php
                            require "../src/modules/products/abm-productos.php";
                            echo getProductsTableData();
                            ?>
                        </tbody>
                    </table>
                </div>
            </div>
            <!-- Modal ABM -->
            <div class="modal fade" id="moddalProducts" tabindex="-1" aria-labelledby="ProductsModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div id="modalContent" class="modal-content">
                        <div class="modal-header">
                            <h2 class="modal-title fs-5" id="ProductsModalLabel"></h2>
                            <button id="btnCloseModal" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="formAbmProduct" class="form-abm" action="" method="post" enctype="multipart/form-data">
                                <input id="nombre" type="text" name="nombre" placeholder="Nombre" required autocomplete="off">
                                <select name="categoria" id="categoria" required>
                                    <option selected hidden value="" disabled>Categoría</option>
                                    <?php
                                    $options = getOptionsCategoriesHTML();
                                    echo $options;
                                    ?>
                                </select>
                                
                                <label id="uploadLabel" for="btnUploadImage">Seleccionar imagen</label>
                                <input id="btnUploadImage" type="file" name="imagen" accept="image/*" required>

                                <input id="precio" class="precio" type="number" name="precio" placeholder="Precio" required>
                                <textarea name="descripcion" id="descripcion" placeholder="Descripción" required autocomplete="off"></textarea>
                                <label id="errorMessageModal"></label>

                                <div class="buttons">
                                    <button id="btnCancelModal" type="button" data-bs-dismiss="modal" aria-label="Close">CANCELAR</button>
                                    <button id="btnSubmitModal" type="submit" disabled>ACEPTAR</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Modal detalle -->
            <div class="modal fade" id="moddalProductsDetail" tabindex="-1" aria-labelledby="ProductsModalDetailLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div id="modalContentDetail" class="modal-content">
                        <div class="modal-header">
                            <h2 class="modal-title fs-5" id="ProductsModalDetailLabel"></h2>
                            <button id="btnCloseModal" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                        </div>
                    </div>
                </div>
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
    <script src="../js/abm-productos.js"></script>


</body>

</html>