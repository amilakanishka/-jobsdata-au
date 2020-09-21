//For the app
// var data = JSON.parse('{{ data | tojson | safe}}');


// Use D3 fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument
d3.json("jobSearchMockUp.json").then(function (data) {

    // Creating a variable to get a reference to the table body
    var tbody = d3.select("tbody");

    //Appending the table with each jobs data with Arrow Functions
    data.forEach((job) => {
        var row = tbody.append("tr");
        Object.entries(job).forEach(([key, value]) => {
            if (key == "title") {
                var cell = row.append("tr");
                cell.text(value);
            }
            if (key == "company") {
                var cell = row.append("tr");
                cell.text(value);
            }
        });

        // if (key == "company") {
        //     var cell = row.append("tr");
        //     cell.text(value);
        // } 
        //  // redirect_url TO BE CHANGED by 'description'
        // if (key == "redirect_url") {
        //     var cell = row.append("tr");
        //     cell.text(value);
        // }
        // if (key == "created") {
        //     var cell = row.append("tr");
        //     cell.text(new Date(value));
        // }
    });


});



