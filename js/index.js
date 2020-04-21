let map;
let markers = [];
let infoWindow;
let locationSelect;

function initMap() {
	let losAngeles = { lat: 34.06338, lng: -118.35808 };
	map = new google.maps.Map(document.getElementById('map'), {
		center: losAngeles,
		zoom: 11,
		mapTypeId: 'roadmap'
	});
	showStoreMarkers();
}

function showStoreMarkers() {
	stores.forEach((store, index) => {
		let latlng = new google.maps.LatLng(store.coordinates.latitude, store.coordinates.longitude);

		let name = store.name;
		let address = store.addressLines[0];
		createMarker(latlng, name, address);
	});
}

function createMarker(latlng, name, address) {
	var html = '<b>' + name + '</b> <br/>' + address;
	var marker = new google.maps.Marker({
		map: map,
		position: latlng
	});
	// google.maps.event.addListener(marker, 'click', function() {
	//   infoWindow.setContent(html);
	//   infoWindow.open(map, marker);
	// });
	markers.push(marker);
}
