const express = require('express');
const app = express();
app.use(express.json());

let employee = []

//การดึงข้อมูล
app.get('/getEmployee', (req, res) => {
    res.status(200).send({
        data: employee 
    })
})

//การเพิ่มข้อมูล
app.post('/addEmployee', (req, res) => {
    if (!req.body.firstName || !req.body.lastName || !req.body.id || !req.body.position || !req.body.tel || !req.body.email) {
        return res.status(400).send({ message: "ผิดพลาด" })
    }

    for (let i = 0; i < employee.length; i++) {
        if (employee[i].id == req.body.id || employee[i].tel == req.body.tel || employee[i].email == req.body.email) {
            return res.status(400).send({ message: "Error: ข้อมูลพนักงานซ้ำ" })
        }
    }

    const newData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        id: req.body.id,
        position: req.body.position,
        tel: req.body.tel,
        email: req.body.email
    };

    employee.push(newData)
    res.status(200).send({ message: "สำเร็จ" })
})

//การแก้ไขข้อมูล
app.put('/editEmployee', (req, res) => {
    if (
        !req.body.id ||
        (
            !req.body.pos && !req.body.tel && !req.body.email
        )
    ) {
        return res.status(400).send({ message: "ผิดพลาด" })
    }

    for (let i = 0; i < employee.length; i++) {
        if (employee[i].id == req.body.id) {

            if (req.body.position) employee[i].position = req.body.position
            if (req.body.tel) employee[i].tel = req.body.tel
            if (req.body.email) employee[i].email = req.body.email

            return res.status(200).send({ message: "สำเร็จ" })
        }
    }
    return res.status(400).send({ message: "Error: หาข้อมูลพนักงานที่จะแก้ไม่เจอ" })
})

//การลบข้อมูล
app.delete('/delEmployee', (req, res) => {
    if (!req.body.id) {
        return res.status(400).send({ message: "ผิดพลาด" })
    }
    for (let i = 0; i < employee.length; i++) {
        if (employee[i].id == req.body.id) {
            employee.splice(i, 1);
            return res.status(200).send({ message: "สำเร็จ" })
        }
    }
    return res.status(400).send({ message: "Error: ไม่เจอ ID ที่ต้องการลบ" })
})

app.listen(3000, () => {
    console.log('Listening on port: 3000');
});