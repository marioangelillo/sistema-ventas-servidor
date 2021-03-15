const { validationResult } = require('express-validator');
const mysql = require('mysql');

var db = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'sistemaventas'
  });

exports.insertProduct = async (req, res) => {

    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errors : errores.array()});
    } 

    const {name, price, stock} = req.body
    const sqlInsert = "INSERT INTO sistemaventas.productos (nombre, precio, stock) VALUES (?,?,?);"; 

    try {
        db.query(sqlInsert, [name, price, stock], (err, result) => {
            console.log(err)
            res.json({msg: 'Producto agregado correctamente'})
        })
    } catch (error) {
        console.error(error);
        return res.status(400).json({msg: 'Hubo un error'});
    }
    
}

exports.findProduct = async (req, res) => {

    const {name} = req.body;
    console.log(name);
    
    const sqlFindProduct = "select * from sistemaventas.productos where nombre like" + "'" +name+ "%';"
        
   try {
        db.query(sqlFindProduct, (err, result) => {
            //console.log(err);
            res.json(result);
        })
    } catch (error) {
        console.error(error);
        return res.status(400).json({msg: 'Hubo un error'});
    }
    
}

exports.deleteProduct = async (req, res) =>{
    
    const sqlDeleteProduct = "DELETE FROM sistemaventas.productos WHERE id=" + req.params.id
        
   try {
        db.query(sqlDeleteProduct, (err, result) => {
            //console.log(err);
            res.json(result);
        })
    } catch (error) {
        console.error(error);
        return res.status(400).json({msg: 'Hubo un error'});
    }
}

exports.updateProduct = async (req, res) =>{

       
        
    const {nombre, precio, stock} = req.body;
    const sqlUpdateProduct = "UPDATE sistemaventas.productos SET nombre = ?, precio = ?, stock = ? WHERE id = " + req.params.id
    
    try {
        db.query(sqlUpdateProduct, [nombre, precio, stock], (err, result) => {
            console.log(err)
            res.json(result);
        })
    } catch (error) {
        console.error(error);
        return res.status(400).json({msg: 'Hubo un error'});
    }
}