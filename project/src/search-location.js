let setDataUnit = (unit) => {
	let containerCurrentWeather = document.querySelector(
		'#container-current-weather',
	);
	containerCurrentWeather.dataset.unit = unit;
};

let displayInfo = (response) => {
	let data = response.data;
	let searchInput = document.querySelector('#search-input');
	let city = data.name;

	//display in html
	document.querySelector('#location-container').innerHTML = city;
	document.querySelector('#current-temperature').innerHTML = Math.round(
		data.main.temp,
	);
	document.querySelector('#feels-like').innerHTML = Math.round(
		data.main['feels_like'],
	);
	document.querySelector('#humidity').innerHTML = data.main.humidity;
	document.querySelector('#wind').innerHTML = Math.round(data.wind.speed);
	document.querySelector('#current-weather').innerHTML = data.weather[0].main;
	// when user clicks 'current location' while weather from other city is displayed, input value is blank by default, hence this will display current location
	if (searchInput.value.toLowerCase() !== city.toLowerCase()) {
		searchInput.value = city;
	}
	weatherIcon(data.weather[0].icon, data.weather[0].description);
};

let sendData = () => {
	let apiKey = 'ca710c5c7e60143c48dc86aa6efca6ff';
	let apiEndpoint = 'https://api.openweathermap.org/data/2.5/weather';

	let createUrlFromSearchValue = (inputValue, units) => {
		let url = `${apiEndpoint}?q=${inputValue}&units=${units}&appid=${apiKey}`;
		axios.get(url).then(displayInfo);
		setDataUnit(units);
	};

	let createUrlFromCurrentLocation = (lat, lon) => {
		let url = `${apiEndpoint}?lat=${lat}&lon=${lon}&cnt=1&units=imperial&appid=${apiKey}`;
		axios.get(url).then(displayInfo);
		setDataUnit('imperial');
	};

	sendData.createUrlFromSearchValue = createUrlFromSearchValue;
	sendData.createUrlFromCurrentLocation = createUrlFromCurrentLocation;
};

let errorHandler = (message, element) => {
	let warningMessageContainer = document.querySelector('#warning-message');
	element.classList.add('warning');
	warningMessageContainer.innerHTML = message;
	let removeWarning = () => {
		element.classList.remove('warning');
		warningMessageContainer.innerHTML = '';
	};
	element.addEventListener('focus', removeWarning);
};
let validateInput = (event) => {
	event.preventDefault();
	let target = event.target;
	let unit = target.getAttribute('data-unit');
	let searchInput = document.querySelector('#search-input');
	let searchInputValue = searchInput.value;
	if (searchInputValue) {
		sendData();
		sendData.createUrlFromSearchValue(searchInputValue, unit);
	} else {
		errorHandler('Please enter location', searchInput);
	}
};

let getLongitudeLatitude = (position) => {
	let lat = position.coords.latitude;
	let lon = position.coords.longitude;
	sendData();
	sendData.createUrlFromCurrentLocation(lat, lon);
};

document
	.querySelector('#btn-current-location')
	.addEventListener('click', (event) => {
		navigator.geolocation.getCurrentPosition(getLongitudeLatitude);
	});

document.querySelector('#btn-search').addEventListener('click', validateInput);
document
	.querySelector('#unit-imperial')
	.addEventListener('click', validateInput);
document.querySelector('#unit-metric').addEventListener('click', validateInput);

sendData();
sendData.createUrlFromSearchValue('new york', 'imperial');
