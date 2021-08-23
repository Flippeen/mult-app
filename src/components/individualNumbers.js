import React, { Component } from 'react';
import "../styles/main.css"

const centerObject = {
    position: 'absolute', 
    top: '50%', 
    left: '50%', 
    transform: 'translate(-50%,-50%)',
  };

class Numbers extends Component{
    constructor(props){
        super(props);
        this.state = {
            xValue: props.xValue,
            yValue: props.yValue, 
            completed: props.completed,
        }
    }
    
    render(){
        if(this.props.completed && this.props.isUsed){
            return(
                <a className="numbers" style={{position: 'absolute', top: this.props.yValue*50+30, left: this.props.xValue*50+30, backgroundColor: 'lightgreen'}}>
                    <a style={centerObject}>{this.props.xValue * this.props.yValue}</a>
                </a>
            );
        } else if(!this.props.isUsed){
            return(
                <a className="numbers-not-used" style={{position: 'absolute', top: this.props.yValue*50+30, left: this.props.xValue*50+30}}>
                    <a style={centerObject}>??</a>
                </a>
            );
        }
        else{
            return(
                <a className="numbers" style={{position: 'absolute', top: this.props.yValue*50+30, left: this.props.xValue*50+30}}>
                    <a style={centerObject}>??</a>
                </a>
            );
        }
    }
}

export default Numbers;