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
    numPage = event.target.id;
    const urlParams = new URLSearchParams(window.location.search);
    nombreProductoABuscar = urlParams.get('search');
    listarBusqueda(nombreProductoABuscar, numPage);


    scrollToTop();
  }
});

let limit = 10;
function cargarBotonesPaginacion(totalProductos) {
  let cantidadPaginas = totalProductos / limit;
  if (totalProductos % limit !== 0) {
    cantidadPaginas = Math.ceil(cantidadPaginas);
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

const container = document.querySelector(".container-sm");

function listarBusqueda(nombreProductoABuscar, numPage) {
  let indice;
  let contenidoLista = '';
  fetch("../../api/listar-busqueda.php?nombre=" + nombreProductoABuscar, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then(async (jsonProductos) => {
      totalProductos = jsonProductos.length;
      cargarBotonesPaginacion(totalProductos);
      indice = limit * numPage - limit;
        for (let i = indice; i < indice + 10; i++) {
          try {
            const idProducto = jsonProductos[i].id;
            const idPromo = (await obtenerIdPromo(idProducto))[0]?.promociones_id;
            let descuento;
  
            if(idPromo){
              descuento = (await obtenerDescuento(idPromo))[0].descuento
            }
  
            if(descuento) {
              contenidoLista += renderizarListado(jsonProductos[i], descuento);
            }else{
              contenidoLista += renderizarListado(jsonProductos[i]);
            }
          
          container.innerHTML = contenidoLista;
            
          } catch (error) {}
        }
    })
}

async function obtenerIdPromo(idProduct){
  const response = await fetch("../../api/promocion.php?id=" + idProduct, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if(response.ok){
    const data = response.json();
    return data;
  }else{
    return null;
  }
}

function renderizarListado(jsonProductos, descuento){

  if(descuento){
    return `
    <div class="row cardProd">
      <div class="col-md-12 d-flex">
        <a href="detalleProducto.html?id=${jsonProductos.id}">
          <img src="../images/${jsonProductos.imagen}" class="card-img-top img-producto-lista" alt="10"></a>
          <div>
            <a id=${jsonProductos.id} class="aNomb" href="detalleProducto.html?id=${jsonProductos.id}">
              <h3>${jsonProductos.nombre}</h3>
              <h6>${jsonProductos.precio}</h6>
              <h4>$${jsonProductos.precio * (100 - descuento) / 100}</h4>
            </a>
            <a id=${jsonProductos.id} href="#" class="btn btn-agregar agregar-carrito buttonAdd">Agregar al carrito</a>
          </div>
      </div>
    </div>
    `;
  }else{
    return `
    <div class="row cardProd">
      <div class="col-md-12 d-flex">
        <a href="detalleProducto.html?id=${jsonProductos.id}">
          <img src="../images/${jsonProductos.imagen}" class="card-img-top img-producto-lista" alt="10"></a>
          <div>
            <a id=${jsonProductos.id} class="aNomb" href="detalleProducto.html?id=${jsonProductos.id}">
              <h3>${jsonProductos.nombre}</h3>
              <h4>$${jsonProductos.precio}</h4>
            </a>
            <a id=${jsonProductos.id} href="#" class="btn btn-agregar agregar-carrito buttonAdd">Agregar al carrito</a>
          </div>
      </div>
    </div>
    `;
  }
}
async function obtenerDescuento(idPromo){
  const response = await fetch("../../api/promocion.php?idPromo=" + idPromo, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if(response.ok){
    const data = response.json();
    return data;
  }else{
    return null;
  }
}