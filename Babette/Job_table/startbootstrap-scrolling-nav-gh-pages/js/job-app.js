//For the app
// var data = JSON.parse('{{ data | tojson | safe}}');


// Use D3 fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument
d3.json("csvjson (3).json").then(function (data) {

    // //Convert the date string to new Date
    // var newData = data.forEach((job) => { 
    //     Object.entries(job).forEach(([key, value]) => {
    //         if (key === "created") {
    //             value === (new Date(value));
    //         }
    //     });
    // });
    // console.log(newData);

   //Slice the data to show the first 10 job listings:

    var data = data.slice(0, 10);

    // Creating a variable to get a reference to the table body
    var tbody = d3.select("tbody");

    //Appending the table with each jobs data with Arrow Functions
    data.forEach((job) => {
        var row = div(".col-lg-8 mx-auto").append("div");
        Object.entries(job).forEach(([key, value]) => {
            if (key == "title") {
                var cell = row.append("div");
                cell.text(value);
            }
        });
    //     var row = tbody.append("tr");
    //     Object.entries(job).forEach(([key, value]) => {
    //         if (key == "company") {
    //             var cell = row.append("tr");
    //             cell.text(value);
    //         } 
    //      // redirect_url TO BE CHANGED by 'description'
    //     if (key == "description") {
    //         var cell = row.append("tr");
    //         cell.text(value);
    //     }
    //       if (key == "created") {
    //         var cell = row.append("tr");
    //         cell.text(new Date(value));
    //     }
    //     });
      
    // });


});

