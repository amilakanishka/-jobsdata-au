var jsonPathSalary = "historicalSalary.json"
var csvPathUnderemployment = "Labour_csv/Underemployment_rate_Seasonally_adjusted.csv"

d3.json(jsonPathSalary)
    .then(data => {var historicalSalaries = data;

    console.log("historicalSalaries");
    console.log(historicalSalaries);

    d3.csv(csvPathUnderemployment)
        .then(data => {var underemploymentData = data;

        console.log("underemploymentData");
        console.log(underemploymentData);
    
    });
});