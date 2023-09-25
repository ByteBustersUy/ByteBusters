const rows = document.getElementsByClassName("table-row");
for (let row of rows) {
	row.addEventListener("click", (event) => {
		if (event.target.id && event.target.id.includes("check")) {
			const checksData = {
				id: event.target.id,
				action: row.id,
				status: event.target.checked,
			};
			const data = new URLSearchParams();
			data.append("id", checksData.id);
			data.append("status", checksData.status);
			data.append("action", checksData.action);
			fetch("../src/modules/users/abm-permisos.php", {
				method: "POST",
				headers: {
					"Content-type": "application/x-www-form-urlencoded",
				},
				body: data,
			})
				.then((response) => response.status)
				.then((response) => {
					if (response === 200) {
						console.log(response);
					} else {
						throw response;
					}
				})
				.catch((error) => {
					console.log(error);
				});
		}
	});
}
