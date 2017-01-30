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
- Upload .mp4 files - **Do not upload to Card or Audio**
- Brace yourself, you're going to hate this:
  - To change CLIPS to CARDS, change any 'name' fields to begin with character 'T'
  - Then access page [http://localhost:3000/editFile](http://localhost:3000/editFile)
  - All content beginning with 'T' should automatically change to CARD
    - Why? During development, we had many many cards already imported as Clips.
    Since they all began with a 'T' for title card, it was an easy way to automatically
    switch all of them. I have not had a reason to change it yet. Sorry.