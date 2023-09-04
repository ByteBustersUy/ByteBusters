window.addEventListener("load", function () {
	fetch("../api/mostrar.php")
		.then((response) => response.json())
		.then((data) => {
			for (let id = 0; id < data.length; id++) {
				const divPrducPromo = document.getElementById("tarjetas");
				divPrducPromo.innerHTML += `
    <div>
        <div class="card h-100 produc-promo" >
            <img src="./images/${data[id].imagen}" class="card-img-top" alt="...">
            <div class="card-body">
                <h4>$${data[id].precio}</h4>
                <h5>${data[id].nombre}</h5>
            </div>
            <a href="#" class="btn btn-agregar">Agregar al carrito</a>
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
				const sugerencias = [];
				for (let i = 0; i < 5; i++) {
					//console.log(data[i])
					if (data[i]) {
						sugerencias.push(data[i].nombre);
					}
				}
				console.log(sugerencias);
			});
	});
}, 100);
