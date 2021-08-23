import React, { Component } from 'react';
import "../styles/main.css"
import IndividualNumbers from "./individualNumbers";
import Timer from "./timer";

class Random extends Component {
    constructor(props) {
        super(props);
        this.child = React.createRef();
        this.state = {
            timeObj: { time: {}, seconds: 0 },
            timerRunning: false,
            inputNumber: {},
            firstNumber: 0,
            secondNumber: 0,
            numbersFront: [{ xValue: 0, yValue: 0, completed: false }],
            numbersLeft: [{ xValue: 0, yValue: 0, completed: false }],
            numbersNotUsed: [{ xValue: 0, yValue: 0, completed: false }],
        }
        this.inputChange = this.inputChange.bind(this);
    }
    componentDidMount() {
        this.SetUpStuff();
    }
    SetUpStuff() {
        console.log(this.props.numbersToUse);
        const tableLength = 10;
        let setUpArray = [];
        let setUpNumbersLeftArray = [];
        for (let x = 0; x <= tableLength; x++) {
            for (let y = 0; y <= tableLength; y++) {
                let newElement = { xValue: x, yValue: y, completed: false, isUsed: this.props.numbersToUse.includes(x) };
                setUpArray.push(newElement);
                if(this.props.numbersToUse.includes(x))
                    setUpNumbersLeftArray.push(newElement);
            }
        }
        this.setState({ numbersFront: setUpArray, numbersLeft: setUpNumbersLeftArray});
        this.NewNumber(setUpNumbersLeftArray);
    }
    CompletedNumber(index) {
        let numbers2 = [...this.state.numbersFront];
        let number = { ...numbers2[index] };
        number.completed = true;
        numbers2[index] = number;
        this.setState({ numbersFront: numbers2 });
        let indexLeft = this.state.numbersLeft.findIndex(element => element.xValue === number.xValue && element.yValue === number.yValue);
        this.RemoveNumber(indexLeft);
    }
    RemoveNumber(index) {
        let newNumbersLeft = [...this.state.numbersLeft];
        newNumbersLeft.splice(index, 1);
        this.setState({ numbersLeft: newNumbersLeft });
        if(newNumbersLeft.length > 0)
            this.NewNumber(newNumbersLeft);
    }
    NewNumber(numbersLeftArray) {
        const rng = Math.floor(Math.random() * numbersLeftArray.length);
        this.setState({
            inputNumber: {},
            firstNumber: numbersLeftArray[rng].xValue,
            secondNumber: numbersLeftArray[rng].yValue,
        });
    }
    handleCallback = (childData) =>{
        this.setState({timeObj: childData})
        console.log(this.state.timeObj);
    }
    inputChange(event) {
        if(!this.state.timerRunning){
            this.child.current.startTimer();
            this.setState({timerRunning: true});
        }

        if (event === undefined || event === null || parseInt(event) == undefined)
            return;

        let value = parseInt(event);
        if (value > 100)
            value = 100;
        if (value < 0)
            value = 0;

        if (this.state.firstNumber * this.state.secondNumber === value) {
            let index = this.state.numbersFront.findIndex(element => element.xValue === this.state.firstNumber && element.yValue === this.state.secondNumber);
            if (index !== -1) {
                this.CompletedNumber(index);
            }
        }
        else {
            this.setState({ inputNumber: value });
        }
        
        if(this.state.numbersLeft.length <= 0)
            this.child.current.stopTimer();
    }
    render() {
        if(this.state.numbersLeft.length > 0){
            return (
                <div className="center-object base-page" style={{width: '1000px', height: '600px'}}>
                    <div className="calculation-page" style={{width: Math.sqrt(this.state.numbersFront.length) * 46.5, height: Math.sqrt(this.state.numbersFront.length) * 46.5, position: 'relative',padding: '45px'}}>
                        {this.state.numbersFront.map(item => <IndividualNumbers xValue={item.xValue} yValue={item.yValue} completed={item.completed} isUsed={item.isUsed}></IndividualNumbers>)}
                    </div>
                    <div style={{top: '10px', position: 'absolute', right: '10px'}}>
                        <Timer ref={this.child} parentCallback={this.handleCallback}/>
                    </div>
                    <div className="calculation-page" style={{ width: 'fitContent', bottom: '11px', right: '10px', position: 'absolute'}}>
                        <h1 className="small-page">{this.state.firstNumber}</h1>
                        <h1 style={{ margin: 'auto' }}>x</h1>
                        <h1 className="small-page">{this.state.secondNumber}</h1>
                        <h1 style={{ margin: 'auto' }}>=</h1>
                        <input onChange={event => this.inputChange(event.target.value)} value={this.state.inputNumber} className="input-style" type="number" min="0" max="100"></input>
                    </div>
                </div>
            );
        }
        else{
            return(
                <div className="center-object winner-page">
                    <h1>Bra jobbat!</h1>
                    <h1>Din tid är </h1>
                    <div className="center-horizontal timer-final">
                        {this.state.timeObj.time.h > 0 ? (
                            <a style={{marginRight: '5px'}}>h: {this.state.timeObj.time.h}</a>
                        ) : (
                            <a></a>
                        )}
                        {this.state.timeObj.time.m > 0 ? (
                            <a style={{marginRight: '5px'}}>m: {this.state.timeObj.time.m}</a>
                        ) : (
                            <a></a>
                        )}
                        <a>s: {this.state.timeObj.time.s}</a>
                    </div>
                    <br/><br/><br/>
                    <button className="button-style" onClick={() => window.location.reload(false)}>Tillbaka</button>
                </div>
            )
        }
    }
}

export default Random;