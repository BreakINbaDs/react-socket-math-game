# react-socket-math-game
# Project Title

Real time browser-based math game.

## Getting Started

Please follow next steps to successfully run the project. 

### Prerequisites

You will need to install Express, Socket.IO and Socket.IO-Client

```
npm install socket.io socket.io-client express --save
```
For running tests be sure to have 'Mocha' installed globally. I'm going to use 'chai' as my assertion library.
```
npm install mocha -g  
npm install chai socket.io-client
```


### Installing

To run math game you need to proceed through the next steps:

The first step is to open terminal window and navigate to "./react-socket-math-game" and run server.
```
node server.js
```

Then open one more terminal window and navigate to "./react-socket-math-game/socket-client" and run React App.

```
npm start
```

Now you can access app by the url "localhost:3000"
## Running the tests

To run the automated tests for this system you will need to open one more terminal
window and navigate to "./react-socket-math-game", then simply run the next command:

```
npm test
```

## Authors

* **Raman Shapaval** - *Initial work* - [BreakINbaDs](https://github.com/BreakINbaDs)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
