const divProductoCarrito = document.getElementById("region-producto");
const textoPrecioTotal = document.getElementById("text-precio");
let idPromocion;
let listadoCantidades = [];
let resultadoTotal;
let totalPagar=0;
let jsonCarrito;
let  dataByLocaStorage = JSON.parse(localStorage.getItem("id"));
let contenidoCarrito='';
let descuentoDB;
let cantidadProductoLocal
let precioProducto;

function actualizarValuesInputs() {
    listadoCantidades=[]
    divProductoCarrito.querySelectorAll("input.input-num").forEach(function(inputCantidad) {
        let idInput=inputCantidad.id;
        listadoCantidades.push({id:idInput,elemento:inputCantidad});
    });
}

function cargarCarrito() {
    
   
    totalPagar=0;
    resultadoTotal = 0;
    divProductoCarrito.innerHTML = '';
    let productos = JSON.parse(localStorage.getItem("id"));
   
    let texto = "";
    contenidoCarrito="";

    for (let index = 0; index < productos.length; index++) {
       //listadoCantidades[index].elemento.value=parseInt(productos[index].cantidad)
        if (index == productos.length - 1) {
            texto += productos[index]["id"];
        } else {
            texto += productos[index]["id"] + ",";
        }
    }
    let ruta = "../../api/carrito.php?c=" + texto;
    
    fetch(ruta)
        .then((response) => response.json())
        .then(async (data) => {
            jsonCarrito = data;
            for (let i = 0; i < data.length; i++) {
                cantidadProductoLocal= productos[i]["cantidad"]
                precioProducto=data[i].precio
                const idProducto=data[i].id;
                idPromocion =(await producHasPromo(idProducto))[0]?.promociones_id;
                
                
                if(idPromocion){
                    descuentoDB = (await adquirirDescuento(idPromocion))[0].descuento                   
                }
                
                if((descuentoDB)&&(idPromocion)) {
                    totalPagar+= precioTotal(precioProducto,descuentoDB,cantidadProductoLocal)
                    contenidoCarrito += modificarContentCarrito(data[i], descuentoDB);
                }else{
                    contenidoCarrito += modificarContentCarrito(data[i]);
                    totalPagar+=precioTotal(precioProducto,0,cantidadProductoLocal)
                }

            }
            textoPrecioTotal.innerHTML ='$'+totalPagar;
            divProductoCarrito.innerHTML=contenidoCarrito;
            actualizarValuesInputs()
            for (let e = 0; e < listadoCantidades.length; e++) {
                listadoCantidades[e].elemento.value=productos[e].cantidad
                
            }
    }) 
    .catch(error => {
        console.error("error", error)
    });
}

window.addEventListener('DOMContentLoaded',function (){
    cargarCarrito()
})

divProductoCarrito.addEventListener("click", function (event) {
    
    let idBtnEliminar;
    if ((event.target.className === "btn-eliminar")||(event.target.className === "icon-eliminar fa-solid fa-trash")) {
        idBtnEliminar = event.target.id;
        let indice = -2;
        for(let i = 0; i < dataByLocaStorage.length; i++) {
            if(idBtnEliminar == dataByLocaStorage[i].id) {
                indice = i;
            }
        }
        if (indice == -2) {
            localStorage.setItem("id", JSON.stringify(dataByLocaStorage));
        } else {
            dataByLocaStorage.splice(indice, 1);
            localStorage.setItem("id", JSON.stringify(dataByLocaStorage));
            cargarCarrito();
        }
        totalPagar=0;
        textoPrecioTotal.innerHTML ='$'+totalPagar;
    }
    let idBtnMas;
    let idBtnMenos;
    let accion;
    if ((event.target.className === "input-btn-mas")||(event.target.className==="fa-solid fa-plus")) {
        idBtnMas = event.target.id
        accion='+';
       
        for(let e=0;e<listadoCantidades.length;e++){
            if(listadoCantidades[e].id==idBtnMas){
                listadoCantidades[e].elemento.value++;
                sumarProducoAlCarrito(idBtnMas);
                actualizarPrecioTotal(idBtnMas,accion)
            }
        }
    }         
        
    if ((event.target.className === "input-btn-menos")||(event.target.className==="fa-solid fa-minus")) {
        idBtnMenos = event.target.id
        accion='-';
        for(let e=0;e<listadoCantidades.length;e++){
            if(listadoCantidades[e].id==idBtnMenos){
                if(listadoCantidades[e].elemento.value>1){
                    listadoCantidades[e].elemento.value--;
                    restarProducoAlCarrito(idBtnMenos);
                    actualizarPrecioTotal(idBtnMenos,accion)
                }
            }
        } 
    }
})

const btnComprar = document.getElementById("btn-comprar")
btnComprar.addEventListener("click", function () {
    
        carritoVacio=[];
        localStorage.setItem("id", JSON.stringify(carritoVacio));
        console.log(totalPagar);
        generarPDF();
        alert("su compra fue realizada corectamente")
        
       
        resultadoTotal = 0;
        textoPrecioTotal.innerHTML ='$'+resultadoTotal;
        setTimeout(() => {
            cargarCarrito()
        },1250);
        
})
function sumarProducoAlCarrito(id) {
    let productoExistente = dataByLocaStorage.find((producto) => producto.id === parseInt(id));
    if (productoExistente) {
        productoExistente.cantidad++;
    } 
    localStorage.setItem("id", JSON.stringify(dataByLocaStorage));
}
function restarProducoAlCarrito(id) {
    let productoExistente = dataByLocaStorage.find((producto) => producto.id === parseInt(id));
    if (productoExistente) {
        if(productoExistente.cantidad>1){
            productoExistente.cantidad--;
        }
    } 
    localStorage.setItem("id", JSON.stringify(dataByLocaStorage));
}
async function generarPDF() {
    let doc = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4'})
        doc.setFontSize(11);
        doc.line(10,10,200,10);
        doc.text("RESUMEN DE COMPRA",78,20)
        doc.text("Producto",20,30)
        doc.text("Cantidad",120,30)
        doc.text("Precio uni",150,30)
        doc.text("Precio total",180,30)
        let alto=40;
    for (let indi = 0; indi < jsonCarrito.length; indi++) { 
         if((indi==28)||(indi==56)||(indi==84)||(indi==112)){
        doc.addPage()
        alto=10;
        }
        idPromocion=(await producHasPromo(jsonCarrito[indi].id))[0]?.promociones_id
        if(idPromocion){
            descuentoDB = (await adquirirDescuento(idPromocion))[0].descuento                   
        }
        if((descuentoDB)&&(idPromocion)) {
            let nombre = limitarNombres(jsonCarrito[indi].nombre)
            let precidescontado=(Math.round(jsonCarrito[indi].precio * (100 - descuentoDB) / 100))
            let cantidad=dataByLocaStorage[indi].cantidad.toString()
            doc.text(nombre, 10,alto);
            doc.text(cantidad,130,alto);
            doc.text("$"+precidescontado,155,alto);
            doc.text("$"+precidescontado*cantidad,185,alto);
        alto+=10;
        }else{
            let nombre = limitarNombres(jsonCarrito[indi].nombre)
            let cantidad=dataByLocaStorage[indi].cantidad.toString()
            doc.text(nombre, 10,alto);
            doc.text(cantidad,130,alto);
            doc.text("$"+jsonCarrito[indi].precio,155,alto);
            doc.text("$"+jsonCarrito[indi].precio*cantidad,185,alto);
            alto+=10; 
        }  
    }
    alto+=10;
    let precioTotal= resultadoTotal.toString();
    doc.text("Total a Pagar: $"+totalPagar,140,alto);
    doc.save('boleta.pdf')
}
function limitarNombres(nombre){
	if (nombre.length > 50) {
		nombre = nombre.slice(0, 60);
		if (!nombre.endsWith(" ")) {
			indiceUltimaPalabra = nombre.lastIndexOf(" ");
			nombre = nombre.slice(0, indiceUltimaPalabra);
		}
	}
	return nombre;
}
async function producHasPromo(idProducto){
   const respuesta = await fetch("../../api/promocion.php?id=" + idProducto, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (respuesta.ok) {
        let data=respuesta.json();
        return data;
      } else {
        return null;
      }
        
        
}
async function adquirirDescuento(idPromo){
    const response = await fetch("../../api/promocion.php?idPromo=" + idPromo, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if(response.ok){
      const data = response.json();
      return data;
    }else{
      return null;
    }
  }
function modificarContentCarrito(data,descuento) {
    
    if (descuento) {
        let precioDescuento=Math.round(data.precio * (100 - descuento) / 100);
        return`
        <div class="col-12 div-producto">
            <img class="img-producto" src="./../images/${data.imagen}">
            <div class="div-dato-produc">
                <div class="div-nombre-produc">
                    <p class="nombre-produc producto-nom-promo">${data.nombre}</p>
                </div>
                <div class="cantidad">
                    <h6>$${data.precio} </h6>
                    <p class="precio-produc">$${precioDescuento}</p>
                    <div class="btns-cantidad">
                        <button class="input-btn-menos" id="${data.id}" type="button">
                            <i id="${data.id}" class="fa-solid fa-minus"></i>
                        </button>   
                        <input disabled  class="input-num" id="${data.id}" type="number" value=1 >
                        <button class="input-btn-mas" id="${data.id}" type="button">
                            <i id="${data.id}" class="fa-solid fa-plus"></i>
                        </button>
                    </div>
                    <button class="btn-eliminar" id="${data.id}">
                        <i id="${data.id}" class="icon-eliminar fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>`
    } else {
        return`
        <div class="col-12 div-producto">
            <img class="img-producto" src="./../images/${data.imagen}">
            <div class="div-dato-produc">
                <div class="div-nombre-produc">
                    <p class="nombre-produc">${data.nombre}</p>
                </div>
                <div class="cantidad">
                    <p class="precio-produc">$${data.precio}</p>
                    <div class="btns-cantidad">
                        <button class="input-btn-menos" id="${data.id}" type="button">
                            <i id="${data.id}" class="fa-solid fa-minus"></i>
                        </button>   
                        <input disabled  class="input-num" id="${data.id}" type="number" value=1 >
                        <button class="input-btn-mas" id="${data.id}" type="button">
                            <i id="${data.id}" class="fa-solid fa-plus"></i>
                        </button>
                    </div>
                    <button class="btn-eliminar" id="${data.id}">
                        <i id="${data.id}" class="icon-eliminar fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>`
    }
  }
function precioTotal(pecioProduc,descuento,cantidadProducto) {
   
    resultadoTotal = 0;
    if(descuento==0) {    
        resultadoTotal = (parseInt(pecioProduc)*parseInt(cantidadProducto));
         
    }else{
        resultadoTotal = (parseInt(pecioProduc * (100 - descuento) / 100)*parseInt(cantidadProducto));
      
    }
    return resultadoTotal;
}
function actualizarPrecioTotal(idProducto,accion) {
    const precios = divProductoCarrito.querySelectorAll("p.precio-produc");
    let precioProduc='';
    for (let indice = 0; indice < listadoCantidades.length; indice++) {
        precioProduc= precios[indice].outerText
        if ((listadoCantidades[indice].id==idProducto)&&(accion=='+')) {
            totalPagar=totalPagar+parseInt(precioProduc.substring(1));
           
        }  
        else if ((listadoCantidades[indice].id==idProducto)&&(accion=='-')) {
            totalPagar=totalPagar-parseInt(precioProduc.substring(1));
           
        } 
    }
    textoPrecioTotal.innerHTML ='$'+totalPagar;
}