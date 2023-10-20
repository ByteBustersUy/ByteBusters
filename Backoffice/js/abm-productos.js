const btnAddProduct = document.getElementById("btnAddProduct");
const btnEditProduct = document.getElementById("btnEditProduct");
const btnDeleteProduct = document.getElementById("btnDeleteProduct");
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
btnEditProduct.addEventListener("click", () => {
	if (!btnEditProduct.classList.contains("disabled")) {
		btnEditProduct.setAttribute("class", "enabled-button");
		const productId = document.getElementsByClassName("selected")[0].id;

		modalProducts.getElementsByClassName("modal-title")[0].innerHTML =
			"Editar producto ";

		const inputsForm = {
			nombre: modalProducts.getElementsByTagName("input")[0],
			//por  algun motivo esos dos indeces no andan
			categoria: modalProducts.getElementsByTagName("select")[0],
			precio: modalProducts.getElementsByTagName("input")[2],
			//
			descripcion: modalProducts.getElementsByTagName("textarea")[0],
			//...
		};
		
		const selectedUserData = {
			nombre: selectedRow.getElementsByTagName("td")[0].innerHTML,
			categoria: selectedRow.getElementsByTagName("td")[1].id,
			precio: parseFloat(selectedRow.getElementsByTagName("td")[2].innerHTML.replace("$", "")),


			//La linea descripcion  es pa ver si funcionaba el innerHTML
			descripcion: selectedRow.getElementsByTagName("td")[2].innerHTML,
			//...
		};

		//refill inputs with selected product data
		inputsForm.nombre.value = selectedUserData.nombre;
		inputsForm.precio.value = selectedUserData.precio;


		inputsForm.descripcion.value = selectedUserData.descripcion;
		//...

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
		// const category = productRow.getElementsByTagName("td")[1].innerHTML;
		// const promoId = "";
		const response = prompt(
			`Se eliminará el producto con id ${productId} \n\nIngrese el id para confirmar`
		);
		if (response == productId) {
			const data = new URLSearchParams();
			data.append("productId", productId);
			fetch("../src/modules/products/abm-productos.php?action=delete", {
				method: "POST",
				headers: {
					"Content-type": "application/x-www-form-urlencoded",
				},
				body: data,
			})
				.then((response) => {
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
				})
				.catch((error) => {
					console.error("Error: " + error);
				});
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
console.log(buttonsProductDetail);
for (let btn of buttonsProductDetail) {
	btn.addEventListener("click", (event) => {
		const data = new URLSearchParams();
		data.append("productId", btn.id);
		fetch("../src/modules/products/abm-productos.php?action=detail", {
			method: "POST",
			headers: {
				"Content-type": "application/x-www-form-urlencoded",
			},
			body: data,
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Error en la solicitud: " + response.status);
				}
				return response.json();
			})
			.then((productData) => {
				//modal header
				modalProductsDetail.getElementsByClassName("modal-title")[0].innerHTML =
					"Detalle de producto";
				//modal body
				const modalBody =
					modalProductsDetail.getElementsByClassName("modal-body")[0];
				modalBody.innerHTML = `
					<div class="product-image">
					<img src="../../Ecommerce/images/${productData.imagen}">
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
								<span>Precio con descuento: $${Math.round(
									productData.precio * (1 - productData.descuento / 100)
								)}</span>`
							: `
								<span class="mt-2">Precio: $${productData.precio}</span>
								`
					}
					</div>
					`;
			})
			.catch((error) => {
				console.error("Error: " + error);
			});
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
	btnEditProduct.setAttribute("data-bs-toggle", "modal");
	btnEditProduct.setAttribute("data-bs-target", "#moddalProducts");
}
