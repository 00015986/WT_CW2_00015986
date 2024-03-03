This project is a CRUD (Create, Read, Update, Delete) application for managing patient data. It allows users to register as patients, update their information, delete their records, and view patient data. The application is built using JavaScript, Pug, CSS, and Node.js. Data is stored in a JSON file.

As it is required to not upload the nodu_modules folder, the application will not run without it. But still, the list of dependencies is given in package.json file. So firstly it is required to initialize the nodu_modules folder again. To do that, please navigate to the project directory in your terminal and write "npm install" in new terminal and the node_modules folder will be re-installed again with all necessarry dependencies that are given in package.json file.
The list of dependencies is:
1) body-parser
2) express.js: A web application framework for Node.js used to handle routing and middleware.
3) express-validator
4) nodemon
5) pug: A templating engine for Node.js used to generate HTML dynamically.


Start the server by running "npm run app".
In order to run the application locally in browser, we should navigate to http://localhost:4000/all-users.
This is the page to see all users that are registered as patient
The are two links given in navnar: 1) See all patients, 2) Register a new patient
By clicking to the first link a user will navigate to the users-list webpage, where a user can read the data or update and delete the specific user's data.
The second link will navigate a user to the register-form webpage. There a user can register himself as a patient and see its data recorded in users-list webpage. Each input field in register and update form has its own validation function so that to check a user input and return a message if there is an incorrect input given.

The project is structured as follows:

controllers: Contains the controller files responsible for handling HTTP requests and responses.
data: contains the users_db.json file for storing the user's data.
public: Contains static assets such as CSS files, and client-side JavaScript files.
routes: Contains route files defining the application routes and associated controller methods.
services: Contains javaScript file for inserting a new user's data in users_db.json file or updating user's data.
validators: Contains javaScript file for validating user input.
views: Contains Pug template files defining the layout and structure of the web pages.
app.js: The root JavaScript file responsible for starting the server and configuring middleware.
package.json: Contains metadata about the project and lists dependencies.
README.md: Documentation file providing an overview of the project and instructions for running it.