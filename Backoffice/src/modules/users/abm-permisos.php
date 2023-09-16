<?php
require realpath(dirname(__FILE__)) . "/../../repository/users.repository.php";
require realpath(dirname(__FILE__)) . "/../../utils/actions.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if(isset($_POST['data'])){
        $permissionData = $_POST['data'];
        if ($permissionData->id === "checkAdmin") $permissionData->id = 1;
        if ($permissionData->id === "checkVendedor") $permissionData->id = 2;
    
        $data = array(
            "rolId" => $permissionData->id,
            "accion" => $actions[$permissionData->action],
            "activo" =>  $permissionData->status === true ? 1 : 0
            );
        updateOnePermission($data);
    }
}

function getAllPermissionsDataTableHTML(): string
{
    require realpath(dirname(__FILE__)) . "/../../utils/actions.php";
    $permissions = findAllPermissions();
    $totalOfPermissions = count($permissions);
    $data = "";

    for ($i = 0; $i < $totalOfPermissions; $i++) {
        $settedRolesId = findRolesIdByAction($permissions[$i]["accion"]);
        $activeAdmin = '';
        $activeVendedor = '';

        foreach ($settedRolesId as $rolId) {
            if (implode($rolId) == '1') {
                $activeAdmin = 'checked';
            } else if (implode($rolId) == '2') {
                $activeVendedor = 'checked';
            }
        }
        $data .= '<tr id=' . array_search($permissions[$i]["accion"], $actions) . ' class="user-select-none table-row align-middle">
                    <td class="first-in-table">' . $permissions[$i]["accion"] . '</td>
                    <td>' . $permissions[$i]["ruta"] . '</td>
                    <td id="1">
                        <input type="checkbox" class="chkbox-roles" ' . $activeAdmin . ' name="checkbox" id="checkAdmin">
                    </td>
                    <td>
                        <input type="checkbox"  class="chkbox-roles" ' . $activeVendedor . ' name="checkbox" id="checkVendedor">
                    </td>
                </tr>';
    }
    return $data;
}
