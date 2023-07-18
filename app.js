const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const path = require('path');

const connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'iesdaw'
});

const app = express();

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

// http://localhost:3000/
app.get('/', function(request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + '/static/login.html'));
});

// http://localhost:3000/
app.get('/hola', function(request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + '/static/login.html'));
});


// http://localhost:3000/auth
app.post('/auth', function(request, response) {
	response.sendFile(path.join(__dirname + '/static/login2.html'));
	// Capture the input fields
	/*
	let username = request.body.username;
	let password = request.body.password;
	// Ensure the input fields exists and are not empty
	if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query('SELECT * FROM cuentas WHERE nombre = ? AND clave = ?', [username, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				request.session.loggedin = true;
				request.session.username = username;
				// Redirect to home page
				response.redirect('/home');
			} else {
				response.send('Usuario y/o Contraseña Incorrecta');
			}			
			response.end();
		});
	} else {
		response.send('Por favor ingrese Usuario y Contraseña!');
		response.end();
	}
	*/
});

// http://localhost:3000/home
app.get('/home', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		response.send('Se ha logueado satisfactoriamente:, ' + request.session.username + '!');
	} else {
		// Not logged in
		response.send('¡Iniciar sesión para ver esta página!');
	}
	response.end();
});


// http://localhost:3000/productos
app.get('/productos', function(request, response) {	
	response.send([
		{ 
			productId: '1',
			precio: 100
		},
		{ 
			productId: '2',
			precio: 50
		}	
	]);
});

const server = app.listen(3000, () => {
    console.log('Servidor web iniciado');
})