// "https://mainnet.infura.io/v3/4a73a23cc0a94c2c9c828dd0b0fb9e80"
// "http://127.0.0.1:7545"
// Shiba Inu Contract Address = 0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE
// OMG Contract Address = 0xd26114cd6EE289AccF82350c8d8487fedB8A0C07
const Web3 = require("web3");
const shibaInuAbi = require("./abi/shiba.json");
const omgAbi = require("./abi/omg.json");

const web3 = new Web3(
  "https://mainnet.infura.io/v3/4a73a23cc0a94c2c9c828dd0b0fb9e80"
);

const contractAddress = "0xd26114cd6EE289AccF82350c8d8487fedB8A0C07";

const contract = new web3.eth.Contract(omgAbi, contractAddress);

// console.log(contract.methods);

contract.methods
  .name()
  .call()
  .then((name) => {
    console.log("Token Name: ", name);
  });

contract.methods
  .symbol()
  .call()
  .then((symbol) => {
    console.log("Token Symbol: ", symbol);
  });

contract.methods
  .totalSupply()
  .call()
  .then((tSupply) => {
    console.log("Total Supply: ", tSupply);
  });
