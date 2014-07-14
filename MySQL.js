var mysql = require('mysql');
 
// use globals from config file : weenkhoorn 
var connection = mysql.createConnection(
    {
      host     : 'loki.dev',
      user     : 'nodejs',
      password : 'yrf2hc',
      database : 'nodejs',
    }
);
 
connection.connect();
 
var queryString = 'SELECT * FROM posts'; // never use * it slows your query down use what you are looking for!!
 
connection.query(queryString, function(err, rows, fields) {
    
    if (err) throw err;
 
    for (var i in rows) {
        console.log('Post ID: ', rows[i].id);
        console.log('Post Titles: ', rows[i].title);
    }  
    
});


var query = connection.query('SELECT * FROM posts_222');
 
query.on('error', function(err) {
    // you could build a decent errorhandler : WEEnkhoorn
    throw err;
    
});
 
// Show all fields : weenkhoorn 
query.on('fields', function(fields) {
    console.log(fields);
});
 
// make usefull subqueries on result : weenkhoorn 
query.on('result', function(row) {
    console.log(row.title);
});
 
 
// make use of pause if you need to do a bunch of queries : weenkhoorn
query.on('result', function(row) {
    connection.pause();
    // Do some more processing on the row
    console.log(row);
    connection.resume();
}); 

//close connection
connection.end();