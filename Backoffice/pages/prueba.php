

<!DOCTYPE html>
<html>
<head>
<title>Ordenar una tabla</title>
<style>
table {
  border-spacing: 0;
  width: 100%;
  border: 1px solid #ddd;
}
 
th {
  cursor: pointer;
}
 
th, td {
  text-align: left;
  padding: 16px;
}
 
tr:nth-child(even) {
  background-color: #f2f2f2
}
</style>
</head>
<body>
 
<p><strong>Pulsa en la cabecera de la tabla para ordenarla</strong></p>
<p>la primera vez que le des, ordenara ascendente (A-Z o 0-9).</p>
<p>la segunda vez, ordenara descendente (Z-A o 9-0).</p>
 
<table id="myTable">
  <tr>
    <th onclick="sortTable(0, 'str')">Nombre</th>
    <th onclick="sortTable(1, 'str')">Pais</th>
    <th onclick="sortTable(2, 'int')">Numero</th>
  </tr>
  <tr>
    <td>Berglunds snabbkop</td>
    <td>Sweden</td>
    <td>6</td>
  </tr>
  <tr>
    <td>North/South</td>
    <td>UK</td>
    <td>3</td>
  </tr>
  <tr>
    <td>Alfreds Futterkiste</td>
    <td>Germany</td>
    <td>1</td>
  </tr>
  <tr>
    <td>Koniglich Essen</td>
    <td>Germany</td>
    <td>8</td>
  </tr>
  <tr>
    <td>Magazzini Alimentari Riuniti</td>
    <td>Italy</td>
    <td>10</td>
  </tr>
  <tr>
    <td>Paris specialites</td>
    <td>France</td>
    <td>4</td>
  </tr>
  <tr>
    <td>Island Trading</td>
    <td>UK</td>
    <td>6</td>
  </tr>
  <tr>
    <td>Laughing Bacchus Winecellars</td>
    <td>Canada</td>
    <td>5</td>
  </tr>
</table>
 
<script>
/**
 * Funcion para ordenar una tabla... tiene que recibir el numero de columna a
 * ordenar y el tipo de orden
 * @param int n
 * @param str type - ['str'|'int']
 */

</script>
 
</body>
</html>