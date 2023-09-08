<?php
require realpath(dirname(__FILE__)) . "/../../repository/users.repository.php";

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
        $data .= '<tr id=' . array_search($permissions[$i]["accion"], $actions) . ' class="user-select-none align-middle">
                    <td class="first-in-table">' . $permissions[$i]["accion"] . '</td>
                    <td>' . $permissions[$i]["ruta"] . '</td>
                    <td>
                        <input type="checkbox" class="chkbox-roles" ' . $activeAdmin . ' name="checkAdmin" id="checkAdmin">
                    </td>
                    <td>
                        <input type="checkbox"  class="chkbox-roles" ' . $activeVendedor . ' name="checkVendedor" id="checkVendedor">
                    </td>
                </tr>';
    }
    return $data;
}
