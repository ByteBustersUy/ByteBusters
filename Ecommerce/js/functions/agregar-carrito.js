function comparar(a,b) {
    return a.id - b.id;
}
document.addEventListener("mousedown", function () {
	let carrito = [];
	let value;
	let id;
	//Guarda el carrito en el LocalStorage
	document.querySelectorAll(".agregar-carrito").forEach((btn) => {
		btn.addEventListener("click", () => {
			console.log( btn.promo);
			console.log( btn.id);
			value =parseInt(btn.promo)
			id = parseInt(btn.id)
			agregarProducoAlCarrito(id,value);
		});
	});

	//carga carrito del localStorage
	let carritoGuardado = localStorage.getItem("id");
	if (carritoGuardado) {
		carrito = JSON.parse(carritoGuardado);
	}

	function agregarProducoAlCarrito(id,value) {
		if (value==1) {
			carrito.push({
			id,
			cantidad: 1,
			promo: true
		});
		}else{
			carrito.push({
				id,
				cantidad: 1,
				promo: false
			});
		}
		
		carrito.sort(comparar);
		localStorage.setItem("id", JSON.stringify(carrito));
	}
});