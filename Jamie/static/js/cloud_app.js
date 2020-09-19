var jsonPath = "jobSearchResults.json"
var jobListing;

d3.json(jsonPath)
    .then(data => {jobListing = data;
    
    // Console.log to DELETE LATER
    console.log(jobListing[0]);
    console.log(jobListing.length);
    
    // Declare variables as lists for loop
    var keywords = [];
    var titles = [];
    var areas = [];

    for (var i = 0; i < jobListing.length; i++) {
        keywords.push(jobListing[i].keyword) // Return keyword in a list
        titles.push(jobListing[i].title) // Return title in a list
        areas.push(jobListing[i].area) // Return area in a list
    };

    // Console.log to DELETE LATER
    console.log("keyword");
    console.log(keywords.length);
    console.log(keywords[0]);
    console.log(typeof(keywords[0]));

    console.log("title");
    console.log(titles.length);
    console.log(titles[0]);
    console.log(typeof(titles[0]));

    console.log("area");
    console.log(areas.length);
    console.log(areas[0]);
    console.log(typeof(areas[0]));

    // Get unique values for titles
    var distinctTitles = [...new Set(titles)];
    console.log(distinctTitles);  

    // Split words in title
    // Split symbols ( ) / [ ] ' | 
    var splitTitles = [];

    for (var i = 0; i < titles.length; i++) {
        var temp = titles[i].replace(/[&\/\\#,+()$~%.'":*?<>{}[_-]|[\0\d]/g," ")
                            .split(" ");
        splitTitles = splitTitles.concat(temp);
    }

    // Console.log to DELETE LATER
    console.log("last temp");
    console.log(temp);
    console.log("splitTitles");
    console.log(splitTitles.length);
    console.log(splitTitles[0]);

    // Count by unique
    var counts = {};

    for (var i = 0; i < splitTitles.length; i++) {
        counts[splitTitles[i]] = 1 + (counts[splitTitles[i]] || 0);
    }

    console.log("counts");
    console.log(counts);

    // Set the data
    var wordData = [];
    
    for (var item in counts) {
        wordData.push({ x: item, 
                    value: counts[item]
                });
    }

    console.log("wordData");
    console.log(wordData);

    // Remove dictionary if key is - | ] or blank. Clean up balance after RegEx
    var wordData = wordData.filter(item =>
        (item.x !== "|") &&
        (item.x !== "") &&
        (item.x !== "-") &&
        (item.x !== "]"));
        console.log(wordData);

    // Sort the list of dictionaries by value

    
    anychart.onDocumentReady(function() {
        var data = wordData;
        var chart = anychart.tagCloud(data);
        chart.title("Most popular words used in position titles");
        // chart.angles([0]);
        // chart.colorRange(true);
        // chart.colorRange().length("80%");
        chart.container("cloud");
        chart.draw();
    })

    console.log(wordData);
});