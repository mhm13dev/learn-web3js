// "https://mainnet.infura.io/v3/4a73a23cc0a94c2c9c828dd0b0fb9e80"
// "https://ropsten.infura.io/v3/4a73a23cc0a94c2c9c828dd0b0fb9e80"
// "http://127.0.0.1:7545"
const Web3 = require("web3");
const accounts = require("./accounts");
const { FeeMarketEIP1559Transaction, Transaction } = require("@ethereumjs/tx");
const Common = require("@ethereumjs/common").default;
const { Chain, Hardfork } = require("@ethereumjs/common");

const web3 = new Web3(
  "https://ropsten.infura.io/v3/4a73a23cc0a94c2c9c828dd0b0fb9e80"
);

const private_key_1_buffer = Buffer.from(
  accounts.private_key_1.slice(2),
  "hex"
);
const private_key_2_buffer = Buffer.from(
  accounts.private_key_2.slice(2),
  "hex"
);

const account1 = web3.eth.accounts.privateKeyToAccount(accounts.private_key_1);
const account2 = web3.eth.accounts.privateKeyToAccount(accounts.private_key_2);
console.log(account1.address);
async function run() {
  try {
    console.log(
      "Account 1 Balance:",
      web3.utils.fromWei(await web3.eth.getBalance(account1.address), "ether")
    );
    console.log(
      "Account 2 Balance:",
      web3.utils.fromWei(await web3.eth.getBalance(account2.address), "ether")
    );

    // Build Transaction
    const txCount = await web3.eth.getTransactionCount(account1.address);
    const txObject = {
      nonce: web3.utils.toHex(txCount),
      to: account2.address,
      value: web3.utils.toHex(web3.utils.toWei("1", "ether")),
      gasLimit: web3.utils.toHex(21000),
      maxPriorityFeePerGas: web3.utils.toHex(web3.utils.toWei("1", "gwei")),
      maxFeePerGas: web3.utils.toHex(web3.utils.toWei("5", "gwei")),
    };
    // console.log(txObject);

    const common = new Common({
      chain: Chain.Ropsten,
      hardfork: Hardfork.London,
    });

    const tx = FeeMarketEIP1559Transaction.fromTxData(txObject, { common });
    // console.log(tx);

    // Sign Transaction
    const signedTx = tx.sign(private_key_1_buffer);
    // console.log(signedTx);
    const serializedTx = signedTx.serialize();
    // console.log(serializedTx);
    const raw = "0x" + serializedTx.toString("hex");
    // console.log(raw);

    // Broadcast Transaction
    web3.eth.sendSignedTransaction(raw, (err, hash) => {
      if (err) throw err;
      console.log(hash);
    });
  } catch (err) {
    console.log("💥", err);
  }
}

run();
