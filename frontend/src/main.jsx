// frontend/src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { TransactionProvider } from "./context/TransactionContext.jsx";
import { MintNFTProvider } from "./context/MintNFTContext.jsx"; // Import the new provider
import { MarketplaceProvider } from "./context/MarketplaceContext";
import { AuctionProvider } from "./context/AuctionContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TransactionProvider>
      <MintNFTProvider>
        <MarketplaceProvider>
          <AuctionProvider>
            <App />
          </AuctionProvider>
        </MarketplaceProvider>
      </MintNFTProvider>
    </TransactionProvider>
  </StrictMode>
);
