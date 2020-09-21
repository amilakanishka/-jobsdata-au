//This code is to create a graph showing the weekdays with the number of jobs ads

var dates;

//For the app
// var data = JSON.parse('{{ data | tojson | safe}}');


// Use D3 fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument
d3.json("jobSearchResults.json").then(function (data) {

    //Access to each dictionnaries in data:
    dates = []
    for (var i = 0; i < data.length; i++) {
        data_dict = data[i];
        dates.push(data_dict.created);
    }
    //TO DELETE LATER
    console.log(dates);

    //Get the weekday of the dates
    const daysOfWeek = dates.map(date => new Date(date).getDay());
    //TO DELETE LATER
    console.log(daysOfWeek)

    // Now we have the days as numbers we can get their frequency

    function Frequency(array) {
        const frequency = {};

        array.forEach(value => frequency[value] = 0);
        const uniques = array.filter(value => ++frequency[value] == 1);
        return frequency;
    }

    //Passing in our dates in the function Frequency so we get a dictionary of days and frequencies of job ads:
    const DaysOfWeek = Frequency(daysOfWeek);

    
    // Extract the weekdays from the dictionary Frequency and place them in an array to store our variable x:
    var x = [];
    // Iterate through each ID object
    Object.keys(DaysOfWeek).forEach(key => {
        // Concatenate "OTU" with each ID number
        x.push(key)
    });

    
    // Now translate to weekday values - Note in our data, the Saturday is index 0 and Friday is 6 therefore the sequence starting Saturday:
    const weekdays = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const x_days = x.map(day => weekdays[day]);
   

    //Extracting the frequency values for our y
    var y = [];
    // Iterate through each value
    Object.values(DaysOfWeek).forEach(value => {
        y.push(value)
    });
    

    // Create a function to change the order of the index and position Monday as index 0:

    function rearrange(array) {

        Array.prototype.move = function (from, to) {
            this.splice(to, 0, this.splice(from, 1)[0]);
        };

        array.move(0, 6)
        array.move(0, 6)
    }

    //Rearrange the arrays x_days and y:
    rearrange(x_days);
    rearrange(y);

    //Calling our bar plot function:
    barplot(y, x_days);

});


//Creating a function barplot to create our graph:
function barplot(y, x_days) {


    var color = []
    var max = Math.max.apply(null, y);
    Object.values(y).forEach(value => {
        if (value === max) {
            color.push('#545454');
        }
        else {
            color.push('#23B5B5');
        }
    });


    console.log(color);

    var trace1 = {
        x: x_days,
        y: y,
        text: y.map(String),
        textfont: {
            size: 14
        },
        textposition: 'auto',
        hoverinfo: 'none',
        marker: {
            color: color,
            opacity: 0.6,
            line: {
                color: "#545454",
                width: 1.5
            }
        },
        type: 'bar'
    };

    var data = [trace1];

    var layout = {
        title: 'Job ads per weekday',
        titlefont: {
            size: 24,
            color: '#000000'
        },
        xaxis: {
            tickfont: {
                size: 14,
                color: '#000000'
            }
        },
        yaxis: {
            title: "Number of job ads",
            titlefont: {
                size: 18,
                color: '#000000'
            },
            tickfont: {
                size: 14,
                color: '#000000'
            }
        },
        showlegend: false,
        height: 600,
        width: 1000
    };


    Plotly.newPlot('weekday-plot', data, layout);


}

