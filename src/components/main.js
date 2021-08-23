import React, { Component } from 'react';
import "../styles/main.css";
import PickTable from './pickTables';
import Random from './randomNumber';

class Main extends Component {
    constructor(props){  
        super(props);  
        this.state = {  
             startGame: false,
             numbersToUse: [],
          }; 
          this.changeGameState = this.changeGameState.bind(this);
          this.setNumbersToUse = this.setNumbersToUse.bind(this);
      };
      changeGameState(){
        this.setState(prevState => ({startGame: !prevState.startGame}));
      }
      setNumbersToUse(numbersToUseArray){
        this.setState({numbersToUse: numbersToUseArray});
      }
      render(){
          if(this.state.startGame){
            return (
                <div className="Main">
                    <Random changeGameState={this.changeGameState} numbersToUse={this.state.numbersToUse}/>
                </div>
              );
          }else{
            return (
                <div className="Main">
                    <PickTable setNumbersToUse={this.setNumbersToUse} changeGameState={this.changeGameState}/>
                </div>
              );
          }
          
      };
  }
  
  export default Main;