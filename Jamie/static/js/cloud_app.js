// Create function for word bubble chart
function wordBubble() {

    var jsonPath = "jobSearchResults2.json"

    d3.json(jsonPath)
        .then(data => {var jobListing = data;
        
        // Need to add DOM/D3 to obtain input value from HTML
        // TO DO - Insert codes here 

        
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
        console.log(keywords);
        console.log(typeof(keywords[0]));

        console.log("title");
        console.log(titles.length);
        console.log(titles[0]);
        console.log(typeof(titles[0]));

        console.log("area");
        console.log(areas.length);
        console.log(areas[0]);
        console.log(typeof(areas[0]));

        // Get unique values for titles - NOT USED - DELETE LATER
        // var distinctTitles = [...new Set(titles)];
        // console.log(distinctTitles);  

        // Split words in title
        // Use RegEx to replace special characters with space 
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

        // Console.log to DELETE LATER
        console.log("counts");
        console.log(counts);

        // Set the data
        var wordData = [];
        
        for (var item in counts) {
            wordData.push({ x: item, 
                        value: counts[item]
                    });
        }

        // Console.log to DELETE LATER
        console.log("Sorted wordData");
        console.log(wordData);

        // Remove dictionary if key is - | ] or blank. Clean up balance after RegEx
        var wordData = wordData.filter(item =>
            (item.x !== "|") &&
            (item.x !== "") &&
            (item.x !== "-") &&
            (item.x !== "- ") &&
            (item.x !== " -") &&
            (item.x !== " - ") &&
            (item.x !== "]") && 
            (item.x !== "_") && 
            (item.x !== "and") &&
            (item.x !== "el") &&
            (item.x !== "EL") &&
            (item.x !== "the") &&
            (item.x !== "in") &&
            (item.x !== "or") &&
            (item.x !== "of") &&
            (item.x !== "a") &&
            (item.x !== "A") &&
            (item.x !== "x") &&
            (item.x !== "X") &&
            (item.x !== "L") &&
            (item.x !== "at") &&
            (item.x !== "M") &&
            (item.x !== "m")); 

            // Console.log to DELETE LATER
            console.log("Clean up after RegEx wordData");
            console.log(wordData);

        // Sort the list of dictionaries by value
        wordData.sort(function(first, second) {
            return second.value - first.value;
        })

        // Console.log to DELETE LATER
        console.log("Filtered wordData");
        console.log(wordData);

        // Limit to top 35 words
        var topWords = [];

        for (var i = 0; i < 35; i++) {
            topWords.push(wordData[i]);
        }

        // Console.log to DELETE LATER
        console.log("topWords");
        console.log(topWords);

        // Render word cloud chart
        anychart.onDocumentReady(function() {
            var data = topWords;
            var chart = anychart.tagCloud(data);

            // Create and configure a color scale
            var customColorScale = anychart.scales.linearColor();
            customColorScale.colors(["#246ED1", "#23B5B5"]);

            // Bind customColorScale to the color scale of the chart
            chart.colorScale(customColorScale);

            // Add a color range
            chart.colorRange().enabled(true);

            // Set word angle to straight
            chart.angles([0]);

            // Set the chart title
            chart.title("Most Popular Words Used in Position Titles");

            // Configure the visual settings of the chart
            chart.hovered().fill("#FF5757");
            chart.hovered().fontWeight(800);
            
            // Set the container id
            chart.container("cloud");

            // Initiate drawing the chart
            chart.draw();
        })

    });
};

// Initialise wordBubble function
wordBubble();