const Web3 = require("web3");
const { FeeMarketEIP1559Transaction } = require("@ethereumjs/tx");
const Common = require("@ethereumjs/common").default;
const { Chain, Hardfork } = require("@ethereumjs/common");
const accounts = require("./accounts");
const DappTokenABI = require("./abi/dapp.json");
const DappTokenByteCode = require("./bytecodes/dapp.json").object;
const DappTokenContractAddress = "0x1EbD10e1e2F46057efB16E7146eD4ECC07AB5e17";

const web3 = new Web3(
  "https://ropsten.infura.io/v3/4a73a23cc0a94c2c9c828dd0b0fb9e80"
);

const account1 = web3.eth.accounts.privateKeyToAccount(accounts.private_key_1);
const account2 = web3.eth.accounts.privateKeyToAccount(accounts.private_key_2);

const DappTokenContract = new web3.eth.Contract(
  DappTokenABI,
  DappTokenContractAddress
);

async function deployDappToken() {
  const txCount = await web3.eth.getTransactionCount(account1.address);

  const txData = {
    nonce: web3.utils.toHex(txCount),
    gasLimit: web3.utils.toHex(1000000),
    maxFeePerGas: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
    maxPriorityFeePerGas: web3.utils.toHex(web3.utils.toWei("1", "gwei")),
    data: "0x" + DappTokenByteCode,
  };

  await sendTransaction(txData, accounts.private_key_1);
}

async function sendTransaction(txData, privateKey) {
  const common = new Common({
    chain: Chain.Ropsten,
    hardfork: Hardfork.London,
  });

  const tx = FeeMarketEIP1559Transaction.fromTxData(txData, { common });

  const signedTx = tx.sign(Buffer.from(privateKey.slice(2), "hex"));

  const serializedTx = signedTx.serialize();

  const raw = "0x" + serializedTx.toString("hex");

  web3.eth.sendSignedTransaction(raw, (err, hash) => {
    if (err) throw err;
    console.log(hash);
  });
}

async function transferTokens(token_contract, from, to, value) {
  const txCount = await web3.eth.getTransactionCount(from.address);

  const txData = {
    nonce: web3.utils.toHex(txCount),
    gasLimit: web3.utils.toHex(100000),
    maxFeePerGas: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
    maxPriorityFeePerGas: web3.utils.toHex(web3.utils.toWei("1", "gwei")),
    data: token_contract.methods.transfer(to.address, value).encodeABI(),
    to: token_contract._address,
  };

  await sendTransaction(txData, accounts.private_key_1);
}

async function run() {
  // await deployDappToken();
  // Interact with DappToken Smart Contract
  // console.log(DappTokenContract);
  // console.log("Token Name:", await DappTokenContract.methods.name().call());
  // console.log("Token Symbol:", await DappTokenContract.methods.symbol().call());
  // console.log(
  //   "Total Supply:",
  //   await DappTokenContract.methods.totalSupply().call()
  // );
  // console.log(
  //   "Token Balance of Account 1:",
  //   await DappTokenContract.methods.balanceOf(account1.address).call()
  // );
  await transferTokens(DappTokenContract, account1, account2, 1000);
}

run();
