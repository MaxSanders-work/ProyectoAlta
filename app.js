const express = require('express')
const app = express()
const PORT = 3000;
const { Client } = require('pg');

app.set('view engine', 'ejs');
app.set('views', './views');

const client = new Client({
  user: 'postgres',
  host: 'postgres-service.default.svc.cluster.local',
  database: 'datos',
  password: 'postgres',
  port: 5432
});

client.connect();

let temperatura = 0;
let dolar = "";
let uf = "";


app.get('/', function (req, res) {

  var q = "SELECT * FROM datos WHERE id = (SELECT MAX(id) FROM datos);"
  console.log(q);
  client.query(q, (err, res) => {
    console.log(res.rows[0].temp);
    console.log(res.rows[0].usd);
    console.log(res.rows[0].uf);
    temperatura = res.rows[0].temp;
    dolar = res.rows[0].usd;
    uf = res.rows[0].uf;
  });

  res.render("pages/index.ejs",{
    temperatura: temperatura,
    dolar: dolar,
    uf: uf
  });
})

app.listen(PORT, (error) =>{
	if(!error)
		console.log("Server is Successfully Running and App is listening on port "+ PORT)
	else
		console.log("Error occurred, server can't start", error);
	}
);