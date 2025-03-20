import React, { useEffect, useState } from "react";
import { ethers } from "ethers"; // Import ethers đúng cách
import { transactionsABI as contractABI, transactionsAddress as contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
  if (!ethereum) {
    throw new Error(
      "Ethereum object is not available. Please install MetaMask."
    );
  }

  // Khởi tạo Web3Provider đúng cách với ethers 6.x
  const provider = new ethers.providers.Web3Provider(ethereum); // Cách khởi tạo đúng với ethers 6.x
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return transactionsContract;
};

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [contractBalance, setContractBalance] = useState("0");
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length > 0) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object.");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object.");
    }
  };

  const sendTransaction = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask");
  
      const { addressTo, amount, keyword, message } = formData;
      const transactionsContract = getEthereumContract();
      const parsedAmount = ethers.utils.parseEther(amount); // Chuyển đổi amount từ ETH sang Wei
  
      console.log("Contract Address:", contractAddress);
      console.log("Sending transaction to:", addressTo);
      console.log("Amount:", parsedAmount.toString());
  
      // Đảm bảo rằng message và keyword là kiểu string hợp lệ
      const sanitizedMessage = message ? message.toString() : "";
      const sanitizedKeyword = keyword ? keyword.toString() : "";
  
      // Gọi hợp đồng với tham số đúng thứ tự
      const transaction = await transactionsContract.addToBlockchain(
        addressTo,
        parsedAmount, // Đưa parsedAmount đúng vị trí của uint256
        sanitizedMessage,
        sanitizedKeyword,
        { value: parsedAmount }
      );
  
      setIsLoading(true);
      console.log("Waiting for transaction confirmation...");
  
      await transaction.wait(); // Chờ xác nhận giao dịch
  
      setIsLoading(false);
      console.log(`Transaction successful with hash: ${transaction.hash}`);
    } catch (error) {
      setIsLoading(false);
      console.error("Transaction failed:", error);
      alert("Transaction failed! Check console for more details.");
    }
  };

  const getContractBalance = async () => {
    try {
        const transactionsContract = getEthereumContract();
        const balance = await transactionsContract.getContractBalance();
        setContractBalance(ethers.utils.formatEther(balance));
    } catch (error) {
        console.error("Error fetching contract balance:", error);
    }
  };

  const withdrawFunds = async (recipient, amount) => {
    try {
      if (!ethereum) return alert("Please install MetaMask");
      const transactionsContract = getEthereumContract();
      const parsedAmount = ethers.utils.parseEther(amount);

      const tx = await transactionsContract.withdrawTo(recipient, parsedAmount);
      await tx.wait();
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    const init = async () => {
        await checkIfWalletIsConnected();
        if (currentAccount) {
            await getContractBalance();
        }
    };
    init();
  }, [currentAccount]);


  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        formData,
        sendTransaction,
        withdrawFunds,
        getContractBalance,
        contractBalance,
        handleChange,
        isLoading,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
