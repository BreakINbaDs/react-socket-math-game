
var expect = require('chai').expect;
var io     = require('socket.io-client');

var app = require('../testServer/index');

var socketUrl = 'http://localhost:4001';
var options = {
  transports: ['websocket'],
  'force new connection': true
};


describe('Sockets', function () {
  var client, client1, client2, client3;
  it('First client should receive initialization data from server:', function (done) {
    // Set up client connection
    client = io.connect(socketUrl, options);
    data = {round:1, question: "1+1=2?", answer: "true"};

    // Set up event listener
    client.on('Initialization', function(msg){
      expect(msg.round).to.equal(data.round);
      expect(msg.question).to.equal(data.question);
      expect(msg.answer).to.equal(data.answer);
      // Disconnect client
      client.disconnect();
      done();
    });
  });

  it('All cients should be notified that round has been ended:', function (done) {
    // Set up clients connections
    client1 = io.connect(socketUrl, options);
    client2 = io.connect(socketUrl, options);
    client3 = io.connect(socketUrl, options);

    client1.emit('give answer');
    // Set up event listener
    client2.on('next round', function (msg){
      expect(msg).to.have.keys('round', 'question', 'answer');
    });
    client3.on('next round', function (msg){
      expect(msg).to.have.keys('round', 'question', 'answer');
    });
    client1.disconnect();
    client2.disconnect();
    client3.disconnect();
    done();
  });

  it('New client should enter existing game at any time in any round:', function (done){
    // Set up clients connections
    client1 = io.connect(socketUrl, options);
    client2 = io.connect(socketUrl, options);

    // Lets imitate that game riched 3rd round
    client1.emit('give answer');
    client2.emit('give answer');

    // Lets connect the third client
    setTimeout(function () {
      client3 = io.connect(socketUrl, options)
      client3.on('Initialization', function(msg){
        expect(msg.round).to.equal(3);
        // Disconnect client
        client3.disconnect();
        client2.disconnect();
        client1.disconnect();
        done();
    });}, 1000);
  });
});
