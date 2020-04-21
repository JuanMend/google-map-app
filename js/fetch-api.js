const { API_KEY } = process.env;

fetch(`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initMap`)
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		console.log(data);
	});
