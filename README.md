

# Project Intake API

Backend REST API for Intake Project.

Exposes the following REST Endpoints 

### Projects endpoint

POST   /projects

GET    /projects 

GET    /projects/id

PUT    /projects/id

DELETE /projects


### Services endpoint

POST   /services

GET    /services 

GET    /services/id

PUT    /services/id

DELETE /services


### Regions endpoint

POST   /regions

GET    /regions 

GET    /regions/id

PUT    /regions/id

DELETE /regions


### Groups endpoint

POST   /groups

GET    /groups 

GET    /groups/id

PUT    /groups/id

DELETE /groups


## Configuring MongoDB Service for Bluemix

Visit the app.compose.io site and create an account.

Create a MongoDB deployment.

Provide a deployment name and the name of the desired deployment zone.

Create a Database

Create users credentials

##Adding the service in Bluemix

Follow instructions in 
https://new-console.ng.bluemix.net/catalog/services/mongodb-by-compose

Add the MongoDB Service by Compose in your Bluemix console.

## Deployment

### Steps to Deploy 

--set endpoint and login

bluemix api https://api.ng.bluemix.net

--login

  bluemix login -u "your userid"

--set orgs and spaces

  cf target -o "your organization"

  cf target -s "your space"

--deploying application.

  Modify the manifest.yml with the name you used for MongoDB Service

  cf push

  cf restage
  //Note that if you haven't added the service the bind may not happen and you may need to restage

###  Verifying logs 

  Bluemix console may not show all logs during application startup. 

  Use the cf logs command from command line to verify logs 

  cf logs "project name" 
