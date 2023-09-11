window.addEventListener("load", function () {
	fetch("../api/mostrar.php")
		.then((response) => response.json())
		.then((data) => {
			for (let id = 0; id < data.length; id++) {
				const divPrducPromo = document.getElementById("tarjetas");
				divPrducPromo.innerHTML += `
    <div>
        <div class="card h-100 produc-promo" >
			<a class="ir-detalle-producto" href="pages/carrito.html">
            <img src="./images/${data[id].imagen}" class="card-img-top" alt="...">
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

	fetch("../api/datos-empresa.php")
		.then((response) => response.json())
		.then((data) => {
			const divDatosEmpresa = document.getElementById("divDatosEmpresa");
			divDatosEmpresa.innerHTML += `
            <p>${data[0].calle} ${data[0].numero} - ${data[0].ciudad}</p>
			`;

		});
});

setTimeout(() => {
	const inputSearch = document.getElementById("navSearch");
	//const btnNavSearch = document.getElementById("btnNavSearch");

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
				const divPrducProm = document.getElementById("tarjetas");
				let contenido=''
				//const sugerencias = [];
				for (let id = 0; id < data.length; id++) {
					
					
					contenido += `
		<div>
			<div class="card h-100 produc-promo" >
				<a class="ir-detalle-producto" href="pages/carrito.html">
				<img src="./images/${data[id].imagen}" class="card-img-top" alt="...">
				<div class="card-body">
					<h4>$${data[id].precio}</h4>
					<h5>${data[id].nombre}</h5>
				</div>
				</a>
				<a id="${data[id].id}" class="btn btn-agregar agregar-carrito">Agregar al carrito</a>
			</div>
		</div>`;
				}
				divPrducProm.innerHTML = contenido
				console.log(contenido);
			});
	});
}, 500);
