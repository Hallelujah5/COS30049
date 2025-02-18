Your **backend** code project (dApp).
# Back end set up
## Set up instruction
### Clone the repo
'''
 git clone https://github.com/COS30049-SUVHN/group-project-spr-2025-g6.git
'''
### Install Fast API, Uvicorn on ./backend/
#### Move to backend folder
'''
 cd .\group-project-spr-2025-g6\backend\
'''
#### Activate venv
'''
 .\venv\Scripts\activate
'''
#### Install fastapi uvicorn
'''
pip install fastapi uvicorn
'''
#### Testing with main.py
'''
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}
'''
#### Run main:app
'''
uvicorn main:app --reload
'''
#### Witness the result in http://127.0.0.1:8000/

### Deactivate and Delete Fast API, Uvicorn
#### Deactivate Fast API, Uvicorn
'''
deactivate
'''
#### Delete Fast API, Uvicorn
'''
Remove-Item -Recurse -Force venv
'''