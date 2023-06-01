# Aha-World-of-Taste

### Project Group 1 Restaurant Web


#### Team
These are the people who are currently working on this project.

1.	Pydi Venkata Satya Ramesh Adapa - Project Manager
2.	Jyothsna Pamarthi - Team Lead
3.	Anjali Bhogireddy - Full Stack Developer
4.	Sushmitha Yelmakonda - Tester
5.	Jagadeesh Ponnam - Scrum Master
6.	Ravi Chandra Yalla - Full Stack Developer


#### Basic commands that we used to do the project using React js:

1. To creates a new React application named "Aha-World-of-Taste" using Create React App(for frontend).
   
   ``` npx create-react-app Aha-World-of-Taste ```
   
2. To launch the react app we need to use following command, so that it automatically launches the application in the browser.
   
   ``` npm start``` 
3. To create backend directory and initiate node application and install necessary packages

   ```npm init -y```
   ```npm i mysql express cors nodemon```

#### Steps for database setup

1. Start Apache and MySQL services in XAMPP control Panel
2. Once the MySQL service is started go to [phpMyAdmin](http://localhost/phpmyadmin/)
3. Now create database by clicking New button
4. give the database name as "aha" 
5. Now create table "customer" with attributes "Id", "name", "email", "password", "phone", "address" select Id attribute as primary key and select option to auto_generate nubers, for all other attributes data type is varchar.
6. Now make sure "npm start" is run in both the directories frontend and backend.
7. Then application will be live at [localhost](http://localhost:3000/)  