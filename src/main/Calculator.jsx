import React, { Component } from 'react'
import './Calculator.css'
import Button from '../components/Button'
import Display from '../components/Display'
// estado da calculadora
const initialState = {
    displayValue: '0', //valor exibido
    clearDisplay: false, //é necessário limpar o display
    operation: null, // operação 
    values: [0, 0], // valores da operação
    current: 0 // indice do array value que informa qual valor está sendo digitado
}

export default class Calculator extends Component{

    state = {...initialState}

    constructor(props){
        super(props)
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }

    clearMemory(){
        this.setState({...initialState})
    }

    setOperation(operation){
        if(this.state.current === 0){
            this.setState({ operation, current: 1, clearDisplay: true })
        }else{
            const equals = operation === '=' //se clicar no igual, retorna true para finalizar a op
            const currentOperation = this.state.operation
            const values = [...this.state.values]

            switch (currentOperation) {
                case '/':
                    values[0] = (values[0] / values[1])
                    break;
                case '*':
                    values[0] = (values[0] * values[1])
                    break;
                case '-':
                    values[0] = (values[0] - values[1])
                    break;
                case '+':
                    values[0] = (values[0] + values[1])
                    break;
                default:
                    break;
            }
            values[1] = 0

            
            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })

        }
    }

    addDigit(n){
        // regra que impede inserir dois pontos na calculadora
        if (n === '.' && this.state.displayValue.includes('.')){
            return
        }

        const clearDisplay = this.state.displayValue === '0'
            || this.state.clearDisplay
        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + n
        this.setState({ displayValue, clearDisplay: false })

        if(n !== '.'){
            const i = this.state.current // informa qual indice está sendo manipulado
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values] //array de valores
            values[i] = newValue //posição 0 ou 1 recebe o valor informado
            this.setState({ values })
            // console.log(values)
        }
    }

    render(){    
        
        return (
            <div className="calculator">
                <Display value={this.state.displayValue}/>
                <Button label="AC" click={this.clearMemory} triple />
                <Button label="/" click={this.setOperation} operation />
                <Button label="7" click={this.addDigit} />
                <Button label="8" click={this.addDigit} />
                <Button label="9" click={this.addDigit} />
                <Button label="*" click={this.setOperation} operation />
                <Button label="4" click={this.addDigit} />
                <Button label="5" click={this.addDigit} />
                <Button label="6" click={this.addDigit} />
                <Button label="-" click={this.setOperation} operation />
                <Button label="1" click={this.addDigit} />
                <Button label="2" click={this.addDigit} />
                <Button label="3" click={this.addDigit} />
                <Button label="+" click={this.setOperation} operation />
                <Button label="0" click={this.addDigit} double />
                <Button label="." click={this.addDigit} />
                <Button label="=" click={this.setOperation} operation />
            </div>
        )
    }
}