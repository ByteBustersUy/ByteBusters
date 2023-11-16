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
		.then(async (data) => {
			const container = document.querySelector(".container-sm");
			for (let i = 0; i < data.length; i++) {
				const productId = data[i].id;
				let descuento;
				if(productId){
					const promoId = await obtenerPromoId(productId);
					if(promoId){
						descuento = await obtenerDescuento(promoId);
					}
				}
				
				const divPrducPromo = document.createElement("div");
				divPrducPromo.classList.add("row", "cardProd");
				let precioDescueto = '';
				let dataPrecios;
				if(descuento){
					precioDescueto = Math.round(data[i].precio*(100-descuento)/100);
					dataPrecios = `
									<h6>$${data[i].precio}</h6>
									<h4>$${precioDescueto}</h4>`;
				}else{
					dataPrecios = `<h4>$${data[i].precio}</h4>`;
				}
				
				
				divPrducPromo.innerHTML = `
            <div class="col-md-12 d-flex">
              <a href="./detalleProducto.html?id=${data[i].id}"><img src="../images/${data[i].imagen}" class="card-img-top img-producto-lista" alt="10"></a>
              <div>
                <a class="aNomb" href="detalleProducto.html?id=${data[i].id}">
                  <h3>${data[i].nombre}</h3>
				  ${dataPrecios}
				</a>
                <a id="${data[i].id}" href="#" class="btn btn-agregar agregar-carrito buttonAdd">Agregar al carrito</a>
              </div>
            </div>
            `;
				container.appendChild(divPrducPromo);
			}
		});
});

async function obtenerDescuento(promoId){
	return await fetch("../../api/promocion.php?idPromo=" + promoId, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((response) => response.json())
		.then((data) => {
			return data[0].descuento;
		});
}


async function obtenerPromoId(productId){
	return await fetch("../../api/promocion.php?id=" + productId, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((response) => response.json())
		.then((data) => {
			return data.length > 0 ? data[0].promociones_id : false;
		});
}
