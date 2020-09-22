// Get list of unique search keywords for benchmark salary mapping 
var jsonPath = "jobSearchResults.json"

d3.json(jsonPath)
    .then(data => {var jobListing = data;

    // Declare variables as lists for loop
    var keywords = [];     
    
    for (var i = 0; i < jobListing.length; i++) {
        keywords.push(jobListing[i].keyword) // Return keyword in a list
    };

    // Get Unique Keywords
    var distinctKeywords = [...new Set(keywords)];
    console.log(distinctKeywords); 

});

// Benchmark salary chart
var csvPath = "Benchmark_csv/Benchmark_info.csv"

d3.csv(csvPath)
    .then(data => {var benchmarkListing = data;

    // Console.log to DELETE LATER
    console.log(benchmarkListing);
    console.log(benchmarkListing[0]);
    console.log(benchmarkListing.length);
    
    // Need to add DOM/D3 to obtain input value from HTML
    // TO DO - Insert codes here 
    
    // Filter by 1) Keyword 2) State 
    var filteredbenchmarkListing = benchmarkListing.filter(item =>
        (item.Keyword === "Data Analyst") &&  // Replace with inputValue for job search keyword
        (item.State === "New South Wales")); // Replace ith inputValue for state

    // Filter by Contract_Type
    var permanentBenchmarkListing = filteredbenchmarkListing.filter(item =>
        (item.Contract_Type === "permanent")); 
    
    var contractBenchmarkListing = filteredbenchmarkListing.filter(item =>
        (item.Contract_Type === "contract"));  

    // Console.log to DELETE LATER
    console.log(filteredbenchmarkListing);
    console.log(permanentBenchmarkListing);
    console.log(contractBenchmarkListing);    
    
    var permJobRoles = permanentBenchmarkListing.map(row => row.Source + ": " + row.Job_Role);
    var permMinSals = permanentBenchmarkListing.map(row => row.Min_Sal);
    var permMaxSals = permanentBenchmarkListing.map(row => row.Max_Sal - row.Median);
    var permMedSals = permanentBenchmarkListing.map(row => row.Median - row.Min_Sal);
    var permMinSalsText = permanentBenchmarkListing.map(row => "$"+row.Min_Sal);
    var permMaxSalsText = permanentBenchmarkListing.map(row => "$"+row.Max_Sal);
    var permMedSalsText = permanentBenchmarkListing.map(row => "$"+row.Median);

    console.log(permMinSals);
    console.log(permJobRoles);
    console.log(permMaxSals);
    console.log(permMedSals);

    var benchmarkTrace1 = {
        x: permMinSals,
        y: permJobRoles,
        text: permMinSalsText,
        name: "Minimum Salary",
        orientation: "h",
        type: "bar",
        marker: {
            color: "rgb(246,147,86)",
            opacity: 0.0,
        }
    };

    var benchmarkTrace2 = {
        x: permMedSals,
        y: permJobRoles,
        text: permMedSalsText,
        name: "Median Salary",
        orientation: "h",
        type: "bar",
        marker: {
            color: "rgb(36,110,209)",
        }
    };

    var benchmarkTrace3 = {
        x: permMaxSals,
        y: permJobRoles,
        text: permMaxSalsText,
        name: "Maximum Salary",
        orientation: "h",
        type: "bar",
        marker: {
            color: "rgb(35,181,181)",
        }
    };

    var permBenchmarkData = [benchmarkTrace1, benchmarkTrace2,  benchmarkTrace3];

    var permBenchmarkLayout = {
        title: "Permanent Full Time Salary Ranges",
        barmode: "stack",
        bargroupgap: 0.1,
        yaxis : { 
            showgrid : false 
        },
        xaxis: { 
            zeroline : false, 
            showgrid : false 
        },
        showlegend: false
    };

    Plotly.newPlot("benchmark", permBenchmarkData, permBenchmarkLayout);

    document.getElementById("benchmark").on('plotly_afterplot', function() {
        var yAxisLabels = [].slice.call(document.querySelectorAll('[class^="yaxislayer"] .ytick text, [class*=" yaxislayer"] .ytick text'))
        var bar = document.querySelector('.plot .barlayer .bars path')
        var barHeight = bar.getBBox().height
        var offset = 12
        
        for (var i = 0; i < yAxisLabels.length; i++) {
          var yAxisLabel = yAxisLabels[i];
          yAxisLabel.setAttribute('text-anchor', 'start')
          yAxisLabel.setAttribute('y', yAxisLabel.getAttribute('y') - (barHeight / 2) - offset)
        };
    });

    // Setup trace and chart for contract salary
    var contractJobRoles = contractBenchmarkListing.map(row => row.Source + ": " + row.Job_Role);
    var contractMinSals = contractBenchmarkListing.map(row => row.Min_Sal);
    var contractMaxSals = contractBenchmarkListing.map(row => row.Max_Sal - row.Median);
    var contractMedSals = contractBenchmarkListing.map(row => row.Median - row.Min_Sal);
    var contractMinSalsText = contractBenchmarkListing.map(row => "$"+row.Min_Sal);
    var contractMaxSalsText = contractBenchmarkListing.map(row => "$"+row.Max_Sal);
    var contractMedSalsText = contractBenchmarkListing.map(row => "$"+row.Median);

    console.log(contractMinSals);
    console.log(contractJobRoles);
    console.log(contractMaxSals);
    console.log(contractMedSals);

    var benchmarkTrace11 = {
        x: contractMinSals,
        y: contractJobRoles,
        text: contractMinSalsText,
        name: "Minimum Salary",
        orientation: "h",
        type: "bar",
        marker: {
            color: "rgb(246,147,86)",
            opacity: 0.0,
        }
    };

    var benchmarkTrace12 = {
        x: contractMedSals,
        y: contractJobRoles,
        text: contractMedSalsText,
        name: "Median Salary",
        orientation: "h",
        type: "bar",
        marker: {
            color: "rgb(36,110,209)",
        }
    };

    var benchmarkTrace13 = {
        x: contractMaxSals,
        y: contractJobRoles,
        text: contractMaxSalsText,
        name: "Maximum Salary",
        orientation: "h",
        type: "bar",
        marker: {
            color: "rgb(35,181,181)",
        }
    };

    var contractBenchmarkData = [benchmarkTrace11, benchmarkTrace12,  benchmarkTrace13];

    var contractBenchmarkLayout = {
        title: "Contract Day Rate Salary Ranges",
        barmode: "stack",
        bargroupgap: 0.1,
        yaxis : { 
            showgrid : false 
        },
        xaxis: { 
            zeroline : false, 
            showgrid : false 
        },
        showlegend: false
    };

    Plotly.newPlot("benchmark2", contractBenchmarkData, contractBenchmarkLayout);

    // document.getElementById("contract_benchmark").on('plotly_afterplot', function() {
    //     var yAxisLabels = [].slice.call(document.querySelectorAll('[class^="yaxislayer"] .ytick text, [class*=" yaxislayer"] .ytick text'))
    //     var bar = document.querySelector('.plot .barlayer .bars path')
    //     var barHeight = bar.getBBox().height
    //     var offset = 12
        
    //     for (var i = 0; i < yAxisLabels.length; i++) {
    //       var yAxisLabel = yAxisLabels[i];
    //       yAxisLabel.setAttribute('text-anchor', 'start')
    //       yAxisLabel.setAttribute('y', yAxisLabel.getAttribute('y') - (barHeight / 2) - offset)
    //     };
    // });

});



// #23B5B5 light blue
// #545454 grey
// #F69356 orange
// #246ED1 Darker blue
// #89E661 Green
// #FF5757 Coral Red
// #017074 Turquoise