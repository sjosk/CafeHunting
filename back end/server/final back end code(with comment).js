const express = require('express');
const mysql = require('mysql');

const app = express();
//use express and mysql
//使用MySQL和express

//set port number at 8816 for our group
//将我们组的port设置在8816
var portNumber = 8816;

//The account link to database,(password has been removed)
//连接到database的账号，密码已被隐藏
var connection = mysql.createConnection({
  host: 'casa0017.cetools.org',
  user: 'zczqy80',
  password: xxxxxxxx,
  database: 'zczqy80'
});

//connect to database, if error, return error and display it
//链接到数据库，如果发生错误，返回并显示它
connection.connect(err => {
  if (err) {
    console.error('数据库连接失败: ' + err.stack);
    return;
  }
  console.log('数据库连接成功。');
});


//main part of back end, read filter from URL, query database, and send data to front end by api
//代码主体，通过URL读取filter，查询数据库，并通过API回传数据到前端
app.get('/Table/Cafe', function (req, res) { 
//generate api at: http://casa0017.cetools.org:8816/Table/Cafe
//在http://casa0017.cetools.org:8816/Table/Cafe处生成API

  //display "test" for user to show the app.get function has been started (为用户展示“test”，以证明app.get函数已经启用)
  console.log("test"); 

  //Open server api security permissions to allow front-end access (I'm sorry here for one of the front-end developers Chen Guandi)
  //开放服务器api的安全权限，允许前端访问（我在此向前端开发人员之一陈冠笛抱歉）
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-WithD");

  //Retrieve filter values from query parameters (for example: the URL is :http://casa0017.cetools.org:8816/Table/Cafe?wifi=0&seat=4)
  //从URL处读取filter的值（比如URL为：http://casa0017.cetools.org:8816/Table/Cafe?wifi=0&seat=4）
  var wifi = req.query.wifi;     //if item of "wifi" has been included in URL, assign the value to var wifi (in this example, wifi = 0); 如果URL中含有“wifi”，则为var wifi 赋值（在这个例子中wifi = 0）
  var seat = req.query.seat;     //if item of "seat" has been included in URL, assign the value to var seat (in this example, seat = 4); 如果URL中含有“seat”，则为var seat 赋值（在这个例子中seat = 4）
  var quiet = req.query.quiet;   //if item of "quiet" has been included in URL, assign the value to var quiet| if not, the subsequent code for "quiet" is not executed; 如果URL中含有“quiet”，则为var quiet 赋值,如果没有后续有关“quiet”的代码不予执行
  var cheap = req.query.cheap;   //same as above, in this example, no cheap
  var music = req.query.music;   //same as above, in this example, no music
  var socket = req.query.socket; //same as above, in this example, no socket
  var standing_desk = req.query.standing_desk; //......
  var limited_time = req.query.limited_time; //......

    //Define a base SQL query
    //定义基础SQL查询语句
    var sql = "SELECT * FROM Cafe"; 
  
    //Initialize an array to hold query conditions, and Add conditions based on query parameter existence (I'm apologized to Guandi a second time)
    //根据上述读取到的filter的值（比如wifi=0 和 seat=0）生成附加SQL语句(我再次向陈冠笛抱歉)
    let conditions = [];
    
    if (wifi) {
      conditions.push(`wifi > ${connection.escape(wifi)}`); //if wifi has been read, generate string of  "wifi > "value of 'wifi'" (in this example: "wifi > 0")；如果wifi在URL中被读到，生成"wifi > "value of 'wifi'"的字符串（在这个例子中为"wifi > 0”）
    }
    if (seat) {
      conditions.push(`seat > ${connection.escape(seat)}`); //if seat has been read, generate string of  "seat > "value of 'seat'" (in this example: "seat > 4")；如果seat在URL中被读到，生成"seat > "value of 'seat'"的字符串（在这个例子中为"seat > 4”）
    }
    if (quiet) {
      conditions.push(`quiet > ${connection.escape(quiet)}`); //if quiet has been read, generate string of  "quiet > "value of 'quiet'"| if not, no additional string for "quiet" (in this example, no string for quiet)；如果quiet在URL中被读到，生成"quiet > "value of 'quiet'"的字符串，如果没有则不为”quiet“生成新字符串（在这个例子中，没有关于”quiet“的字符串）
    }
    if (cheap) {
      conditions.push(`cheap > ${connection.escape(cheap)}`); //same as above, in this example, no cheap
    }
    if (music) {
      conditions.push(`music > ${connection.escape(music)}`); //same as above, in this example, no music
    }
    if (socket) {
      conditions.push(`socket = ${connection.escape(socket)}`); //same as above, in this example, no music
    }
    if (standing_desk) {
      conditions.push(`standing_desk = ${connection.escape(standing_desk)}`); //......
    }
    if (limited_time) {
      conditions.push(`limited_time = ${connection.escape(limited_time)}`); //......
    }


    //If there are conditions, append them to the SQL query
    //将上述生成的字符串添加到SQL查询命令中 
    if (conditions.length) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }
  
    // Log the final SQL Statement to run (in this example, the SQL is；"SELECT * FROM Cafe WHERE wifi > 0 AND seat > 4")
    // 显示SQL查询命令（在这个例子中，SQL查询命令为："SELECT * FROM Cafe WHERE wifi > 0 AND seat > 4"）
    console.log(sql); 

  //Query in database and return data to API link (in this example, API would show all cafe which meet the requirements of wifi > 0 and seat > 4)
  //查询数据库，并将结果显示在API上（在这个例子中，API将会显示所有满足wifi > 0和seat > 4的咖啡店）
  connection.query(sql, function (err, rows) {
    if (err) {
      console.error("Error executing the query: ", err); //if error, return it 
      return res.status(500).send("Error executing the query");//如果查询报错，显示错误
    }

    if (rows.length) {
      console.log('查询结果(result):', rows); //display result at API
      res.send(rows); //在API上显示结果
    } else {
      console.log('No results found.');
      res.status(404).send("No cafes found with the given criteria");
    }
  });
});


//generate API at port of 8816
//在8816 port生成API
var server = app.listen(portNumber, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('App listening at http://%s:%s', host, port);
});
