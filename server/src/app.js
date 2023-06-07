const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('../../client/'));
app.use(express.static('../../client/dist'));
app.get('/',function(req, res) {
    res.sendFile(__dirname + '../../client/dist/index.html');
});

io.sockets.on('connection', function(socket){
	socket.userData = { x:0, y:0, z:0, heading:0 };//Default values;
 
	console.log(`${socket.id} connected`);
	socket.emit('setId', { id:socket.id });
	
    socket.on('disconnect', function(){
		console.log(`${socket.id} disconnected`);
		socket.broadcast.emit('deletePlayer', { id: socket.id });
    });	
	
	socket.on('init', function(data){
		console.log(`socket.init ${data.model}`);
		socket.userData.pseudo = data.pseudo;
		socket.userData.model = data.model;
		socket.userData.colour = data.colour;
		socket.userData.x = data.x;
		socket.userData.y = data.y;
		socket.userData.z = data.z;
		socket.userData.rx = data.rx;
		socket.userData.ry = data.ry;
		socket.userData.rz = data.rz;
		socket.userData.action = "idle";
		socket.userData.isParrain = data.isParrain;


		socket.broadcast.emit('newPlayer', socket.userData);
	});
	
	socket.on('update', function(data){
		socket.userData.pseudo = data.pseudo;
		socket.userData.x = data.x;
		socket.userData.y = data.y;
		socket.userData.z = data.z;
		socket.userData.rx = data.rx;
		socket.userData.ry = data.ry;
		socket.userData.rz = data.rz;
		socket.userData.action = data.action;
	});
	
	socket.on('chat message', function(data){
		console.log(`chat message:${data.id} ${data.message}`);
		//io.to(data.id).emit('chat message', { id: socket.id, message: data.message });
		io.emit('chat message', { id: data.id, pseudo: data.pseudo, message: data.message });
	})
});

http.listen(2002, function(){
  console.log('listening on *:2002');
});

setInterval(function(){
	const nsp = io.of('/');
    let pack = [];

	io.sockets.sockets.forEach((socket) =>{
		//const socket = nsp.connected[socketio.id]
		//Only push sockets that have been initialised
		if (socket.userData.model!==undefined){
			pack.push({
				id: socket.id,
				pseudo: socket.userData.pseudo,
				model: socket.userData.model,
				colour: socket.userData.colour,
				x: socket.userData.x,
				y: socket.userData.y,
				z: socket.userData.z,
				rx: socket.userData.rx,
				ry: socket.userData.ry,
				rz: socket.userData.rz,
				action: socket.userData.action,
				isParrain: socket.userData.isParrain
			});
		}
	})
	if (pack.length>0) io.emit('remoteData', pack);
}, 40);