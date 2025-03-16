import uvicorn
import mysql.connector
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

app = FastAPI()

app.mount("/static", StaticFiles(directory="../backend/static"), name="static")     #MOUNT TO IMAGES IN /STATIC TO HELP FAST LOAD.

origins = ["http://localhost:5173"]         #VITE FRONTEND ORIGIN

app.add_middleware(             #CORS TO ALLOW HTTP REQUEST
    CORSMiddleware, 
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/nfts")
def get_nfts(page: int = Query(1, alias="page", description="Page number"), limit: int = Query(8, description="NFTs per page")):    #LIMIT HOW MANY NFTS CAN BE SHOWN IN LIVE BIDDING SECTION, MARKETPLACE.

    # TRY EXCEPT BLOCK
    try:       
        db = mysql.connector.connect(
            host="localhost",
            port=3307,
            user="root",
            password="root",
            database="nft_db"
        )
        cursor = db.cursor(dictionary=True)
        
        offset = (page - 1) * limit         #FETCH THE NEXT SET OF 8 NFTS WHEN USER CLICK ON A NEW PAGE.

        cursor.execute("SELECT * FROM nfts LIMIT %s OFFSET %s",(limit, offset))         
        nfts = cursor.fetchall()
        query = "SELECT COUNT(*) AS total FROM nfts"
        cursor.execute(query)
        totalNFTs = cursor.fetchone()["total"]
        totalPage = (totalNFTs + limit - 1) // limit        #// DIVISON TO ROUND UP THE TOTAL OF PAGES

        #CLOSE AFTER USING
        cursor.close()
        db.close()

        return {
        "nfts": nfts, 
        "page": page,
        "totalPage": totalPage,
        "totalNFTs": totalNFTs        
        }
    # TRY EXCEPT BLOCK
    except mysql.connector.Error as e:
        return {"error fetching NFTs List": str(e)}          





# WHEN USER CLICKS ON AN NFT IN /MARKET, FETCH THAT NFT'S ID AND LOAD ITS DATA CORRESPONDINGLY.
@app.get("/nfts/{nft_id}")
def get_nft(nft_id: int):
    try:
        db = mysql.connector.connect(
            host="localhost",
            port=3307,
            user="root",
            password="root",
            database="nft_db"
        )
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT * FROM nfts WHERE nft_id = %s", (nft_id,))
        nft = cursor.fetchone()
        if not nft:
            return {"error": "NFT not found"}
        # cursor.execute("SELECT * FROM offers WHERE nft_id = %s", (nft_id))
        # offers = cursor.fetchall()
        cursor.close()
        db.close()
        return {"nft": nft}                     
    except mysql.connector.Error as e:
        return {"error fetching NFT data:": str(e)}


if __name__ == "__main__":              #RUN ON PORT 8000
    uvicorn.run(app, host="0.0.0.0", port=8000)