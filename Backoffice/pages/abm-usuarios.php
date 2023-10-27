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
        <h1>GESTIÓN DE USUARIOS</h1>
    </div>
    <div class="container frame">
        <div class="row">
            <div class="col-lg-2 ">
                <div class="items">
                    <a id="btnAddUser" data-bs-toggle="modal" data-bs-target="#moddalUsers">
                        <div class="btn-abm">
                            <i class="fa-solid fa-square-plus"></i>
                        </div>
                    </a>
                    <a id="btnEditUser" class="disabled">
                        <div class="btn-abm">
                            <i class="fa-solid fa-pen"></i>
                        </div>
                    </a>
                    <a id="btnDeleteUser" class="disabled">
                        <div class="btn-abm">
                            <i class="fa-solid fa-trash"></i>
                        </div>
                    </a>
                </div>
            </div>
            <div class="col-lg-9">
                <div class="table-options">
                <input id="searchTerm" type="text" placeholder="Buscar usuario" onkeyup="doSearch()" />
                    <select class="filter-list" name="filter" id="filter" onchange="filterUserByRol();">
                        <option selected hidden value="">Roles</option>
                        <option value="|">Todos</option>
                        <option value="admin">Administradores</option>
                        <option value="vendedor">Vendedores</option>
                    </select>
                </div>
                <div class="table-frame">
                    <table class="table table-dark table-hover">
                        <thead class="sticky-top">
                            <tr>
                                <th onclick="sortTable(0, 'str')" class="user-select-none first-in-table" scope="col">Nombre completo</th>
                                <th onclick="sortTable(1, 'int')" class="user-select-none" scope="col">Cédula</th>
                                <th onclick="sortTable(2, 'str')" class="user-select-none" scope="col">Email</th>
                                <th onclick="sortTable(3, 'str')" class="user-select-none" scope="col">Roles</th>
                            </tr>
                        </thead>
                        <tbody id="bodyUsersTable">
                            <?php
                            require "../src/modules/users/abm-usuarios.php";
                            echo getUsersTableDataHTML();
                            ?>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="col-lg-1">
            </div>
        </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="moddalUsers" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div id="modalContent" class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title fs-5" id="exampleModalLabel"></h2>
                    <button id="btnCloseModal" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="formAbmUser" class="form-abm" action="" method="post">
                        <input id="nombre" type="text" name="nombre" placeholder="Primer nombre" required autocomplete="off">
                        <input id="apellido" type="text" name="apellido" placeholder="Apellidos" required autocomplete="off">
                        <input id="cedula" type="text" name="cedula" placeholder="Cédula de identidad" required autocomplete="off">
                        <input id="email" type="text" name="email" placeholder="Email" required autocomplete="off">
                        <input id="contrasenia" type="text" name="contrasenia" placeholder="Contraseña" required autocomplete="off">
                        <div class="d-flex center">
                            <div class="chkbox-div">
                                <label class="chkbox-labels" for="check-admin">Administrador</label>
                                <input class="chkbox" type="checkbox" name="check-admin" id="check-admin" value="1">
                            </div>
                            <div class="chkbox-div">
                                <label class="chkbox-labels" for="check-vendedor">Vendedor</label>
                                <input class="chkbox" type="checkbox" name="check-vendedor" id="check-vendedor" value="2">
                            </div>
                        </div>
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
    <footer>
        <?php
        require "./components/footer.php";
        echo $footer;
        ?>
    </footer>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>
    <script src="../js/abm-usuarios.js"></script>
</body>

</html>