# CodeChallenge

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.7.

## Development server
1. Clone the project

2. npm install

3. In terminal 1 run: `npm run server`. Json-server will fake an API on port 8080. 
 Resources will be at: http://localhost:8000/jobs
4. In terminal 2 run: `ng serve`
    Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.



 

## Tasks : Publishing Job Ads Application

Your task is to create a publishing job ads application. 
Here are the system requirements. 

Users must be able to:
1. Use @ngrx/effect to Create/Read/Update/Delete a job Ads (jobs.service as already been set up for you) 
   
   !Warning : When creating a job ad, the user should create the Reference himself but you cannot have twice the same reference so make sure you have specific asynchronous validation on this field.
2. Create Toggle button action to activate/deactivate a job ad
3. Create some filters to filter by : activated/deactivated, product type
4. Add some simple unit tests (no need to cover the full app :) )
