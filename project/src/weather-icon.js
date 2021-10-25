let weatherIcon = (icon, description) => {
	let img = `<img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="icon: ${description}" class="icon-weather">`;
	let containerIcon = document.querySelector('#container-icon');
	let containerCurrentWeather = document.querySelector(
		'#container-current-weather',
	);
	containerIcon.innerHTML = img;
	// Set theme color - dark || light. Icons from has 2 types. Ex: 02d for day 02n for night.
	let dark = () => {
		containerCurrentWeather.dataset.theme = 'dark';
	};
	let light = () => {
		containerCurrentWeather.dataset.theme = 'light';
	};
	let index = icon.indexOf('d');
	index > -1 ? light() : dark();
};
