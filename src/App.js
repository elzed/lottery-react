import React, { Component } from 'react';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

class App extends Component {
    // Initialize five properties of state
    // manager, players, balance come from contract
    // value, message are set by the component
    state = {
        manager: '',
        players: [],
        balance: '',
        value: '',
        message: ''
    };

    // Automatically called when App component is mounted on screen
    async componentDidMount() {
        // Get some information from our contract
        const manager = await lottery.methods.manager().call();
        // Get the number of players entered
        // getPlayers() defined in Lottery.sol to return array of addresses
        const players = await lottery.methods.getPlayers().call();

        const balance = await web3.eth.getBalance(lottery.options.address);

        this.setState({ manager, players, balance });
    }

    onSubmit = async (event) => {
        event.preventDefault();

        // Get a list of all accounts from MetaMask
        const accounts = await web3.eth.getAccounts();

        // Before sending ether, create a new state with a message
        // instructing users on the status of their submission
        this.setState({ message: 'Waiting on transaction success...' });

        // Send ether (wei) to Contract
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei(this.state.value, 'ether')
        });

        // Update message after send() function completes
        this.setState({ message: 'You have been entered!' });
    };

    onClick = async () => {
        const accounts = await web3.eth.getAccounts();

        this.setState({ message: 'Waiting on transaction success...' });

        // Call pickWinner() function on Lottery.sol contract
        await lottery.methods.pickWinner().send({
            // Specify who is sending in the transaction
            // AKA the Source Account
            // AKA the initiating account at index 0
            from: accounts[0]
        });

        this.setState({ message: 'A winner has been picked!' });
    };

    render() {
        web3.eth.getAccounts().then(console.log);
        return (
            <div>
                <h2>Lottery Contract</h2>
                <p>
                    This contract is managed by {this.state.manager}.
                    There are currently {this.state.players.length} people entered,
                    competing to win {web3.utils.fromWei(this.state.balance, 'ether')} ether!
                </p>

                <hr/>

                <form onSubmit={this.onSubmit}>
                    <h4>Want to try your luck?</h4>
                    <div>
                        {/*Label and Text Input*/}
                        <label>Amount of ether to enter</label>
                        <input
                            value={ this.state.value }
                            onChange={event => this.setState({ value: event.target.value })}
                        />
                    </div>
                    <button>Enter</button>
                </form>

                <hr/>

                <h4>Ready to pick a winner?</h4>
                <button onClick={this.onClick}>Pick a winner!</button>

                <hr/>

                <h1>{this.state.message}</h1>
            </div>
        );
    }
}

export default App;
