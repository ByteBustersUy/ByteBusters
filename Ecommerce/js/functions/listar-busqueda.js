window.addEventListener("DOMContentLoaded", async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const nombreProductoABuscar = urlParams.get('search');
  let numPage = 1;
  let totalProductos = 0;

  if (nombreProductoABuscar) {
    listarBusqueda(nombreProductoABuscar, numPage);
    cargarBotonesPaginacion(totalProductos);
  }
});

const botonesPaginacion = document.getElementById("div-btns-pages");
botonesPaginacion.addEventListener("click", function (event) {
  if (event.target.className === "btn btn-pages") {
    numPage = event.target.id
    const urlParams = new URLSearchParams(window.location.search);
    nombreProductoABuscar = urlParams.get('search');
    listarBusqueda(nombreProductoABuscar, numPage);
  }
})

let limit = 10;
function cargarBotonesPaginacion(totalProductos) {

  let cantidadPaginas = totalProductos / limit;
  if (totalProductos % limit != 0) {
    cantidadPaginas = Math.ceil(cantidadPaginas)
  }
  if (cantidadPaginas <= 0) {
    cantidadPaginas = 1;
  }

  let botones = "";
  for (let i = 1; i <= cantidadPaginas; i++) {
    botones += `
		<button id=${i} type="button" class="btn btn-pages">${i}</button>
        `;
  }
  const divBtnPages = document.getElementById("div-btns-pages");
  divBtnPages.innerHTML = botones;
}

let indi;
let ids = [];
let idsPromociones =[];
const container = document.querySelector(".container-sm");
function listarBusqueda(nombreProductoABuscar, numPage) {
  ids = [];
  let contenidoLista = '';
  fetch("../../api/listar-busqueda.php?nombre=" + nombreProductoABuscar, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((jsonProductos) => {
      totalProductos = jsonProductos.length;
      cargarBotonesPaginacion(totalProductos);
      indi = limit * numPage - limit;

      for (let i = 0; i < jsonProductos.length; i++) {
        ids.push(jsonProductos[i].id);
      }
      console.log(ids)
      fetch("../../api/promocion.php?id=" + ids.join(','), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((respuesta) => respuesta.json())
        .then((jsonProducPromo) => {
          console.log(jsonProducPromo);
          for (let i = 0; i < jsonProducPromo.length; i++) {
            idsPromociones.push(jsonProducPromo[i].idpromo);
          }
          fetch("../../api/promocion.php?idPromo=" + idsPromociones.join(','), {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((jsonPromocion) => {
              console.log(jsonPromocion)
            })
        })
        for (let i = indi; i < indi + 10; i++) {
          contenidoLista += `
          <div class="row cardProd">
            <div class="col-md-12 d-flex">
              <a href="detalleProducto.html?id=${jsonProductos[i].id}">
                <img src="../images/${jsonProductos[i].imagen}" class="card-img-top img-producto-lista" alt="10"></a>
                <div>
                  <a id=${jsonProductos[i].id} class="aNomb" href="detalleProducto.html?id=${jsonProductos[i].id}">
                    <h3>${jsonProductos[i].nombre}</h3>
                    <h6>${jsonProductos[i].precio}</h6>
                    <h4>$${jsonProductos[i].precio}</h4>
                  </a> 
                  <a id=${jsonProductos[i].id} href="#" class="btn btn-agregar agregar-carrito buttonAdd">Agregar al carrito</a>
                </div>
            </div>
          </div>
          `;
          container.innerHTML = contenidoLista;
        }

    })
}


/*const precio = await namess(10,100);
async function namess(descuento,precioReal) {
  return 25;
}*/

