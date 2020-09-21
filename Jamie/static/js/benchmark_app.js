
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

var csvPath = "Benchmark_csv/Benchmark_info.csv"

d3.csv(csvPath)
    .then(data => {var benchmarkListing = data;

    // Console.log to DELETE LATER
    console.log(benchmarkListing);
    console.log(benchmarkListing[0]);
    console.log(benchmarkListing.length);
    
    // Need to add DOM/D3 to obtain input value from HTML
    // TO DO - Insert codes here 
    
    // Filter by 1) Job Role 2) State 

});