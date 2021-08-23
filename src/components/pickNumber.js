import React, { Component } from 'react';
import "../styles/main.css"

class PickNumber extends Component{
    constructor(props){
        super(props);
        this.state = {
            value: props.value,
            isChecked: props.isChecked,
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        this.setState(prevState => ({
            isChecked: !prevState.isChecked,
        }))
        this.props.numberChanged(this.state.value);
    }
    render(){
        if(this.state.isChecked){
            return(
                <h1 onClick={this.handleClick} className="picked-number">{this.state.value}</h1>
            );
        }
        else{
            return(
                <h1 onClick={this.handleClick} className="pick-number">{this.state.value}</h1>
            );
        }
    }
}

export default PickNumber;