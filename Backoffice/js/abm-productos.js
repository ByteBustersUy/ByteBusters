const btnAddProduct = document.getElementById("btnAddProduct");
const btnEditProduct = document.getElementById("btnEditProduct");
const btnDeleteProduct = document.getElementById("btnDeleteProduct");
const btnPromocionar = document.getElementById("btnPromocionar");
const formAbm = document.getElementById("formAbmProduct");
const btnSubmitModal = document.getElementById("btnSubmitModal");
const btnUploadImage = document.getElementById("btnUploadImage");
let selectedRow;

const validators = {
	isSame: (a, b) => a === b,
	isEqual: (a, b) => a == b,
	isEmpty: (a) => a.length === 0,
	startWithUpperCase: (str) => (new RegExp("^[A-Z]+").test(str) ? true : false),
	containWitheSpaces: (str) => (new RegExp("\\s+").test(str) ? true : false),
};

//Agregar Producto
btnAddProduct.addEventListener("click", () => {
	btnAddProduct.setAttribute("class", "enabled-button");
	modalProducts.getElementsByClassName("modal-title")[0].innerHTML =
		"Agregar producto";

	if (document.getElementById("errorMessageModal").innerHTML.length > 0) {
		btnSubmitModal.disabled = true;
		btnSubmitModal.setAttribute("style", "filter:brightness(30%);");
	} else {
		btnSubmitModal.disabled = false;
		btnSubmitModal.setAttribute("style", "filter:brightness(100%);");
		document.getElementById("btnUploadImage").setAttribute("required");
	}
	formAbm.attributes.item(
		2
	).value = `../src/modules/products/abm-productos.php?action=add`;
});

btnUploadImage.addEventListener("change", () => {
	if (btnUploadImage.files.length > 0) {
		document.getElementById(
			"uploadLabel"
		).innerHTML = `"${btnUploadImage.files[0].name
			.replaceAll(" ", "-")
			.slice(0, 22)}..."`;
	}
});

//Editar Producto
btnEditProduct.addEventListener("click", async () => {
	if (!btnEditProduct.classList.contains("disabled")) {
		btnEditProduct.setAttribute("class", "enabled-button");
		const productId = document.getElementsByClassName("selected")[0].id;

		modalProducts.getElementsByClassName("modal-title")[0].innerHTML =
			"Editar producto ";

		const inputsForm = {
			nombre: modalProducts.getElementsByTagName("input")[0],
			categoria: modalProducts.getElementsByTagName("select")[0],
			imagen: modalProducts.getElementsByTagName("input")[1],
			precio: modalProducts.getElementsByTagName("input")[2],
			descripcion: modalProducts.getElementsByTagName("textarea")[0],
		};

		const selectedUserData = {
			nombre: selectedRow.getElementsByTagName("td")[0].innerHTML,
			categoria: selectedRow.getElementsByTagName("td")[1].id,
			precio: parseFloat(
				selectedRow.getElementsByTagName("td")[2].innerHTML.replace("$", "")
			)
		};
		

		inputsForm.nombre.value = selectedUserData.nombre;
		inputsForm.precio.value = selectedUserData.precio;

		const options = inputsForm.categoria.getElementsByTagName("option");
		for (let i = 0; i < options.length; i++) {
			if (
				options[i].innerHTML ==
				selectedRow.getElementsByTagName("td")[1].innerHTML
			) {
				options[i].setAttribute("selected", true);
			}
		}
		const productData = await getProductData(productId);
		console.log(productData.descripcion)
		inputsForm.descripcion.value = productData.descripcion;
		document.getElementById("uploadLabel").innerHTML = "Cambiar imágen";
		document.getElementById("btnUploadImage").removeAttribute("required");

		formAbm.attributes.item(
			2
		).value = `../src/modules/products/abm-productos.php?action=edit&id=${productId}`;
	}
});

// Eliminar producto
btnDeleteProduct.addEventListener("click", () => {
	if (!btnDeleteProduct.classList.contains("disabled")) {
		btnDeleteProduct.setAttribute("class", "enabled-button");
		const productRow = document.getElementsByClassName("selected")[0];
		const productId = productRow.id;
		const response = prompt(
			`Se eliminará el producto con id ${productId} \n\nIngrese el id para confirmar`
		);
		if (response == productId) {
			deleteProduct(productId);
		} else {
			alert("Error: El id ingresado no es correcto");
		}
		document
			.getElementsByClassName("selected")[0]
			?.classList.remove("selected");
		btnDeleteProduct.classList.replace("enabled-button", "disabled");
		document.getElementById("btnEditProduct").setAttribute("class", "disabled");
	}
});

// detalle producto 
const buttonsProductDetail = document.getElementsByClassName("btn-eye");
for (let btn of buttonsProductDetail) {
	btn.addEventListener("click", async () => {
		const productData = await getProductData(btn.id);
		//modal header
		modalProductsDetail.getElementsByClassName("modal-title")[0].innerHTML =
			"Detalle de producto";
		//modal body
		const modalBody =
			modalProductsDetail.getElementsByClassName("modal-body")[0];
		modalBody.innerHTML = `
					<div class="product-image">
					<img id="productImageDetail" src="../../Ecommerce/images/${productData.imagen}">
					</div>
					<div class="product-detail">
						<h4>${productData.nombre}</h4>
						<div class='mt-4 product-description'>
							<p>${productData.descripcion}</p>
						</div>
					${
						productData.descuento > 0
							? `<span class="mt-2">Descuento: ${productData.descuento}%</span>
								<span>Precio sin descuento: $${productData.precio}</span>
								<span>Precio con descuento: $${
									productData.precio * (1 - productData.descuento / 100)
								}</span>`
							: `
								<span class="mt-2">Descuento: No</span>
								<span class="mt-2">Precio: $${productData.precio}</span>
								`
					}
					</div>
					`;
	});
}

//Modals
const modalProducts = document.getElementById("moddalProducts");

modalProducts.addEventListener("click", (event) => {
	if (
		event.target.id === modalProducts.id ||
		event.target.id === "btnCloseModal" ||
		event.target.id === "btnCancelModal"
	) {
		location.reload(true);
	}
});

const modalProductsDetail = document.getElementById("moddalProductsDetail");

modalProductsDetail.addEventListener("click", (event) => {
	if (
		event.target.id === modalProductsDetail.id ||
		event.target.id === "btnCloseModal" ||
		event.target.id === "btnCancelModal"
	) {
		location.reload(true);
	}
});

const modalProductsPromotion = document.getElementById(
	"moddalProductsPromotion"
);

modalProductsPromotion.addEventListener("click", (event) => {
	if (
		event.target.id === modalProductsPromotion.id ||
		event.target.id === "btnCloseModal" ||
		event.target.id === "btnCancelModal"
	) {
		location.reload(true);
	}
});

formAbm.addEventListener("change", () => {
	const btnSubmitModal = document.getElementById("btnSubmitModal");
	const messageError = document.getElementById("errorMessageModal");
	const nombre = document.getElementById("nombre");
	const descripcion = document.getElementById("descripcion");
	const categoria = document.getElementById("categoria");
	const imagen = document.getElementById("btnUploadImage");

	messageError.innerHTML = "";

	const { isEmpty, startWithUpperCase } = validators;
	let validForm = true;

	if (!isEmpty(nombre.value)) {
		if (!startWithUpperCase(nombre.value)) {
			messageError.innerHTML = "El nombre debe comenzar con mayúscula";
			validForm = false;
		}

		if (isEmpty(descripcion.value)) {
			messageError.innerHTML = "El productoDebe tener una descripción";
			validForm = false;
		}

		if (
			isEmpty(descripcion.value) ||
			isEmpty(categoria.value) ||
			isEmpty(imagen.value)
		) {
			messageError.innerHTML = "Todos los campos son obligatorios";
			validForm = false;
		}
	} else {
		validForm = false;
		messageError.innerHTML = "Todos los campos son obligatorios";
	}

	if (validForm) {
		btnSubmitModal.disabled = false;
		btnSubmitModal.setAttribute("style", "filter:brightness(100%);");
	} else {
		btnSubmitModal.disabled = true;
		btnSubmitModal.setAttribute("style", "filter:brightness(30%);");
	}
});

function selectProductRow(productId) {
	const btnDeleteProduct = document.getElementById("btnDeleteProduct");
	document.querySelectorAll(".selected").forEach((el) => {
		el.classList.remove("selected");
	});

	selectedRow = document.getElementById(productId);
	selectedRow.setAttribute("class", "selected");

	btnDeleteProduct.classList.remove("disabled");
	btnEditProduct.classList.remove("disabled");
	btnPromocionar.classList.remove("disabled");
	btnEditProduct.setAttribute("data-bs-toggle", "modal");
	btnEditProduct.setAttribute("data-bs-target", "#moddalProducts");
}

function doSearch() {
	const tableReg = document.getElementById("datos");
	const searchText = document.getElementById("searchTerm").value.toLowerCase();
	let total = 0;
	// Recorremos todas las filas con contenido de la tabla
	for (let i = 0; i < tableReg.rows.length; i++) {
		let found = false;
		const cellsOfRow = tableReg.rows[i].getElementsByTagName("td");
		// Recorremos todas las celdas
		for (let j = 0; j < cellsOfRow.length && !found; j++) {
			const compareWith = cellsOfRow[j].innerHTML.toLowerCase();
			// Buscamos el texto en el contenido de la celda
			if (searchText.length == 0 || compareWith.indexOf(searchText) > -1) {
				found = true;
				total++;
			}
		}
		if (found) {
			tableReg.rows[i].style.display = "";
		} else {
			// si no ha encontrado ninguna coincidencia, esconde la
			// fila de la tabla
			tableReg.rows[i].style.display = "none";
		}
	}
}

// Promocionar producto
btnPromocionar.addEventListener("click", async () => {
	if (selectedRow) {
		document
			.getElementById("btnPromocionar")
			.setAttribute("class", "enabled-button");

		const productId = selectedRow.id;
		const productData = await getProductData(productId);
		//modal header
		modalProductsPromotion.getElementsByClassName("modal-title")[0].innerHTML =
			"Promocionar producto";
		//modal body
		const modalBody =
			modalProductsPromotion.getElementsByClassName("modal-body")[0];
		modalBody.getElementsByTagName("div")[0].innerHTML = `
				<img src="../../Ecommerce/images/${productData.imagen}">`;
		const nombreProducto = modalBody.getElementsByTagName("h4")[0];
		nombreProducto.innerHTML = productData.nombre;
		const checkbox = document.getElementById("checkPromocion");
		const promoId = selectedRow
			.getElementsByTagName("td")[3]
			.getAttribute("promoId");
		if (promoId != 0) {
			checkbox.checked = true;
		} else {
			checkbox.checked = false;
		}

		const options = modalProductsPromotion.getElementsByTagName("option");
		for (let i = 0; i < options.length; i++) {
			if (options[i].innerHTML == productData.descuento+"%") {
				options[i].setAttribute("selected", true);
			}
		}


		const formPromocionar = document.getElementById("formPromocionar");
		formPromocionar.addEventListener("submit", () => {
			formPromocionar.attributes.item(
				2
			).value += `&productId=${productId}&status=${checkbox.checked? 1 : 0}`;
		})

	}
});





// REQUEST's
async function getProductData(productId) {
	try {
		const data = new URLSearchParams();
		data.append("productId", productId);
		return await fetch(
			"../src/modules/products/abm-productos.php?action=detail",
			{
				method: "POST",
				headers: {
					"Content-type": "application/x-www-form-urlencoded",
				},
				body: data,
			}
		).then((response) => response.json());
	} catch (e) {
		console.error(e);
	}
}

async function deleteProduct(productId) {
	try {
		const data = new URLSearchParams();
		data.append("productId", productId);
		return await fetch(
			"../src/modules/products/abm-productos.php?action=delete",
			{
				method: "POST",
				headers: {
					"Content-type": "application/x-www-form-urlencoded",
				},
				body: data,
			}
		).then((response) => {
			if (!response.ok) {
				throw new Error("Error en la solicitud: " + response.status);
			}
			selectedRow.setAttribute(
				"style",
				"border-top: 1.5px solid #e01818;border-bottom: 1.5px solid #e01818;"
			);
			setTimeout(() => {
				if (response.status == 200) {
					alert("Producto eliminado con éxito!");
					location.reload(true);
				} else if (response.status == 400) {
					alert("No se pudo eliminar el producto seleccionado");
					location.reload(true);
				} else {
					alert("Error inesperado al intentar de eliminar el producto");
				}
			}, 1200);
		});
	} catch (error) {}
}

function sortTable(n, type) {
	var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;

	table = document.getElementById("datos");
	switching = true;
	dir = "asc";

	while (switching) {
		switching = false;
		rows = table.rows;
		for (i = 0; i < (rows.length - 1); i++) {
			shouldSwitch = false;
			x = rows[i].getElementsByTagName("TD")[n];
			y = rows[i + 1].getElementsByTagName("TD")[n];
			if (dir == "asc") {
				if ((type == "str" && x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) || (type == "int" && parseInt(x.innerHTML) > parseInt(y.innerHTML))) {
					shouldSwitch = true;
					break;
				}
			} else if (dir == "desc") {
				if ((type == "str" && x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) || (type == "int" && parseFloat(x.innerHTML) < parseFloat(y.innerHTML))) {
					shouldSwitch = true;
					break;
				}
			}
		}
		if (shouldSwitch) {
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			switching = true;
			switchcount++;
		} else {
			if (switchcount == 0 && dir == "asc") {
				dir = "desc";
				switching = true;
			}
		}
	}
}

function filterProductByPromo() {
	const selectedValue = document.getElementById("filter").value;

	if (selectedValue === "vendedor" || "admin") {
		const tableReg = document.getElementById('bodyUsersTable');
		const searchText = document.getElementById('filter').value.toLowerCase();
		let total = 0;
		// Recorremos todas las filas con contenido de la tabla
		for (let i = 0; i < tableReg.rows.length; i++) {
			let found = false;
			const cellsOfRow = tableReg.rows[i].getElementsByTagName('td');
			// Recorremos todas las celdas
			const compareWith = cellsOfRow[3].innerHTML.toLowerCase();
			// Buscamos el texto en el contenido de la celda
			if (searchText.length == 0 || compareWith.indexOf(searchText) > -1) {
				found = true;
				total++;
			}

			if (found) {
				tableReg.rows[i].style.display = '';
			} else {
				// si no ha encontrado ninguna coincidencia, esconde la
				// fila de la tabla
				tableReg.rows[i].style.display = 'none';
			}
		}
	} else {
		getUsersTableDataHTML();
	}

}