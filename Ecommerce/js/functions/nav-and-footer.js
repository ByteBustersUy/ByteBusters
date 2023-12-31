const currentURL = window.location.href;
const urlParts = currentURL.split("/");
const currentDir = urlParts[urlParts.length - 2];
let relativePath;
if (currentDir == "pages") relativePath = "..";
if (currentDir == "Ecommerce") relativePath = ".";

function loadNav() {
	loadCategoriesDesktop();
	loadCategoriesMobile();
	let navHTML = `
  <nav id="navConSearch" class="navbar navbar-light bg-light">
    <div class="d-flex m-auto">
      <a href="${relativePath}/index.html" id="logo"><img class="logo" src="${relativePath}/assets/logo-empresa.png" alt=""/></a>
      <button id="btnNavOption" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbarMenu" aria-controls="offcanvasNavbarMenu" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbarMenu" aria-labelledby="offcanvasNavbarMenu">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasNavbarCatLabel">CATEGORIAS</h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <ul id="list-categories-mob" class="navbar-nav justify-content-end flex-grow-1 pe-3">
          </ul>
        </div>
      </div>
      <form class="d-flex">
      <input id="navSearch" autofocus class="form-control search" type="search" placeholder="Buscar en Digitalmarket" aria-label="Search"/>
      <button id="btnNavSearch" class="btn btn-outline-secondary" type="button">Buscar</button>
  </form>

      <a id="btnCarrito" href="${relativePath}/pages/carrito.html">
        <img class="carrito" src="${relativePath}/assets/Carts_Icons.png" alt="logo carrito de compras" />
        
      </a>
    </div>
  </nav>
  <nav id="navConBotones" class="navbar" id="burgerCategories">
    <div class="menu">
    <button id="btnCategories" class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbarCat" aria-controls="offcanvasNavbarCat" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span><p id="categorias">CATEGORIAS</p>
    </button>
      <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbarCat" aria-labelledby="offcanvasNavbarCatLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasNavbarCatLabel">CATEGORIAS</h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <ul id="list-categories-desk" class="navbar-nav justify-content-end flex-grow-1 pe-3">
          </ul>
        </div>
      </div>
    </div>
  </nav>`;
	document.body.insertAdjacentHTML("afterbegin", navHTML);
}

window.onload = loadNav;

/*Footer*/

function loadFooter() {
	let footerHTML = `
  <footer class="footer">
    <div>
      <div id="divDatosEmpresa" class="datos-emp">
      </div>
      <div class="footer-icons mb-2">
        <a href="https://www.instagram.com/" target="_blank"><i class="bi bi-instagram"></i></a>
        <a href="https://www.whatsapp.com/" target="_blank"><i class="bi bi-whatsapp"></i></a>
        <a href="https://www.facebook.com/" target="_blank"><i class="bi bi-messenger"></i></a>
      </div>
      <div class="mt-2">
        <p id="copy">&copy; 2023 Bytebusters. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>`;

//Redirect boton buscar
const botonBuscar = (event) => {
  event.preventDefault(); 
  const inputSearch = document.getElementById("navSearch");
  const searchValue = inputSearch.value;
  if(searchValue === ""){
    return;
  }
  window.location.href = `${relativePath}/pages/listar.html?search=${searchValue}`;
};

document.getElementById("btnNavSearch").addEventListener("click", botonBuscar);
document.getElementById("navSearch").addEventListener("keypress", (event) => {
  if(event.key === 'Enter'){
    botonBuscar(event);
  }
});

	//Datos de empresa
	fetch(`${relativePath}/../api/datos-empresa.php`)
		.then((response) => response.json())
		.then((data) => {
			const divDatosEmpresa = document.getElementById("divDatosEmpresa");
			divDatosEmpresa.innerHTML += `
            <p>Dirección: ${data[0].calle} ${data[0].numero} - ${data[0].ciudad}</p>
            <p>Teléfono: ${data[0].telefono} </p>
			      <p><b>${data[0].comentarios}</b></p>
			`;
		});

	document.body.insertAdjacentHTML("beforeend", footerHTML);
}

function loadCategoriesDesktop() {
	fetch(`${relativePath}/../api/categorias.php`)
		.then((response) => response.json())
		.then((data) => {
			const listCategories = document.getElementById("list-categories-desk");
			listCategories.innerHTML = "";
			for (let i = 0; i < data.length; i++) {
				listCategories.innerHTML += `<li class="nav-item">
            <a class="nav-link active" aria-current="page" id="${data[i].id}" href="./${relativePath}/pages/listar.html?cat=${i+1}">${data[i].nombre}</a>
          </li>`;
			}
		});
}

function loadCategoriesMobile() {
	fetch(`${relativePath}/../api/categorias.php`)
		.then((response) => response.json())
		.then((data) => {
			const listCategories = document.getElementById("list-categories-mob");
			listCategories.innerHTML = "";
			for (let id = 0; id < data.length; id++) {
				listCategories.innerHTML += `<li class="nav-item">
            <a class="nav-link active" aria-current="page" id="${data[id].id}" href="./${relativePath}/pages/listar.html?cat=${id}">${data[id].nombre}</a>
          </li>`;
			}
		});
}

function loadLinks() {
	return `
      <ul>
        <li><a href="${relativePath}/index.html" class="disabled">Inicio</a></li>
        <li><a href="#" class="disabled">Acerca de</a></li>
        <li><a href="#" class="disabled">Servicios</a></li>
        <li><a href="#" class="disabled">Contacto</a></li>
      </ul>
      `;
}

window.onload = function () {
	loadNav();
	loadFooter();
};
