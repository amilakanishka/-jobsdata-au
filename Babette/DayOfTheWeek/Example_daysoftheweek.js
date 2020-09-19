const dates = [
    '2018-04-19',
    '2018-04-19',
    '2018-04-19',
    '2018-04-20',
    '2018-04-24',
    '2018-05-02',
    '2018-05-02',
    '2018-05-02',
  ];
  console.log(dates);

  const daysOfWeek = dates.map(date => new Date(date).getDay());
  console.log(daysOfWeek)
  
  // Now we have the days as numbers we can sort by frequency
  // This function is from a google search: https://stackoverflow.com/a/3579651/414062
  function sortByFrequency(array) {
    const frequency = {};
  
    array.forEach(value => frequency[value] = 0);
    const uniques = array.filter(value => ++frequency[value] == 1);
    return uniques.sort((a, b) => frequency[b] - frequency[a]);
  }
  
  const sortedDaysOfWeek = sortByFrequency(daysOfWeek);
  
  // Now translate to weekday values
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const weekdaysByFrequency = sortedDaysOfWeek.map(day => weekdays[day - 1]);
  
  console.log(weekdaysByFrequency);