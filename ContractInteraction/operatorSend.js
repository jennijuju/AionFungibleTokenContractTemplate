const BN = require('bn.js');
const Web3 = require("aion-web3");
const web3 = new Web3(new Web3.providers.HttpProvider("https://aion.api.nodesmith.io/v1/mastery/jsonrpc?apiKey=ec13c1ff5f65488fa6432f5f79e595f6"));
const privateKey = "bb3b642bbfab34fcf2ea79ee80bd97d2c109ab13f5c8ccfec787f56e60f34ca7c0d4e3868869f4e734d18f147c16ae1336b1c9bd7d7890ee981e48933aa5604c";
const account = web3.eth.accounts.privateKeyToAccount(privateKey);
console.log(account.address);
async function operatorSend() {

    //contract
    var namp = new BN("10000000000000000");
    var amount = new BN("333");
    let amountInNamp = namp.mul(amount);
    
    let from = "0xa048630fff033d214b36879e62231cc77d81f45d348f6590d268b9b8cabb88a9";
    let to = "0xa01a69a6b76369dcb7509e8ba575d05005c3ebba5d664122764648e2193b6464";
    var userdata = new Array(32).fill(0);

    let data = web3.avm.contract.method('operatorSend').inputs(['address','address','byte[]','byte[]','byte[]'],[from,to,amountInNamp.toArray('be',32),userdata,userdata]).encode();
    const Tx = {
        from: account.address,
        to: "0xA0dF59C5C94f481AFb08073ee70d0139cf2d8Fc3C72cdAbAaD2B6323f55F1AeC",
        data: data,
        gasPrice: 10000000000,
        gas: 2000000
    };
    
    const signedTx = await web3.eth.accounts.signTransaction(
        Tx, account.privateKey
    ).then((res) => signedCall = res);

    const receipt = await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction
    ).on('receipt', receipt => {
        console.log("Receipt received!\ntxHash =", receipt.transactionHash)
    });

}

operatorSend();