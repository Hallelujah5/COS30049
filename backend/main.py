import uvicorn
import mysql.connector
from fastapi import FastAPI, Query, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

app = FastAPI()

app.mount("/static", StaticFiles(directory="../backend/static"), name="static")     #MOUNT TO IMAGES IN /STATIC TO HELP FAST LOAD.

origins = ["http://localhost:5173", "http://127.0.0.1:5173"]         #VITE FRONTEND ORIGIN

app.add_middleware(             #CORS TO ALLOW HTTP REQUEST
    CORSMiddleware, 
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


def get_db():
    return mysql.connector.connect(
        host="localhost",
        port=3306,  # Changed from 3307 to 3306
        user="root",
        password="root",
        database="nft_db"
    )     

@app.get("/nfts")
def get_nfts(nft_status: str, page: int = Query(1, alias="page", description="Page number"), limit: int = Query(8, description="NFTs per page")):    #LIMIT HOW MANY NFTS CAN BE SHOWN IN LIVE BIDDING SECTION, MARKETPLACE.

    # TRY EXCEPT BLOCK
    try:       
        db = mysql.connector.connect(
            host="localhost",
            port=3306,  # Changed from 3307 to 3306
            user="root",
            password="root",
            database="nft_db"
        )
        cursor = db.cursor(dictionary=True)
        
        offset = (page - 1) * limit         #FETCH THE NEXT SET OF 8 NFTS WHEN USER CLICK ON A NEW PAGE.

        cursor.execute("SELECT * FROM nfts WHERE nft_status = %s LIMIT %s OFFSET %s",(nft_status, limit, offset))         
        nfts = cursor.fetchall()
        query = "SELECT COUNT(*) AS total FROM nfts WHERE nft_status = %s"
        cursor.execute(query, (nft_status,))
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
            port=3306,  # Changed from 3307 to 3306
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




@app.post("/create-nft")                #TRIGGERED IN /CREATE PAGE, ADDING AN NFT TO DISPLAY IN THE DATABASE.

async def create_nft(
    nft_name: str = Form(...),              #FORMDATA() FOR FORM SUBMISSION
    description: str = Form(...),
    image_path: str = Form(...),
    own_by: str = Form(...)
):
    try:
        db = mysql.connector.connect(           #DATABASE CONNECT
            host="localhost",
            port=3306,  # Changed from 3307 to 3306
            user="root",
            password="root",
            database="nft_db"
        )
        cursor = db.cursor()
        query = """     
            INSERT INTO NFTs (nft_name, own_by, description, image_path, nft_status)            
            VALUES (%s, %s, %s, %s, %s)
        """
        values = (nft_name, own_by, description, image_path, "none")
        cursor.execute(query, values)
        db.commit()                                 #SAVE THE DATABASE.
        nft_id = cursor.lastrowid           #GET THE ID OF THE NFT INSERTED JUST NOW.
        cursor.close()
        db.close()
        return {"success": True, "nft_id": nft_id, "cid": image_path}
    except mysql.connector.Error as e:
        return {"error": f"Failed to create NFT: {str(e)}"}




@app.post("/update-nft")        #TRIGGERED WHENEVER USER PRESS THE "LIST NFT" BUTTON, UPDATE THE STATUS AND PRICE.
async def update_nft(nft_status: str = Form(...), current_price: float = Form(...), nft_id: int = Form(...)):
    print(f"Received: nft_status={nft_status}, current_price={current_price}, nft_id={nft_id}")
    try:
        db = get_db()
        cursor = db.cursor()
        query = "UPDATE NFTs SET nft_status = %s, current_price = %s WHERE nft_id = %s"
        cursor.execute(query, (nft_status, current_price, nft_id))
        db.commit()
        cursor.close()
        db.close()   
        return {"success": True, "nft_id": nft_id, "nft_status": nft_status}
    except mysql.connector.Error as e:
        return {"Error!": f"Failed to update row NFT: {str(e)}"}


if __name__ == "__main__":              #RUN ON PORT 9000
    uvicorn.run(app, host="0.0.0.0", port=9000)