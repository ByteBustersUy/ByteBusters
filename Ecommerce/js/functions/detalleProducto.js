//Detalle producto

    let cantidadProduct=document.querySelector("input.input-num");
    const decrement = document.getElementById('decrement');
    const increment = document.getElementById('increment'); 

increment.addEventListener('click', function() {

let cantidadActual = cantidadProduct.value;
cantidadActual ++
cantidadProduct.value = cantidadActual;
console.log(cantidadProduct.value)
})

decrement.addEventListener('click', function () {

    let cantidadActual = cantidadProduct.value;
    if (cantidadActual >1){
    cantidadActual --
    cantidadProduct.value=cantidadActual;
    console.log(cantidadProduct.value)
    }
    
    })



    const agregarAlCarrito = document.getElementById('agregarAlCarrito');

    agregarAlCarrito.addEventListener('click', function () {
        

    });



