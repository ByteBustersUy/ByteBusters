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
			categoria: modalProducts.getElementsByTagName("select")[0],
			//...
		};

		const selectedUserData = {
			nombre: selectedRow.getElementsByTagName("td")[0].innerHTML,
			categoria: selectedRow.getElementsByTagName("td")[1].id,
			//...
		};

		//refill inputs with selected product data
		inputsForm.nombre.value = selectedUserData.nombre;
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

//Modal
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
function doSearch()

        {
            const tableReg = document.getElementById('datos');
            const searchText = document.getElementById('searchTerm').value.toLowerCase();
            let total = 0;
            // Recorremos todas las filas con contenido de la tabla
            for (let i = 0; i < tableReg.rows.length; i++) {
                // Si el td tiene la clase "noSearch" no se busca en su cntenido
                if (tableReg.rows[i].classList.contains("noSearch")) {
                    continue;
                }
                let found = false;
                const cellsOfRow = tableReg.rows[i].getElementsByTagName('td');
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
                    tableReg.rows[i].style.display = '';
                } else {
                    // si no ha encontrado ninguna coincidencia, esconde la
                    // fila de la tabla
                    tableReg.rows[i].style.display = 'none';
                }
            }
            // mostramos las coincidencias
            const lastTR=tableReg.rows[tableReg.rows.length-1];
            const td=lastTR.querySelector("td");
            lastTR.classList.remove("hide", "red");
            if (searchText == "") {
                lastTR.classList.add("hide");
            } else if (total) {
                td.innerHTML="Se ha encontrado "+total+" coincidencia"+((total>1)?"s":"");
            } else {
                lastTR.classList.add("red");
                td.innerHTML="No se han encontrado coincidencias";
            }
        }