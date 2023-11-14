![icon](Website/front-end/img/weblogo-05.png)
# CafeHunting

## Overview
The objective of the website is to establish a platform that generates suitable cafa data outcomes using a filter. Initially, we focus on integrating the front-end with the back-end. The front-end will relay user-selected commands from the filter to the back-end. In response, the back-end will interact with a specifically required database and transmit the results back to the front-end.

## Front-end
The website's design integrates HTML, CSS, and JavaScript in its front end. It adopts a user-centered design philosophy, aiming to facilitate users save time and money while searching for coffee shops that align with their requirements.   

### HTML & CSS  
The interface is split into two parts: the left side consists of a functional column (User Input), and the right side showcases a map (Data Output). The site features two primary pages: the homepage (index.html), designed in an application-style format, and a data searching page (datasearch.html).   
  
![web](https://github.com/sjosk/CafeHunting/blob/main/Group%20Report/Img/index.png)
  
**User Interface Design**  
To accentuate the map on the right side, more subdued colors are used in the left functional column. Common modes and shortcuts are incorporated to save users time and enhance the user experience. 
Beyond time efficiency, the website's development involved continuous testing and refinement. Features like map dragging and updating the coordinate range are included, offering users a reference for the distance to nearby coffee shops (Radius 200m).  
Many icons are employed throughout the site, predominantly in SVG format, which aids in altering states through coding. An icon color guide is also provided at the lower left side.  
  
### JavaScript Features
- `Nearby`  
  Utilizes the **W3C Geolocation API**, which requires user consent to acquire their coordinates for marker placement and displaying nearby coffee shop information.
  *(Note: If coordinates fall outside Taipei City, the map centers on the city and alerts users that they are outside the database's range.)*

    ![nearby](https://github.com/sjosk/CafeHunting/blob/main/Group%20Report/Img/Nearby_Geolocation%20API.png)
    
- `Work`  
  Assigns a special functional aspect to coffee shops, providing shortcuts for digital nomads or users utilizing cafes for work. This button is connected with the Filter options below.

    ![work](https://github.com/sjosk/CafeHunting/blob/main/Group%20Report/Img/Work.png)
    
- `Refresh`  
  Allows users to swiftly clear map markers and selections.  
- `Demo`  
  Offers an experience of the Cafe Hunting website features to users located outside Taipei City.  
- `Hunting Your Way`  
  Offers two search modes: a graphical search centered around MRT stations and a data-based search by coffee shop name.
  
     ![search](https://github.com/sjosk/CafeHunting/blob/main/Group%20Report/Img/Searchbyname_buttonafter.png)
     ![MRT](https://github.com/sjosk/CafeHunting/blob/main/Group%20Report/Img/SearchbyMRT.png)
    
- `Filter Option`  
  Includes eight filtering choices (Wi-Fi, Seats, Quiet, Socket, Standing Desk, Cheap, Music, Limited Time) and a shortcut to clear all selections, with real-time feedback provided on the right-side map.
  
  ![Filter](https://github.com/sjosk/CafeHunting/blob/main/Group%20Report/Img/custom.png)

    

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

