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
    });
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
                            <p class="precio-produc">$${data[id].precio}</p>
                            <div class="btns-cantidad">
                                <button class="input-btn-menos" id="${data[id].id}" type="button">
                                    <i id="${data[id].id}" class="fa-solid fa-minus"></i>
                                </button>   
                                <input disabled  class="input-num" id="${data[id].id}" type="number" value=1 >
                                <button class="input-btn-mas" id="${data[id].id}" type="button">
                                    <i id="${data[id].id}" class="fa-solid fa-plus"></i>
                                </button>
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
        for(let e=0;e<listadoCantidades.length;e++){
            if(listadoCantidades[e].id==idBtnMas){
                listadoCantidades[e].elemento.value++;
                sumarProducoAlCarrito(idBtnMas);
            }
        }
        precioTotal(jsonCarrito,idsProductos)
    }         
        
    if ((event.target.className === "input-btn-menos")||(event.target.className==="fa-solid fa-minus")) {
        idBtnMenos = event.target.id
        for(let e=0;e<listadoCantidades.length;e++){
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

const btnComprar = document.getElementById("btn-comprar")
btnComprar.addEventListener("click", function () {
    
        carritoVacio=[];
        localStorage.setItem("id", JSON.stringify(carritoVacio));
        generarPDF();
        alert("su compra fue realizada corectamente")
        cargarCarrito()
       
        resultadoTotal = 0;
        textoPrecioTotal.innerHTML ='$'+resultadoTotal;
        
})
function sumarProducoAlCarrito(id) {
    let productoExistente = idsProductos.find((producto) => producto.id === parseInt(id));
    if (productoExistente) {
        productoExistente.cantidad++;
    } 
    localStorage.setItem("id", JSON.stringify(idsProductos));
}
function restarProducoAlCarrito(id) {
    let productoExistente = idsProductos.find((producto) => producto.id === parseInt(id));
    if (productoExistente) {
        if(productoExistente.cantidad>1){
            productoExistente.cantidad--;
        }
    } 
    localStorage.setItem("id", JSON.stringify(idsProductos));
}
function generarPDF() {
    let doc = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4'})
    let alto=20;
        doc.text("Producto",20,10)
        doc.text("Cantidad",120,10)
        doc.text("Precio",150,10)
    for (let indi = 0; indi < jsonCarrito.length; indi++) { 
         if((indi==28)||(indi==56)||(indi==84)||(indi==112)){
        doc.addPage()
        alto=10;
        }
        let nombre = limitarNombres(jsonCarrito[indi].nombre)
        let cantidad=idsProductos[indi].cantidad.toString()
        doc.text(nombre, 10,alto);
        doc.text(cantidad,130,alto);
        doc.text("$"+jsonCarrito[indi].precio,150,alto);
        alto+=10;  
    }
    alto+=10;
    let precioTotal= resultadoTotal.toString();
    doc.text("Total a Pagar: $"+precioTotal,113,alto);
    doc.save('boleta.pdf')
}
function limitarNombres(nombre){
	if (nombre.length > 30) {
		nombre = nombre.slice(0, 40);
		if (!nombre.endsWith(" ")) {
			indiceUltimaPalabra = nombre.lastIndexOf(" ");
			nombre = nombre.slice(0, indiceUltimaPalabra);
		}
	}
	return nombre;
}