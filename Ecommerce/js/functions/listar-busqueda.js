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
function listarBusqueda(nombreProductoABuscar,numPage) {
  let ids=[];
  fetch("../../api/listar-busqueda.php?nombre=" + nombreProductoABuscar, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      totalProductos = data.length;
      cargarBotonesPaginacion(totalProductos);

      const container = document.querySelector(".container-sm");
      let indi = limit * numPage - limit;
      
      let contenidoLista='';
      for (let id = indi ; id < indi+10; id++) {
        contenidoLista+= `
        <div class="row cardProd">
        <div class="col-md-12 d-flex">
          <a href="detalleProducto.html?id=${data[id].id}">
          <img src="../images/${data[id].imagen}" class="card-img-top img-producto-lista" alt="10"></a>
          <div>
            <a class="aNomb" href="detalleProducto.html?id=${data[id].id}">
              <h3>${data[id].nombre}</h3>
              <h4>$${data[id].precio}</h4>
            </a>
            <a id=${data[id].id} href="#" class="btn btn-agregar agregar-carrito buttonAdd">Agregar al carrito</a>
          </div>
        </div>
        </div>
        `;
        if (id==indi+10-1) {
          ids+=data[id].id
        } else {
          ids+=data[id].id+",";
        }
        
        //console.log(ids);
        
        container.innerHTML=contenidoLista;
        
      }
    });
}

// Función para desplazar 
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}
function e(ids) {
  console.log(ids)
let ruta =`../../api/promocion.php?id=`+ids;
        fetch(ruta)
        .then((response) => response.json())
        .then((ata) => {
          for (let id = 0; id <ata.length; id++) {
            console.log(ata[id].descuento);
            
          }
         
        })
}