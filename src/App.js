import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

class App extends Component {
    state = {
        manager: '',
        players: [],
        balance: '',
        value: ''
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

                <form>
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
            </div>
        );
    }
}

export default App;
