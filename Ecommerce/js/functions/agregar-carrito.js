
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
});
