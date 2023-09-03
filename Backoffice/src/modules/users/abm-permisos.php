<?php
require realpath(dirname(__FILE__)) . "/../../repository/users.repository.php";

function getAllPermissionsDataTableHTML()
{
    $permissions = findAllPermissions();
    $totalOfPermissions = count($permissions);

    $data = "";
    $rolesId = "";
    for ($i = 0; $i < $totalOfPermissions; $i++) {
        $rolesId .= findAllRolesWithPermissions($permissions[$i]["accion"]);
        $data .= '<tr class="user-select-none align-middle">
                    <td class="first-in-table">' . $permissions[$i]["accion"] . '</td>
                    <td>' . $permissions[$i]["ruta"] . '</td>
                    <td>
                        <input type="checkbox" class="chkbox-roles" name="checkAdmin" id="checkAdmin">
                    </td>
                    <td>
                    <input type="checkbox"  class="chkbox-roles" name="checkVendedor" id="checkVendedor">
                    </td>
                </tr>';
    }
    echo $rolesId;
    return $data;
}
