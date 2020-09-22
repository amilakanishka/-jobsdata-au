var jsonPathSalary = "historicalSalary.json"

d3.json(jsonPathSalary)
    .then(data => {var historicalSalaries = data;

    console.log("historicalSalaries");
    console.log(historicalSalaries);

});