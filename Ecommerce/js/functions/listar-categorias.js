window.addEventListener("DOMContentLoaded", function () {
	const urlParams = new URLSearchParams(window.location.search);
	const id = urlParams.get("cat");

	fetch("../../api/productos-categorias.php?id=" + id, {
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
              <a href="./detalleProducto.html?id=${data[id].id}"><img src="../images/${data[id].imagen}" class="card-img-top img-producto-lista" alt="10"></a>
              <div>
                <a class="aNomb" href="detalleProducto.html?id=${data[id].id}">
                  <h3>${data[id].nombre}</h3>
                <h4>$${data[id].precio}</h4>
				</a>
                <a id="${data[id].id}" href="#" class="btn btn-agregar agregar-carrito buttonAdd">Agregar al carrito</a>
              </div>
            </div>
          `;

				container.appendChild(divPrducPromo);
			}
		});
});
