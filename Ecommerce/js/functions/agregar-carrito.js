document.addEventListener("mousedown", function () {
	let carrito = [];
	//Guarda el carrito en el LocalStorage
	document.querySelectorAll(".agregar-carrito").forEach((btn) => {
		btn.addEventListener("click", () => {
			let id = btn.id;
			agregarProducoAlCarrito(id);
		});
	});

	//carga carrito del localStorage
	let carritoGuardado = localStorage.getItem("id");
	if (carritoGuardado) {
		carrito = JSON.parse(carritoGuardado);
	}

	function agregarProducoAlCarrito(id) {
		let productoExistente = carrito.find((producto) => producto.id === id);
		if (productoExistente) {
			productoExistente.cantidad++;
		} else {
			carrito.push({
				id,
				cantidad: 1,
			});
		}
		localStorage.setItem("id", JSON.stringify(carrito));
	}
});
