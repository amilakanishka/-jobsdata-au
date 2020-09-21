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

    // Console.log to DELETE LATER
    console.log(filteredbenchmarkListing);
    

});