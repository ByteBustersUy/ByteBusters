DROP DATABASE IF EXISTS bytebusters2_db;
/* 
----------------------
---  BASE DE DATOS ---
--- bytebusters2_db ---
----------------------
 



agregar productos y categorias,


*/


CREATE DATABASE IF NOT EXISTS bytebusters2_db;




/*
----------------------
---- TABLA  ROLES ----
----------------------
*/

CREATE TABLE IF NOT EXISTS `bytebusters2_db`.`ROLES` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombreRol` varchar(45) NOT NULL,
  PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


/*
-------------------------
---- TABLA  PERMISOS ----
-------------------------
*/

CREATE TABLE IF NOT EXISTS `bytebusters2_db`.`PERMISOS` (
  `ruta` varchar(255) NOT NULL,
  `accion` varchar(45) NOT NULL,
   PRIMARY KEY(`accion`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*
------------------------------
-- TABLA ROLES has PERMISOS --
------------------------------
*/
CREATE TABLE IF NOT EXISTS `bytebusters2_db`.`ROLES_has_PERMISOS`( 
 `PERMISOS_accion` varchar(255) NOT NULL,
 `ROLES_id` int(11) NOT NULL,
  `activo` boolean NOT NULL,
 PRIMARY KEY (`ROLES_id`,`PERMISOS_accion`),
 FOREIGN KEY(`ROLES_id`)
 REFERENCES `bytebusters2_db`.`ROLES`(`id`),
 FOREIGN KEY(`PERMISOS_accion`)
 REFERENCES `bytebusters2_db`.`PERMISOS`(`accion`) 
 )ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*
----------------------
--- TABLA USUARIOS ---
----------------------
*/

CREATE TABLE IF NOT EXISTS `bytebusters2_db`.`USUARIOS` (
  `ci` varchar(8) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `activo` boolean NOT NULL DEFAULT 1,
  PRIMARY KEY(`ci`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


/*
----------------------
-- TABLA DE EMPRESA --
----------------------
*/
CREATE TABLE IF NOT EXISTS `bytebusters2_db`.`EMPRESA`(
  `logo` varchar(255) NOT NULL,
  `rubro` varchar(45) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `calle` varchar(45) NOT NULL,
  `numero` int(11) NOT NULL,
  `ciudad` varchar(45) NOT NULL,
  `telefono` varchar(45) NOT NULL,
  `instagram` varchar(255) NOT NULL,
  `whatsapp` varchar(255) NOT NULL,
  `email` varchar(45) NOT NULL,
  `pwd_email` varchar(255) NOT NULL,
  `comentarios` varchar(255) NOT NULL,
  `usuario_ci` varchar(8) ,
  `fecha` TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,  
  PRIMARY KEY(`nombre`),
  FOREIGN KEY(`usuario_ci`)
 REFERENCES `bytebusters2_db`.`USUARIOS`(`ci`) 
  
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


/*
----------------------------
--TABLA USUARIOS has ROLES--
----------------------------
*/

CREATE TABLE IF NOT EXISTS `bytebusters2_db`.`USUARIOS_has_ROLES` (
  `USUARIOS_ci` varchar(15) NOT NULL,
  `ROLES_id` int(11) NOT NULL,
  PRIMARY KEY(`USUARIOS_ci`,`ROLES_id`),
  FOREIGN KEY(`USUARIOS_ci`)
  	REFERENCES `bytebusters2_db`.`USUARIOS`(`ci`),
  FOREIGN KEY(`ROLES_id`)
   	REFERENCES `bytebusters2_db`.`ROLES`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


/*
-----------------------
--- TABLA PRODUCTOS ---
-----------------------
*/
CREATE TABLE IF NOT EXISTS `bytebusters2_db`.`PRODUCTOS`(
  `id` int (11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `imagen` varchar(255) NOT NULL,
  `precio` decimal NOT NULL,
  `usuario_ci` varchar(8),
  `fecha` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, 
  `activo` boolean NOT NULL DEFAULT 1,
  PRIMARY KEY(`id`),
  FOREIGN KEY(`usuario_ci`)
  REFERENCES `bytebusters2_db`.`USUARIOS`(`ci`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


/*
----------------------
-- TABLA CATEGORIAS --
----------------------
*/
CREATE TABLE IF NOT EXISTS `bytebusters2_db`.`CATEGORIAS`(
  `id` int (11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  PRIMARY KEY(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


/*
----------------------------------
--TABLA PRODUCTOS has CATEGORIAS--
----------------------------------
*/
CREATE TABLE IF NOT EXISTS `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (
  `PRODUCTOS_id` int(11) NOT NULL,
  `CATEGORIAS_id` int(11)NOT NULL,
   PRIMARY KEY(`PRODUCTOS_id`,`CATEGORIAS_id`),
  FOREIGN KEY(`PRODUCTOS_id`)
  	REFERENCES `bytebusters2_db`.`PRODUCTOS`(`id`),
  FOREIGN KEY(`CATEGORIAS_id`)
   	REFERENCES `bytebusters2_db`.`CATEGORIAS`(`id`)
	
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


/*
-------------------------
--- TABLA PROMOCIONES ---
-------------------------
*/
CREATE TABLE IF NOT EXISTS `bytebusters2_db`.`PROMOCIONES`(
  `id` int (11) NOT NULL AUTO_INCREMENT,
  `descuento` int NOT NULL,
  `fechaInicio` date NOT NULL,
  `fechaFin` date NOT NULL,
  `vigente` boolean NOT NULL DEFAULT 1,
  `activo` boolean NOT NULL DEFAULT 1,
 PRIMARY KEY(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*
----------------------------------
--TABLA PRODUCTOS has PROMOCIONES--
----------------------------------
*/
CREATE TABLE IF NOT EXISTS `bytebusters2_db`.`PRODUCTOS_has_PROMOCIONES` (
  `PRODUCTOS_id` int(11) NOT NULL,
  `PROMOCIONES_id` int(11) NOT NULL,
  `fecha` date DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY(`PRODUCTOS_id`,`PROMOCIONES_id`),
  FOREIGN KEY(`PRODUCTOS_id`)
    REFERENCES `bytebusters2_db`.`PRODUCTOS`(`id`),
  FOREIGN KEY(`PROMOCIONES_id`)
    REFERENCES `bytebusters2_db`.`PROMOCIONES`(`id`)	
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



-- ---------------------------------------------------------------


/*
--------------------------------
--INSERT DE LA TABLA USUARIOS --
--------------------------------
*/
INSERT INTO `bytebusters2_db`.`USUARIOS` (`ci`, `pass`, `nombre`, `email`, `apellido`,`activo`) VALUES
('55271656', '$2y$10$PCw18RCrV/ldpRTKpSVoXONKrAa/0YRLAceaGZxXKn/wW..UgiCg6', 'Angel', 'angellanzi.sl@gmail.com', 'Lanzi',1);

INSERT INTO `bytebusters2_db`.`USUARIOS` (`ci`, `pass`, `nombre`, `email`, `apellido`,`activo`) VALUES
('46140143', '$2y$10$PCw18RCrV/ldpRTKpSVoXONKrAa/0YRLAceaGZxXKn/wW..UgiCg6', 'Federico', 'fdefortuny@gmail.com', 'de Fortuny',1);

INSERT INTO `bytebusters2_db`.`USUARIOS` (`ci`, `pass`, `nombre`, `email`, `apellido`,`activo`) VALUES
('49273133', '$2y$10$PCw18RCrV/ldpRTKpSVoXONKrAa/0YRLAceaGZxXKn/wW..UgiCg6', 'Lucia', 'luciavinaf@gmail.com', 'Viña',1);

INSERT INTO `bytebusters2_db`.`USUARIOS` (`ci`, `pass`, `nombre`, `email`, `apellido`,`activo`) VALUES
('51281100', '$2y$10$PCw18RCrV/ldpRTKpSVoXONKrAa/0YRLAceaGZxXKn/wW..UgiCg6', 'Anibal', 'anibalezequiel14@gmail.com', 'Almeida',1);

INSERT INTO `bytebusters2_db`.`USUARIOS` (`ci`, `pass`, `nombre`, `email`, `apellido`,`activo`) VALUES
('49158527', '$2y$10$PCw18RCrV/ldpRTKpSVoXONKrAa/0YRLAceaGZxXKn/wW..UgiCg6', 'Damian', 'damiandespan@gmail.com', 'Despan',1);

INSERT INTO `bytebusters2_db`.`USUARIOS` (`ci`, `pass`, `nombre`, `email`, `apellido`,`activo`) VALUES
('91685073', '$2y$10$PCw18RCrV/ldpRTKpSVoXONKrAa/0YRLAceaGZxXKn/wW..UgiCg6', 'Manolo', 'manopere@gmail.com', 'Perez',1);

INSERT INTO `bytebusters2_db`.`USUARIOS` (`ci`, `pass`, `nombre`, `email`, `apellido`,`activo`) VALUES
('16850794', '$2y$10$PCw18RCrV/ldpRTKpSVoXONKrAa/0YRLAceaGZxXKn/wW..UgiCg6', 'Pepe', 'pepegome@gmail.com', 'Gomez',1);

INSERT INTO `bytebusters2_db`.`USUARIOS` (`ci`, `pass`, `nombre`, `email`, `apellido`,`activo`) VALUES
('91827364', '$2y$10$PCw18RCrV/ldpRTKpSVoXONKrAa/0YRLAceaGZxXKn/wW..UgiCg6', 'Marcelo', 'torresmarce@gmail.com', 'Torres',1);

INSERT INTO `bytebusters2_db`.`USUARIOS` (`ci`, `pass`, `nombre`, `email`, `apellido`,`activo`) VALUES
('56478921', '$2y$10$PCw18RCrV/ldpRTKpSVoXONKrAa/0YRLAceaGZxXKn/wW..UgiCg6', 'Cristina', 'borrazascristi@gmail.com', 'Borrazas',1);

INSERT INTO `bytebusters2_db`.`USUARIOS` (`ci`, `pass`, `nombre`, `email`, `apellido`,`activo`) VALUES
('49862357', '$2y$10$PCw18RCrV/ldpRTKpSVoXONKrAa/0YRLAceaGZxXKn/wW..UgiCg6', 'Lorena', 'olivieralorena@gmail.com', 'Oliviera',1);

INSERT INTO `bytebusters2_db`.`USUARIOS` (`ci`, `pass`, `nombre`, `email`, `apellido`,`activo`) VALUES
('95136741', '$2y$10$PCw18RCrV/ldpRTKpSVoXONKrAa/0YRLAceaGZxXKn/wW..UgiCg6', 'Carolina', 'caropollito123@gmail.com', 'Pollo',1);

INSERT INTO `bytebusters2_db`.`USUARIOS` (`ci`, `pass`, `nombre`, `email`, `apellido`,`activo`) VALUES
('28463971', '$2y$10$PCw18RCrV/ldpRTKpSVoXONKrAa/0YRLAceaGZxXKn/wW..UgiCg6', 'Pablo', 'pclavo@gmail.com', 'Clavo',1);


/*
-----------------------------
--INSERT DE LA TABLA ROLES --
-----------------------------
*/
INSERT INTO `bytebusters2_db`.`ROLES` (`id`, `nombreRol`) VALUES ('1', 'admin');

INSERT INTO `bytebusters2_db`.`ROLES` (`id`, `nombreRol`) VALUES ('2', 'vendedor');



/*
------------------------------------------
--INSERT RELACIONANDO USUARIOS CON ROLES--
------------------------------------------
*/
INSERT INTO `bytebusters2_db`.`USUARIOS_has_ROLES` (`USUARIOS_ci`, `ROLES_id`) VALUES ('55271656', '1'), ('55271656', '2');
INSERT INTO `bytebusters2_db`.`USUARIOS_has_ROLES` (`USUARIOS_ci`, `ROLES_id`) VALUES ('46140143', '1'), ('46140143', '2');
INSERT INTO `bytebusters2_db`.`USUARIOS_has_ROLES` (`USUARIOS_ci`, `ROLES_id`) VALUES ('49273133', '1'), ('49273133', '2');
INSERT INTO `bytebusters2_db`.`USUARIOS_has_ROLES` (`USUARIOS_ci`, `ROLES_id`) VALUES ('51281100', '1'), ('51281100', '2');
INSERT INTO `bytebusters2_db`.`USUARIOS_has_ROLES` (`USUARIOS_ci`, `ROLES_id`) VALUES ('49158527', '1'), ('49158527', '2');
INSERT INTO `bytebusters2_db`.`USUARIOS_has_ROLES` (`USUARIOS_ci`, `ROLES_id`) VALUES ('91685073', '2');
INSERT INTO `bytebusters2_db`.`USUARIOS_has_ROLES` (`USUARIOS_ci`, `ROLES_id`) VALUES ('16850794', '1');
INSERT INTO `bytebusters2_db`.`USUARIOS_has_ROLES` (`USUARIOS_ci`, `ROLES_id`) VALUES ('91827364', '1'), ('91827364','2');
INSERT INTO `bytebusters2_db`.`USUARIOS_has_ROLES` (`USUARIOS_ci`, `ROLES_id`) VALUES ('56478921', '1'), ('56478921','2');
INSERT INTO `bytebusters2_db`.`USUARIOS_has_ROLES` (`USUARIOS_ci`, `ROLES_id`) VALUES ('49862357', '1'), ('49862357','2');
INSERT INTO `bytebusters2_db`.`USUARIOS_has_ROLES` (`USUARIOS_ci`, `ROLES_id`) VALUES ('95136741', '1');
INSERT INTO `bytebusters2_db`.`USUARIOS_has_ROLES` (`USUARIOS_ci`, `ROLES_id`) VALUES ('28463971','2');



/*
-----------------------------
--INSERT DE LA TABLA PERMISOS --
-----------------------------
*/

INSERT INTO `bytebusters2_db`.`PERMISOS` (`ruta`, `accion`) VALUES ('pages/config-empresa.php', 'Configurar datos de empresa');
INSERT INTO `bytebusters2_db`.`PERMISOS` (`ruta`, `accion`) VALUES ('pages/descargas.php', 'Descargar documentos PDF');
INSERT INTO `bytebusters2_db`.`PERMISOS` (`ruta`, `accion`) VALUES ('pages/abm-permisos.php', 'Gestionar permisos de usuario');
INSERT INTO `bytebusters2_db`.`PERMISOS` (`ruta`, `accion`) VALUES ('pages/abm-productos.php', 'Gestionar productos');
INSERT INTO `bytebusters2_db`.`PERMISOS` (`ruta`, `accion`) VALUES ('pages/abm-promociones.php', 'Gestionar promociónes');
INSERT INTO `bytebusters2_db`.`PERMISOS` (`ruta`, `accion`) VALUES ('pages/abm-usuarios.php', 'Gestionar usuarios');
/*
--------------------------------------------
-- INSERT RELACIONANDO ROLES CON PERMISOS --
--------------------------------------------
*/
INSERT INTO `bytebusters2_db`.`ROLES_has_PERMISOS`(`PERMISOS_accion`,`ROLES_id`,`activo`) VALUES('Configurar datos de empresa', '1',1);
INSERT INTO `bytebusters2_db`.`ROLES_has_PERMISOS`(`PERMISOS_accion`,`ROLES_id`,`activo`) VALUES('Configurar datos de empresa', '2',0);
INSERT INTO `bytebusters2_db`.`ROLES_has_PERMISOS`(`PERMISOS_accion`,`ROLES_id`,`activo`) VALUES('Descargar documentos PDF', '1',0);
INSERT INTO `bytebusters2_db`.`ROLES_has_PERMISOS`(`PERMISOS_accion`,`ROLES_id`,`activo`) VALUES('Descargar documentos PDF', '2',1);
INSERT INTO `bytebusters2_db`.`ROLES_has_PERMISOS`(`PERMISOS_accion`,`ROLES_id`,`activo`) VALUES('Gestionar permisos de usuario', '1',1);
INSERT INTO `bytebusters2_db`.`ROLES_has_PERMISOS`(`PERMISOS_accion`,`ROLES_id`,`activo`) VALUES('Gestionar permisos de usuario', '2',0);
INSERT INTO `bytebusters2_db`.`ROLES_has_PERMISOS`(`PERMISOS_accion`,`ROLES_id`,`activo`) VALUES('Gestionar productos', '1',0);
INSERT INTO `bytebusters2_db`.`ROLES_has_PERMISOS`(`PERMISOS_accion`,`ROLES_id`,`activo`) VALUES('Gestionar productos', '2',1);
INSERT INTO `bytebusters2_db`.`ROLES_has_PERMISOS`(`PERMISOS_accion`,`ROLES_id`,`activo`) VALUES('Gestionar promociónes', '1',0);
INSERT INTO `bytebusters2_db`.`ROLES_has_PERMISOS`(`PERMISOS_accion`,`ROLES_id`,`activo`) VALUES('Gestionar promociónes', '2',1);
INSERT INTO `bytebusters2_db`.`ROLES_has_PERMISOS`(`PERMISOS_accion`,`ROLES_id`,`activo`) VALUES('Gestionar usuarios', '1',1);
INSERT INTO `bytebusters2_db`.`ROLES_has_PERMISOS`(`PERMISOS_accion`,`ROLES_id`,`activo`) VALUES('Gestionar usuarios', '2',0);
/* 
-------------------------------
--INSERT DE LA TABLA EMPRESA --
-------------------------------
*/
INSERT INTO `bytebusters2_db`.`empresa`(`logo`, `rubro`, `nombre`, `calle`, `numero`, `ciudad`, `telefono`, `instagram`, `whatsapp` , `email`, `pwd_email`, `comentarios`,`usuario_ci`) 
VALUES ('logo-empresa' ,'Supermercado' , 'DigitalMarket' , '18 de julio' , '1' ,'Montevideo', '099084678', 'digital.ig', '+59899084678' , 'digitalmarket@gmail.com' , 'digital4321' , 'Todos los precios están expresados en pesos uruguayos e incluyen iva.','55271656');


/*
----------------------------------
--INSERT DE LA TABLA CATEGORIAS --
----------------------------------
*/
INSERT INTO `bytebusters2_db`.`CATEGORIAS` (`id`, `nombre`) VALUES ('0', 'Almacen');
INSERT INTO `bytebusters2_db`.`CATEGORIAS` (`id`, `nombre`) VALUES ('1', 'Limpieza');
INSERT INTO `bytebusters2_db`.`CATEGORIAS` (`id`, `nombre`) VALUES ('2', 'Papeleria');
INSERT INTO `bytebusters2_db`.`CATEGORIAS` (`id`, `nombre`) VALUES ('3', 'Ferreteria');
INSERT INTO `bytebusters2_db`.`CATEGORIAS` (`id`, `nombre`) VALUES ('4', 'Textil');
INSERT INTO `bytebusters2_db`.`CATEGORIAS` (`id`, `nombre`) VALUES ('5', 'Perfumeria y Bebe');
INSERT INTO `bytebusters2_db`.`CATEGORIAS` (`id`, `nombre`) VALUES ('6', 'Deporte');
INSERT INTO `bytebusters2_db`.`CATEGORIAS` (`id`, `nombre`) VALUES ('7', 'Tecnologia');
INSERT INTO `bytebusters2_db`.`CATEGORIAS` (`id`, `nombre`) VALUES ('8', 'Mascotas');
INSERT INTO `bytebusters2_db`.`CATEGORIAS` (`id`, `nombre`) VALUES ('9', 'Jugueteria y Libreria');
INSERT INTO `bytebusters2_db`.`CATEGORIAS` (`id`, `nombre`) VALUES ('10', 'Hogar y Bazar');
INSERT INTO `bytebusters2_db`.`CATEGORIAS` (`id`, `nombre`) VALUES ('11', 'Bebidas');
INSERT INTO `bytebusters2_db`.`CATEGORIAS` (`id`, `nombre`) VALUES ('12', 'Frescos');


/*
---------------------------------
--INSERT DE LA TABLA PRODUCTOS --
---------------------------------
*/

INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('1', 'Pack 3 Rollos de Cocina NOVA Clásico', 'Rollos de papel doble hoja con alta absorción que permite retener mayor cantidad de líquido y aseguran un rendimiento más económico en todas las necesidades del hogar.', '1.jpg','100','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('2', 'Tijera MAPED Sensoft 13 cm mango de goma', 'Los Mejores útiles para escolares encontralos en la web', '2.jpg','170','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('3','Lubricante WD-40 flexi tapa 220g','Lubricante WD-40 flexi tapa 220g, producto de excelente calidad.', '3.jpg','550','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('4','Toalla de Baño Azul Frape Bud 135 x 70 cm','Toalla de exelente calidad y textura', '4.jpg','500','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('5', 'Agua JANE 1L', 'El baño y la cocina son áreas altamente contaminadas de toda la casa, pero con agua Jane estan limpios en un segundo', '5.jpg','90','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('6','Repasador Ajedrez Cuadros' ,'Varios colores, 100% algodón, Medidas: 41 x 66 cm','6.jpg','180','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('7','Destornillador BRICOTECH','Destornillador BRICOTECH Mod. HL-S36-26 . 3.6 V','7.jpg','1500','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('8','Papel natural A4 250h','Papel natural A4 250h 75 g 100% caña de azúcar','8.jpg','150','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('9','Bolsa De Residuos Jardín Y Edificios Herradura 85 X 105 10 U','Bolsa De Residuos Jardín Y Edificios Herradura 85 X 105 10 U','9.jpg','190','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('10','Pincel 2in Hometech','Pincel 2in Hometech','10.jpg','55','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('11','Jabón de Tocador DOVE Original en Barra 90 G Pack x8','Jabón de Tocador DOVE Original en Barra 90 G Pack x8','11.jpg','500','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('12','Cinta adhesiva TEORIA + 24mm x 50 m','Cinta adhesiva TEORIA + 24mm x 50 m','12.jpg','25','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('13','Paño microfibra LIDER','Paño microfibra LIDER','13.jpg','50','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('14','Pinza BRICOTECH pico loro 10','Pinza BRICOTECH pico loro 10','14.jpg','350','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('15','Cartucho HP Mod. 3YM78AL (667) tricolor P/2375/2775','Obtené el mejor rendimiento de tu impresora utilizando insumos originales. Los cartuchos originales HP ofrecen un excelente rendimiento y la mejor calidad de impresión','15.jpg','828','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('16','Pelota WILSON Castaway','Si lo que buscas es diversión, está pelota es la ideal para vos. Podrás compartir junto a tus amigos de momentos inolvidables, diviértete a lo grande y a toda hora!','16.jpg','1000','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('17','Balde para obra reforzado','Balde para obra reforzado, clase A ,10 L de capacidad','17.jpg','219','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('18','Fosforos FIAT LUX','Fosforos FIAT LUX x 200 unidades','18.jpg','65','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('19','Tornillo L en PVC blanco BRICOTECH','Tornillo L en PVC blanco BRICOTECH','19.jpg','29','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('20','Lampara LED PHILIPS x2','Lampara LED PHILIPS Ecohome fría x2 12w','20.jpg','449','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('21','Trincheta BRICOTECH','Trincheta BRICOTECH con 6 hojas de repuesto','21.jpg','169','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('22','Adhesivo LA GOTITA gel 30ml','Adhesivo LA GOTITA gel 30ml','22.jpg','189','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('23','Lámpara perfume plus ECOLITE','Lámpara perfume plus ECOLITE 15 w e14','23.jpg','39','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('24','Tornillo y taco fisher de 8"','Tornillo y taco fisher de 8"','24.jpg','29','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('25','Pilas DURACELL AA x 8 un','Apovecha al maximo la energia de las pilas DURACELL','25.jpg','455','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('26','Alargue multiple HOME LEADER 3m 6 salidas','Logra extender la conexión de tus dispositivos con este alargue múltiple modular de 6 salidas, ideal para mantener tus conexiones ordenadas y seguras','26.jpg','569','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('27','Colecho BEBESIT Easy Sleep 6090 gris','Fácil de armar y utilizar; Además de colecho se puede usar como moisés. Incluye colchón y cubre colchón desmontable y lavable. Tapiz acolchado de textura suave para el bebé. 2 correas para fijar la cuna a la cama. Uso desde recién nacido hasta 6 meses (9 kilos). Medidas: 93x53x70 cm (L x An x Al). Peso: 6 kg','27.jpg','3950','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('28','Mamadera AVENT natural 260 ml','Mamadera AVENT natural 260 ml','28.jpg','828','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('29','Cubiertos SKIP HOP flamingo para bebe','Cubiertos para bebes y niños pequeños. Nuestros cubiertos tienen laterales suaves, por lo que es más fácil de sostener a los más pequeños.','29.jpg','590','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('30','Jabón de tocador IO durazno y frutos rojos 125 g','Jabón de tocador IO durazno y frutos rojos 125 g','30.jpg','29','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('31','Crema para manos y cutículas DR. SELBY avena 75 ml','Crema para manos y cutículas DR SELBY avena 75 ml.','31.jpg','230','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('32','Desodorante NIVEA MEN spray piel sensible','Desodorante NIVEA MEN spray piel sensible','32.jpg','160','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('33','Cepillos Dentales PICO JENNER Duro 2un','2 Cepillos Dental PICO JENNER Duro','33.jpg','460','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('34','Toallitas húmedas BABYSEC ultra 50 un','Toallitas húmedas BABYSEC ultra 50 un','34.jpg','130','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('35','Pañal BABYSEC premium XG 48 un','Pañal BABYSEC premium XG 48 un','35.jpg','900','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('36','Masa de moldear MAPED verde 114 g','Masa de moldear MAPED verde 114 g','36.jpg','90','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('37','Cerámica sin horno DAS terracota ½ kg','Cerámica sin horno DAS terracota ½ kg','37.jpg','180','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('38','Marcadores FABER CASTELL finos caras y colores 12 unidades+3','Marcadores FABER CASTELL finos caras y colores 12 unidades+3','38.jpg','200','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('39','Carpeta en L A4 transparente','Es muy versátil y se puede utilizar para una variedad de propósitos, desde organizar informes y presentaciones hasta almacenar facturas y recibos importantes','39.jpg','30','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('40','Papel glase TABARE pastel 25h','Papel glase TABARE pastel 25h','40.jpg','25','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('41','Lona SAFARI Premium 2x3 m densidad 145 g','Aprovecha al máximo tu días de camping con esta lona SAFARI, su diseño moderno y resistente te permitirá aprovechar de tus mejores momentos al aire libre','41.jpg','500','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('42','Colchoneta safari de eva aluminizada 180x50 cm','Colchoneta safari de eva aluminizada 180x50 cm','42.jpg','370','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('43','Pelota de padel profesional WILSON','Pelota de padel profesional WILSON','43.jpg','500','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('44','Juego de ping pong 6 piezas 27x18x2,5 cm','Juego de ping pong 6 piezas 27x18x2,5 cm','44.jpg','550','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('45','Pelota de basket numero 7 NBA oficial','Pelota de basket numero 7 NBA oficial','45.jpg','1320','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('46','Mouse inalámbrico LOGITECH Mod. M170 2.4 gris','El Mouse inalámbrico LOGITECH Mod. M170 2.4 cuenta con un diseño compacto y contorneado que ofrece gran comodidad','46.jpg','525','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('47','Amplificador inalámbrico TP-LINK Mod. TL-WA850RE','Si precisas un extensor de wi-fi de excelente calidad al mejor precio, el extensor de wi-fi TP-LINK modelo Tl-wa850re es ideal para vos!','47.jpg','1540','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('48','Cerradura eléctrica INTELBRAS cilindro Mod. FX2000','La cerradura FX 2000 AJ es la solución ideal para el control de acceso en entornos comerciales o residenciales.','48.jpg','2820','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('49','Pack 3 lámparas smart NEXXT RGB Mod. NHB-C1203','Pack 3 lámparas smart NEXXT RGB Mod. NHB-C1203','49.jpg','1690','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('50','Hub HAVIT USB-C a USB 5en1 con lector de SD','Hub HAVIT USB-C a USB 5en1 con lector de SD','50.jpg','640','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('51','Adaptador PROMATE Prolink H2V de HDMI a VGA','Adaptador PROMATE Prolink H2V de HDMI a VGA','51.jpg','680','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('52','Vaso de refresco Dubai 480 ml','Vaso suelto de excelente calidad y diseño elegante.','52.jpg','80','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('53','Papelera Le Bain 5 litros','Papelera o basurero imprescindible para que tires tus desechos','53.jpg','350','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('54','Asadera cuadrada 37x26x1.8cm antiadherente','Asadera cuadrada 37x26x1.8cm antiadherente','54.jpg','270','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('55','Cuchilla NIROSTA Santoku 33/18 cm Espesor 2 mm','Cuchilla NIROSTA Santoku 33/18 cm Espesor 2 mm','55.jpg','470','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('56','Dispensador de jabón','Dispensador de jabón','56.jpg','300','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('57','Pala VIRULANA con pie plegable','Pala VIRULANA con pie plegable','57.jpg','225','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('58','Balde oval con escurridor MAKE','Balde oval con escurridor MAKE','58.jpg','900','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('59','Limpiador MR. MUSCULO Baño gatillo 500 ml','Limpiador MR. MUSCULO Baño gatillo 500 ml','59.jpg','225','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('60','Escoba clásica','Escoba clásica','60.jpg','200','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('61','Lampazo 41 cm','Lampazo 41 cm','61.jpg','170','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('62','Leche entera BLANCANUBE larga vida 1 L','Leche entera BLANCANUBE larga vida 1 L','62.jpg','60','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('63','Queso untable Magro FARMING 190 g','Queso untable Magro FARMING 190 g','63.jpg','130','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('64','Leche chocolatada LACTOLATE 1 L','Leche chocolatada LACTOLATE 1 L','64.jpg','70','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('65','Postre DANETTE Copa chocolate con crema 100 g','Postre DANETTE Copa chocolate con crema 100 g','65.jpg','45','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('66','Cerveza STELLA ARTOIS 473 ml','Cerveza STELLA ARTOIS 473 ml','66.jpg','95','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('67','Cerveza PATRICIA Doble Malta 473 ml','Cerveza PATRICIA Doble Malta 473 ml','67.jpg','80','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('68','Vino tinto malbec CORDERO CON PIEL DE LOBO 750 cc','Vino tinto malbec CORDERO CON PIEL DE LOBO 750 cc','68.jpg','500','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('69','Malbec Alamos Tinto','Malbec Alamos Tinto','69.jpg','520','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('70','Whisky Escoces JOHNNIE WALKER rojo icons 750 ml','Whisky Escoces JOHNNIE WALKER rojo icons 750 ml','70.jpg','925','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('71','Jugo JUMEX coco-piña 1 Lt','Jugo JUMEX coco-piña 1 Lt','71.jpg','130','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('72','Pan lacteado BIMBO 590 g','Pan lacteado BIMBO 590 g','72.jpg','135','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('73','Fideos Tallarín COLOLÓ Tipo Casero 500 g','Fideos Tallarín COLOLÓ Tipo Casero 500 g','73.jpg','70','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('74','Galletas multicereal EL TRIGAL la celestina 250 g','Galletas multicereal EL TRIGAL la celestina 250 g','74.jpg','110','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('75','Aceite oliva SIBARITA extra virgen 900 cc','Aceite oliva SIBARITA extra virgen 900 cc','75.jpg','410','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('76','Harina 0000 CAÑUELAS 1 kg','Harina 0000 CAÑUELAS 1 kg','76.jpg','55','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('77','Aceite de oliva extra virgen OLIVARES DE ROCHA 500 ml','Aceite de oliva extra virgen OLIVARES DE ROCHA 500 ml','77.jpg','330','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('78','Café molido STARBUCKS medium colombia 250g','Café molido STARBUCKS medium colombia 250g','78.jpg','415','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('79','Juego de Mesa Catan en Español DEVIR','Catan es un juego de mesa para toda la familia que se ha convertido en un fenómeno mundial.','79.jpg','3600','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('80','Juego Ajedrez en Caja','Juego Ajedrez en Caja','80.jpg','700','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('81','Juguete Walkie Talkie 2 Piezas','Juguete Walkie Talkie 2 Piezas','81.jpg','600','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('82','Autos HOT WHEELS','Autos HOT WHEELS','82.jpg','200','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('83','Naipes para Poker BYCICLE Cartón','Naipes para Poker BYCICLE Cartón','83.jpg','270','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('84','Alimento Para Perros Adulto Raza Media/Grande Dog Chow 1.5 Kg','Alimento Para Perros Adulto Raza Media/Grande Dog Chow 1.5 Kg','84.jpg','380','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('85','Correa De Entrenamiento Para Mascota 200 Cm','Correa De Entrenamiento Para Mascota 200 Cm','85.jpg','60','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('86','Alimento para Gatos Whiskas Carne 500 G','Alimento para Gatos Whiskas Carne 500 G','86.jpg','195','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('87','Comedor Para Mascota Acero 15*11','Comedor Para Mascota Acero 15*11','87.jpg','60','55271656',1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('88','Roll De Cuero Denucio','Roll De Cuero Denucio','88.jpg','160','55271656',1);

/*
INSERT INTO `bytebusters2_db`.`PRODUCTOS` (`id`, `nombre`, `descripcion`, `imagen`,`precio`,`usuario_ci`,`activo`) VALUES ('89', 'Whisky escocés JOHNNIE WALKER Blue edición limitada 750 ml','Blue Label de JOHNNIE WALKER es un elixir','89.jpg','16900','55271656',1);
-----------------------------------------------
--INSERTS RELACIONANDO PRODUCTOS CON CATEGORIAS--
-----------------------------------------------

*/

INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('1', '1');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('2', '2');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('3', '3');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('4', '4');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('5', '1');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('6', '4');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('7', '3');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('8', '4');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('9', '1');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('10', '3');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('11', '5');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('12', '2');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('13', '1');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('14', '3');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('15', '7');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('16', '6');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('17', '3');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('18', '3');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('19', '3');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('20', '3');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('21', '3');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('22', '3');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('23', '3');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('24', '3');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('25', '3');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('26', '3');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('27', '5');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('28', '5');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('29', '5');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('30', '5');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('31', '5');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('32', '5');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('33', '5');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('34', '5');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('35', '5');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('36', '2');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('37', '2');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('38', '2');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('39', '2');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('40', '2');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('41', '6');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('42', '6');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('43', '6');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('44', '6');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('45', '6');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('46', '7');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('47', '7');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('48', '7');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('49', '7');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('50', '7');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('51', '7');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('52', '10');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('53', '10');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('54', '10');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('55', '10');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('56', '10');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('57', '1');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('58', '1');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('59', '1');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('60', '1');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('61', '1');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('62', '12');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('63', '12');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('64', '12');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('65', '12');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('66', '11');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('67', '11');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('68', '11');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('69', '11');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('70', '11');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('71', '11');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('72', '0');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('73', '0');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('74', '0');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('75', '0');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('76', '0');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('77', '0');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('78', '0');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('79', '9');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('80', '9');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('81', '9');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('82', '9');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('83', '9');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('84', '8');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('85', '8');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('86', '8');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('87', '8');
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('88', '8');

/*
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_CATEGORIAS` (`PRODUCTOS_id`, `CATEGORIAS_id`) VALUES ('89', '11');
----------------------------------
--INSERT DE LA TABLA PROMOCIONES--
----------------------------------
*/
INSERT INTO `bytebusters2_db`.`PROMOCIONES` (`id`,`descuento`,`fechaInicio`,`fechaFin`,`vigente`,`activo`) VALUES (1,15,'2023/07/23','2024/08/05',1,1);
INSERT INTO `bytebusters2_db`.`PROMOCIONES` (`id`,`descuento`,`fechaInicio`,`fechaFin`,`vigente`,`activo`) VALUES (2,40,'2023/09/03','2024/10/17',1,1);
INSERT INTO `bytebusters2_db`.`PROMOCIONES` (`id`,`descuento`,`fechaInicio`,`fechaFin`,`vigente`,`activo`) VALUES (3,25,'2023/10/01','2024/10/02',1,1);
INSERT INTO `bytebusters2_db`.`PROMOCIONES` (`id`,`descuento`,`fechaInicio`,`fechaFin`,`vigente`,`activo`) VALUES (4,10,'2023/10/01','2024/12/31',1,1);
/*
------------------------------------------------
--INSERT RELACIONANDO PRODUCTOS CON PROMOCIONES--
------------------------------------------------

*/
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_PROMOCIONES` (`PRODUCTOS_id`,`PROMOCIONES_id`) VALUES (2,1);
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_PROMOCIONES` (`PRODUCTOS_id`,`PROMOCIONES_id`) VALUES (4,2);
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_PROMOCIONES` (`PRODUCTOS_id`,`PROMOCIONES_id`) VALUES (6,3);
INSERT INTO `bytebusters2_db`.`PRODUCTOS_has_PROMOCIONES` (`PRODUCTOS_id`,`PROMOCIONES_id`) VALUES (22,4);
