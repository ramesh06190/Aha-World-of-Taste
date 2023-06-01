 // JavaScript source code
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

/*const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Aha123",
    database: "signup"
}
)*/
const db = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: '',
    database: 'aha'
})



app.post('/signup', (req, res) => {
    const sql = "INSERT INTO customer(`name`, `email`, `password`, `phone`, `address`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password,
        req.body.phone,
        req.body.address
    ]
    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    })
})

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM customer WHERE `email` = ? AND `password` = ?";
   
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        if(data.length > 0){
            return res.json("Success");
        }
        else{
            return res.json("Fail"); 
        }
        
    })
})

app.listen(8081, () => {
    console.log("listening");
})