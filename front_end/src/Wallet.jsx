import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Voting_abi from "./Voting_abi.json";
import Interactions from "./Interactions";

const Wallet = () => {
  const contractAddress = "0xdb1A220353Bb32924607c8519C5FbeB008A84B6e";

  const [tokenName, setTokenName] = useState("Token ");
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [balance, setBalance] = useState(null);

  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null) 
  const [contract, setContract] = useState(null) 
  

  const connectWalletHandler = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangedHandler(result[0]);
          setConnButtonText("Wallet Connected!");
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    } else {
      setErrorMessage("Please install metamask");
    }
  };

  const accountChangedHandler = (newAddress) => {
    setDefaultAccount(newAddress)
    updateEthers();
  };

  const updateEthers = () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);

    let tempSigner = tempProvider.getSigner();

    let tempContract = new ethers.Contract(contractAddress, Voting_abi, tempSigner);

    setProvider(tempProvider);
    setSigner(tempSigner);
    setContract(tempContract);

  }




  return (
    <div className="wallet">
      <h2> Voting Contract </h2>
      <button className="connButton" onClick={connectWalletHandler}>{connButtonText}</button>
      <div>
        <h3>Address: {defaultAccount}</h3>
      </div>
      {errorMessage}
      <br />
      <Interactions contract={contract}/>
    </div>
  );
};

export default Wallet;
