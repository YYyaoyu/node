var express = require('express');
var mysql = require('mysql');
var app = express();
var path = require('path');

/*var connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : '',
    database : 'node',
    port:'3306'
});

connection.connect();*/
app.use(express.static(path.join(__dirname, '')));
app.set('views', path.join(__dirname, 'views'));
app.set( 'view engine', 'html' );
app.engine( '.html', require( 'ejs' ).__express );
app.listen(3000, function (req, res) {
  console.log('app is running at port 3000');
});
require('./routes')(app);

app.get('/', function(req, res) {
    res.render('homepage');
});

