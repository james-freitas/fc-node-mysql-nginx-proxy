const http = require('http');
const mysql = require('mysql');
const generateName = require('node-random-name');

// Html string that will be send to browser
let reo ='<html><head><title>Full Cycle Rocks!</title></head><body><h1>Full Cycle Rocks!</h1>{${table}}</body></html>';

function setResHtml(sql, cb){

  const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
  };

  const connection = mysql.createConnection(config)

  // Insert person
  let name = generateName()
  const insertSQL = `INSERT INTO people(name) values(?)`
  connection.query(insertSQL, [name], (err, rows) => {
    if (err) throw err;
    console.log("Person " + name + " inserted with id = " + rows.insertId);
  });
  
  // Select all persons
  connection.query(sql, (err, res, cols)=>{
    if(err) throw err;

    let table = '';

    // Create html table with data from db
    for(let i = 0; i < res.length; i++){
      table +='<tr><td>'+ (i + 1) +'</td><td>'+ res[i].name +'</td></tr>';
    }
    table ='<table border="1"><tr><th>Id</th><th>Name</th></tr>'+ table +'</table>';

    connection.end();

    return cb(table);
  });
}

let sql ='SELECT name FROM people';

const server = http.createServer((req, res)=>{
  setResHtml(sql, resql => {
    reo ='<html><head><title>Full Cycle Rocks!</title></head><body><h1>Full Cycle Rocks!</h1>{${table}}</body></html>'
    reo = reo.replace('{${table}}', resql);
    res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
    res.write(reo, 'utf-8');
    res.end();
  });
});

server.listen(3000, ()=>{
  console.log('Server running at //localhost:3000/');
});
