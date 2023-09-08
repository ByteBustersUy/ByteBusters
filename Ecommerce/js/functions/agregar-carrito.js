document.addEventListener("DOMContentLoaded", function(){
    var carrito = [];
    //Guarda el carrito en el LocalStorage
    setTimeout(()=>{
        document.querySelectorAll(".agregar-carrito").forEach((btn) =>{
        
        btn.addEventListener("click", () => {
            var id = btn.id;
            console.log(id);
            agregarProducoAlCarrito(id)
        });
    });

}, 500);

    //carga carrito del localStorage
    var carritoGuardado = localStorage.getItem("id");
    if(carritoGuardado){
        carrito = JSON.parse(carritoGuardado);
        

    }

    function agregarProducoAlCarrito(id){
        var productoExistente = carrito.find((producto) => producto.id === id);
        if(productoExistente){
            productoExistente.cantidad ++;
        }else{
            carrito.push({
                id,
                cantidad:1 
            });
        }
        console.log(carrito);
        localStorage.setItem("id",JSON.stringify(carrito));
    }
   
});


