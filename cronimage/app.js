const express = require('express')
const app = express()
const PORT = 3001;
const { Client } = require('pg');
const fetch = require('node-fetch');

var server = 'https://api.cmfchile.cl/api-sbifv3/recursos_api/dolar?apikey=4865273f8a3fd395caff3a7a2a5962ff72cbc4ca&formato=json'

async function getData1() {
  const response = await fetch(server, { method: 'GET'});
  const data = await response.json();
  return await data;
}

var server2 = 'https://api.cmfchile.cl/api-sbifv3/recursos_api/uf?apikey=4865273f8a3fd395caff3a7a2a5962ff72cbc4ca&formato=json'

async function getData2() {
  const response = await fetch(server2, { method: 'GET'});
  const data = await response.json();
  return await data;
}

var server3 = 'http://api.weatherunlocked.com/api/current/-33.456,-70.648?app_id=b4b3750f&app_key=47683133438ef7aa218053b047d15009'
async function getData3() {
  const response = await fetch(server3, { method: 'GET'});
  const data = await response.json();
  return await data;
}


const client = new Client({
  user: 'postgres',
  host: 'postgres-service.default.svc.cluster.local',
  database: 'datos',
  password: 'postgres',
  port: 5432
});

client.connect();

const query = `
CREATE TABLE IF NOT EXISTS datos (
  id SERIAL,
  TEMP NUMERIC,
  USD TEXT,
  UF TEXT
);`;
client.query(query, (err, res) => {
  console.log(err, res);
});

(async () => {
  var a = await getData1();
  var b = await getData2();
  var c = await getData3();
  var dolar = a.Dolares[0].Valor;
  var uf = b.UFs[0].Valor;
  var temp = c.temp_c;
  console.log(dolar);
  console.log(uf);
  console.log(temp);
  var q = "INSERT INTO datos(temp, usd, uf) VALUES ("+ temp +", '"+ dolar +"', '"+ uf +"');";
  console.log(q);
  client.query(q, (err, res) => {
    console.log(err, res);
  });
  client.query('SELECT * FROM datos', (err, res) => {
    console.log(err, res);
  });
})()

app.get('/', function (req, res) {
  res.send("Holi desde postgres, tengo miedo, malva san")
})

app.listen(PORT, (error) =>{
	if(!error)
		console.log("Server is Successfully Running and App is listening on port "+ PORT)
	else
		console.log("Error occurred, server can't start", error);
	}
);