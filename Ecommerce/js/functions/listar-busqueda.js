window.addEventListener("DOMContentLoaded", async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const nombreProductoABuscar = urlParams.get('search');
  let totalProductos = 0;9

  listarBusqueda(nombreProductoABuscar);
  totalProductos = await cantidadProductosDeBusqueda(nombreProductoABuscar);
  cargarBotonesPaginacion(totalProductos);

  const botonesPaginacion = document.getElementsByClassName('btn-pages')
    console.log(botonesPaginacion)
    for (let boton of botonesPaginacion){
      const id = boton.getAttribute('id');
      boton.addEventListener("click", () => {
        cargarPaginaNueva(id);
    });
  }
});


function cargarBotonesPaginacion(totalProductos) {
  let limit = 5;
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

function listarBusqueda(nombreProductoABuscar) {
  fetch("../../api/listar-busqueda.php?nombre=" + nombreProductoABuscar, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const container = document.querySelector(".container-sm");
      for (let id = 0; id < data.length; id++) {
        const divPrducPromo = document.createElement("div");
        divPrducPromo.classList.add("row", "cardProd");

        divPrducPromo.innerHTML = `
      <div class="col-md-12 d-flex">
        <a href=""><img src="../images/${data[id].imagen}" class="card-img-top img-producto-lista" alt="10"></a>
        <div>
          <a class="aNomb" href="">
            <h3>${data[id].nombre}</h3>
          </a>
          <h4>${data[id].precio}</h4>
          <a id="${data[id].id}" href="#" class="btn btn-agregar buttonAdd">Agregar al carrito</a>
        </div>
      </div>
    `;

        container.appendChild(divPrducPromo);
      }
    });
}

async function cantidadProductosDeBusqueda(nombreProductoABuscar) {
  let totalProductos = 0;
  await fetch("../../api/listar-busqueda.php?nombre=" + nombreProductoABuscar, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      totalProductos = data.length;
      return totalProductos
    })
    .catch((error) => console.log(error))

  return totalProductos;

}

function cargarPaginaNueva(numeroPagina){
  fetch("../../api/search.php?pagina=" + numeroPagina, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const container = document.querySelector(".container-sm");
      for (let id = 0; id < data.length; id++) {
        const divPrducPromo = document.createElement("div");
        divPrducPromo.classList.add("row", "cardProd");

        divPrducPromo.innerHTML = `
      <div class="col-md-12 d-flex">
        <a href=""><img src="../images/${data[id].imagen}" class="card-img-top img-producto-lista" alt="10"></a>
        <div>
          <a class="aNomb" href="">
            <h3>${data[id].nombre}</h3>
          </a>
          <h4>${data[id].precio}</h4>
          <a id="${data[id].id}" href="#" class="btn btn-agregar buttonAdd">Agregar al carrito</a>
        </div>
      </div>
    `;

        container.appendChild(divPrducPromo);
      }
    });
}