
// import packages
import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import ReactDOM from 'react-dom';
const socket = socketIOClient( "http://localhost:4001");


// Making the App component
class App extends Component {
  constructor() {
    super()
    this.state = {
      answer: "",
      score: 0,
      question: "",
      round: 0,
      nextRound: false,
      click: false
    }
  }

  componentDidMount() {
    socket.on('Initialization', (data) => {
      this.setState({round: data.round, 
        question: data.question, 
        answer: data.answer});
    });
    socket.on('next round', (data) => {
      this.setState({nextRound: true});
      console.log('Next raund will start in 5 sec!');
      // Add notification
      const element = <h1>The right answer has been submited, 5 seconds are left till the new round!</h1>;
      ReactDOM.render(element, document.getElementById('timer'));
      // 5 sec timeout
      setTimeout(function() {if (this.state.click) {this.setState({round: data.round, 
        question: data.question, 
        answer: data.answer,
        nextRound: false,
        click: false});
      } else if (!this.state.click && this.state.score != 0){
        this.setState({round: data.round, 
        question: data.question, 
        answer: data.answer,
        score: this.state.score - 1,
        nextRound: false,
        click: false});
      } else {
        this.setState({round: data.round, 
        question: data.question, 
        answer: data.answer,
        nextRound: false,
        click: false});
      }
        this.refs.btn_true.style.display = 'block';
        this.refs.btn_false.style.display = 'block';
        // Remove notification
        const element = <h1></h1>;
        ReactDOM.render(element, document.getElementById('timer'));}.bind(this), 5000);
    });
  }

   // method for emitting a socket.io event
  sendAnswer = (answer) => { 
    this.refs.btn_true.style.display = 'none';
    this.refs.btn_false.style.display = 'none';

    if (answer == this.state.answer && this.state.nextRound == false) {
      socket.emit('give answer', this.state.answer);
      this.setState({score: this.state.score + 1, click: true}); 

    } else if (answer !== this.state.answer && this.state.score != 0) {
      this.setState({score: this.state.score - 1, click: true});
    } else {
      this.setState({click: true});
    }
  }
  
  render() {
    
    return (
      <div style={{ textAlign: "center" }}>
        <div id='info-container'>
          <div id='round'>Round: {this.state.round}</div>
          <div id='timer'></div>
          <div id='score'>Score: {this.state.score}</div>
        </div>
        <div id='title'>Math Game</div>
        <div id='question-container'>
          <div>{this.state.question}</div>
          <div id='btns'>
            <button ref="btn_true" className='btn' onClick={() => this.sendAnswer('true')}>True</button>
            <button ref="btn_false" className='btn' onClick={() => this.sendAnswer('false')}>False</button>
          </div>
        </div>
      </div>
    )
  }
}

export default App;