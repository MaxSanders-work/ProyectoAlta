const express = require('express')
const app = express()
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', './views');

//Coneccion base de datos

app.get('/', function (req, res) {
  var temperatura = 1;
  var dolar = 2;
  var uf = 3;
  //cambiar valores por querys a la base de datos
  // SELECT * FROM TableName WHERE id=(SELECT max(id) FROM TableName);

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