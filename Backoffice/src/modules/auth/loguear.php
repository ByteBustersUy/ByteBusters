<?php
require '../../utils/validators/hasData.php';
if (!$_POST) {
    header("Location:../../../index.php");
    exit;
}

$userCi = $_POST['ci'];
$pass = $_POST['pass'];

if (!hasData($userCi) || !hasData($pass)) {
    header("Location:../../../index.php");
    exit;
}

$userCi = htmlspecialchars($userCi);
$userCi = trim($userCi);
$pass = htmlspecialchars($pass);

$reg = login($userCi, $pass);
$roles = findRoles($reg['ci']);


$hashedPass = $reg['pass'];

if (passVerify($pass, $hashedPass)) {
    session_status() === PHP_SESSION_ACTIVE ?: session_start();
    $_SESSION['userName'] = $reg['nombre'] . ' ' . $reg['apellido'];
    $_SESSION['userCi'] = $reg['ci'];
    $_SESSION['userRolesIds'] = $roles[0];
    $_SESSION['userRolesName'] = $roles[1];

    if (!hasData($_SESSION['userRolesName'])) {
        //error. usuario no tiene rol asignado
    }
} else {
    session_destroy();
}

header("Location:../../../index.php");
exit;


function login(string $userCi, string $pass): array
{
    require_once '../../utils/validators/isValidPass.php';
    require_once '../../utils/validators/isValidUserCi.php';
    require_once '../../repository/users.repository.php';
    include_once '../../utils/messages/msg.php';

    if (!isValidUserCi($userCi) || !isValidPass($pass)) {
        header("Location:../../../index.php");
        exit;
    }

    $reg = findOneUser($userCi);

    if (!$reg) {
        header("Location:../../../index.php");
        exit;
    }

    return $reg;
}

function passVerify(string $pass, string $hashedPass): bool
{
    return password_verify($pass, $hashedPass);
}
