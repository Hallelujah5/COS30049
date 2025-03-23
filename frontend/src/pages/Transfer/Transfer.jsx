import React, { useContext, useState } from "react";
import Footer from "../../components/Footer/footer";
import { TransactionContext } from "../../context/TransactionContext";
import { motion } from "motion/react";
import "./transfer.css";
import ethereum from "../../../../backend/static/images/transfer/ethereum.png";
import { validateTransfer } from "./validateTransfer";

const Transfer = () => {
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

  const handleTransferSubmit = async (event) => {
    event.preventDefault();
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
    <>
      <motion.div
        className="container col-xxl-8 px-4 py-5 text-white outfit"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.6,
          delay: 0.1,
          ease: [0, 0.1, 0.2, 1.01],
        }}
      >
        {/* =========TRANSFER========== */}
        <div className="row flex-wrap flex-lg-row-reverse align-items-center justify-content-center g-5 py-5 flex-column-reverse">
          <div className="form-container col-10 col-sm-8 col-lg-6">
            <div className="container d-flex justify-content-center align-items-center">
              {/* Card Wallet Details */}
              <div className="card custom-card mt-5">
                <div className="card-body d-flex flex-column justify-content-between h-100">
                  <div className="d-flex justify-content-between align-items-start">
                    <div
                      className="rounded-circle border border-white d-flex justify-content-center align-items-center icon-container"
                      style={{ width: "40px", height: "40px" }}
                    >
                      <img
                        src={ethereum}
                        alt="Ethereum"
                        style={{ width: "35px", height: "35px" }}
                      />
                    </div>
                    <i
                      className="bi bi-info-circle info-icon"
                      style={{ fontSize: "17px", color: "#fff" }}
                    ></i>
                  </div>
                  {/* Shortened wallet address */}
                  <div>
                    <p className="text-white small">
                      {currentAccount
                        ? `${currentAccount.slice(
                            0,
                            8
                          )}...${currentAccount.slice(-4)}`
                        : "Not connected"}
                    </p>
                    <p className="text-white fw-semibold fs-5 mt-1">GoChain</p>
                  </div>
                </div>
              </div>
            </div>

            <br />

            {/* Transfer form */}
            <div className="transfer-card">
              <h2>Transfer</h2>
              <form className="mt-3" onSubmit={handleTransferSubmit}>
                <div className="row mb-2">
                  <label
                    htmlFor="addressTo"
                    className="col-sm-2 col-form-label"
                  >
                    Address:
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      id="addressTo"
                      name="addressTo"
                      className="form-control"
                      placeholder="Address To"
                      onChange={(e) => handleChange(e, "addressTo")}
                    />
                  </div>
                </div>

                <div className="row mb-2">
                  <label htmlFor="amount" className="col-sm-2 col-form-label">
                    Amount:
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="number"
                      id="amount"
                      name="amount"
                      className="form-control"
                      placeholder="Amount (ETH)"
                      onChange={(e) => handleChange(e, "amount")}
                    />
                  </div>
                </div>

                <div className="row mb-2">
                  <label htmlFor="keyword" className="col-sm-2 col-form-label">
                    Keyword:
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      id="keyword"
                      name="keyword"
                      className="form-control"
                      placeholder="Keyword"
                      onChange={(e) => handleChange(e, "keyword")}
                    />
                  </div>
                </div>

                <div className="row mb-2">
                  <label htmlFor="message" className="col-sm-2 col-form-label">
                    Message:
                  </label>
                  <div className="col-sm-10">
                    <textarea
                      id="message"
                      name="message"
                      className="form-control"
                      placeholder="Enter Message"
                      onChange={(e) => handleChange(e, "message")}
                    ></textarea>
                  </div>
                </div>

                <hr />
                <button className="btn btn-send w-100" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Send Now"}
                </button>
              </form>
            </div>
            {transactionStatus && <p className="m-3">{transactionStatus}</p>}
          </div>

          {/* Transfer info */}
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold lh-1 mb-3 outfit-bold">
              Send Crypto across the World!
            </h1>
            <p className="herotext">
              Send and receive cryptocurrency securely across the world. Connect
              your wallet, enter details, and transfer with ease.
            </p>
            <div className="transfer-grid mt-4">
              <div className="transfer-grid-item">Reliability</div>
              <div className="transfer-grid-item">Security</div>
              <div className="transfer-grid-item">Ethereum</div>
              <div className="transfer-grid-item">Web 3.0</div>
              <div className="transfer-grid-item">Low Fee</div>
              <div className="transfer-grid-item">Blockchain</div>
            </div>
          </div>
        </div>

        {/* =========BALANCE========== */}

        <div className="mt-4 balance-card">
          {" "}
          <h3>Smart Contract Balance</h3>
          <p>{contractBalance} ETH</p>
          <button className="btn btn-refresh" onClick={getContractBalance}>
            Refresh Balance
          </button>
        </div>
        <br />

        {/* =========WITHDRAW========== */}
        <div className="row flex-wrap flex-lg-row align-items-center justify-content-center g-5 py-5 flex-column-reverse">
          {/* Form Section */}
          <div className="form-container col-10 col-sm-8 col-lg-6">
            <div className="container d-flex justify-content-center align-items-center"></div>

            <br />

            <div className="withdraw-card">
              <h2>Withdraw</h2>
              <form className="mt-3">
                <div className="row mb-2">
                  <label
                    htmlFor="withdrawAddress"
                    className="col-sm-2 col-form-label"
                  >
                    Recipient:
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      id="withdrawAddress"
                      name="withdrawAddress"
                      className="form-control"
                      placeholder="Recipient Address"
                      value={withdrawAddress}
                      onChange={(e) => setWithdrawAddress(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row mb-2">
                  <label
                    htmlFor="withdrawAmount"
                    className="col-sm-2 col-form-label"
                  >
                    Amount:
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="number"
                      id="withdrawAmount"
                      name="withdrawAmount"
                      className="form-control"
                      placeholder="Amount (ETH)"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                    />
                  </div>
                </div>
                <hr />
                <button
                  className="btn btn-send w-100"
                  onClick={handleWithdraw}
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Withdraw Now"}
                </button>
              </form>
            </div>
          </div>

          {/* Withdraw info */}
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold lh-1 mb-3 outfit-bold">
              Withdraw Your Crypto
            </h1>
            <br />
            <p className="herotext">
              Securely withdraw your cryptocurrency anytime. Enter the recipient
              address, specify the amount, and complete your transaction
              effortlessly.
            </p>
          </div>
        </div>
      </motion.div>

      <Footer />
    </>
  );
};

export default Transfer;
