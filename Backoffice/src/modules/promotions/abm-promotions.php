<?php
require realpath(dirname(__FILE__)) . '/../../repository/promotions.repository.php';

function getCurrentPromos() {
    return findAllDiscounts();
}

function showAllPromotionCards(): string {
    $promoCard = '';
    foreach (getCurrentPromos() as $discount){
        $promoCard .= '<div class="col-lg-3">
                        <a href="">
                            <div class="card-promo">
                                <div class="card-buttons">
                                    <button class="btn"><i class="fa-solid fa-pen"></i></button>
                                    <button class="btn"><i class="fa-solid fa-trash"></i></button>
                                </div>
                            <h2 class="promo-title">'.$discount.'%</h2>
                            </div>
                        </a>
                    </div>';
    }
    return $promoCard;
}
