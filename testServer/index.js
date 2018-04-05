const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
var round = 0;
var rounds = [{round:1, question: "1+1=2?", answer: "true"}];
// our localhost port
const port = 4001

const app = express()

// our server instance
const server = http.createServer(app)

// This creates our socket using the instance of the server
const io = socketIO(server)

// Function for questions generation
function questionGen(round) {
	var a = Math.floor((Math.random() * 10) + 1);
	var b = Math.floor((Math.random() * 10) + 1);
	var c = Math.floor((Math.random() * 10) + 1);
	var k = Math.floor((Math.random() * 4) + 1);


	if (k == 1) {
		var answer = 'false';
		var res = a*(c+b) + 1;
		var question = a+'*('+c+'+'+b+')='+res.toFixed(2)+'?';
	} else if (k == 2) {
		var answer = 'true';
		var res = (a+b)/c;
		var question = '('+a+'+'+b+')/'+c+'='+res.toFixed(2)+'?';
	} else if (k == 3) {
		var answer = 'false';
		var res = a*b/c - 1;
		var question = a+'*'+b+'/'+c+'='+res.toFixed(2)+'?';
	} else {
		var answer = 'true';
		var res = a+b+c;
		var question = a+'+'+b+'+'+c+'='+res.toFixed(2)+'?';
	}

	var data = {round: round + 1, question: question, answer: answer };
	return data;
}

io.on('connection', socket => {
  console.log('New client connected')
  socket.emit('Initialization', rounds[rounds.length - 1]);

  socket.on('give answer', () => {
    console.log('The right answer was given!');
    round = round + 1;
    var data = questionGen(round);
	io.sockets.emit('next round', data);
	rounds.push(data);
  })

  // disconnect is fired when a client leaves the server
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`))
