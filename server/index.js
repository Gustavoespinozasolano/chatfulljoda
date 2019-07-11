var express = require('express');
var app=express();
var PORT = process.env.PORT || 5000;
var moment = require('moment');
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('client'));
app.get('/hola-mundo', function(req, res){
	res.status(200).send('Hola Mundo Infeliz');
});

var messages = [
	{
		id:1,
		text: 'Bienvenido al chat privado de socket.io y NodeJs ',
		nickname: 'Bot  - gustavoespinoza.es',
		fecha: moment().format('MMMM Do YYYY, h:mm:ss a')
	}
];

io.on('connection', function(socket){
	console.log("El cliente con IP: "+socket.handshake.address + " se ha conectado ....");
	socket.emit('messages',messages);
	socket.broadcast.emit('message2',{text:'Un nuevo usuario se ha conectado'});
	socket.on('add-message', function(data){
		messages.push(data);
		io.sockets.emit('messages',messages);
	});
});
server.listen(PORT, function(){
	console.log('Servidor esta funcionando en http://localhost:6677');
});


