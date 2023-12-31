<?php

function findOneUser(string $ci): array
{
    require realpath(dirname(__FILE__)) . "/../db/conexion.php";
    try {
        $statement = $con->prepare("SELECT * FROM USUARIOS WHERE ci = :ci AND activo = :isActive");
        $statement->execute(array(':ci' => $ci, ":isActive" => 1));
        $reg = $statement->fetch(PDO::FETCH_ASSOC);

        return $reg ? $reg : [];
    } catch (Exception $e) {
        $con->close();
        die("ERROR SQL in findOneUser(): " . $e->getMessage());
    }
}

function findAllUsers(string $searchValue = ""): array
{
    require realpath(dirname(__FILE__)) . "/../db/conexion.php";
    try {
        $statement = $con->prepare("SELECT * FROM USUARIOS WHERE activo = :isActive AND nombre LIKE '%$searchValue%' ORDER BY nombre ASC");
        $statement->execute(array(":isActive" => 1));
        $reg = $statement->fetchAll(PDO::FETCH_ASSOC);

        return $reg ? $reg : [];
    } catch (Exception $e) {
        $con->close();
        die("ERROR SQL in findAllUsers(): " . $e->getMessage());
    }
}

function findRoles(string $ci): array
{
    require realpath(dirname(__FILE__)) . "/../db/conexion.php";
    try {
        $statement = $con->prepare("SELECT id, nombreRol
                                    FROM USUARIOS_has_ROLES ur
                                    JOIN ROLES r 
                                    ON r.id = ur.ROLES_id
                                    WHERE ur.USUARIOS_ci = :ci");
        $statement->execute(array(':ci' => $ci));

        $rolNamesList = [];
        $rolesIdsList = [];
        while ($reg = $statement->fetch(PDO::FETCH_ASSOC)) {
            if ($reg) {
                array_push($rolesIdsList, $reg['id']);
                array_push($rolNamesList, $reg['nombreRol']);
            }
        }

        return [$rolesIdsList, $rolNamesList];
    } catch (Exception $e) {
        $con->close();
        die("ERROR SQL in findRoles(): " . $e->getMessage());
    }
}

function findStatusByActionAndRolesId(string $action, int $rolId): bool
{
    require realpath(dirname(__FILE__)) . "/../db/conexion.php";
    try {
        $statement = $con->prepare("SELECT activo
                                    FROM ROLES_has_PERMISOS 
                                    WHERE PERMISOS_accion = :accion AND ROLES_id = :rolId");
        $statement->execute(array(':accion' => $action, ':rolId' => $rolId));
        $reg = $statement->fetch(PDO::FETCH_ASSOC);

        return $reg["activo"] ? true : false;
    } catch (Exception $e) {
        $con->close();
        die("ERROR SQL in findStatusByActionAndRolesId(): " . $e->getMessage());
    }
}

function findPathByAction(string $action, array $rolesId): string
{
    require realpath(dirname(__FILE__)) . "/../db/conexion.php";
    try {
        $statement = $con->prepare("SELECT p.ruta, rp.ROLES_id
                                    FROM PERMISOS p
                                    JOIN ROLES_has_PERMISOS rp
                                    ON p.accion = rp.PERMISOS_accion
                                    WHERE p.accion = :accion");
        $statement->execute(array(':accion' => $action));
        $reg = $statement->fetchAll(PDO::FETCH_ASSOC);

        $isValidRol = false;
        foreach ($reg as $registro) {
            foreach ($rolesId as $rolId) {
                if ($rolId == $registro["ROLES_id"]) {
                    $isValidRol = true;
                }
            }
        }

        return $registro['ruta'] && $isValidRol ? $registro['ruta'] : '';
    } catch (Exception $e) {
        $con->close();
        die("ERROR SQL in findPathByAction(): " . $e->getMessage());
    }
}

function findActionsByRolesId(array $rolesId): array
{
    require realpath(dirname(__FILE__)) . "/../db/conexion.php";
    $actions = [];
    foreach ($rolesId as $rolId) {
        try {
            $statement = $con->prepare(
                "SELECT p.accion 
                FROM ROLES_has_PERMISOS rp
                JOIN PERMISOS p ON rp.PERMISOS_accion = p.accion
                WHERE rp.ROLES_id = :rolId
                AND activo = 1"
            );
            $statement->execute(array(':rolId' => $rolId));
            while ($reg = $statement->fetch(PDO::FETCH_ASSOC)) {
                array_push($actions, $reg['accion']);
            }
        } catch (Exception $e) {
            $con->close();
            die("ERROR SQL in findActionsByRolesId(): " . $e->getMessage());
        }
    }
    return $actions;
}

function saveOneUser(array $newUser): bool
{
    require realpath(dirname(__FILE__)) . "/../db/conexion.php";
    require realpath(dirname(__FILE__)) . "/../utils/messages/msg.php";
    try {
        $statement = $con->prepare("INSERT INTO USUARIOS (nombre,apellido,ci,email,pass) VALUES (:nombre, :apellido, :ci, :email, :pass)");
        $res = $statement->execute([
            ':nombre' => $newUser['nombre'],
            ':apellido' => $newUser['apellido'],
            ':ci' => $newUser['cedula'],
            ':email' => $newUser['email'],
            ':pass' => $newUser['pass']
        ]);

        if ($res == 1) {
            $statement = $con->prepare("INSERT INTO USUARIOS_has_ROLES (USUARIOS_ci,ROLES_id) VALUES (:ci, :rolId)");
            foreach ($newUser['rolesId'] as $rolId) {
                $statement->execute(array(':ci' => $newUser['cedula'], ':rolId' => $rolId));
            }
        } else {
            die("ERROR: " . $error_messages['!user_add']);
        }

        return true;
    } catch (Exception $e) {
        $con->close();
        echo ("ERROR SQL in saveOneUser(): " . $e->getMessage());
        return false;
    }
}

function updateOneUser(array $newUser): bool
{
    require realpath(dirname(__FILE__)) . "/../db/conexion.php";
    require realpath(dirname(__FILE__)) . "/../utils/messages/msg.php";
    try {
        $statement = $con->prepare("UPDATE USUARIOS
                                    SET nombre = :nombre,
                                    apellido = :apellido,
                                    email = :email
                                    WHERE ci = :ci
                                    AND activo = :isActive");
        $res = $statement->execute([
            ':nombre' => $newUser['nombre'],
            ':apellido' => $newUser['apellido'],
            ':email' => $newUser['email'],
            ':ci' => $newUser['cedula'],
            ':isActive' => 1,
        ]);

        if ($res == 1 && $newUser['cedula'] !== $_SESSION['userCi']) {
            $statement = $con->prepare("DELETE FROM USUARIOS_has_ROLES WHERE USUARIOS_ci = :ci");
            $res = $statement->execute([':ci' => $newUser['cedula']]);

            $statement = $con->prepare("INSERT INTO USUARIOS_has_ROLES (USUARIOS_ci,ROLES_id) VALUES (:ci, :rolId)");
            foreach ($newUser['rolesId'] as $rolId) {
                $statement->execute(array(':ci' => $newUser['cedula'], ':rolId' => $rolId));
            }
        }

        return true;
    } catch (Exception $e) {
        $con->close();
        echo ("ERROR SQL in updateOneUser(): " . $e->getMessage());
        return false;
    }
}

function deleteUser(string $userCi)
{
    require realpath(dirname(__FILE__)) . "/../db/conexion.php";

    try {
        $statement = $con->prepare("UPDATE USUARIOS
                                    SET activo = :isActive
                                    WHERE ci = :ci ");
        $res = $statement->execute([":ci" => $userCi, "isActive" => 0]);

        return $res;
    } catch (Exception $e) {
        $con->close();
        die("ERROR SQL in deleteUser(): " . $e->getMessage());
    }
}

function findAllPermissions(): array
{
    require realpath(dirname(__FILE__)) . "/../db/conexion.php";
    try {
        $statement = $con->query("SELECT * FROM PERMISOS ORDER BY accion DESC");
        $reg = $statement->fetchAll(PDO::FETCH_ASSOC);

        return $reg ? $reg : [];
    } catch (Exception $e) {
        $con->close();
        die("ERROR SQL in findAllPermissions(): " . $e->getMessage());
    }
}

function updateOnePermission(array $data)
{
    require realpath(dirname(__FILE__)) . "/../db/conexion.php";
    require realpath(dirname(__FILE__)) . "/../utils/actions.php";
    if ($data["accion"] !== "Gestionar permisos de usuario") {
        try {
            $statement = $con->prepare("UPDATE ROLES_has_PERMISOS SET activo = :isActive WHERE ROLES_id = :rolId AND PERMISOS_accion = :accion");
            $res = $statement->execute([":isActive" => $data['activo'], ":rolId" => $data['rolId'], ":accion" => $data["accion"]]);

            return $res;
        } catch (Exception $e) {
            $con->close();
            die("ERROR SQL in updateOnePermission(): " . $e->getMessage());
        }
    }
}
