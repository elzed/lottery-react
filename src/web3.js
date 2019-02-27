import Web3 from '../node_modules/web3'; // constructor

// A new instance of Web3
// currentProvider has access to Rinkeby with keys, etc. courtesy MetaMask config
// currentProvider values are placed in our newly constructed web3
const web3 = new Web3(window.web3.currentProvider);

export default web3;