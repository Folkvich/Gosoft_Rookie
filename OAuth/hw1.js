const express = require('express');
const mysql = require('mysql2')
const jwt = require('jsonwebtoken')
const jwtSecret = "howdeepisyourlove"

const sqlPool = mysql.createPool({

    namedPlaceholders: true,
    charset: 'utf8',
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "",
    database: "gosoft_rookie",

})

const app = express();
app.use(express.json());

app.use((req, response, next) => {
    if (req.path === "/login") return next()

    const authHeader = req.headers.authorization

    if (!authHeader) return response.json({ msg: "error unauthorized" })

    jwt.verify(authHeader.split(' ')[1], jwtSecret, (err, result) => {
        if (err) {
            return response.json({ msg: "error unauthorized" })
        }
        next()
    })
})

//การล็อคอิน
app.post('/login', (req, response) => {
    if (req.body.user === "admin" && req.body.pass === "12345") {
        const token = jwt.sign({ username: "admin" }, jwtSecret)
        return response.json({ token })
    }
    return response.status(400).send("error invalid data");
})


//การดึงข้อมูลพนักงาน
app.get('/getEmployee', (req, response) => {
    const sql = 'select * from employee'
    sqlPool.query(sql, (err, result) => {
        if (err) {
            return response.status(400).json(err)
        }
        return response.json({ data: result })
    })
})


//การเพิ่มข้อมูลพนักงาน
app.post('/createEmployee', (req, response) => {
    if (!req.body.firstName || !req.body.lastName || !req.body.id || !req.body.position || !req.body.tel || !req.body.email) {
        return response.status(400).send({ message: "error invalid data" })
    }
    const sql = 'insert into employee value (:firstName, :lastName, :id, :position, :tel, :email)'
    sqlPool.query(sql, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        id: req.body.id,
        position: req.body.position,
        tel: req.body.tel,
        email: req.body.email
    }, (err, result) => {
        if (err) {
            return response.status(400).json(err)
        }
        return response.json({ data: "ok" })
    })
})

//การแก้ไขข้อมูลพนักงาน
app.put('/updateEmployee', (req, response) => {
    if (
        !req.body.id || !req.body.position || !req.body.tel || !req.body.email
    ) {
        return response.status(400).send("error invalid data");
    }

    const sql = 'update employee set position = :position, tel = :tel, email = :email where id = :id'
    sqlPool.query(sql, {
        id: req.body.id,
        position: req.body.position,
        tel: req.body.tel,
        email: req.body.email
    }, (err, result) => {
        if (err) {
            return response.status(400).json(err)
        }
        if (result.affectedRows === 0) return response.status(400).json({ data: "Employee not found" })
        return response.json({ data: "ok" })
    })
})

//การลบข้อมูลพนักงาน
app.delete('/delEmployee', (req, response) => {
    if (!req.body.id) {
        return response.status(400).send({ message: "error invalid data" })
    }
    const sql = 'delete from employee where id = :id'
    sqlPool.query(sql, {
        id: req.body.id
    }, (err, result) => {
        if (err) {
            return response.status(400).json(err)
        }
        if (result.affectedRows === 0) return response.status(400).json({ data: "Employee not found" })
        return response.json({ data: "ok" })
    })
})

app.listen(3000, () => {
    console.log('Listening on port: 3000');
});