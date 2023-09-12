window.addEventListener("load", function () {
<<<<<<< HEAD
	fetch("../api/productos-promo.php")
=======
	//Productos promocionados
	fetch("../api/mostrar.php")
>>>>>>> 09c5a47fde173dd82bf251b2b67145b7ed38e7ae
		.then((response) => response.json())
		.then((data) => {
			for (let id = 0; id < data.length; id++) {
				const divPrducPromo = document.getElementById("tarjetas");
				divPrducPromo.innerHTML += `
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
		});

	//Productos no promocionados
	fetch("../api/productos.php")
		.then((response) => response.json())
		.then((data) => {
<<<<<<< HEAD
			const divDatosEmpresa = document.getElementById("divDatosEmpresa");
			divDatosEmpresa.innerHTML += `
            <p>${data[0].calle} ${data[0].numero} - ${data[0].ciudad}</p>
			<p>${data[0].telefono} </p>
			<p>${data[0].comentarios} </p>
			
			`;
		
    });
});
=======
			for (let id = 0; id < data.length; id++) {
				const divPrductoSinPromo = document.getElementById(
					"productos-sin-promo"
				);
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
>>>>>>> 09c5a47fde173dd82bf251b2b67145b7ed38e7ae

	//Buscador inteligente
	const inputSearch = document.getElementById("navSearch");
	inputSearch.addEventListener("keyup", () => {
		fetch(`../api/search.php`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ value: inputSearch.value }),
		})
			.then((response) => response.json())
			.then((data) => {
				const sugerencias = [];
				for (let i = 0; i < 5; i++) {
					if (data[i]) {
						sugerencias.push(data[i].nombre);
					}
				}
				console.log(sugerencias);
			});
	});
});
