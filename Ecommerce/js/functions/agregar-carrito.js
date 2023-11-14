function comparar(a,b) {
    return a.id - b.id;
}
document.addEventListener("mousedown", function () {
	let carrito = [];
<<<<<<< HEAD
	//Guarda el carrito en el LocalStorage
	document.querySelectorAll(".agregar-carrito").forEach((btn) => {
		btn.addEventListener("click", () => {
			let id = parseInt(btn.id);
=======
	let id;
	//Guarda el carrito en el LocalStorage
	document.querySelectorAll(".agregar-carrito").forEach((btn) => {
		btn.addEventListener("click", () => {
			id = parseInt(btn.id)
>>>>>>> 00aad4caaa8bc15491db8dceba1486ef752041f7
			agregarProducoAlCarrito(id);
		});
	});

	//carga carrito del localStorage
	let carritoGuardado = localStorage.getItem("id");
	if (carritoGuardado) {
		carrito = JSON.parse(carritoGuardado);
	}

	function agregarProducoAlCarrito(id) {
<<<<<<< HEAD
		carrito.push({
			id,
			cantidad: 1,
		});
=======
			carrito.push({
				id,
				cantidad: 1
			});
		
>>>>>>> 00aad4caaa8bc15491db8dceba1486ef752041f7
		carrito.sort(comparar);
		localStorage.setItem("id", JSON.stringify(carrito));
	}
});