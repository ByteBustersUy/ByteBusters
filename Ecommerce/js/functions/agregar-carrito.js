<<<<<<< HEAD

let carrito = [];

// Carga 'carrito' del localStorage esto iria en la parte de mostrar carrito
/*const carritoGuardado = localStorage.getItem("carrito");
if (carritoGuardado) {
  carrito = JSON.parse(carritoGuardado);
}*/


document.addEventListener("DOMContentLoaded", function () {
  //Guarda el carrito en el LocalStorage
  setTimeout(() => {
    document.querySelectorAll(".agregar-carrito").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.id;
        
        const cantidad = 1;
        agregarProducoAlCarrito(id, cantidad);
      });
    });
  }, 500);

  function agregarProducoAlCarrito(id, cantidad) {
    const productoExistente = carrito.find((producto) => producto.id === id);
    if (productoExistente) {
      productoExistente.cantidad += cantidad;
    } else {
      carrito.push({
        id: id,
        cantidad: cantidad,
      });
    }
    

    const carritoJSON = JSON.stringify(carrito);
    localStorage.setItem("carrito", carritoJSON);
  }

  function obtener_carrito() {
    let carrito = localStorage.getItem("carrito");
    console.log(carrito);
  }
=======
document.addEventListener("click", function () {
	var carrito = [];
	//Guarda el carrito en el LocalStorage
	document.querySelectorAll(".agregar-carrito").forEach((btn) => {
		btn.addEventListener("click", () => {
			var id = btn.id;
			console.log(id);
			agregarProducoAlCarrito(id);
		});
	});

	//carga carrito del localStorage
	var carritoGuardado = localStorage.getItem("id");
	if (carritoGuardado) {
		carrito = JSON.parse(carritoGuardado);
	}

	function agregarProducoAlCarrito(id) {
		var productoExistente = carrito.find((producto) => producto.id === id);
		if (productoExistente) {
			productoExistente.cantidad++;
		} else {
			carrito.push({
				id,
				cantidad: 1,
			});
		}
		console.log(carrito);
		localStorage.setItem("id", JSON.stringify(carrito));
	}
>>>>>>> 09c5a47fde173dd82bf251b2b67145b7ed38e7ae
});
