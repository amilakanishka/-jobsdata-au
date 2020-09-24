var jsonPathSalary = "historicalSalary.json"
var csvPathUnderemployment = "Labour_csv/Underemployment_rate_Seasonally_adjusted_jamie.csv"

d3.json(jsonPathSalary)
    .then(data => {var historicalSalaries = data;

    console.log("historicalSalaries");
    console.log(historicalSalaries);

    console.log(historicalSalaries[0].month);
    
    

    var test = historicalSalaries[0].month;
    console.log(typeof(test));

    var dateTest = new Date(test);
    console.log(typeof(dateTest));
    console.log(dateTest);
    console.log(dateTest.toDateString());

    d3.csv(csvPathUnderemployment)
        .then(data => {var underemploymentData = data;

        console.log("underemploymentData");
        console.log(underemploymentData);
    
    });
});