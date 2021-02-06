const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

/*var db = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : 'xica1313',
  database : 'sistemaventas'
});*/

app.use(cors());
app.use(express.json({ limit : '10mb'}));// for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

/*app.post('/insert', function(req, res) {
  const {nombre, precio, stock} = req.body
  const sqlInsert = "INSERT INTO sistemaventas.productos (nombre, precio, stock) VALUES (?,?,?);"; 
  const sqlSelect = "SELECT * FROM sistemaventas.productos"; 
  db.query(sqlInsert, [nombre, precio, stock], (err, result) => {
    try {
      res.json({msg: 'Todo OK'})
    } catch (error) {
      console.error(error);
    }  
  }) 
});*/
app.use('/api', require('./routes'));

app.listen(4000, () => {
  console.log('Aplicación ejemplo, escuchando el puerto 4000!');
});