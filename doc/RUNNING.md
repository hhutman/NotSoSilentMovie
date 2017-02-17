# Running App

## 1) Start MongoDB #
- Access your MongoDB directory.
- Run `mongod.exe` from the command line.
- If configure properly, will wait for connection on port 27017.

## 2) Set Environment Variables
- For local testing, set `PORT=3000` or other convenient open port.
- App is pre-configured for production deployment.

## 3) Create necessary Directories
- create directory `SilentMovie/public/uploaded/`

## 3) Start App
- `node bin/www`

# Adding Content
- Visit [http://localhost:3000/upload](http://localhost:3000/upload "upload page")
- Upload .mp4 files