import React, { Component } from 'react';
import "../styles/main.css"
import PickNumber from "./pickNumber";

class PickTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numbersArray: [],
        }
        this.handleClick = this.handleClick.bind(this);
        this.numberChanged = this.numberChanged.bind(this);
    }
    
    componentDidMount() {
        this.SetUpStuff();
    }
    SetUpStuff() {
        const tableLength = 10;
        let setUpArray = [];
        for (let i = 0; i <= tableLength; i++) {
            let newElement = { value: i, isChecked: false };
            setUpArray.push(newElement);
        }
        console.log(setUpArray)
        this.setState({ numbersArray: setUpArray });
    }
    handleClick(){
        let selectedNumbers = [];
        for (let i = 0; i < this.state.numbersArray.length; i++) {
            if(this.state.numbersArray[i].isChecked)
                selectedNumbers.push(this.state.numbersArray[i].value);
        }
        
        this.props.changeGameState();
        this.props.setNumbersToUse(selectedNumbers);
    }
    numberChanged(numberValue){
        let numbers = [...this.state.numbersArray];
        let number = { ...numbers[numberValue] };
        number.isChecked = !number.isChecked;
        numbers[numberValue] = number;
        this.setState({ numbersArray: numbers });
    }
    render() {
            return (
                <div className="center-object base-page">
                    <h1>Välj vilka tabeller du vill öva på från 1 till 10</h1>
                    
                    <div style={{height: '90px'}}>
                        {this.state.numbersArray.map(item => <PickNumber value={item.value} isChecked={item.isChecked} numberChanged={this.numberChanged}></PickNumber>)}
                    </div>

                    <button className="button-style" onClick={this.handleClick} disabled={this.state.numbersArray.filter(number => number.isChecked).length === 0}>Börja</button>
                    <br/>
                </div>
            );
    }
}

export default PickTable;