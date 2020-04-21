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
	displayStores();
	infoWindow = new google.maps.InfoWindow();
}

function displayStores() {
	let storesHtml = '';
	stores.forEach((store, index) => {
		let address = store.addressLines;
		let phone = store.phoneNumber;

		storesHtml += `
        <div class="store-container">
        <div class="store-container-background">
            <div class="store-info-container">
            <div class="store-address">
                <span>${address[0]}</span>
                <span>${address[1]}</span>
            </div>
            <div class="store-phone-number">${phone}</div>
        </div>
            <div class="store-number-container">
                <div class="store-number">${index}</div>
            </div>
        </div>
    </div>
    `;
	});

	document.querySelector('.stores-list').innerHTML = storesHtml;
}

function showStoreMarkers() {
	let bounds = new google.maps.LatLngBounds();
	stores.forEach((store, index) => {
		let latlng = new google.maps.LatLng(store.coordinates.latitude, store.coordinates.longitude);

		let name = store.name;
		let address = store.addressLines[0];
		createMarker(latlng, name, address, index);
		bounds.extend(latlng);
	});
	map.fitBounds(bounds);
}

function createMarker(latlng, name, address, index) {
	var html = '<b>' + name + '</b> <br/>' + address;
	var marker = new google.maps.Marker({
		map: map,
		position: latlng,
		label: `${index + 1}`
	});
	google.maps.event.addListener(marker, 'click', function() {
		infoWindow.setContent(html);
		infoWindow.open(map, marker);
	});
	markers.push(marker);
}
