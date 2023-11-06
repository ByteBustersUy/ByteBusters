
<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $banner1 = $_FILES['banneruno'];
    $banner2 = $_FILES['bannerdos'];
    $banner3 = $_FILES['bannertres'];
    $banner4 = $_FILES['bannercuatro'];

    $nombreBanner = array(
        1    => "banneruno.png",
        2    => "bannerdos.png",
        3    => "bannertres.png",
        4    => "bannercuatro.png",
    );

        $destinoBanner = "../../../../Ecommerce/assets/" . $nombreBanner[1];
        $fileTmpPath = $_FILES['banneruno']['tmp_name'];
        if (move_uploaded_file($fileTmpPath, $destinoBanner)) {
            echo "Fue guardado el banner uno";
        } else {
            echo "Error banner uno";
        }

        $destinoBanner = "../../../../Ecommerce/assets/" . $nombreBanner[2];
        $fileTmpPath = $_FILES['bannerdos']['tmp_name'];
        if (move_uploaded_file($fileTmpPath, $destinoBanner)) {
            echo "Fue guardado el banner dos";
        } else {
            echo "Error banner dos";
        }

        $destinoBanner = "../../../../Ecommerce/assets/" . $nombreBanner[3];
        $fileTmpPath = $_FILES['bannertres']['tmp_name'];
        if (move_uploaded_file($fileTmpPath, $destinoBanner)) {
            echo "Fue guardado el banner tres";
        } else {
            echo "Error banner tres";
        }
        $destinoBanner = "../../../../Ecommerce/assets/" . $nombreBanner[4];
        $fileTmpPath = $_FILES['bannercuatro']['tmp_name'];
        if (move_uploaded_file($fileTmpPath, $destinoBanner)) {
            echo "Fue guardado el banner cuatro";
        } else {
            echo "Error banner cuatro";
        }
    }

?>