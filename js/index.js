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
	infoWindow = new google.maps.InfoWindow();
	// showStoreMarkers();
	// setOnClickListener();
	// displayStores();
}

function searchStores() {
	let foundStores = [];
	let zipCode = document.getElementById('zip-code-input').value;

	if (zipCode) {
		stores.forEach((store, index) => {
			let postal = store.address.postalCode.substring(0, 5);
			if (postal == zipCode) {
				foundStores.push(store);
			}
		});
	} else {
		foundStores = stores;
	}
	clearLocations();
	displayStores(foundStores);
	showStoreMarkers(foundStores);
	setOnClickListener();
}

function clearLocations() {
	infoWindow.close();
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(null);
	}
	markers.length = 0;
}

function setOnClickListener() {
	let storeElements = document.querySelectorAll('.store-container');
	storeElements.forEach(function(el, index) {
		el.addEventListener('click', function() {
			new google.maps.event.trigger(markers[index], 'click');
		});
	});
}

function displayStores(stores) {
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
                <div class="store-number">${index + 1}</div>
            </div>
        </div>
    </div>
    `;
	});

	document.querySelector('.stores-list').innerHTML = storesHtml;
}

function showStoreMarkers(stores) {
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
