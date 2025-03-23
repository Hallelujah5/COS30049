# Frontend Setup Instructions

This document provides the necessary steps to set up and run the frontend portion of the project.

## Prerequisites
- **Node.js and npm**: Ensure you have Node.js and npm installed from [nodejs.org](https://nodejs.org/).

## Setup Instructions

### 1. Clone the Repository
If you haven't cloned the repository yet, do so with the following command:
```sh
git clone <repository-url>
```

### 2. Navigate to Frontend Directory
Move to the frontend directory:
```sh
cd frontend/
```

### 3. Install Dependencies
Install the required dependencies using npm:
```sh
npm install
```

### 4. Start the Backend Services
Navigate to the project root and run the startup script to install other libraries and start necessary services:
```sh
cd ../
.\project_start.bat
```

### 5. Run the Frontend
After starting backend services, navigate back to the frontend directory and start the frontend:
```sh
cd frontend/
npm run dev
```

### 6. Access the Application
Once the frontend is running, open your web browser and navigate to:
```
http://localhost:5173
```
Make sure your browser has MetaMask set up as described in the backend `ReadMe.md`.

## Notes
- Make sure to search using the keyword 'Gbean' (any variation is fine) to avoid errors in search results.

You're all set! Follow these instructions to get the frontend application running. If you encounter any issues, refer to the backend setup instructions for additional context.
