var jsonPathJob = "jobSearchResults2.json"
var testData;
var jobListing;

d3.json(jsonPathJob)
    .then(data => {var jobListing = data;

        // Console.log to DELETE LATER
        console.log(jobListing[0]);
        console.log(jobListing.length);

        jobCompany = jobListing[0].company;
        jobID = jobListing[0].id;
        jobRole = jobListing[0].title;
        jobDescription = jobListing[0].description;

        console.log(jobCompany);

        // var test = document.getElementsByTagName("test");
        // console.log(test);

        // Create container div for job detail
        var containerDiv = document.createElement('div');
        // containerDiv.id = 'test';
        containerDiv.className = 'container';

        // Create row div
        var rowDiv = document.createElement('div');
        // rowDiv.id = 'block';
        rowDiv.className = 'row';

        // Create div for bootstrap
        var bootstrapDivLeft = document.createElement('div');
        bootstrapDivLeft.id = 'insertJobHere';
        bootstrapDivLeft.className = 'col-md-6 mx-auto';

        // Create h2 for job title
        var titleH2 =  document.createElement('h2');
        titleH2.id = jobID; // change in loop
        titleH2.innerText = jobRole;

        // Create a for company
        var companyA =  document.createElement('a');
        companyA.className = 'job-company';
        companyA.innerText = jobCompany;

        // Create p for job description
        var descriptionP =  document.createElement('p');
        descriptionP.className = 'job-description'
        descriptionP.innerText = jobDescription;

        // Append child 
        containerDiv.appendChild(rowDiv);
        rowDiv.appendChild(bootstrapDivLeft);
        bootstrapDivLeft.appendChild(titleH2);
        bootstrapDivLeft.appendChild(companyA);
        bootstrapDivLeft.appendChild(descriptionP);

        // Then append the whole thing onto the test section
        document.getElementById('test').appendChild(containerDiv);

});

