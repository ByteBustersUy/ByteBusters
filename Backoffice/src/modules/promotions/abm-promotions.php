<?php
require realpath(dirname(__FILE__)) . '/../../repository/promotions.repository.php';
require_once realpath(dirname(__FILE__)) . "/../../utils/validators/hasData.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    session_status() === PHP_SESSION_ACTIVE ?: session_start();
    if (isset($_GET['action']) && isset($_POST['id'])) {

        switch ($_GET['action']) {
            case "delete":
                deletePromotion($_POST['id']);
                break;
            default:
                return http_response_code(500);
        }
    }

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

function getPromotionsHtml()
{
    $promotions = findActiveAndValidPromos();
    $options = '';
    foreach ($promotions as $promo) {
        $options .= '<option value="' . $promo['id'] . '">' . $promo['descuento'] . '%</option>';
    }
    return $options;
}

function getAllPromotionCards(): string
{
    $promoCard = '';
    foreach (findAllPromos(true) as $promo) {
        checkExpiredPromo($promo);
        $promoClass = '';
        $promoStatus = '';
        $colorDiscount = '';

        if ($promo['vigente'] == 0) {
            $promoClass = ' expired-promo';
            $promoStatus = '<div class="promo-status">
                                <h3 class="lbl-expirado">Expirado</h3>
                            </div>';
            $colorDiscount = 'expired-discount';
        } else {
            $promoClass = 'valid-promo';
            $promoStatus = '<div class="promo-status">
                                <h3 class="lbl-vigente">Vigente</h3>
                            </div>';
            $colorDiscount = '';
        }

        $promoCard .= '<div class="col-sm-6 col-md-4 col-lg-3">
                        <a href="#">
                            <div class="card-promo ' . $promoClass . '">
                                <div class="card-buttons">
                                    <button id="' . $promo["id"] . '" class="btn deletePromo"><i class="fa-solid fa-trash"></i></button>
                                </div>
                                ' . $promoStatus . '
                                <div class="promo-content">
                                    <h2 class="' . $colorDiscount . '">' . $promo['descuento'] . '%</h2>
                                    <div class="promo-dates">
                                    <span>' . formatDates($promo['fechaInicio']) . ' - ' . formatDates($promo['fechaFin']) . '</span>
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

    $existentPromo = findExistentPromo($descuento, $fechaInicio, $fechaFin, 1);

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
        updatePromoToExpired($promo["id"]);
    }
}

function deletePromotion($id): bool
{
    return deletePromo($id);
}
