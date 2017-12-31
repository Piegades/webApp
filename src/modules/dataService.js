import Ipfs from "./ipfsService";
import bs58 from "bs58";
import registryArtifact from "uport-registry";
import crypto from "./cryptoService";
import web3 from "./ethereumService";

const base58ToHex = b58 => {
  const hexBuf = new Buffer(bs58.decode(b58));
  return hexBuf.toString("hex");
};

const hexToBase58 = hexStr => {
  const buf = new Buffer(hexStr, "hex");
  return bs58.encode(buf);
};

const UportRegistryContract = new web3.eth.Contract(
  registryArtifact.abi,
  "0x2cc31912b2b0f3075a87b3640923d45a26cef3ee"
);

const ipfs = new Ipfs();

const dataService = {
  get(key, address) {
    return new Promise((resolve, reject) => {
      UportRegistryContract.methods
        .get(web3.utils.asciiToHex(key), address, address)
        .call({ from: address }, (error, ipfsHashHex) => {
          if (error) {
            console.log(error);
            return reject(
              new Error("An error is occured when calling the contract")
            );
          }
          if (
            ipfsHashHex === "0x" ||
            ipfsHashHex ===
              "0x0000000000000000000000000000000000000000000000000000000000000000"
          ) {
            resolve([]);
          }
          const ipfsHash = hexToBase58(`1220${ipfsHashHex.slice(2)}`);
          ipfs
            .cat(ipfsHash)
            .then(data => {
              resolve(data);
            })
            .catch(reject(new Error("Failed to get object from IPFS")));
        });
    });
  },

  /*
  address = "0x46718c74F29b47aa52B7f6F958646D63435E3Dce";
  const privateKey =
    "0x24b537e6660f72f13ff94882947b26dda7a65af7c5de2d6509f46e18d2e30c25";
  // Account login
  jean = web3.eth.accounts.privateKeyToAccount(privateKey);

  mouloud = web3.eth.accounts.wallet.add(jean);*/

  set(key, address, data) {
    return new Promise((resolve, reject) => {
      // crypto.encrypt({ privateKey:})
      ifps.add(data).then(ipfsHash => {
        const ipfsHashHex = base58ToHex(ipfsHash);
        const regSafeIpfs = `0x${ipfsHashHex.slice(4)}`;
        const data = UportRegistryContract.methods
          .set(
            web3.utils.asciiToHex(key),
            address,
            web3.utils.asciiToHex(regSafeIpfs)
          )
          .encodeABI();

        UportRegistryContract.methods
          .set(
            web3.utils.asciiToHex(key),
            address,
            web3.utils.asciiToHex(regSafeIpfs)
          )
          .estimateGas((error, gasAmount) => {
            if (error) {
              console.log(error);
            }

            const tx = {
              gas: gasAmount,
              to: "0x2cc31912b2b0f3075a87b3640923d45a26cef3ee",
              data
            };

            web3.eth.accounts.signTransaction(
              tx,
              privateKey,
              (error, { rawTransaction }) => {
                web3.eth
                  .sendSignedTransaction(rawTransaction)
                  .on("transactionHash", hash => {
                    console.log(hash);
                  })
                  .on("receipt", receipt => {
                    console.log(receipt);
                  })
                  .on("confirmation", (confirmationNumber, receipt) => {
                    console.log(confirmationNumber, receipt);
                  })
                  .on("error", console.error); // If a out of gas error, the second parameter is the receipt.
                /* web3.eth.sendSignedTransaction(hash.rawTransaction, (error, transaction) => {
                if (error) {
                  console.log(error);
                }
                console.log(transaction);
              });*/
              }
            );
          });
      });
    });
  }
};
/*
dataService
  .set(
    "bonjour",
    "0x1051f08713ac9e61F87B378217b6fb7E7059E070",
    "0x4ab4eadfb24177aa915610cdd89eb1fae6ff2fdb6634044f12fd1a3df17ca004"
  )
  .then(console.log());
/*
 * Using web3 contract method
 */
/*
UportRegistryContract.set(key, address, regSafeIpfs, (error, txHash) => {
  if (error) {
    console.log(error);
    return reject(new Error('An error has occured when calling the contract'));
  }
  console.log(txHash);
  resolve(txHash);
});
*/
export default dataService;
