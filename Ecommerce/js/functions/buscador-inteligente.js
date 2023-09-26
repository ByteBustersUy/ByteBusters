document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
      const inputSearch = document.getElementById("navSearch");
      inputSearch.addEventListener("keyup", () => {
        let cantProduc;
        fetch(`../../api/search.php?p=`, {
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
                <div class="row cardProd">
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
                </div>
              `;
              
            }
            
            cantProduc = data.length;
            document.querySelector('.container-sm').innerHTML = contenido;
            
            
        });
      });
    }, 1000); 
  });