import nacl from "tweetnacl";
import naclUtil from "tweetnacl-util";

// priv: "4ab4eadfb24177aa915610cdd89eb1fae6ff2fdb6634044f12fd1a3df17ca004"
// pub: "ecc895b47f5fa6c53fb1acc3a0ac998790e7588a376af1e0f695f2700921af3a"
/*

const fromPrivate = privateKey => {
  const buffer = new Buffer(privateKey.slice(2), "hex");
  const ecKey = secp256k1.keyFromPrivate(buffer);
  const publicKey = "0x" + ecKey.getPublic(false, "hex").slice(2);
  const publicHash = keccak256(publicKey);
  const address = toChecksum("0x" + publicHash.slice(-40));
  return {
    address: address,
    privateKey: privateKey
  };
};*/

function nacl_encodeHex(msgUInt8Arr) {
  const msgBase64 = naclUtil.encodeBase64(msgUInt8Arr);
  return new Buffer(msgBase64, "base64").toString("hex");
}

function nacl_decodeHex(msgHex) {
  const msgBase64 = Buffer.from(msgHex, "hex").toString("base64");
  return naclUtil.decodeBase64(msgBase64);
}
const cryptoService = {
  privateKeyToPublicEncKey(privateKey) {
    return new Promise((resolve, reject) => {
      const privateKeyUInt8Array = nacl_decodeHex(privateKey.slice(2));
      const publicKeyUInt8Array = nacl.box.keyPair.fromSecretKey(
        privateKeyUInt8Array
      ).publicKey;
      return resolve(nacl_encodeHex(publicKeyUInt8Array));
    });
  },

  encrypt(privateKey, publicKey, data) {
    return new Promise((resolve, reject) => {
      const privateKeyUInt8Array = nacl_decodeHex(privateKey.slice(2));
      const publicKeyUInt8Array = nacl_decodeHex(publicKey);

      const dataUint8Array = naclUtil.decodeUTF8(JSON.stringify(data));

      const nonce = nacl.randomBytes(nacl.box.nonceLength);
      const encryptedData = nacl.box(
        dataUint8Array,
        nonce,
        publicKeyUInt8Array,
        privateKeyUInt8Array
      );

      const output = {
        alg: "curve25519-xsalsa20-poly1305",
        nonce: naclUtil.encodeBase64(nonce),
        ciphertext: naclUtil.encodeBase64(encryptedData)
      };

      return resolve(output);
    });
  },

  decrypt(privateKey, publicKey, encryptedData) {
    return new Promise((reject, resolve) => {
      const privateKeyUInt8Array = nacl_decodeHex(privateKey.slice(2));
      const publicKeyUInt8Array = nacl_decodeHex(publicKey);

      const nonce = naclUtil.decodeBase64(encryptedData.nonce);
      const ciphertext = naclUtil.decodeBase64(encryptedData.ciphertext);
      const clearData = nacl.box.open(
        ciphertext,
        nonce,
        publicKeyUInt8Array,
        privateKeyUInt8Array
      );

      return resolve(JSON.parse(naclUtil.encodeUTF8(clearData)));
    });
  }
};

export default cryptoService;
