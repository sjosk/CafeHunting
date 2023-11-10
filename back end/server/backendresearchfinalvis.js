const express = require('express');
const mysql = require('mysql');

const app = express();

var portNumber = 8816;

var connection = mysql.createConnection({
  host: 'casa0017.cetools.org',
  user: 'zczqy80',
  password: 'qafizojeya',
  database: 'zczqy80'
});

connection.connect(err => {
  if (err) {
    console.error('数据库连接失败: ' + err.stack);
    return;
  }
  console.log('数据库连接成功。');
});

app.get('/Table/Cafe', function (req, res) {
  console.log("test");

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-WithD");

  // Retrieve filter values from query parameters

  var wifi = req.query.wifi;
  var seat = req.query.seat;
  var quiet = req.query.quiet;
  var cheap = req.query.cheap;
  var music = req.query.music;
  var socket = req.query.socket;
  var standingDesk = req.query.standing_desk;
  var limitedTime = req.query.limited_time;

    // Define a base SQL query
    var sql = "SELECT * FROM Cafe";
  
    // Initialize an array to hold query conditions
    let conditions = [];
    
    // Add conditions based on query parameter existence
    if (wifi) {
      conditions.push(`wifi > ${connection.escape(wifi)}`);
    }
    if (seat) {
      conditions.push(`seat > ${connection.escape(seat)}`);
    }
    if (quiet) {
      conditions.push(`quiet > ${connection.escape(quiet)}`);
    }
    if (cheap) {
      conditions.push(`cheap > ${connection.escape(cheap)}`);
    }
    if (music) {
      conditions.push(`music > ${connection.escape(music)}`);
    }
    if (socket) {
      conditions.push(`socket == "${connection.escape(socket)}"`);
    }
    if (standingDesk) {
      conditions.push(`standingDesk == "${connection.escape(standingDesk)}"`);
    }
    if (limitedTime) {
      conditions.push(`limitedTime == "${connection.escape(limitedTime)}"`);
    }


    // If there are conditions, append them to the SQL query
    if (conditions.length) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }
  
    console.log(sql); // Log the final SQL Statement to run


  connection.query(sql, function (err, rows) {
    if (err) {
      console.error("Error executing the query: ", err);
      return res.status(500).send("Error executing the query");
    }

    if (rows.length) {
      console.log('查询结果(result):', rows);
      res.send(rows);
    } else {
      console.log('No results found.');
      res.status(404).send("No cafes found with the given criteria");
    }
  });
});

var server = app.listen(portNumber, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('App listening at http://%s:%s', host, port);
});