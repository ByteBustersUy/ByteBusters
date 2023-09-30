window.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('cat');
    console.log(id);
  
    fetch("../../api/productos-categorias.php?id=" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const container = document.querySelector(".container-sm"); 
        for (let id = 0; id < data.length; id++) {
          const divPrducPromo = document.createElement("div"); 
          divPrducPromo.classList.add("row", "cardProd"); 
  
          divPrducPromo.innerHTML = `
            <div class="col-md-12 d-flex">
              <a href=""><img src="../images/${data[id].imagen}" class="card-img-top img-producto-lista" alt="10"></a>
              <div>
                <a class="aNomb" href="">
                  <h3>${data[id].nombre}</h3>
                </a>
                <h4>${data[id].precio}</h4>
                <a id="${data[id].id}" href="#" class="btn btn-agregar buttonAdd">Agregar al carrito</a>
              </div>
            </div>
          `;
  
          container.appendChild(divPrducPromo); 
        }
      });
  });
  
