
//cargar por categorías
const btnCategories = document.getElementById("btnCategories");
btnCategories.addEventListener("click", () => {
    const categorias = document.getElementsByClassName("nav-link");
    for (let category of categorias) {
        category.addEventListener("click", (element) => {
            const id = element.target.id;
            console.log("id de categoría: ", id);

            fetch("../../api/productos-categorias.php" + id, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              })
                .then((response) => {
                  console.log("status: ", response.status);
                  return response.json();
                })
                .then((data) => {
                  console.log("data tiene: ", data);
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
                             category = data.length;
                             divProducPromo.innerHTML = contenido;
                            cargarBotones(category);
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    }
});