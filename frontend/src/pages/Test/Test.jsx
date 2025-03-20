import React, { useContext, useState } from "react";
import { TransactionContext } from "../../context/TransactionContext";

const Input = ({ placeholder, name, type, value, handleChange }) => {
  return (
    <input
      placeholder={placeholder}
      type={type}
      step="0.00000001"
      value={value}
      onChange={(e) => handleChange(e, name)}
      className="input-field"
    />
  );
};

const Welcome = () => {
  const {
    connectWallet,
    currentAccount,
    formData,
    sendTransaction,
    handleChange,
    isLoading,
    getContractBalance,
    withdrawFunds,
    contractBalance,
  } = useContext(TransactionContext);

  const [transactionStatus, setTransactionStatus] = useState(null);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawAddress, setWithdrawAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { addressTo, amount, keyword, message } = formData;

    if (!addressTo || !amount || !keyword || !message) {
      alert("Please fill all the fields");
      return;
    }

    try {
      setTransactionStatus("Sending transaction...");
      await sendTransaction();
      setTransactionStatus("Transaction successful!");
    } catch (error) {
      setTransactionStatus("Transaction failed.");
    }
  };

  const handleWithdraw = async () => {
    if (!withdrawAddress || !withdrawAmount) {
      alert("Please enter recipient address and amount!");
      return;
    }

    try {
      setTransactionStatus("Processing withdrawal...");
      await withdrawFunds(withdrawAddress, withdrawAmount);
      setTransactionStatus("Withdrawal successful!");
    } catch (error) {
      setTransactionStatus("Withdrawal failed.");
    }
  };

  return (
    <div>
      <h1>Welcome to the Test Page</h1>
      <p>This is a test page to check the functionality of sending ETH transactions.</p>

      {!currentAccount ? (
        <button type="button" onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <div>
          <p>Wallet Address: {currentAccount}</p>
        </div>
      )}

      {/* 🔹 UI để gửi ETH */}
      <div>
        <h3>Send ETH</h3>
        <Input
          placeholder="Address To"
          name="addressTo"
          type="text"
          value={formData.addressTo}
          handleChange={handleChange}
        />
        <Input
          placeholder="Amount"
          name="amount"
          type="number"
          value={formData.amount}
          handleChange={handleChange}
        />
        <Input
          placeholder="Keyword"
          name="keyword"
          type="text"
          value={formData.keyword}
          handleChange={handleChange}
        />
        <Input
          placeholder="Enter Message"
          name="message"
          type="text"
          value={formData.message}
          handleChange={handleChange}
        />

        <button type="button" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Sending..." : "Send Now"}
        </button>
      </div>

      {/* 🔹 Hiển thị số dư của smart contract */}
      <div>
        <h3>Smart Contract Balance</h3>
        <p>{contractBalance} ETH</p>
        <button onClick={getContractBalance}>Refresh Balance</button>
      </div>

      {/* 🔹 UI để rút ETH */}
      <div>
        <h3>Withdraw ETH</h3>
        <Input
          placeholder="Recipient Address"
          name="withdrawAddress"
          type="text"
          value={withdrawAddress}
          handleChange={(e) => setWithdrawAddress(e.target.value)}
        />
        <Input
          placeholder="Amount"
          name="withdrawAmount"
          type="number"
          value={withdrawAmount}
          handleChange={(e) => setWithdrawAmount(e.target.value)}
        />

        <button type="button" onClick={handleWithdraw} disabled={isLoading}>
          {isLoading ? "Processing..." : "Withdraw Now"}
        </button>
      </div>

      {transactionStatus && <p>{transactionStatus}</p>}
    </div>
  );
};

export default Welcome;
