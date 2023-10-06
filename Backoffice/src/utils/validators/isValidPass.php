<?php

function isValidPass(string $var): bool
{
    $lowerCase = "/[a-z]+/";
    $upperCase = "/[A-Z]+/";
    $number = "/[0-9]+/";

    return
        strlen($var) >= 8 &&
        strlen($var) <= 255 &&
        preg_match($lowerCase, $var) &&
        preg_match($upperCase, $var) &&
        preg_match($number, $var) ? true : false;
}
