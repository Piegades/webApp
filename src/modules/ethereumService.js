import Web3 from "web3";

// We have to switch to webSocket because httpProvider is depracted
// 'ws://localhost:8546'

const web3 = new Web3("https://rinkeby.infura.io/5ysRjN9mODHFf7aqQqzp");

export default web3;
