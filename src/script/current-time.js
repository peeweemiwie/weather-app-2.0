let currentTimeToDisplay = (currentTime) => {
	let truncateString = (string) => {
		return string.substring(0, 3);
	};
	let daysArray = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];
	let currentDay = daysArray[currentTime.getDay()];
	currentDay = truncateString(currentDay);
	let monthArray = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];
	let currentMonth = monthArray[currentTime.getMonth()];
	currentMonth = truncateString(currentMonth);
	let currentDate = currentTime.getDate();
	let currentYear = currentTime.getFullYear();
	let currentHour = currentTime.getHours();
	let currentMinute = currentTime.getMinutes();
	if (currentMinute < 10) {
		currentMinute = '0' + currentMinute;
	}

	let isAmOrPm = (hour) => {
		return hour < 12 ? 'am' : 'pm';
	};
	let convertedCurrentHour = (hour) => {
		return hour > 12 ? hour - 12 : hour;
	};

	let sentence = `${currentDay} ${currentMonth} ${currentDate} ${currentYear} &nbsp; ${convertedCurrentHour(
		currentHour,
	)}:${currentMinute}${isAmOrPm(currentHour)}`;
	return sentence;
};

let currentTimeContainer = document.querySelector('#current-time');
currentTimeContainer.innerHTML = currentTimeToDisplay(new Date());

// const obj = {
//   dt: 1592155233,
//   id: 2643743,
//   main: {
//     temp: 71.8,
//     feels_like: 66.69,
//     temp_min: 71.01,
//     temp_max: 73,
//     pressure: 1014,
//   },
//   name: "London",
//   sys: {
//     type: 1,
//     id: 1414,
//     country: "GB",
//     sunrise: 1592106173,
//     sunset: 1592165939
//   },
//   timezone: 3600
// }
// console.log(new Date(obj.dt*1000-(obj.timezone*1000))); // minus
// console.log(new Date(obj.dt*1000+(obj.timezone*1000))); // plus
// let currentSearchedLocalTime = () => {
// 	console.log(new Date(obj.dt * 1000 - obj.timezone * 1000));
// }
