const divProductoCarrito = document.getElementById("region-producto");
const textoPrecioTotal = document.getElementById("text-precio");
listadoCantidades = [];
let resultadoTotal;
let jsonCarrito;

function precioTotal(data, listadoCantidades) {
    resultadoTotal = 0;
    if (!listadoCantidades || listadoCantidades.length === 0) {
        for (let i = 0; i < data.length; i++) {
            resultadoTotal += parseInt(data[i].precio);
        }

        textoPrecioTotal.innerHTML = resultadoTotal;
        console.log(resultadoTotal);
    } else {
        for (let i = 0; i < data.length; i++) {
            resultadoTotal += parseInt(data[i].precio) * parseInt(listadoCantidades[i].cant);
        }
        textoPrecioTotal.innerHTML = resultadoTotal;
        console.log(resultadoTotal);
    }
}

function cargarCarrito() {
    resultadoTotal = 0;

    let documento = document.querySelector(".row");
    documento.innerHTML = '';
    let productos = JSON.parse(localStorage.getItem("id"));
    let consulta = [];
    let texto = "";


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

                const newElement = document.createElement("div");
                const divnombreproduc = document.createElement("div");
                const divproducto = document.createElement("div");
                const imgproducto = document.createElement("img");
                const divcantidad = document.createElement("div");
                const nombreProduc = document.createElement("p");
                const btnscantidad = document.createElement("div");
                const inputnum = document.createElement("input");
                const inputbtnmas = document.createElement("button");
                const inputbtnmenos = document.createElement("button");
                const precioProducto = document.createElement("p");
                const btneliminar = document.createElement("button");

                //LES OTORGO UNA CLASE A LOS ELEMENTOS
                newElement.classList.add("col-12");
                newElement.classList.add("div-producto");
                nombreProduc.classList.add("nombre-produc"),
                    divnombreproduc.classList.add("div-nombre-produc");
                precioProducto.classList.add("precio-produc")
                divproducto.classList.add("div-dato-produc");
                divcantidad.classList.add("cantidad");
                imgproducto.classList.add("img-producto");
                btneliminar.classList.add("btn-eliminar");
                btneliminar.setAttribute("id", data[id].id);
                btnscantidad.classList.add("btns-cantidad");
                inputnum.classList.add("input-num");
                inputnum.setAttribute("id", data[id].id);
                inputnum.setAttribute("name", data[id].id);
                inputbtnmenos.classList.add("input-btn-menos");
                inputbtnmenos.setAttribute("id", data[id].id);
                inputbtnmas.classList.add("input-btn-mas");
                inputbtnmas.setAttribute("id", data[id].id);

                //AGREGO PROPIEDADES A LOS ELEMENTOS 
                nombreProduc.textContent = data[id].nombre;
                imgproducto.src = "./../images/" + data[id].imagen;
                inputbtnmenos.type = "button";
                inputbtnmenos.innerHTML = `<i id=${data[id].id} class='fa-solid fa-minus'></i>`;
                inputnum.type = "number";
                inputnum.value = 1;
                //inputnum.min = 1;
                inputbtnmas.type = "button";
                inputbtnmas.innerHTML = `<i id=${data[id].id} class='fa-solid fa-plus'></i>`;


                precioProducto.textContent = "$" + data[id].precio;

                btneliminar.innerHTML = `<i id=${data[id].id} class="icon-eliminar fa-solid fa-trash"></i>`;

                //SE AÑADEN LOS ELEMENTOS AL DOCUMENTO HTML 
                documento.appendChild(newElement);
                newElement.appendChild(imgproducto);
                newElement.appendChild(divproducto);
                divnombreproduc.appendChild(nombreProduc);
                divproducto.append(divnombreproduc);
                btnscantidad.append(inputbtnmenos);
                btnscantidad.append(inputnum);
                btnscantidad.append(inputbtnmas);
                divcantidad.appendChild(precioProducto);
                divcantidad.append(btnscantidad);
                divcantidad.append(btneliminar);
                divproducto.appendChild(divcantidad);
            }
            precioTotal(jsonCarrito);
        })
        .catch(error => {
            console.error("error", error)
        });
}

window.addEventListener('DOMContentLoaded',function (){
     cargarCarrito()

     /*setTimeout(() => {
        divProductoCarrito.querySelectorAll("input.input-num").forEach(inputCantidad => {
            listadoCantidades.push({id:inputCantidad.id ,cant:inputCantidad.value});
                            
            
        });
        console.log(listadoCantidades)
     }, 2000);*/
    
})


divProductoCarrito.addEventListener("click", function (event) {
    
    let idproducto;
    if ((event.target.className === "btn-eliminar")||(event.target.className === "icon-eliminar fa-solid fa-trash")) {
        idproducto = event.target.id;

        let idsProductos = JSON.parse(localStorage.getItem("id"));
        let indice = -2;

        for(let i = 0; i < idsProductos.length; i++) {
            if(idproducto == idsProductos[i].id) {
                indice = i;
            }
        }
        console.log(idproducto)
        console.log(idsProductos)
        console.log(indice)
        
        if (indice == -2) {
            localStorage.setItem("id", JSON.stringify(idsProductos));
        } else {
            idsProductos.splice(indice, 1);
            localStorage.setItem("id", JSON.stringify(idsProductos));
            cargarCarrito();
        }
    }
    /*let idBtnMas;
    let idBtnMenos;
    let input;
    if ((event.target.className === "input-btn-mas")||(event.target.className==="fa-solid fa-plus")) {
        //console.log("mas")
        idBtnMas = event.target.id
        console.log(idBtnMas);
        let e;
        for(e=0;e<listadoCantidades.length;e++){
            if (listadoCantidades[e].id==idBtnMas) {
                listadoCantidades[e].cant++
                input = document.getElementsByName(listadoCantidades[e].id);
            }
            
           
               
            
        }
       // inpu[0].value = listadoCantidades[e].cant;
        console.log(input)
        console.log(listadoCantidades);
    }
    if ((event.target.className === "input-btn-menos")||(event.target.className==="fa-solid fa-minus")) {
        console.log("menos")
        idBtnMenos = event.target.id
        console.log(idBtnMenos);
    }
    
    if ((event.target.type === "number")&&(event.target.id ===idBtnMas)){
        valorInput = event.target.value
        console.log(valorInput);
        precioTotal(jsonCarrito, listadoCantidades)
    }*/

})



