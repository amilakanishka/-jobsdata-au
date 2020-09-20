var dates;

// Use D3 fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument
d3.json("jobSearchResults.json").then(function (data) {

    //Access to each dictionnaries in data:
    dates= []
    for (var i = 0; i < data.length; i++) {
        data_dict = data[i];
        dates.push(data_dict.created);
    }
    //TO DELETE LATER
    console.log(dates);

    // const dates = [
    //     '2018-04-19',
    //     '2018-04-19',
    //     '2018-04-19',
    //     '2018-04-20',
    //     '2018-04-24',
    //     '2018-05-02',
    //     '2018-05-02',
    //     '2018-05-02',
    //     "2020-08-24T14:08:55Z",
    //     "2020-09-08T03:28:55Z",
    // ];
    // console.log(dates);

    const daysOfWeek = dates.map(date => new Date(date).getDay());
    //TO DELETE LATER
    console.log(daysOfWeek)

    // Now we have the days as numbers we can sort by frequency
    // This function is from a google search: https://stackoverflow.com/a/3579651/414062
    function Frequency(array) {
        const frequency = {};

        array.forEach(value => frequency[value] = 0);
        const uniques = array.filter(value => ++frequency[value] == 1);
        return frequency;
        // return uniques.sort((a, b) => frequency[b] - frequency[a]);
    }

    //Passing in our dates in the function Frequency so we get a dictionary of days and frequencies of job ads:
    const DaysOfWeek = Frequency(daysOfWeek);

    //TO DELETE LATER
    console.log(DaysOfWeek);

    //  Now translate to weekday values
    // const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    var x = [];
    // Iterate through each ID object
    Object.keys(DaysOfWeek).forEach(key => {
        // Concatenate "OTU" with each ID number
        x.push(key)
    });

    //TO DELETE LATER
    console.log(x);

    // Now translate to weekday values
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const x_days = x.map(day => weekdays[day]);

    //TO DELETE LATER
    console.log(x_days);

    //Extracting the frequency values for our y
    var y = [];
    // Iterate through each ID object
    Object.values(DaysOfWeek).forEach(value => {
        // Concatenate "OTU" with each ID number
        y.push(value)
    });
    //TO DELETE LATER
    console.log(y);

});

