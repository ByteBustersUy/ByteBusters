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
        divProduct.classList.add("row", "cardProdDetail"); 

        divProduct.innerHTML = `<div class="row">
        <div class="col-sm-12 col-lg-5 container-img">
          <img class="card-img-top img-product-detail" src="../images/${data[id].imagen}" />
        </div>
        <div class="col-sm-12 col-lg-7">
          <div class="container-title">
            <h2>${data[id].nombre}</h2>
          </div>
          <div class="container-info-products">
            <div class="container-price">
              <h4>$${data[id].precio}</h4>
              </div>
                <div class="">
                  <input type="button" id="decrement" value="-">
                  <input class="input-num" type="number" >
                  <input type="button" id="increment" value="+">
                </div>
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


//Productos relacionados 

fetch("../../api/productos-relacionados.php?id=" + id, {
  method: "GET",
 headers: { 
     "Content-Type": "aplication/json",

 },
 
})

.then((response) => response.json())
.then((data) =>{ 
 const container = document.querySelector(".container-related-products");
 for (let id = 0; id < data.length; id++) {
  
     const divProduct = document.createElement("div");
     
     
      console.log(data[id].PRODUCTOS_id)
      fetch("../../api/detalleProducto.php?id=" + data[id].PRODUCTOS_id, {
        method: "GET",
        headers: { 
           "Content-Type": "aplication/json",
        },
      })
      .then((response) => response.json())
      .then((data) =>{ 
        console.log(data[0].imagen)
        divProduct.innerHTML = `
        <div class="card-list-product ">
        <img src="../images/${data[0].imagen}" />
        <div class="info-card">
          <div class="title-product">
            <p>${data[0].nombre}</p>
          </div>
          <div class="price">${data[0].precio}</div>
        </div>
      </div>
    
    ` ;
        container.appendChild(divProduct);
      })


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

})

decrement.addEventListener('click', function () {

    let cantidadActual = cantidadProduct.value;
    if (cantidadActual >1){
    cantidadActual --
    cantidadProduct.value=cantidadActual;
    console.log(cantidadProduct.value)
    }
    
    })





