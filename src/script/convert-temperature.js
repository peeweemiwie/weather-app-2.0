let convertTemperature = (clickedUnit, degree) => {
	if (clickedUnit === 'c') {
		return Math.round((degree - 32) * (5 / 9));
	} else {
		return Math.round(degree * (9 / 5) + 32);
	}
};

let toggleTemperatureUnit = (event) => {
	event.preventDefault();
	let target = event.target;
	// assign class name 'major' to clicked unit and remove from other
	let unitArray = document
		.querySelector('#unit-container')
		.querySelectorAll('.unit');
	unitArray.forEach((unit) => unit.classList.remove('major'));
	target.classList.add('major');

	let temperature = document.querySelector('#current-temperature');
	let degree = temperature.innerHTML;
	let dataUnit = temperature.dataset.unit; // unit(c || f) to degree to specify which unit is used

	// toggle unit(c||f) and calculate temperature in different unit
	if (target.classList.contains('unit-c') && dataUnit === 'f') {
		target.parentElement.classList.add('reverse');
		temperature.setAttribute('data-unit', 'c');
		temperature.innerHTML = convertTemperature('c', degree);
	} else if (target.classList.contains('unit-f') && dataUnit === 'c') {
		target.parentElement.classList.remove('reverse');
		temperature.setAttribute('data-unit', 'f');
		temperature.innerHTML = convertTemperature('f', degree);
	} else if (
		(target.classList.contains('unit-f') && dataUnit === 'f') ||
		(target.classList.contains('unit-c') && dataUnit === 'c')
	) {
		return;
	}
};

document
	.querySelector('#unit-container')
	.addEventListener('click', toggleTemperatureUnit);
