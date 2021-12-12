const Web3 = require("web3");
const accounts = require("./accounts");
const { FeeMarketEIP1559Transaction } = require("@ethereumjs/tx");
const Common = require("@ethereumjs/common").default;
const { Chain, Hardfork } = require("@ethereumjs/common");

const web3 = new Web3(
  "https://ropsten.infura.io/v3/4a73a23cc0a94c2c9c828dd0b0fb9e80"
);

const private_key_1_buffer = Buffer.from(
  accounts.private_key_1.slice(2),
  "hex"
);

const account1 = web3.eth.accounts.privateKeyToAccount(accounts.private_key_1);

const contractAddress = "0x7B194b4eED4BAe277Bdc1377090038DFb9edC9f0";
const contractABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "message",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "newMessage",
        type: "string",
      },
    ],
    name: "update",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const helloContract = new web3.eth.Contract(contractABI, contractAddress);

async function run() {
  try {
    // const data =
    //   "0x608060405234801561001057600080fd5b506040518060400160405280601981526020017f48656c6c6f2046726f6d20536d61727420436f6e7472616374000000000000008152506000908051906020019061005c929190610062565b5061010d565b828054600181600116156101000203166002900490600052602060002090601f01602090048101928261009857600085556100df565b82601f106100b157805160ff19168380011785556100df565b828001600101855582156100df579182015b828111156100de5782518255916020019190600101906100c3565b5b5090506100ec91906100f0565b5090565b5b808211156101095760008160009055506001016100f1565b5090565b6103128061011c6000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80633d7403a31461003b578063e21f37ce146100f6575b600080fd5b6100f46004803603602081101561005157600080fd5b810190808035906020019064010000000081111561006e57600080fd5b82018360208201111561008057600080fd5b803590602001918460018302840111640100000000831117156100a257600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290505050610179565b005b6100fe610193565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561013e578082015181840152602081019050610123565b50505050905090810190601f16801561016b5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b806000908051906020019061018f929190610231565b5050565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156102295780601f106101fe57610100808354040283529160200191610229565b820191906000526020600020905b81548152906001019060200180831161020c57829003601f168201915b505050505081565b828054600181600116156101000203166002900490600052602060002090601f01602090048101928261026757600085556102ae565b82601f1061028057805160ff19168380011785556102ae565b828001600101855582156102ae579182015b828111156102ad578251825591602001919060010190610292565b5b5090506102bb91906102bf565b5090565b5b808211156102d85760008160009055506001016102c0565b509056fea2646970667358221220acd0d7cdb3874e76187bda79522cc6b8bc566064d36a487eb5832669940ab1b164736f6c63430007060033";
    // // Build Transaction
    // const txCount = await web3.eth.getTransactionCount(account1.address);
    // const txObject = {
    //   nonce: web3.utils.toHex(txCount),
    //   gasLimit: web3.utils.toHex(1000000),
    //   maxPriorityFeePerGas: web3.utils.toHex(web3.utils.toWei("1", "gwei")),
    //   maxFeePerGas: web3.utils.toHex(web3.utils.toWei("5", "gwei")),
    //   data,
    // };
    // const common = new Common({
    //   chain: Chain.Ropsten,
    //   hardfork: Hardfork.London,
    // });
    // const tx = FeeMarketEIP1559Transaction.fromTxData(txObject, { common });
    // // Sign Transaction
    // const signedTx = tx.sign(private_key_1_buffer);
    // const serializedTx = signedTx.serialize();
    // const raw = "0x" + serializedTx.toString("hex");
    // // Broadcast Transaction
    // web3.eth.sendSignedTransaction(raw, (err, hash) => {
    //   if (err) throw err;
    //   console.log(hash);
    // });
    // Call a method of smart contract
    console.log(await helloContract.methods.message().call());

    // Calling a method that alter the state of smart contract
    // const transaction = helloContract.methods.update(
    //   "Hello World Updated From Web3"
    // );

    // // Build Transaction
    // const txCount = await web3.eth.getTransactionCount(account1.address);

    // const txObject = {
    //   nonce: web3.utils.toHex(txCount),
    //   gasLimit: web3.utils.toHex(100000),
    //   maxPriorityFeePerGas: web3.utils.toHex(web3.utils.toWei("1", "gwei")),
    //   maxFeePerGas: web3.utils.toHex(web3.utils.toWei("5", "gwei")),
    //   data: transaction.encodeABI(),
    //   to: transaction._parent._address,
    // };
    // // // console.log(txObject);
    // const common = new Common({
    //   chain: Chain.Ropsten,
    //   hardfork: Hardfork.London,
    // });
    // const tx = FeeMarketEIP1559Transaction.fromTxData(txObject, { common });
    // // console.log(tx);
    // // Sign Transaction
    // const signedTx = tx.sign(private_key_1_buffer);
    // // console.log(signedTx);
    // const serializedTx = signedTx.serialize();
    // // console.log(serializedTx);
    // const raw = "0x" + serializedTx.toString("hex");
    // // console.log(raw);
    // // Broadcast Transaction
    // web3.eth.sendSignedTransaction(raw, (err, hash) => {
    //   if (err) throw err;
    //   console.log(hash);
    // });
  } catch (err) {
    console.log("💥", err);
  }
}

run();
