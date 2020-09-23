var jsonPathJob = "jobSearchResults2.json"

d3.json(jsonPathJob)
    .then(data => {var jobListing = data;

        for (i = 0; i < 2; i++) {

            // Get data and insert into variable
            var jobRole = jobListing[i].title;
            var jobID = jobListing[i].id;
            var jobCompany = jobListing[i].company;
            var jobPlace = jobListing[i].area;
            var jobDate = jobListing[i].created;
            var jobTime = jobListing[i].contract_time;
            var jobType = jobListing[i].contract_type;
            var jobDescription = jobListing[i].description;

            // Create container div for job detail
            var containerDiv = document.createElement('div');
            // containerDiv.id = 'test';
            containerDiv.className = 'container';

            // Create row div
            var rowDiv = document.createElement('div');
            // rowDiv.id = 'block';
            rowDiv.className = 'row';

            // DIV FOR JOB LISTING
            // Create div for bootstrap
            var bootstrapDivLeft = document.createElement('div');
            bootstrapDivLeft.id = 'insertJobHere';
            bootstrapDivLeft.className = 'col-md-6 mx-auto';

            // Create h2 for job title
            var titleH2 =  document.createElement('h2');
            titleH2.id = jobID; // change in loop
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
            bootstrapDivRight.id = 'insertChartHere';
            bootstrapDivRight.className = 'col-md-6 mx-auto';

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
            document.getElementById('test').appendChild(containerDiv);
    
        };

});

