// "https://mainnet.infura.io/v3/4a73a23cc0a94c2c9c828dd0b0fb9e80"
const Web3 = require("web3");

const web3 = new Web3("http://127.0.0.1:7545");

let new_account = web3.eth.accounts.privateKeyToAccount(
  "0x445740534d31102c7027a200ab21a3e43698ad5febfd92eef8c33414025ec4ff"
);

console.log("Account: ", new_account);

web3.eth
  .getBalance("0x23e655070e7ed29C5f6857C6252F4C6E232df118")
  .then((bal) => {
    console.log("Balance in wei: ", bal);
    console.log("Balance in Ether: ", web3.utils.fromWei(bal, "ether"));
  });
