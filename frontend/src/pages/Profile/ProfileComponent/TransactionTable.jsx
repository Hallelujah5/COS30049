import React, { useState } from "react";
import "./profile.css";
import { transactionHistory } from "../data/transactionHistory";
import { offersMade } from "../data/offersMade";

// Sample data for "Collected" (NFTs)
const collectedNFTs = [
  {
    id: 1,
    name: "CryptoPunk #1234",
    owner: "0xA12bC34D...",
    price: "3.5",
    acquired: "2025-01-30",
  },
  {
    id: 2,
    name: "Bored Ape #5678",
    owner: "0xD56eF78A...",
    price: "5.2",
    acquired: "2025-01-29",
  },
];

// Tab data mapping
const tabData = {
  collected: collectedNFTs,
  offers: offersMade,
  history: transactionHistory,
  more: [],
};

// Tab title mapping
const tabTitles = {
  collected: "NFTs Collected",
  offers: "Pending Offers",
  history: "Transaction History",
  more: "More",
};

const TransactionTable = () => {
  const [activeTab, setActiveTab] = useState("collected");

  return (
    <>
      <div className="transaction-container">
        {/* Tab Navigation */}
        <div className="tabs">
          {Object.keys(tabData).map((tab) => (
            <button
              key={tab}
              className={`tab-button ${
                activeTab === tab ? "active" : ""
              } outfit`}
              onClick={() => setActiveTab(tab)}
            >
              {tabTitles[tab].toUpperCase()}
            </button>
          ))}
          <div
            className="active-bg"
            style={{ left: `${Object.keys(tabData).indexOf(activeTab) * 25}%` }}
          ></div>
        </div>
      </div>

      {/* Table Content */}
      <div className="table-container">
        <h2 className="table-title outfit-bold">{tabTitles[activeTab]}</h2>
        <div className="table-overflow outfit">
          <table>
            <thead>
              <tr>
                {activeTab === "collected" && (
                  <>
                    <th>ID</th>
                    <th>NFT Name</th>
                    <th>Owner</th>
                    <th>Price (ETH)</th>
                    <th>Acquired</th>
                  </>
                )}
                {activeTab === "offers" && (
                  <>
                    <th>ID</th>
                    <th>Transaction Hash</th>
                    <th>Receiver</th>
                    <th>Price (ETH)</th>
                    <th>Time</th>
                  </>
                )}
                {activeTab === "history" && (
                  <>
                    <th>ID</th>
                    <th>From Address</th>
                    <th>To Address</th>
                    <th>Price (ETH)</th>
                    <th>Time</th>
                  </>
                )}
                {activeTab === "more"}
              </tr>
            </thead>
            <tbody>
              {tabData[activeTab].length > 0 ? (
                tabData[activeTab].map((item) => (
                  <tr key={item.id}>
                    {activeTab === "collected" && (
                      <>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.owner}</td>
                        <td>{item.price}</td>
                        <td>{item.acquired}</td>
                      </>
                    )}
                    {activeTab === "offers" && (
                      <>
                        <td>{item.id}</td>
                        <td>{item.hash}</td>
                        <td>{item.receiver}</td>
                        <td>{item.price}</td>
                        <td>{item.time}</td>
                      </>
                    )}
                    {activeTab === "history" && (
                      <>
                        <td>{item.id}</td>
                        <td>{item.from}</td>
                        <td>{item.to}</td>
                        <td>{item.price}</td>
                        <td>{item.time}</td>
                      </>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    style={{ textAlign: "center"}}
                  >
                    No Data Available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Pagination Buttons (----temporary----)*/}
      <div className="pagination outfit">
        <button className="pagination-btn">Previous</button>
        <span className="pagination-info">Page 1...</span>
        <button className="pagination-btn">Next</button>
      </div>
    </>
  );
};

export default TransactionTable;
