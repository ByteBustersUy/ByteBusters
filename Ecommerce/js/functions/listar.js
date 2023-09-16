window.addEventListener("load", function () {
	fetch("../api/search.php")
		.then((response) => response.json())
		.then((data) => {
			for (let id = 0; id < data.length; id++) {
				const divPrducPromo = document.getElementById("tarjetas");
				
        divPrducPromo.innerHTML += `
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
		});



    });
