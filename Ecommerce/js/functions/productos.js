window.addEventListener("load", function () {
	fetch("./../api/productos.php")
		.then((response) => response.json())
		.then((data) => {
			for (let id = 0; id < data.length; id++) {
				const divPrductoSinPromo = document.getElementById("productos-sin-promo");
				divPrductoSinPromo.innerHTML += 
       `<div class="list-group"> 
          <div class="d-flex list-body">
            <img class="img-list" src="./images/${data[id].imagen}" class="card-img-top" alt="...">
            <div class="d-block list-content">
            <h5>${data[id].nombre}</h5>
            <h4>$${data[id].precio}</h4>
            <a id="${data[id].id}" class="btn btn-agregar agregar-carrito">Agregar al carrito</a>
            </div>
          </div>
        </div>`;
			}
		});
        
        });