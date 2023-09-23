window.addEventListener("load", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    console.log(id);
  
    fetch("../../api/detalle-producto.php?id=" + id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const container = document.querySelector(".cargame"); 
        for (let id = 0; id < data.length; id++) {
          const divPrduc = document.createElement("div"); 
          divPrduc.classList.add("row", "cardProd"); 
  
          divPrduc.innerHTML = `

          <div class="row">
          <div class="col-sm-12 col-lg-6">
            <img class="card-img-top" src="../images/${data[id].imagen}" />
          </div>
          <div class="col-sm-12 col-lg-6">
            <div class="container-title">
              <h2>${data[id].nombre}</h2>
            </div>
            <div class="container-info-products">
              <div class="container-price">
                <h4>${data[id].precio}</h4>
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
          `;
  
          container.appendChild(divPrduc); 
        }
      });
  });
  