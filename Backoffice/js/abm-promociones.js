document.addEventListener("DOMContentLoaded", () => {
	const buttonsDeletePromo = document.getElementsByClassName("deletePromo");

	for (let btnDeletePromo of buttonsDeletePromo) {
		btnDeletePromo.addEventListener("click", async (event) => {
			const btn = event.target
			if(btn.id){
				const data = new URLSearchParams();
				data.append("id", btn.id);
				fetch("../src/modules/promotions/abm-promotions.php?action=delete", {
					method: "POST",
					headers: {
						"Content-type": "application/x-www-form-urlencoded",
					},
					body: data,
				})
				.then((response) => response)
				.then((response) => {
					console.log(response)
				})
				.catch((error) => {
					console.log(error);
				});
			}
		});
	}
});
