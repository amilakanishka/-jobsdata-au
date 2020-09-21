//For the app
// var data = JSON.parse('{{ data | tojson | safe}}');


// Use D3 fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument
d3.json("jobSearchMockUp.json").then(function (data) {

    //Creating arrays of data we need to build our table:
    var jobTitle = data.map(job => job.title);
    var company = data.map(job => job.company);
    var date = data.map(job => new Date(job.created));
    // redirect_url TO BE CHANGED by 'description'
    var jobDescription = data.map(job => job.redirect_url); // redirect_url TO BE CHANGED by 'description'

    //    console.log(jobTitle);
    //    console.log(company);
    //    console.log(jobDescription);

    // Creating a variable to get a reference to the table body
    var tbody = d3.select("tbody");

    //Appending the table with each jobs data with Arrow Functions
    data.forEach((job) => {
        var row = tbody.append("tr");
        Object.entries(job).forEach(([key, value]) => {
            if (key == "title") {
                var cell1 = row.append("tr");
                cell1.text(value);
            }
            if (key == "company") {
                var cell2 = row.append("tr");
                cell2.text(value);
            } 
             // redirect_url TO BE CHANGED by 'description'
            if (key == "redirect_url") {
                var cell3 = row.append("tr");
                cell3.text(value);
            }
            if (key == "created") {
                var cell4 = row.append("tr");
                cell4.text(new Date(value));
            }
        });
            
    
    });

});


