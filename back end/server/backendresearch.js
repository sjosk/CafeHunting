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
  var sql = "SELECT * FROM Cafe WHERE wifi > 4 AND quiet > 4";
  console.log(sql); // SQL Statement to run

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