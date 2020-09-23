// BENCHMARK FUNCTION HERE
// Function to create Benchmark salary chart

function benchmarkChart() {

    // Benchmark salary chart file path
    var csvPath = "Benchmark_info.csv"

    // Create global variables outside
    // if need be.. see if this works

    d3.csv(csvPath)
        .then(data => {var benchmarkListing = data;

        console.log("benchmarkListing");
        console.log(benchmarkListing);
        
        // Need to add DOM/D3 to obtain input value from HTML
        // Insert code here

        // Temp code
        d3.json(jsonPathJob)
            .then(data => {var jobListing = data;

            // Mock data - need to be replaced with inputValue
            var selectedJob = jobListing[17]; // index 3 for permanent index 17 for contract
            console.log("selectedJob");
            console.log(selectedJob);

            // Get keyword, state, title and company for filtering and plotting
            var selectedKeyword = selectedJob.keyword;
            // var selectedState = selectedJob.State // no such field now.. all in string
            var selectedTitle = selectedJob.title;
            var selectedCompany = selectedJob.company;
            var selectedJobRole = selectedCompany + ": " + selectedTitle;
            var selectedState = selectedJob.state;

            // Get Minimum & Maximum Salary - conditional function to deal with annual/daily/hourly rates
            if (selectedJob.salary_min == "") {
                var selectedMinSal = 0;
                var selectedMaxSal = 0;
            } else if (selectedJob.salary_min < 500) {
                selectedMinSal = selectedJob.salary_min * 8;
                selectedMaxSal = selectedJob.salary_max * 8;
            } else selectedMinSal = selectedJob.salary_min;
                selectedMaxSal = selectedJob.salary_max;

            // Calculate Median Salary 
            var selectedMedSal = (selectedMinSal + selectedMaxSal) / 2;

            // Conditional function to classify a job as "contract" or "permanent" based on salary expression (annual/daily rate)
            if (selectedMinSal < 30000) {
                var selectedContractType = "contract";
            } else selectedContractType = "permanent";

            console.log("selectedMinSal");
            console.log(selectedMinSal);
            console.log("selectedMaxSal");
            console.log(selectedMaxSal);
            console.log("selectedMedSal");
            console.log(selectedMedSal);
            console.log(selectedKeyword);
            console.log(selectedTitle);
            console.log(selectedCompany);
            console.log(selectedContractType);
            console.log(selectedJobRole);
        
        // End temp code 
        
            // Filter by 1) Keyword 2) State 
            var filteredbenchmarkListing = benchmarkListing.filter(item =>
                (item.Keyword === selectedKeyword) &&  // Replace with inputValue for job search keyword
                (item.State === selectedState)); // Replace with inputValue for state

            // Filter by Contract_Type
            var permanentBenchmarkListing = filteredbenchmarkListing.filter(item =>
                (item.Contract_Type === "permanent")); 
            
            var contractBenchmarkListing = filteredbenchmarkListing.filter(item =>
                (item.Contract_Type === "contract"));   

            // Setup permanent job benchmark information as arrays
            var permJobRoles = permanentBenchmarkListing.map(row => row.Source + ": " + row.Job_Role);
            var permMinSals = permanentBenchmarkListing.map(row => row.Min_Sal);
            var permMaxSals = permanentBenchmarkListing.map(row => row.Max_Sal - row.Median);
            var permMedSals = permanentBenchmarkListing.map(row => row.Median - row.Min_Sal);
            var permMinSalsText = permanentBenchmarkListing.map(row => "$"+row.Min_Sal);
            var permMaxSalsText = permanentBenchmarkListing.map(row => "$"+row.Max_Sal);
            var permMedSalsText = permanentBenchmarkListing.map(row => "$"+row.Median);

            // Setup contract job benchmark information as arrays
            var contractJobRoles = contractBenchmarkListing.map(row => row.Source + ": " + row.Job_Role);
            var contractMinSals = contractBenchmarkListing.map(row => row.Min_Sal);
            var contractMaxSals = contractBenchmarkListing.map(row => row.Max_Sal - row.Median);
            var contractMedSals = contractBenchmarkListing.map(row => row.Median - row.Min_Sal);
            var contractMinSalsText = contractBenchmarkListing.map(row => "$"+row.Min_Sal);
            var contractMaxSalsText = contractBenchmarkListing.map(row => "$"+row.Max_Sal);
            var contractMedSalsText = contractBenchmarkListing.map(row => "$"+row.Median);
            
            // Add conditional function to decide to plot permanent or contract benchmark chart
            if (selectedContractType === "permanent") {

                // Add selected data to array
                permJobRoles.push(selectedJobRole);
                permMinSals.push(selectedMinSal);
                permMaxSals.push((selectedMaxSal-selectedMedSal));
                permMedSals.push((selectedMedSal-selectedMinSal));
                permMinSalsText.push("$"+selectedMinSal);
                permMaxSalsText.push("$"+selectedMaxSal);
                permMedSalsText.push("$"+selectedMedSal);

                // Setup trace data
                var benchmarkTrace1 = {
                    x: permMinSals,
                    y: permJobRoles,
                    text: permMinSalsText,
                    name: "Minimum Salary",
                    hoverinfo: "text+name",
                    orientation: "h",
                    type: "bar",
                    marker: {
                        color: "rgb(35,181,181)",
                        opacity: 0.0,
                    }
                };
        
                var benchmarkTrace2 = {
                    x: permMedSals,
                    y: permJobRoles,
                    text: permMedSalsText,
                    name: "Median Salary",
                    hoverinfo: "text+name",
                    orientation: "h",
                    type: "bar",
                    marker: {
                        color: "rgb(35,181,181)",
                        opacity: 0.6,
                        line: {
                            color: "rgb(84,84,84)",
                            width: 2,
                        }
                    }
                };
        
                var benchmarkTrace3 = {
                    x: permMaxSals,
                    y: permJobRoles,
                    text: permMaxSalsText,
                    name: "Maximum Salary",
                    hoverinfo: "text+name",
                    orientation: "h",
                    type: "bar",
                    marker: {
                        color: "rgb(35,181,181)",
                        opacity: 0.6,
                        line: {
                            color: "rgb(84,84,84)",
                            width: 2,
                        }
                    }
                };
                
                // Place trace into an array for plotting
                var permBenchmarkData = [benchmarkTrace1, benchmarkTrace2,  benchmarkTrace3];
                
                // Setup chart layout
                var permBenchmarkLayout = {
                    title: "Permanent Full Time Salary Ranges",
                    barmode: "stack",
                    bargroupgap: 0.1,
                    yaxis : { 
                        showgrid : false 
                    },
                    xaxis: { 
                        zeroline : false, 
                        showgrid : false ,
                        title: "Salary per annum ($AUD)",
                    },
                    showlegend: false
                };

                // Render chart
                Plotly.newPlot("benchmark", permBenchmarkData, permBenchmarkLayout);


            } else if (selectedContractType === "contract") {

                // Add selected data to array
                contractJobRoles.push(selectedJobRole);
                contractMinSals.push(selectedMinSal);
                contractMaxSals.push((selectedMaxSal-selectedMedSal));
                contractMedSals.push((selectedMedSal-selectedMinSal));
                contractMinSalsText.push("$"+selectedMinSal);
                contractMaxSalsText.push("$"+selectedMaxSal);
                contractMedSalsText.push("$"+selectedMedSal);

                // Setup trace data
                var benchmarkTrace11 = {
                    x: contractMinSals,
                    y: contractJobRoles,
                    text: contractMinSalsText,
                    name: "Minimum Salary",
                    hoverinfo: "text+name",
                    orientation: "h",
                    type: "bar",
                    marker: {
                        color: "rgb(35,181,181)",
                        opacity: 0.0,
                    }
                };

                var benchmarkTrace12 = {
                    x: contractMedSals,
                    y: contractJobRoles,
                    text: contractMedSalsText,
                    name: "Median Salary",
                    hoverinfo: "text+name",
                    orientation: "h",
                    type: "bar",
                    marker: {
                        color: "rgb(35,181,181)",
                        opacity: 0.6,
                        line: {
                            color: "rgb(84,84,84)",
                            width: 2,
                        }
                    }
                };

                var benchmarkTrace13 = {
                    x: contractMaxSals,
                    y: contractJobRoles,
                    text: contractMaxSalsText,
                    name: "Maximum Salary",
                    hoverinfo: "text+name",
                    orientation: "h",
                    type: "bar",
                    marker: {
                        color: "rgb(35,181,181)",
                        opacity: 0.6,
                        line: {
                            color: "rgb(84,84,84)",
                            width: 2,
                        }
                    }
                };

                // Place trace data into an array for plotting
                var contractBenchmarkData = [benchmarkTrace11, benchmarkTrace12,  benchmarkTrace13];

                // Setup chart layout
                var contractBenchmarkLayout = {
                    title: "Contract Day Rate Salary Ranges",
                    barmode: "stack",
                    bargroupgap: 0.1,
                    yaxis : { 
                        showgrid : false 
                    },
                    xaxis: { 
                        zeroline : false, 
                        showgrid : false,
                        title: "Contract rate per day ($AUD)", 
                    },
                    showlegend: false,
                    legend: {
                        orientation: "h",
                        xanchor: "center",
                        yanchor: "bottom",
                        x: 0.5,
                        y: -0.25,
                    }
                };

                // Render chart
                Plotly.newPlot(`insertChartHere0`, contractBenchmarkData, contractBenchmarkLayout);

            };
            
            // Position axis titles above horizontal bar charts (problem: titles are really long)
            document.getElementById(`insertChartHere0`).on('plotly_afterplot', function() {
                var yAxisLabels = [].slice.call(document.querySelectorAll('[class^="yaxislayer"] .ytick text, [class*=" yaxislayer"] .ytick text'))
                var bar = document.querySelector('.plot .barlayer .bars path')
                var barHeight = bar.getBBox().height
                var offset = 12
                
                for (var i = 0; i < yAxisLabels.length; i++) {
                var yAxisLabel = yAxisLabels[i];
                yAxisLabel.setAttribute('text-anchor', 'start')
                yAxisLabel.setAttribute('y', yAxisLabel.getAttribute('y') - (barHeight / 2) - offset)
                };

            }); 
        });
    });
};

benchmarkChart();

