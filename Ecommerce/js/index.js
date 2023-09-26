const DivBtnPages = document.getElementById("div-btns-pages");
function cargarBotonesBuscar(cantidadProductos){
	let producPorPage = 3;

	cantPages=cantidadProductos/producPorPage;
if (cantidadProductos%producPorPage !=0) {
	cantPages++;
}

if(cantPages <=0){
	cantPages=1;
}

   let btnsPages='';
	for (let i = 1; i <=cantPages; i++) {
		btnsPages+=`
		<button type="button" class="btn btn-pages">${i}</button>
        `}
		DivBtnPages.innerHTML=btnsPages;	
}

DivBtnPages.addEventListener("click", function(event){
	if (event.target.tagName==="BUTTON") {
		let numPage=(event.target.textContent)
		const divProducPromo = document.getElementById("tarjetas");
		fetch("../api/productos-promo.php?p="+numPage)
		.then((response) => response.json())
		.then((data) => {
			let card='';
			for (let id = 0; id < data.length; id++) {
				
				card+= `
    			<div>
        			<div class="card h-100 produc-promo" >
						<a class="ir-detalle-producto" href="pages/carrito.html">
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
			divProducPromo.innerHTML=card;
		});
	}
});

window.addEventListener("load", function () {
	const divProducPromo = document.getElementById("tarjetas");
	//Productos promocionados
	fetch("../api/productos-promo.php?p=1")
		.then((response) => response.json())
		.then((data) => {
			let cards='';
			for (let id = 0; id < data.length; id++) {
				
				cards+= `
    			<div>
        			<div class="card h-100 produc-promo" >
						<a class="ir-detalle-producto" href="pages/carrito.html">
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
			divProducPromo.innerHTML=cards;
		});

	//Productos no promocionados
	/*fetch("../api/productos-no-promo.php")
		.then((response) => response.json())
		.then((data) => {
			const divPrductoSinPromo = document.getElementById("productos-sin-promo");
			for (let id = 0; id < data.length; id++) {
				divPrductoSinPromo.innerHTML += `
				<div class="list-group"> 
        			<div class="d-flex list-body">
        				<a class="" href="pages/carrito.html">
            				<img class="img-list" src="./images/${data[id].imagen}" class="card-img-top" alt="...">
            				<div class="d-block list-content">
            					<h5>${data[id].nombre}</h5>
            					<h4>$${data[id].precio}</h4>
            					<a id="${data[id].id}" class="btn btn-agregar agregar-carrito">Agregar al carrito</a>
            				</div>
        				</a>
       		 		</div>
        		</div>`;
			}
		});*/

	//Buscador inteligente
	const inputSearch = document.getElementById("navSearch");
	inputSearch.addEventListener("keyup", () => {
		let cantProduc;
		fetch(`../api/search.php?p=`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ value: inputSearch.value }),
		})
			.then((response) => response.json())
			.then((data) => {
				
				let contenido ='';
				for (let id = 0; id <data.length; id++) {
				contenido+=`
    			<div>
        			<div class="card h-100 produc-promo" >
						<a class="ir-detalle-producto" href="pages/carrito.html">
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
				cantProduc=data.length;
				divProducPromo.innerHTML = contenido
				cargarBotonesBuscar(cantProduc)
			});
		});
});
const divProductoNoPromo = document.getElementById("productos-sin-promo");

var anchoVentana = window.innerWidth

window.addEventListener("load", function () {
	
	if (anchoVentana< 768) {
	cargarListProductosNoPromo();

	}else if(anchoVentana>760){
	cargarCardsproductosNoPromo();
	}
})

window.onresize = function(){
anchoVentana = window.innerWidth;
if (anchoVentana< 768) {
	cargarListProductosNoPromo();

}else if(anchoVentana>760){
	cargarCardsproductosNoPromo();
}

};


function cargarCardsproductosNoPromo() {
	console.log("tablet/desktop")
	divProductoNoPromo.innerHTML='';
	//Productos promocionados
	fetch("../api/productos-no-promo.php")
		.then((response) => response.json())
		.then((data) => {
			let cards='';
			for (let id = 0; id < data.length; id++) {
				cards+= `
    			<div>
        			<div class="card h-100 producto-no-promo" >
						<a class="ir-detalle-producto" href="pages/carrito.html">
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
			divProductoNoPromo.classList.add("row")
			divProductoNoPromo.classList.add("row-cols-3")
		
			divProductoNoPromo.innerHTML=cards;
		});
}


function cargarListProductosNoPromo() {
	divProductoNoPromo.innerHTML='';
	divProductoNoPromo.classList.remove("row")
	divProductoNoPromo.classList.remove("row-cols-3")

	console.log("movile");
	//Productos no promocionados
	fetch("../api/productos-no-promo.php")
		.then((response) => response.json())
		.then((data) => {
			for (let id = 0; id < data.length; id++) {
				divProductoNoPromo.innerHTML += `
				<div class="list-group"> 
        			<div class="d-flex list-body">
        				<a class="" href="pages/carrito.html">
            				<img class="img-list" src="./images/${data[id].imagen}" class="card-img-top" alt="...">
            				<div class="d-block list-content">
            					<h5>${data[id].nombre}</h5>
            					<h4>$${data[id].precio}</h4>
            					<a id="${data[id].id}" class="btn btn-agregar agregar-carrito">Agregar al carrito</a>
            				</div>
        				</a>
       		 		</div>
        		</div>`;
			}
		});
}