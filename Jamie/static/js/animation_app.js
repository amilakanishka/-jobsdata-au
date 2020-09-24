var jsonPathSalary = "historicalSalary.json"
var csvPathUnderemployment = "Labour_csv/Underemployment_rate_Seasonally_adjusted_jamie.csv"

d3.json(jsonPathSalary)
    .then(data => {var historicalSalaries = data;

    d3.csv(csvPathUnderemployment)
    .then(data => {var underemploymentData = data;

        // Create a lookup table to sort and regroup the columns of data,
        // first by month, then by state:
        var lookup = {};

        function getData(month, state) {
            var byMonth, trace;
            if (!(byMonth = lookup[month])) {;
                byMonth = lookup[month] = {};
            }
                // If a container for this month + state doesn't exist yet,
                // then create one:
                if (!(trace = byMonth[state])) {
                    trace = byMonth[state] = {
                    x: [],
                    y: [],
                    id: [],
                    text: [],
                    marker: {size: []}
                    };
                }
                return trace;
        }

        // Go through each row, get the right trace, and append the data:
        for (var i = 0; i < historicalSalaries.length; i++) {
            var datum = historicalSalaries[i];
            var trace = getData(datum.month, datum.state);
            trace.text.push(datum.state);
            trace.id.push(datum.state);
            trace.x.push(datum.salary);
            trace.marker.size.push(datum.salary);
            
            // Filter underemployment data to find data with matching month-year
            var underemploymentMatch = underemploymentData.filter(item =>
                (item.Period === datum.month));
            
            // Format data type from string to float
            underemploymentPercent = parseFloat(underemploymentMatch[0].People);

            // Append
            trace.y.push(underemploymentPercent); 
                
        }

        console.log(lookup);
    
        // Get the group names:
        var months = Object.keys(lookup);

        // In this case, every month-year includes every state, 
        // so we can just infer the states from the *first* year:
        var firstMonth = lookup[months[0]];
        var states = Object.keys(firstMonth);

        console.log(states);

        // Create the main traces, one for each state:
        var traces = [];
        for (i = 0; i < states.length; i++) {
            var data = firstMonth[states[i]];

            // Create a single trace for the frames to pass data for each month
            traces.push({
            name: states[i],
            x: data.x.slice(),
            y: data.y.slice(),
            id: data.id.slice(),
            text: data.text.slice(),
            mode: 'markers',
            marker: {
                size: data.marker.size.slice(),
                sizemode: 'area',
                sizeref: 18
            }
            });
        }

        // Create a frame for each month. 
        var frames = [];
        for (i = 0; i < months.length; i++) {
            frames.push({
            name: months[i],
            data: states.map(function (state) {
                return getData(months[i], state);
                })
            })
        }

        // Create slider steps, one for each frame. 
        var sliderSteps = [];
        for (i = 0; i < months.length; i++) {
            sliderSteps.push({
            method: 'animate',
            label: months[i],
            args: [[months[i]], {
                mode: 'immediate',
                transition: {duration: 300},
                frame: {duration: 300, redraw: false},
                }]
            });
        }

        var layout = {
            title: "Movement Between IT Salaries and Underemployment Rate",
            xaxis: {
              title: 'IT Salaries in Australia',
              range: [50000, 200000]
            },
            yaxis: {
              title: 'Underemployment Rate (%)',
              range: [4,17]
            },
            showlegend: true,
            legend: {
              x: 0,
              y: 1,
              xanchor: "left",
              yanchor: "bottom",
              orientation: "h"
            },
            hovermode: 'closest',
            // Use updatemenus to create a play button and a pause button
            updatemenus: [{
              x: 0,
              y: 0,
              yanchor: 'top',
              xanchor: 'left',
              showactive: false,
              direction: 'left',
              type: 'buttons',
              pad: {t: 87, r: 10},
              buttons: [{
                method: 'animate',
                args: [null, {
                  mode: 'immediate',
                  fromcurrent: true,
                  transition: {duration: 300},
                  frame: {duration: 500, redraw: false}
                }],
                label: 'Play'
              }, {
                method: 'animate',
                args: [[null], {
                  mode: 'immediate',
                  transition: {duration: 0},
                  frame: {duration: 0, redraw: false}
                }],
                label: 'Pause'
              }]
            }],
             // Add the slider and use `pad` to position it
             // nicely next to the buttons.
            sliders: [{
              pad: {l: 130, t: 55},
              currentvalue: {
                            visible: true,
                            prefix: 'Period:',
                            xanchor: 'right',
                            font: {size: 20, color: '#666'}
                            },
              steps: sliderSteps
            }]
        };
        
        // Create the plot:
        Plotly.newPlot('animation', {
            data: traces,
            layout: layout,
            frames: frames,
        });

    });
    
});
