import React, { Component } from 'react';

class Timer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {time: {}, seconds: 0};
      this.timer = 0;
      this.startTimer = this.startTimer.bind(this);
      this.stopTimer = this.stopTimer.bind(this);
      this.countDown = this.countDown.bind(this);
    }
  
    secondsToTime(secs){
      let hours = Math.floor(secs / (60 * 60));
  
      let divisor_for_minutes = secs % (60 * 60);
      let minutes = Math.floor(divisor_for_minutes / 60);
  
      let divisor_for_seconds = divisor_for_minutes % 60;
      let seconds = Math.ceil(divisor_for_seconds);
  
      let obj = {
        "h": hours,
        "m": minutes,
        "s": seconds
      };
      return obj;
    }
  
    componentDidMount() {
      let timeLeftVar = this.secondsToTime(this.state.seconds);
      this.setState({ time: timeLeftVar });
    }
  
    startTimer() {
      if (this.timer == 0) {
        this.timer = setInterval(this.countDown, 1000);
      }
    }
  
    countDown() {
      let seconds = this.state.seconds + 1;
      this.setState({
        time: this.secondsToTime(seconds),
        seconds: seconds,
      });
      
      this.props.parentCallback(this.state);
    }
    stopTimer(){
      clearInterval(this.timer);
    }
    render() {
            return(
                <div className="timer">
                  <h2 style={{float: 'left', margin: '0px'}}>Timer: </h2>
                  <h2 className="timer-number">
                    {this.state.time.h > 0 ? (
                            <a style={{marginRight: '5px'}}>h: {this.state.time.h}</a>
                        ) : (
                            <a></a>
                        )}
                        {this.state.time.m > 0 ? (
                            <a style={{marginRight: '5px'}}>m: {this.state.time.m}</a>
                        ) : (
                            <a></a>
                        )}
                        <a>s: {this.state.time.s}</a></h2>
                </div>
              );
    }
  }
  
  export default Timer;