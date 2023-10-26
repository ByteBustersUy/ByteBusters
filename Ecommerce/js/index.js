var anchoVentana = window.innerWidth;
const divBtnPages = document.getElementById("div-btns-pages");
divBtnPages.addEventListener("click", function (event) {
	if (event.target.tagName === "BUTTON") {
		let numPage = event.target.textContent;
		const divProducPromo = document.getElementById("tarjetas");
		fetch("../api/productos-promo.php?p=" + numPage)
			.then((response) => response.json())
			.then((data) => {
				let card = "";
				for (let id = 0; id < data.length; id++) {
					card += `
    			<div>
        			<div class="card h-100 produc-promo" >
						<a class="ir-detalle-producto" href="pages/detalleProducto.html?id=${id}">
            				<img src="./images/${data[id].imagen} " class="card-img-top" alt="...">
            				<div class="card-body">
                				<h4>$${data[id].precio}</h4>
                				<h5>${data[id].nombre}</h5>
            				</div>
						</a>
            			<a id="${data[id].id}" class="btn btn-agregar agregar-carrito">Agregar al carrito</a>
        			</div>
    			</div>`;
				}
				divProducPromo.innerHTML = card;
			});
	}
});

window.addEventListener("DOMContentLoaded", function () {
	const divProducPromo = document.getElementById("tarjetas");
	

	//Productos promocionados
	fetch("../api/productos-promo.php")
		.then((response) => response.json())
		.then((data) => {
			let cards = "";
			for (let id = 0; id < data.length; id++) {
				fetch("../api/promocion.php?id=" + data[id].id)
					.then((response2) => response2.json())
					.then((promo) => {
						cards += `
    			<div>
        			<div class="card produc-promo" >
						<a class="ir-detalle-producto" href="pages/detalleProducto.html?id=${data[id].id}">
						<div class="promo-tag">
						<span>${promo.descuento}% OFF</span>
						</div>
            				<img src="./images/${data[id].imagen} " class="card-img-top" alt="...">
            				<div class="card-body">
								<h5>${limitarNombres(data[id].nombre)}</h5>
                				<h4>$${data[id].precio}</h4>
            				</div>
						</a>
            			<a id="${data[id].id}" class="btn btn-agregar agregar-carrito">Agregar al carrito</a>
        			</div>
    			</div>`;

				divProducPromo.innerHTML = cards;
					}).catch((error) => { });
					
			}

		});
	cargarCardsProductosNoPromo();
});
const divProductoNoPromo = document.getElementById("productos-sin-promo");

function cargarCardsProductosNoPromo() {
	divProductoNoPromo.innerHTML = "";

	//Productos no promocionados
	fetch("../api/productos-no-promo.php")
		.then((response) => response.json())
		.then((data) => {
			let cards = "";
			for (let id = 0; id < data.length; id++) {
				cards += `
    			<div>
        			<div class="card producto-no-promo" >
						<a class="ir-detalle-producto" href="pages/detalleProducto.html?id=${id}">
            				<img src="./images/${data[id].imagen} " class="card-img-top no-promo" alt="...">
            				<div class="card-body">
							<h5>${limitarNombres(data[id].nombre)}</h5>
							<h4>$${data[id].precio}</h4>
            				</div>
						</a>
            			<a id="${data[id].id}" class="btn btn-agregar agregar-carrito">Agregar al carrito</a>
        			</div>
    			</div>`;
			}

			divProductoNoPromo.innerHTML = cards;


		});

}


function limitarNombres(nombre) {
	if (nombre.length > 30) {
		nombre = nombre.slice(0, 30);
		if (!nombre.endsWith(" ")) {
			indiceUltimaPalabra = nombre.lastIndexOf(" ");
			nombre = nombre.slice(0, indiceUltimaPalabra);
		}
	}
	return nombre;
}

