function comparar(a,b) {
    return a.id - b.id;
}
document.addEventListener("mousedown", function () {
	let carrito = [];
	//Guarda el carrito en el LocalStorage
	document.querySelectorAll(".agregar-carrito").forEach((btn) => {
		btn.addEventListener("click", () => {
			let id = parseInt(btn.id);
			agregarProducoAlCarrito(id);
		});
	});

	//carga carrito del localStorage
	let carritoGuardado = localStorage.getItem("id");
	if (carritoGuardado) {
		carrito = JSON.parse(carritoGuardado);
	}

	function agregarProducoAlCarrito(id) {
		carrito.push({
			id,
			cantidad: 1,
		});
		carrito.sort(comparar);
		console.log(carrito)
		localStorage.setItem("id", JSON.stringify(carrito));
	}
});