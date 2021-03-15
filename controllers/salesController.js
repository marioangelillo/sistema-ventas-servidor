const { validationResult } = require('express-validator');
const mysql = require('mysql');

var db = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'ventas'
  });

  exports.createTable = async (req, res) => {

    const sqlCreateTable = "CREATE TABLE IF NOT EXISTS ventas.ventas (id INT NOT NULL AUTO_INCREMENT primary key, fecha varchar(15), monto float, pago varchar(50))"

    try {
        db.query(sqlCreateTable, (err, result) => {
            console.log(err)
        })
    } catch (error) {
        console.error(error);
        return res.status(400).json({msg: 'Hubo un error'});
    }    
  }

exports.newSale = async (req, res) => {
    const {total} = req.body
    const {date} = req.body
    const {payment} = req.body
    console.log(total)
    console.log(date)
    console.log(payment)

    if(total <= 0){
        res.status(400).json({msg: 'El monto total debe ser mayor que 0'});
        return;
    }

    const sqlInsert = "INSERT INTO ventas.ventas (fecha, monto, pago) VALUES (?,?,?);"; 

    console.log(req.body);
    try {
        db.query(sqlInsert, [date, total, payment], (err, result) => {
            console.log(err)
            res.json(result);
        })

    } catch (error) {
        console.error(error);
        return res.status(400).json({msg: 'Hubo un error'});
    }    
}