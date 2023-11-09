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
				for (let i = 0; i < data.length; i++) {
					card += `
    			<div>
        			<div class="card h-100 produc-promo" >
						<a class="ir-detalle-producto" href="pages/detalleProducto.html?id=${id}">
            				<img src="./images/${data[i].imagen} " class="card-img-top" alt="...">
            				<div class="card-body">
                				<h4>$${data[i].precio}</h4>
                				<h5>${data[i].nombre}</h5>
            				</div>
						</a>
            			<a id="${data[i].id}" class="btn btn-agregar agregar-carrito">Agregar al carrito</a>
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
			let cards = ``;
			
			for (let i = 0; i < data.length; i++) {
				let precioDescueto=Math.round(data[i].descuento*data[i].precio/100)
				cards += `
    			<div>
        			<div class="card produc-promo">
						<a class="ir-detalle-producto" href="pages/detalleProducto.html?id=${data[i].id}">
						<div class="promo-tag">
						<span>${data[i].descuento}% OFF</span>
						</div>
            				<img src="./images/${data[i].imagen} " class="card-img-top" alt="...">
            				<div class="card-body">
								<h5>${limitarNombres(data[i].nombre)}</h5>
								<h6>$${data[i].precio}</h6>s
                				<h4>$${data[i].precio-precioDescueto}</h4>
								
            				</div>
						</a>
            			<a id="${data[i].id}" class="btn btn-agregar agregar-carrito">Agregar al carrito</a>
        			</div>
    			</div>`;


				divProducPromo.innerHTML = cards;
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
			for (let i = 0; i < data.length; i++) {
				cards += `
    			<div>
        			<div class="card producto-no-promo" >
						<a class="ir-detalle-producto" href="pages/detalleProducto.html?id=${i}">
            				<img src="./images/${data[i].imagen} " class="card-img-top no-promo" alt="...">
            				<div class="card-body">
							<h5>${limitarNombres(data[i].nombre)}</h5>
							<h4>$${data[i].precio}</h4>
            				</div>
						</a>
            			<a id="${data[i].id}" class="btn btn-agregar agregar-carrito">Agregar al carrito</a>
        			</div>
    			</div>`;
			}
			divProductoNoPromo.innerHTML = cards;
		});
}

function limitarNombres(nombre) {
	if(!nombre) return '';
	
	if (nombre.length > 10) {
		nombre = nombre.slice(0, 10);
		if (!nombre.endsWith(" ")) {
			indiceUltimaPalabra = nombre.lastIndexOf(" ");
			nombre = nombre.slice(0, indiceUltimaPalabra);
		}
	}
	return nombre;
}
