const currentURL2 = window.location.href;
const urlParts2 = currentURL2.split("/");
const currentDir2 = urlParts2[urlParts2.length - 2];
let relativePath2;
if (currentDir2 == "pages") relativePath2 = "..";
if (currentDir2 == "Ecommerce") relativePath2 = ".";

document.addEventListener("DOMContentLoaded", function () {
	setTimeout(function () {
		const inputSearch = document.getElementById("navSearch");

		inputSearch.addEventListener("keyup", () => {
			if (inputSearch.value.length !== 0) {
				inputSearch.addEventListener("keyup", (event) => {
					if (inputSearch.value.length === 0 && event.key === "Backspace") {
						location.reload(true);
					}
				});
			}
			if (inputSearch.value.length > 2) {
				fetch(`../${relativePath}/api/search.php?ppp=4`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ value: inputSearch.value }),
				})
					.then((response) => response.json())
					.then((data) => {
						document
							.getElementById("carouselExampleIndicators")
							.setAttribute("style", "display: none");
						document
							.getElementById("tarjetas")
							.setAttribute("style", "display: none");
						document.getElementById("tituloDescuentosHome").innerHTML =
							"Mejores resultados";
						document
							.getElementById("tituloDescuentosHome")
							.setAttribute(
								"style",
								"font-size: 2rem; margin-top: 1rem; margin-bottom: 3rem"
							);
						let contenido = "";
						for (let id = 0; id < data.length; id++) {
							contenido += `
                <div class="row cardProdSearch">
                <div class="col-md-12 d-flex">
                  <a href="pages/detalleProducto.html?id=${data[id].id}">
				  	<img src="./images/${data[id].imagen}" class="card-img-top img-producto-lista" alt="10">
				  </a>
                <div>
                    <a class="aNomb" href="pages/detalleProducto.html?id=${data[id].id}">
                      	<h3>${limitarNombres(data[id].nombre)}</h3>
                    	<h4>$${data[id].precio}</h4>
					</a>
                    <a id="${data[id].id}" href="#" class="btn btn-agregar agregar-carrito buttonAdd">Agregar al carrito</a>
                  </div>
                </div>
                </div>`;
						}

						cantProduc = data.length;
						// document.getElementsByClassName(".otra-cosa")[0].innerHTML = contenido;
						document.getElementById("container-search").innerHTML = contenido;
					});
			}
		});
	}, 1000);
});

function limitarNombres(nombre) {
	if (nombre.length > 30) {
		nombre = nombre.slice(0, 30);
		if (!nombre.endsWith(" ")) {
			indiceUltimaPalabra = nombre.lastIndexOf(" ");
			nombre = nombre.slice(0, indiceUltimaPalabra);
		}
	}
	return nombre;
}
