import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = { manager: '' };
    }

    async componentDidMount() { // Automatically called when App component is mounted on screen
        // Get some information from our contract
        const manager = await lottery.methods.manager().call();

        this.setState({ manager: manager });
    }

    render() {
        web3.eth.getAccounts().then(console.log);
        return (

        );
    }
}

export default App;
