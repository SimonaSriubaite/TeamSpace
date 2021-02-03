export const getElapsedDate = (postDate) => {
  let newDate = new Date();
  let startDate = postDate;
  let myDate = new Date(startDate);
  let timeDiff = newDate.getTime() - myDate.getTime();
  timeDiff = timeDiff / 1000;
  timeDiff = Math.floor(timeDiff / 60);
  let minutes = timeDiff % 60;
  timeDiff = Math.floor(timeDiff / 60);
  let hours = timeDiff % 24;
  timeDiff = Math.floor(timeDiff / 24);
  let days = timeDiff;

  if (days !== 0) {
    return `${days}d`;
  } else if (days === 0 && hours !== 0) {
    return `${hours}h`;
  } else {
    return `${minutes}min`;
  }
};
