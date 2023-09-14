const DivBtnPages = document.getElementById("div-btns-pages");
function cargarBotones(da){
	let ppp = 4;
	console.log(da)

	cantPages=da/ppp;
if (da%ppp !=0) {
	cantPages++;
}

if(cantPages <=0){
	cantPages=1;
}
console.log(cantPages)

   let btns='';
	for (let i = 1; i <=cantPages; i++) {
	btns+=`
		<button type="button" class="btn btn-pages">${i}</button>
        `}
		DivBtnPages.innerHTML=btns;	
}

DivBtnPages.addEventListener("click", function(event){
	if (event.target.tagName==="BUTTON") {
		let numPage=(event.target.textContent)
		const divProducPromo = document.getElementById("tarjetas");
		fetch("../api/mostrar.php?p="+numPage)
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
	fetch("../api/mostrar.php?p=1")
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
	fetch("../api/productos-no-promo.php")
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
		});

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
				cargarBotones(cantProduc)
			});
		});
});

