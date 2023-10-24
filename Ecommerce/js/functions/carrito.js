const divProductoCarrito = document.getElementById("region-producto");
const textoPrecioTotal = document.getElementById("text-precio");
let listadoCantidades = [];
let resultadoTotal;
let jsonCarrito;
let  idsProductos = JSON.parse(localStorage.getItem("id"));
let contenidoCarrito='';

function precioTotal(data,idsProductos) {
    resultadoTotal = 0;
    for (let i = 0; i< data.length; i++) {
        resultadoTotal += (parseInt(data[i].precio)*parseInt(idsProductos[i].cantidad))
        }
        textoPrecioTotal.innerHTML ='$'+resultadoTotal;
}
function actualizarValuesInputs() {
    listadoCantidades=[]
    divProductoCarrito.querySelectorAll("input.input-num").forEach(function(inputCantidad,ind ) {
        let idInput=inputCantidad.id;
        listadoCantidades.push({id:idInput,elemento:inputCantidad});
        console.log(inputCantidad.value=idsProductos[ind].cantidad)
    });
     console.log(listadoCantidades)
     console.log(idsProductos);
}

function cargarCarrito() {
    resultadoTotal = 0;
    divProductoCarrito.innerHTML = '';
    let productos = JSON.parse(localStorage.getItem("id"));
    let consulta = [];
    let texto = "";
    contenidoCarrito="";

    for (let index = 0; index < productos.length; index++) {
        consulta.push(productos[index]["id"]);
        if (index == productos.length - 1) {
            texto += productos[index]["id"];
        } else {
            texto += productos[index]["id"] + ",";
        }
    }
    let ruta = "../../api/carrito.php?c=" + texto;
    
    fetch(ruta)
        .then((response) => response.json())
        .then((data) => {
            jsonCarrito = data;
            for (let id = 0; id < data.length; id++) {

                contenidoCarrito+=`
                <div class="col-12 div-producto">
                    <img class="img-producto" src="./../images/${data[id].imagen}">
                    <div class="div-dato-produc">
                        <div class="div-nombre-produc">
                            <p class="nombre-produc">${data[id].nombre}</p>
                        </div>
                        <div class="cantidad">
                            <p class="precio-produc">${data[id].precio}</p>
                            <div>
                            <div class="btns-cantidad">
                                <button class="input-btn-menos" id="${data[id].id}" type="button">
                                    <i id="${data[id].id}" class="fa-solid fa-minus"></i>
                                </button>   
                                <input class="input-num" id="${data[id].id}" type="number" value=1 >
                                <button class="input-btn-mas" id="${data[id].id}" type="button">
                                    <i id="${data[id].id}" class="fa-solid fa-plus"></i>
                                </button>
                            </div>
                            </div>
                            <button class="btn-eliminar" id="${data[id].id}">
                                <i id="${data[id].id}" class="icon-eliminar fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>`
            }
            divProductoCarrito.innerHTML=contenidoCarrito;
            
        precioTotal(jsonCarrito,idsProductos)
        actualizarValuesInputs() 
       }) 
        .catch(error => {
            console.error("error", error)
        });
}

window.addEventListener('DOMContentLoaded',function (){
    cargarCarrito()
})


divProductoCarrito.addEventListener("click", function (event) {
    
    let idproducto;
    if ((event.target.className === "btn-eliminar")||(event.target.className === "icon-eliminar fa-solid fa-trash")) {
        idproducto = event.target.id;
        let indice = -2;
        for(let i = 0; i < idsProductos.length; i++) {
            if(idproducto == idsProductos[i].id) {
                indice = i;
            }
        }
        if (indice == -2) {
            localStorage.setItem("id", JSON.stringify(idsProductos));
        } else {
            idsProductos.splice(indice, 1);
            localStorage.setItem("id", JSON.stringify(idsProductos));
            cargarCarrito();
        }
    }
    let idBtnMas;
    let idBtnMenos;
    
    if ((event.target.className === "input-btn-mas")||(event.target.className==="fa-solid fa-plus")) {
        idBtnMas = event.target.id
        for(let e=0;e<idsProductos.length;e++){
            if(listadoCantidades[e].id==idBtnMas){
                listadoCantidades[e].elemento.value++;
                sumarProducoAlCarrito(idBtnMas);
            }
        }
        precioTotal(jsonCarrito,idsProductos)
    }         
        
    if ((event.target.className === "input-btn-menos")||(event.target.className==="fa-solid fa-minus")) {
        idBtnMenos = event.target.id
        for(let e=0;e<idsProductos.length;e++){
            if(listadoCantidades[e].id==idBtnMenos){
                if(listadoCantidades[e].elemento.value>1){
                    listadoCantidades[e].elemento.value--;
                    restarProducoAlCarrito(idBtnMenos);
                }
            }
        }
        precioTotal(jsonCarrito,idsProductos)
    }
})
const divComprar = document.getElementById("div-comprar")
divComprar.addEventListener("click", function (event) {
    if ((event.target.className=== "btn-comprar")){
        alert("su compra fue realizada corectamente")
        contenidoCarrito='';
        divProductoCarrito.innerHTML=contenidoCarrito;
        resultadoTotal = 0;
        textoPrecioTotal.innerHTML ='$'+resultadoTotal;
        carritoVacio=[];
        localStorage.setItem("id", JSON.stringify(carritoVacio));
    }
})
function sumarProducoAlCarrito(id) {
    let productoExistente = idsProductos.find((producto) => producto.id === parseInt(id));
    if (productoExistente) {
        productoExistente.cantidad++;
    } 
    console.log(idsProductos)
    localStorage.setItem("id", JSON.stringify(idsProductos));
}
function restarProducoAlCarrito(id) {
    let productoExistente = idsProductos.find((producto) => producto.id === parseInt(id));
    if (productoExistente) {
        if(productoExistente.cantidad>1){
            productoExistente.cantidad--;
        }
    } 
    console.log(idsProductos)
    localStorage.setItem("id", JSON.stringify(idsProductos));
}