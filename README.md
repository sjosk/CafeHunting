# CafeHunting

## Overview
The objective of the website is to establish a platform that generates suitable cafa data outcomes using a filter. Initially, we focus on integrating the front-end with the back-end. The front-end will relay user-selected commands from the filter to the back-end. In response, the back-end will interact with a specifically required database and transmit the results back to the front-end.

## Front-end


## Back-end
The Taipei Cafe API is accessible at [https://cafenomad.tw/api/v1.2/cafes/taipei/]. This API generates a file known as [Cafe.sql](/CafeHunting/back end/database/Cafe.sql/), which is then converted into a .json format. This conversion results in the creation of a database named [cafedata.json](/CafeHuntingback end/database/cafedata.json/).
### Node.js
This Node.js script is designed to read and process data from a JSON file, specifically 'cafedata.json'. It begins by importing the 'fs' module for file system operations. The script reads the 'cafedata.json' file, and if there are no errors in reading, it proceeds to analysis the JSON data.
Upon successful analysising, the script runs over each item in the JSON data, constructing SQL insert statements for each. It extracts keys and values from the JSON objects, formats them appropriately for SQL syntax, and appends an INSERT statement to a string variable sqlQuery for each JSON item.
Additionally, the script includes functionality to save these SQL statements into a file named 'Cafe.sql'. If an error occurs during the writing process, the script logs an error message. Otherwise, it confirms the successful saving of the SQL queries to 'Cafe.sql'.
Error handling is present at each step, logging relevant messages if an error occurs while reading the JSON file or parsing its content.

### Backendresearch.js
The 'backendresearch.js' file, serves as a backend script for a web application using Node.js with Express and MySQL. It begins by importing the necessary modules: express for server functionality and mysql for database interactions.
It initialises an Express application and sets a variable portNumber to define the port on which the server listens. It then establishes a MySQL database connection using "mysql.createConnection" and provides the necessary credentials and database information. The script handles connection errors and confirms a successful database connection with a console message.
A key feature of this script is the API endpoint '/Table/Cafe', which is set up to handle GET requests. When this endpoint is accessed, the script executes a SQL query to select all records from the 'Cafe' table in the database where the 'wifi' and 'quiet' ratings are greater than 4. It logs the SQL statement for debugging purposes.
A key functionality of the script is the API endpoint "/Table/Cafe", which is set up to handle GET requests. When accessing this endpoint, the script performs a SQL query to select all records from the "Cafe" table in the database that have a "wifi" and "quiet" rating greater than 4. The script logs the SQL statements for debugging purposes.
The script uses the connection.query method to execute the SQL query. If an error occurs during query execution, the script logs the error and sends a 500 status response. If the query succeeds, the script checks to see if any records were returned. If a record is found, it is logged and sent as a response; otherwise, a message is logged stating that no result was found and a 404 status response is sent.


## Connecting frontend and backend

