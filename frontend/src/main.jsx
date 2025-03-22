import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom"; // Add BrowserRouter
import { TransactionProvider } from "./context/TransactionContext.jsx";
import { MintNFTProvider } from "./context/MintNFTContext.jsx";
import { MarketplaceProvider } from "./context/MarketplaceContext";
import { AuctionProvider } from "./context/AuctionContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter> {/* Wrap the entire app with BrowserRouter */}
      <TransactionProvider>
        <MintNFTProvider>
          <MarketplaceProvider>
            <AuctionProvider>
              <App />
            </AuctionProvider>
          </MarketplaceProvider>
        </MintNFTProvider>
      </TransactionProvider>
    </BrowserRouter>
  </StrictMode>
);