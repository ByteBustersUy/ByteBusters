// const clickCategory = document.querySelector('.nav-link');
// 	const id = clickCategory.getAttribute('id');
// 	console.log(clickCategory);

// 	clickCategory.addEventListener("click", () => {
// 		setTimeout(() => {
// 		let category;
// 		fetch('../api/productos-categorias.php', {
// 			method: "POST",
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 			body: JSON.stringify({ value: clickCategory.value }),
// 		})

// 			.then((response) => response.json())
// 			.then((data) => {

// 				let contenido = '';
// 				for (let id = 0; id < data.length; id++) {
// 						contenido += `
// 				<div>
//         			<div class="card h-100 produc-promo" >
// 						<a class="ir-detalle-producto" href="pages/carrito.html">
//             				<img src="./images/${data[id].imagen} " class="card-img-top" alt="...">
//             				<div class="card-body">
//                 				<h4>$${data[id].precio}</h4>
//                 				<h5>${data[id].nombre}</h5>
//             				</div>
// 						</a>
//             			<a id="${data[id].id}" class="btn btn-agregar agregar-carrito">Agregar al carrito</a>
//         			</div>
//     			</div>`;
// 					}
// 					category = data.length;
// 					divProducPromo.innerHTML = contenido
// 					cargarBotones(category)


// 				})
// 				.catch((error) => {
					
// 					console.error(error);
// 				  });
// 				}, 1000);

// 		});
