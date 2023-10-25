<?php
require realpath(dirname(__FILE__)) . "/../../repository/users.repository.php";
require realpath(dirname(__FILE__)) . "/../../utils/actions.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $id = $_POST['id'];
    $status = $_POST['status'];
    $action = $_POST['action'];

    if ($id === "checkAdmin") $id = 1;
    if ($id === "checkVendedor") $id = 2;

    $data = array(
        "rolId" => $id,
        "accion" => $actions[$action],
        "activo" =>  $status == 'true' ? 1 : 0
    );
    updateOnePermission($data);
}

function getAllPermissionsDataTableHTML(): string
{
    require realpath(dirname(__FILE__)) . "/../../utils/actions.php";
    $permissions = findAllPermissions();
    $totalOfPermissions = count($permissions);
    $data = "";
    for ($i = 0; $i < $totalOfPermissions; $i++) {
        $settedStatusAdmin = findStatusByActionAndRolesId($permissions[$i]["accion"], 1);
        $settedStatusVendedor = findStatusByActionAndRolesId($permissions[$i]["accion"], 2);

        $settedStatusAdmin ? $activeAdmin = 'checked' : $activeAdmin = '';
        $settedStatusVendedor ? $activeVendedor = 'checked' : $activeVendedor = '';

        $data .= '<tr id=' . array_search($permissions[$i]["accion"], $actions) . ' class="user-select-none table-row align-middle">
                    <td class="first-in-table">' . $permissions[$i]["accion"] . '</td>
                    <td>' . $permissions[$i]["ruta"] . '</td>
                    <td>
                        <input type="checkbox" class="chkbox" ' . $activeAdmin . ' name="checkbox" id="checkAdmin">
                    </td>
                    <td>
                        <input type="checkbox"  class="chkbox" ' . $activeVendedor . ' name="checkbox" id="checkVendedor">
                    </td>
                </tr>';
    }
    return $data;
}
