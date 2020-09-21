//For the app
// var data = JSON.parse('{{ data | tojson | safe}}');


// Use D3 fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument
d3.json("jobSearchMockUp.json").then(function (data) {

            // Creating a variable to get a reference to the table body
            var tbody = d3.select("tbody");

            //Appending the table with each jobs data with Arrow Functions
            var jobTitle = data.map(job => job.title);

            console.log(jobTitle);


    //             // var row = tbody.append("tr");
    //             // Object.entries(job).forEach(([key, value]) => {
    //             //     var cell = row.append("tr");
    //             //     cell.text(value);
    //             // });
    //         });
    //     }
    // }
});

    
