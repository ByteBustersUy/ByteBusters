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
            require "./components/options.php";
            echo $options;
            ?>
        </div>
        <?php
        require "./components/userName.php";
        echo $userName;
        ?>
        <h1>MODIFICAR BANNER</h1>
    </div>
    <form action="../src/modules/settings/bannersubm.php" method="post" enctype="multipart/form-data">
        <div class="container text-center mt-5">
            <div class="row ecommerce-images-config">
                <div class="col-12 col-md-6">
                    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img src="../../Ecommerce/assets/banneruno.png" class="d-block w-100" alt="...">
                            </div>
                            <div class="carousel-item">
                                <img src="../../Ecommerce/assets/bannerdos.png" class="d-block w-100" alt="...">
                            </div>
                            <div class="carousel-item">
                                <img src="../../Ecommerce/assets/bannertres.png" class="d-block w-100" alt="...">
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                            <!-- <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span> -->
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                            <!-- <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span> -->
                        </button>
                    </div>
                    <div class="btn-group-horizontal w-75 m-auto" role="group" aria-label="Vertical button group">
                        <div class="mt-5 mb-5">
                            <label for="formFile" class="form-label">Seleccionar primer banner</label>
                            <input class="form-control" type="file" id="formFile" name="banneruno" accept="image/*">
                        </div>
                      <div class="mt-5 mb-5">
                        <label for="formFile" class="form-label">Seleccionar segundo banner</label>
                        <input class="form-control" type="file" id="formFile" name="bannerdos">
                    </div>
                    <div class="mt-5 mb-5">
                        <label for="formFile" class="form-label">Seleccionar tercer banner</label>
                        <input class="form-control" type="file" id="formFile" name="bannertres">
                    </div>
                    <div class="mt-5 mb-5">
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-6" style="margin-bottom: 10rem;">
                <div class="banner">
                    <img src="../../Ecommerce/assets/bannercuatro.png" class="d-block w-100" alt="...">
                </div>
                <div class="btn-group-horizontal w-75 m-auto" role="group" aria-label="Vertical button group">
                    <div class="mt-5 mb-5">
                        <label for="formFile" class="form-label">Imagen para banner:</label>
                        <input class="form-control" type="file" id="formFile" name="bannercuatro">
                    </div>
                </div>
                        <div class="d-block w-50 m-auto">
                            <input class="form-control mt-2" type="submit" id="formFile">
                            <input class="form-control mt-2" type="reset" id="formFile">
                        </div>
                    </div>
                </div>
            </div>
    </form>
    <footer>
        <?php
        require "./components/footer.php";
        echo $footer;
        ?>
    </footer>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>
    <script src="../js/abm-permisos.js"></script>
</body>

</html>