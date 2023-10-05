document.addEventListener("DOMContentLoaded", () => {
	const buttonsDeletePromo = document.getElementsByClassName("deletePromo");

	for (let btnDeletePromo of buttonsDeletePromo) {
		btnDeletePromo.addEventListener("click", (event) => {
			const descuento = event.target.id;
		});
	}
});
