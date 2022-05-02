const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    console.log(req.query)

    if (!req.query.n1 || !req.query.n2 || !req.query.n3 || !req.query.n4) return res.status(403).send("error");


    const num19 = /^[1-9]{1,1}$/;
    if (!num19.exec(req.query.n1) || !num19.exec(req.query.n2) || !num19.exec(req.query.n3) || !num19.exec(req.query.n4)) return res.status(403).send("err regex");
  

    const n1 = parseInt(req.query.n1); //แปรงเลขที่เอาไปคำนวนได้
    const n2 = parseInt(req.query.n2); //แปรงเลขที่เอาไปคำนวนได้
    const n3 = parseInt(req.query.n3); //แปรงเลขที่เอาไปคำนวนได้
    const n4 = parseInt(req.query.n4); //แปรงเลขที่เอาไปคำนวนได้

    const game24solver = require('24game-solver/dist/24game-solver');
    const result = game24solver([n1, n2, n3, n4], 24);
    let sucess = "Success";
    if (result.length == 0) sucess = "Fail"
    console.log(result);

    res.send({
        status: sucess,
        result: result
    })
})

app.listen(3000, () => {
    console.log('Listening on port: 3000');
});

