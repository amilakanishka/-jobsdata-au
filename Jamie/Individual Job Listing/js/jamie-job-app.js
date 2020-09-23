var jsonPathJob = "jobSearchResults2.json"

// Benchmark salary chart file path
var csvPath = "Benchmark_info.csv"


d3.csv(csvPath)
    .then(data => {var benchmarkListing = data;

    d3.json(jsonPathJob)
        .then(data => {jobListing = data;

            jobListing = jobListing.filter(job => job.salary_min > 100);

            for (i = 0; i < 30; i++) {

                // Get data and insert into variable
                var jobKeyword = jobListing[i].keyword;
                var jobRole = jobListing[i].title;
                var jobCompany = jobListing[i].company;
                var jobPlace = jobListing[i].area;
                var jobState = jobListing[i].state;
                var jobDate = jobListing[i].created;
                var jobTime = jobListing[i].contract_time;
                var jobType = jobListing[i].contract_type;
                var jobDescription = jobListing[i].description;
                var jobSalMin = jobListing[i].salary_min;
                var jobSalMax = jobListing[i].salary_max;

                // Create container div for job detail
                var containerDiv = document.createElement('div');
                // containerDiv.id = 'test';
                containerDiv.className = 'container';

                // Create row div
                var rowDiv = document.createElement('div');
                rowDiv.className = 'row';

                // DIV FOR JOB LISTING
                // Create div for bootstrap
                var bootstrapDivLeft = document.createElement('div');
                bootstrapDivLeft.id = 'insertJobHere';
                bootstrapDivLeft.className = 'col-md-6 mx-auto';

                // Create h2 for job title
                var titleH2 =  document.createElement('h2');
                titleH2.innerText = jobRole;

                // Create a for company
                var companyA =  document.createElement('p');
                companyA.className = 'job-company';
                companyA.innerText = jobCompany;

                // Create ul
                var jobUl =  document.createElement('ul');

                // Create il for place
                var placeIl =  document.createElement('li');
                placeIl.className = 'job-place';
                placeIl.innerText = jobPlace;

                // Create il for date
                var dateIl =  document.createElement('li');
                dateIl.className = 'job-date';
                dateIl.innerText = jobDate;

                // Create il for contract time
                var timeIl =  document.createElement('li');
                timeIl.className = 'job-time';
                timeIl.innerText = jobTime;

                // Create il for contract type
                var typeIl =  document.createElement('li');
                typeIl.className = 'job-type';
                typeIl.innerText = jobType;

                // Create p for job description
                var descriptionP =  document.createElement('p');
                descriptionP.className = 'job-description'
                descriptionP.innerText = jobDescription;

                // DIV FOR CHART
                // Create div for bootstrap
                var bootstrapDivRight = document.createElement('div');
                bootstrapDivRight.id = 'insertChartHere'+i;
                bootstrapDivRight.className = 'col-md-6 benchmark-chart';

                // Append child 
                containerDiv.appendChild(rowDiv);
                rowDiv.appendChild(bootstrapDivLeft);
                bootstrapDivLeft.appendChild(titleH2);
                bootstrapDivLeft.appendChild(companyA);
                bootstrapDivLeft.appendChild(jobUl);
                jobUl.appendChild(dateIl);
                jobUl.appendChild(placeIl);
                jobUl.appendChild(timeIl);
                jobUl.appendChild(typeIl);
                bootstrapDivLeft.appendChild(descriptionP);
                rowDiv.appendChild(bootstrapDivRight);

                // Then append the whole thing onto the test section
                document.getElementById('individual-job').appendChild(containerDiv);

                // SETUP BENCHMARK CHART
                // Get keyword, state, title and company for filtering and plotting
                var selectedKeyword = jobKeyword;
                var selectedState = jobState;
                var selectedTitle = jobRole;
                var selectedCompany = jobCompany;
                var selectedJobRole = selectedCompany + ": " + selectedTitle;

                // Get Minimum & Maximum Salary - conditional function to deal with annual/daily/hourly rates
                if (jobSalMin == "") {
                    var selectedMinSal = 0;
                    var selectedMaxSal = 0;
                } else if (jobSalMax < 500) {
                    selectedMinSal = selectedJob.salary_min * 8;
                    selectedMaxSal = selectedJob.salary_max * 8;
                } else selectedMinSal = jobSalMin;
                    selectedMaxSal = jobSalMax;

                // Calculate Median Salary 
                var selectedMedSal = (selectedMinSal + selectedMaxSal) / 2;

                // Conditional function to classify a job as "contract" or "permanent" based on salary expression (annual/daily rate)
                if (selectedMinSal < 30000) {
                    var selectedContractType = "contract";
                } else selectedContractType = "permanent";
            
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
                    title: "Salary Ranges: Offered vs Benchmark (Permanent Full Time)",
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
                Plotly.newPlot(`insertChartHere${i}`, permBenchmarkData, permBenchmarkLayout);

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
                    title: "Salary Ranges: Offered vs Benchmark (Contract Day Rate)",
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
                Plotly.newPlot(`insertChartHere${i}`, contractBenchmarkData, contractBenchmarkLayout);
            };
        
        };

        // Position axis titles above horizontal bar charts (problem: titles are really long)
        document.getElementById(`insertChartHere0`).on('plotly_afterplot', function() {
            var yAxisLabels = [].slice.call(document.querySelectorAll('[class^="yaxislayer"] .ytick text, [class*=" yaxislayer"] .ytick text'))
            var bar = document.querySelector('.plot .barlayer .bars path')
            var barHeight = bar.getBBox().height
            var offset = 12
            
            for (var x = 0; x < yAxisLabels.length; x++) {
                var yAxisLabel = yAxisLabels[x];
                yAxisLabel.setAttribute('text-anchor', 'start')
                yAxisLabel.setAttribute('y', yAxisLabel.getAttribute('y') - (barHeight / 2) - offset)
            };
        });

    });

});

