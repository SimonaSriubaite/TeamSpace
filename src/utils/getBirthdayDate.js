export const getBirthdayDate = (birthday) => {
  //for date format: 1990-01-01
  const dateArray = birthday.split("-");

  const getOrdinalNumber = (num) => {
    switch (num) {
      case 1:
      case 21:
      case 31:
        return num + "st";
      case 2:
      case 22:
        return num + "nd";
      case 3:
      case 23:
        return num + "rd";
      default:
        return num + "th";
    }
  };

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = getOrdinalNumber(Number(dateArray[2]));
  const month = months[Number(dateArray[1]) - 1];

  return `${month} ${day}`;
};
