import { Connect, SimpleSigner } from "uport-connect";

const uport = new Connect("KantumID alpha", {
  clientId: "2ooMsnSBtPx28CzYWmMTE65wX49NUGtbfTq",
  signer: SimpleSigner(
    "0056793bd565ee6a6ec43a92d1fee8cce5ca55cece9c720b93169d59ac28d84a"
  )
});

const web3 = uport.getWeb3();

/*
uport.attestCredentials({
  sub: "2okqN3pUKemHVSGP9dzEfTPpeJV7AfttgoX",
  claim: { jean: "mouloud" },
  exp: new Date().getTime() + 30 * 24 * 60 * 60 * 1000, // 30 days from now
  uriHandler: log => {
    console.log(log);
  }
});
*/
export { web3, uport };
