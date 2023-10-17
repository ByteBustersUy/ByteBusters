//Detalle producto

const urlParams = new URLSearchParams(window.location.search); 
const id = urlParams.get('id');


fetch("../../api/detalleProducto.php?id=" + id, {
     method: "POST",
    Headers: { 
        "Content-Type": "aplication/json",

    },
    
})

.then((response) => response.json())
.then((data) =>{ 
    const container = document.querySelector(".info");
    for (let id = 0; id < data.length; id++) {
        const divProduct = document.createElement("div");
        divProduct.classList.add("row", "cardProd"); 

        divProduct.innerHTML = `<div class="row">
        <div class="col-sm-12 col-lg-6">
          <img class="card-img-top img-product-detail" src="../images/${data[id].imagen}" />
        </div>
        <div class="col-sm-12 col-lg-6">
          <div class="container-title">
            <h2>${data[id].nombre}</h2>
          </div>
          <div class="container-info-products">
            <div class="container-price">
              <h4>$${data[id].precio}</h4>
            </div>
            <div class="">
              <input type="button" value="-">
              <input class="input-num" type="number" placeholder="1">
              <input type="button" value="+">
            </div>
            <button class="add-to-cart" id="${data[id].id}">Agregar al carrito</button>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="details-product">
            <div class="info-product">
              <p>Descripcion: ${data[id].descripcion}</p>

            </div>
          </div>
        </div>
      </div>
    ` ;
        container.appendChild(divProduct);
    }
})



//cantidad de Producto

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



    


