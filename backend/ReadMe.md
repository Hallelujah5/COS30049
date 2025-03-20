# Backend Code Project (dApp)

## Backend Setup Instructions

### Clone the repository

```bash
git clone https://github.com/COS30049-SUVHN/group-project-spr-2025-g6.git
```

### Install FastAPI and Uvicorn in the backend directory

#### Move to the backend folder

```bash
cd ./group-project-spr-2025-g6/backend/
```

#### Activate the virtual environment

```bash
.\venv\Scripts\activate
```

#### Install FastAPI and Uvicorn

```bash
pip install fastapi uvicorn
```

#### (Optional) After installing a dependency, one should use:

```bash
pip freeze > requirements.txt
```

As to manually update the libraries so everyone would get the same exact versions.

#### So anytime someone clones the repo, they can install the dependencies by running:

```bash
pip install -r requirements.txt
```

#### Testing with main.py

Create a `main.py` file with the following content:

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}
```

#### Run the application

```bash
uvicorn main:app --reload
```

#### Witness the result at [http://127.0.0.1:8000/](http://127.0.0.1:8000/)

### Deactivate and delete FastAPI and Uvicorn

#### Deactivate the virtual environment

```bash
deactivate
```

#### (Unnecessary) Delete the virtual environment (venv/ folder added to .gitignore)

```bash
Remove-Item -Recurse -Force venv
```
