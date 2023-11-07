const btnAddUser = document.getElementById("btnAddUser");
const btnEditUser = document.getElementById("btnEditUser");
const btnDeleteUser = document.getElementById("btnDeleteUser");
const btnSubmitModal = document.getElementById("btnSubmitModal");
const formAbm = document.getElementById("formAbmUser");
let selectedRow;
let selectedModal;

const validEmails = [
	"vera.com.uy",
	"gmail.com",
	"hotmail.com",
	"bytebusters.com",
	"icloud.com",
	"outlook.com",
	"yahoo.com",
];

const validators = {
	isSame: (a, b) => a === b,
	isEqual: (a, b) => a == b,
	isEmpty: (a) => a.length === 0,
	startWithUpperCase: (str) => (new RegExp("^[A-Z]+").test(str) ? true : false),
	containWitheSpaces: (str) => (new RegExp("\\s+").test(str) ? true : false),
	isValidEmail: (str) =>
		new RegExp(`^[a-z0-9\._-]+@(?:${validEmails.join("|")})$`).test(str)
			? true
			: false,
	isValidCi: (str) =>
		new RegExp("^[1-9]{1}[0-9]{7}$").test(str) ? true : false,
	isValidPass: (str) =>
		new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).+").test(str) && str.length >= 8
			? true
			: false,
};

//Agregar usuario
btnAddUser.addEventListener("click", () => {
	btnAddUser.setAttribute("class", "enabled-button");
	btnSubmitModal.disabled = true;
	btnSubmitModal.setAttribute("style", "filter:brightness(30%);");
	modalUsers.getElementsByClassName("modal-title")[0].innerHTML =
		"Agregar usuario";

	formAbm.attributes.item(
		2
	).value = `../src/modules/users/abm-usuarios.php?action=add`;
	selectedModal = "add";
});

//Editar usuario
btnEditUser.addEventListener("click", () => {
	if (!btnEditUser.classList.contains("disabled")) {
		btnEditUser.setAttribute("class", "enabled-button");
		const userCi = document.getElementsByClassName("selected")[0].id;
		formAbm.attributes.item(
			2
		).value = `../src/modules/users/abm-usuarios.php?action=edit&ci=${userCi}`;
		selectedModal = "edit";

		modalUsers.getElementsByClassName("modal-title")[0].innerHTML =
			"Editar usuario ";

		const inputsForm = {
			nombre: modalUsers.getElementsByTagName("input")[0],
			apellido: modalUsers.getElementsByTagName("input")[1],
			cedula: modalUsers.getElementsByTagName("input")[2],
			email: modalUsers.getElementsByTagName("input")[3],
			constrasenia: modalUsers.getElementsByTagName("input")[4],
			admin: modalUsers.getElementsByTagName("input")[5],
			vendedor: modalUsers.getElementsByTagName("input")[6],
		};

		//transformo todo lo de nombre en 1 sola palabra, y  si hay mas, pasan a ser parte de apellido.
		let nombreCompleto = selectedRow
			.getElementsByTagName("td")[0]
			.innerHTML.split(" ");
		let apellidos = "";
		for (let i = 1; i < nombreCompleto.length; i++) {
			apellidos += nombreCompleto[i] + " ";
		}

		const selectedUserData = {
			nombre: selectedRow
				.getElementsByTagName("td")[0]
				.innerHTML.split(" ")[0]
				.trim(),
			apellido: apellidos.trim(),
			cedula: selectedRow.getElementsByTagName("td")[1].innerHTML.trim(),
			email: selectedRow.getElementsByTagName("td")[2].innerHTML.trim(),
			admin: "",
			vendedor: "",
		};
		const parsedRoles = selectedRow
			.getElementsByTagName("td")[3]
			.innerHTML.split(" ");
		parsedRoles.forEach((rol) => {
			if (rol == "admin") {
				selectedUserData.admin = "admin";
			}
			if (rol == "vendedor") {
				selectedUserData.vendedor = "vendedor";
			}
		});

		//rellenar formulario con la data seleccionada
		inputsForm.nombre.value = selectedUserData.nombre;
		inputsForm.apellido.value = selectedUserData.apellido;
		inputsForm.cedula.value = selectedUserData.cedula;
		inputsForm.cedula.disabled = true;
		inputsForm.cedula.style.filter = "brightness(50%)";
		inputsForm.email.value = selectedUserData.email;
		inputsForm.constrasenia.disabled = true;
		inputsForm.constrasenia.style.filter = "brightness(50%)";

		const { isEmpty } = validators;

		if (!isEmpty(selectedUserData.admin)) {
			inputsForm.admin.setAttribute("checked", "true");
		}
		if (!isEmpty(selectedUserData.vendedor)) {
			inputsForm.vendedor.setAttribute("checked", "true");
		}
	}
});

// Eliminar usuario
btnDeleteUser.addEventListener("click", async () => {
	if (!btnDeleteUser.classList.contains("disabled")) {
		btnDeleteUser.setAttribute("class", "enabled-button");
		const userCi = document.getElementsByClassName("selected")[0].id;
		const response = prompt(
			`Se eliminará al usuario con cédula ${userCi} \n\nIngrese la cédula para confirmar`
		);
		if (response == userCi) {
			const data = new URLSearchParams();
			data.append("deleteUserCi", userCi);
			fetch("../src/modules/users/abm-usuarios.php?action=delete", {
				method: "POST",
				headers: {
					"Content-type": "application/x-www-form-urlencoded",
				},
				body: data,
			})
				.then((response) => response)
				.then((response) => {
					selectedRow.setAttribute(
						"style",
						"border-top: 1.5px solid red;border-bottom: 1.5px solid #e01818;"
					);
					setTimeout(() => {
						if (response.status == 200) {
							alert("Usuario eliminado con éxito!");
							location.reload(true);
						} else if (response.status > 400 && response.status < 499) {
							alert("No se puede eliminar el usuario actual");
							location.reload(true);
						} else {
							alert("Error inesperado al intentar de eliminar usuario");
						}
					}, 1200);
				})
				.catch((error) => {
					console.error("Error: " + error);
				});
		} else {
		}
		document
			.getElementsByClassName("selected")[0]
			?.classList.remove("selected");
		btnDeleteUser.classList.replace("enabled-button", "disabled");
		document.getElementById("btnEditUser").setAttribute("class", "disabled");
	}
});

//Modal
const modalUsers = document.getElementById("moddalUsers");

modalUsers.addEventListener("click", (event) => {
	if (
		event.target.id === modalUsers.id ||
		event.target.id === "btnCloseModal" ||
		event.target.id === "btnCancelModal"
	) {
		location.reload(true);
	}
});

formAbm.addEventListener("click", () => {
	const chkboxAdmin = modalUsers.getElementsByTagName("input")[5];
	const chkboxVendedor = modalUsers.getElementsByTagName("input")[6];
	const btnSubmitModal = document.getElementById("btnSubmitModal");
	const messageError = document.getElementById("errorMessageModal");
	const nombre = document.getElementById("nombre");
	const apellido = document.getElementById("apellido");
	const cedula = document.getElementById("cedula");
	const email = document.getElementById("email");
	const pass = document.getElementById("contrasenia");

	messageError.innerHTML = "";

	const { isEmpty, containWitheSpaces, isValidEmail, isValidCi, isValidPass } =
		validators;
	let validForm = true;

	if (
		!isEmpty(nombre.value) &&
		!isEmpty(apellido.value) &&
		!isEmpty(email.value) &&
		!isEmpty(cedula.value)
	) {
		if (containWitheSpaces(nombre.value)) {
			messageError.innerHTML = "El nombre no puede contener espacios";
			validForm = false;
		}

		if (!isValidEmail(email.value)) {
			messageError.innerHTML = "El correo electrónico no es válido";
			validForm = false;
		}

		if (!isValidCi(cedula.value)) {
			messageError.innerHTML = "La cédula no es válida";
			validForm = false;
		}

		if (selectedModal == "add") {
			if(pass.value.length > 0){
				if (!isValidPass(pass.value)) {
					validForm = false;
					messageError.innerHTML = `La contraseña no es válida.
						<br>
						Requiere:
						<br>
						Mayúsculas, Minúsculas,
						<br>
						Números y 8 caractéres.
						`;
				}
			}else{
				validForm = false;
				messageError.innerHTML = "Todos los campos son obligatorios";
			}
		}
	} else {
		validForm = false;
		messageError.innerHTML = "Todos los campos son obligatorios";
	}

	if (validForm) {
		if (!chkboxAdmin.checked && !chkboxVendedor.checked) {
			btnSubmitModal.disabled = true;
			btnSubmitModal.setAttribute("style", "filter:brightness(30%);");
			messageError.innerHTML = "Seleccine al menos un rol";
		} else {
			btnSubmitModal.disabled = false;
			btnSubmitModal.setAttribute("style", "filter:brightness(100%);");
		}
	} else {
		btnSubmitModal.disabled = true;
		btnSubmitModal.setAttribute("style", "filter:brightness(30%);");
	}
});

function selectUserRow(userCi) {
	document.querySelectorAll(".selected").forEach((el) => {
		el.classList.remove("selected");
	});

	selectedRow = document.getElementById(userCi);
	selectedRow.setAttribute("class", "selected");

	btnDeleteUser.classList.remove("disabled");
	btnEditUser.classList.remove("disabled");
	btnEditUser.setAttribute("data-bs-toggle", "modal");
	btnEditUser.setAttribute("data-bs-target", "#moddalUsers");
}

function doSearch() {
	const tableReg = document.getElementById('bodyUsersTable');
	const searchText = document.getElementById('searchTerm').value.toLowerCase();

	let total = 0;
	// Recorremos todas las filas con contenido de la tabla
	for (let i = 0; i < tableReg.rows.length; i++) {
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
}

function filterUserByRol() {
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
function sortTable(n, type) {
	var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;

	table = document.getElementById("bodyUsersTable");
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



