import React from "react";
import Footer from "../../components/Footer/footer";
import { motion } from "motion/react";
import "./transfer.css";
import ethereum from "../../../../backend/static/images/transfer/ethereum.png";
import { validateTransfer } from "./validateTransfer";

const Transfer = () => {
  const handleTransferSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(event.target);
    const transferData = {
      address_to: formData.get("address_to"),
      amount: formData.get("amount"),
      keyword: formData.get("keyword"),
      message: formData.get("message"),
    };

    console.log("Transfer Data:", transferData); // Log data

    if (validateTransfer(transferData)) {
      console.log("Transfer Successful");
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
        <div className="row flex-wrap flex-lg-row-reverse align-items-center g-5 py-5">
          {/* Form Section */}
          <div className="col-10 col-sm-8 col-lg-6">
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
                  <div>
                    <p className="text-white small">0x4Bd...A91</p>
                    <p className="text-white fw-semibold fs-5 mt-1">Ethereum</p>
                  </div>
                </div>
              </div>
            </div>

            <br />

{/* Credit Transfer Form */}
            <div className="d-block mx-lg-auto">
              <div className="transfer-card">
                <form className="mt-3" onSubmit={handleTransferSubmit}>
                  <div className="row mb-2">
                    <label
                      htmlFor="address_to"
                      className="col-sm-2 col-form-label"
                    >
                      Address:
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        id="address_to"
                        name="address_to"
                        className="form-control"
                        placeholder="Address To"
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
                      />
                    </div>
                  </div>

                  <div className="row mb-2">
                    <label
                      htmlFor="keyword"
                      className="col-sm-2 col-form-label"
                    >
                      Keyword:
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        id="keyword"
                        name="keyword"
                        className="form-control"
                        placeholder="Keyword"
                      />
                    </div>
                  </div>

                  <div className="row mb-2">
                    <label
                      htmlFor="message"
                      className="col-sm-2 col-form-label"
                    >
                      Message:
                    </label>
                    <div className="col-sm-10">
                      <textarea
                        id="message"
                        name="message"
                        className="form-control"
                        placeholder="Enter Message"
                      ></textarea>
                    </div>
                  </div>
                  <hr />
                  <button className="btn btn-send w-100">Send Now</button>
                </form>
              </div>
            </div>
          </div>

          {/* Hero Text */}
          <div className="col-lg-6">
            <h1
              className="display-5 fw-bold lh-1 mb-3 outfit-bold"
            >
              Send Crypto across the World!
            </h1>
            <br />
            <p className="herotext">
              Send and receive cryptocurrency securely across the world. Connect
              your wallet, enter details, and transfer with ease.
            </p>
            <button className="btn btn-connect mt-3">Connect Wallet</button>
            <div className="transfer-grid mt-4">
              <div className="transfer-grid-item">Reliability</div>
              <div className="transfer-grid-item">Security</div>
              <div className="transfer-grid-item">Ethereum</div>
              <div className="transfer-grid-item">Web 3.0</div>
              <div className="transfer-grid-item">Low Fees</div>
              <div className="transfer-grid-item">Blockchain</div>
            </div>
          </div>
        </div>
      </motion.div>

      <Footer />
    </>
  );
};

export default Transfer;
