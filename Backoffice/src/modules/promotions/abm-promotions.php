<?php
require realpath(dirname(__FILE__)) . '/../../repository/promotions.repository.php';
require realpath(dirname(__FILE__)) . "/../../utils/validators/hasData.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    session_status() === PHP_SESSION_ACTIVE ?: session_start();

    $descuento = htmlspecialchars($_POST['descuento']);
    $fechaInicio = htmlspecialchars($_POST['fechaInicio']);
    $fechaFin = htmlspecialchars($_POST['fechaFin']);

    if (!elementsHasData([$descuento, $fechaInicio, $fechaFin])) {
        die("ERROR: " . $error_messages['!form_data']);
    }

    $newPromo = createNewPromo($descuento, $fechaInicio, $fechaFin);
    if ($newPromo) {
        header("Location:../../../pages/abm-promociones.php");
    }
}

function getAllPromotionCards(): string
{
    $promoCard = '';
    foreach (findAllPromos() as $promo) {
        checkExpiredPromo($promo);
        $disabled = '';

        if ($promo['vigente'] == 0) {
            $disabled = 'expired-promo';
        }

        $promoCard .= '<div class="col-lg-3">
                        <a href="">
                            <div class="card-promo ' . $disabled . '">
                                <div class="card-buttons">
                                    <button class="btn"><i class="fa-solid fa-trash"></i></button>
                                </div>
                                <div class="promo-content">
                                    <h2>' . $promo['descuento'] . '%</h2>
                                    <div class="promo-dates">
                                        <span>Desde: ' . formatDates($promo['fechaInicio']) . '</span>
                                        <br>
                                        <span>Hasta: ' . formatDates($promo['fechaFin']) . '</span>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>';
    }
    return $promoCard;
}

function formatDates(string $date): string
{
    $explodedDate = explode('-', $date);
    $year = $explodedDate[0];
    $month = $explodedDate[1];
    $day = $explodedDate[2];
    return $day . '/' . $month . '/' . $year;
}

function createNewPromo($descuento, $fechaInicio, $fechaFin): bool
{
    require realpath(dirname(__FILE__)) . "/../../utils/messages/msg.php";

    if ($descuento < 1 || $descuento > 99) {
        die("ERROR: " . $error_messages['!valid_promo']);
    }

    $existentPromo = findOnePromo($descuento);

    if ($existentPromo) {
        die("ERROR: " . $error_messages['exist_promo']);
    }

    $now = getLocalDate();

    if ($fechaInicio < $now) {
        die("ERROR: " . $error_messages['!valid_fechaInicio']);
    }

    if ($fechaFin < $fechaInicio) {
        die("ERROR: " . $error_messages['!valid_fechaFin']);
    }

    saveOnePromotion($descuento, $fechaInicio, $fechaFin);
    return true;
}


function getLocalDate(): string
{
    date_default_timezone_set('America/Montevideo');
    return date("Y-m-d");
}

function checkExpiredPromo(array $promo)
{
    $now = getLocalDate();
    if ($promo["fechaFin"] < $now) {
        updateOnePromo($promo["descuento"]);
    }
}
