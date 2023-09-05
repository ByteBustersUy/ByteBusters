<?php
require realpath(dirname(__FILE__)) . "/../../repository/users.repository.php";

function getAllPermissionsDataTableHTML(): string
{
    $permissions = findAllPermissions();
    $totalOfPermissions = count($permissions);

    $data = "";
    for ($i = 0; $i < $totalOfPermissions; $i++) {
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
    return $data;
}
