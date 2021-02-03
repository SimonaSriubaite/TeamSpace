export const getWeatherDate = (today) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weekday = days[today.getDay()];
  const day = today.getDate();
  const month = months[today.getMonth()];

  return `${weekday}, ${day} ${month}`;
};
