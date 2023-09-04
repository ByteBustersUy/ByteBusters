document.addEventListener("DOMcontentloaded", function(){
    var carrito = [];
    
    //Guarda el carrito en el LocalStorage
    document.querySelectorAll("#agregar-carrito").forEach((btn) =>{
        btn.addEventListener("click", () => {
            var id = btn.getAttribute("data-id");
            var cantidad = 1;
            agregarProducoAlCarrito(id, cantidad)
        });
    });

    //carga carrito del localStorage
    var carritoGuardado = localStorage.getItem("carrito");
    if(carritoGuardado){
        carrito = JSON.parse(carritoGuardado);

    }

    function agregarProducoAlCarrito(id, cantidad){
        var productoExistente = carrito.find((producto) => producto.id === id);
        if(productoExistente){
            productoExistente.cantidad += cantidad;
        }else{
            carrito.push({
                id: id,
                cantidad: cantidad,
            });
        }
        
    }

});


console.log("andando");