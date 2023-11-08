document.addEventListener("DOMContentLoaded", () => {
	const buttonsDeletePromo = document.getElementsByClassName("deletePromo");

	for (let btnDeletePromo of buttonsDeletePromo) {
		btnDeletePromo.addEventListener("click", () => {
			if(btnDeletePromo.id){
				const data = new URLSearchParams();
				data.append("id", btnDeletePromo.id);
				fetch("../src/modules/promotions/abm-promotions.php?action=delete", {
					method: "POST",
					headers: {
						"Content-type": "application/x-www-form-urlencoded",
					},
					body: data,
				})
				.then((response) => response)
				.then((response) => {
					window.location.reload();
				})
				.catch((error) => {
					console.log(error);
				});
			}
		});
	}
});
