//Buscador inteligente
/*const inputSearch = document.getElementById("navSearch");
inputSearch.addEventListener("keyup", () => {
    let cantProduc;
    fetch(`./../api/search.php?p=`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ value: inputSearch.value }),
    })
        .then((response) => response.json())
        .then((data) => {
            let contenido = "";
            for (let id = 0; id < data.length; id++) {
                contenido += `
            <div>
                <div class="card h-100 produc-promo" >
                    <a class="ir-detalle-producto" href="pages/carrito.html">
                        <img src="./images/${data[id].imagen} " class="card-img-top" alt="...">
                        <div class="card-body">
                            <h4>$${data[id].precio}</h4>
                            <h5>${data[id].nombre}</h5>
                        </div>
                    </a>
                    <a id="${data[id].id}" class="btn btn-agregar agregar-carrito">Agregar al carrito</a>
                </div>
            </div>`;
            }
            cantProduc = data.length;
            divProducPromo.innerHTML = contenido;
            cargarBotones(cantProduc);
        });
});*/

