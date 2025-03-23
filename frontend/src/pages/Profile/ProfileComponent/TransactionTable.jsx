import React, { useEffect, useState, useContext } from "react";
import "./profile.css";
import { transactionHistory } from "../data/transactionHistory";
import Popup from "../../Create/CreateComponent/ListingPopup";
import api from "../../../api";
import { TransactionContext } from "../../../context/TransactionContext";
import { useNavigate } from "react-router-dom";

const TransactionTable = () => {
  // STATE TO TRACK ACTIVE TAB
  const [activeTab, setActiveTab] = useState("collected");
  // STATE TO STORE FETCHED NFTS
  const [collectedNFTs, setCollectedNfts] = useState([]);
  // STATE FOR POPUP VISIBILITY
  const [showPopup, setShowPopup] = useState(false);
  // STATE FOR SELECTED NFT IN POPUP
  const [selectedNFT, setSelectedNFT] = useState(null);

  // CONTEXT TO ACCESS WALLET CONNECTION & ACCOUNT INFO
  const { connectWallet, currentAccount } = useContext(TransactionContext);

  // FETCH NFTS BELONGING TO THE CURRENT USER FROM API
  useEffect(() => {
    if (!currentAccount) return;
    const fetchNFTs = async () => {
      try {
        const res = await api.get(`/profile-nfts?own_by=${currentAccount}`);
        setCollectedNfts(res.data.totalNfts);
        console.log("Fetched successfully", collectedNFTs);
      } catch (error) {
        console.log("Error fetching NFTs:", error);
      }
    };
    
    fetchNFTs();
  }, [currentAccount]);

  // MAPPING OF TAB TITLES FOR DISPLAY PURPOSES
  const tabTitles = {
    collected: "NFTs Minted",
    history: "Transaction History",
    more: "More",
  };

  // MAPPING DATA TO TABS
  const tabData = {
    collected: collectedNFTs,
    history: transactionHistory,
    more: [],
  };

  const handleListingSubmit = async (listingData) => {
    if (!lastMintedNFT || !lastMintedNFT.tokenId) {
      alert("No minted NFT found. Please mint an NFT first.");
      return;
    }

    const tokenId = lastMintedNFT.tokenId; // Use the last minted token ID

    try {
      if (listingData.listingType === "list") {
        await listNFT(tokenId, listingData.price);
        alert(`NFT ${tokenId} listed successfully!`);
        navigate("/market"); // Redirect to /market after sale listing
      } else if (listingData.listingType === "auction") {
        await startAuction(tokenId, listingData.startingPrice);
        alert(`Auction for NFT ${tokenId} started successfully!`);
        navigate("/market"); // Redirect to /market after starting auction
      }
      setShowPopup(false); // Close popup on success
    } catch (error) {
      console.error("Error in listing/auction:", error);
      alert(`Error: ${error.message}`);
    }
  };

  // FUNCTION TO HANDLE "LIST" BUTTON CLICK
  const handleListClick = (nft) => {
    setSelectedNFT(nft); // STORE SELECTED NFT
    setShowPopup(true); // DISPLAY POPUP
  };

  //NAVIGATE TO THE BUY PAGE OF EACH NFT WHEN PRESSED ACTION BUTTON
  let navigate = useNavigate();
  let path = "/buy";

  return (
    <>
      <div className="transaction-container">
        {/* TAB NAVIGATION */}
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
            style={{
              left: `${Object.keys(tabData).indexOf(activeTab) * 33.33333}%`,
              width: "33.333%",
            }}
          ></div>
        </div>
      </div>

      {/* TABLE CONTENT */}
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
                    <th>Price (ETH)</th>
                    <th>Acquired</th>
                    <th>Action</th>
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
                  <tr key={item.nft_id}>
                    {activeTab === "collected" && (
                      <>
                        <td>{item.nft_id}</td>
                        <td>
                          <h5>{item.nft_name}</h5>
                        </td>
                        <td>
                          {item.current_price ? item.current_price : "--"}
                        </td>
                        <td>{item.date_created}</td>
                        <td>
                          {item.current_price ? (
                            <button
                              className="btn btn-list"
                              onClick={() => {
                                navigate(`${path}/${item.nft_id}`);
                              }}
                            >Go
                            </button>
                          ) : (
                            <button
                              className="btn btn-list"
                              onClick={() => handleListClick(item)}
                            >
                              List
                            </button>
                          )}
                        </td>
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
                  <td style={{ textAlign: "center" }}>No Data Available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* POPUP COMPONENT */}
      {showPopup && selectedNFT && (
        <Popup
          image={`https://ipfs.io/ipfs/${selectedNFT.image_path.replace(
            "ipfs://",
            ""
          )}`}
          nftName={selectedNFT.nft_name}
          cid={selectedNFT.nft_id}
          nft_id={selectedNFT.nft_id}
          tokenId={selectedNFT.token_id}
          onClose={() => setShowPopup(false)}
          onSubmit={() => handleListingSubmit()}
        />
      )}

      {/* PAGINATION (TEMPORARY) */}
      <div className="pagination outfit">
        <button className="pagination-btn">Previous</button>
        <span className="pagination-info">Page 1</span>
        <button className="pagination-btn">Next</button>
      </div>
    </>
  );
};

export default TransactionTable;
