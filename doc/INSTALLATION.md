# Installation Documentation
Last updated 1/30/2017 - Matthew Riegel
## 1) Install Node.js #
[Download](https://nodejs.org/en/ "Node.js")
- Standard installation

## 2) Install MongoDB #
[Download](https://www.mongodb.com/ "MongoDB")
- Standard installation
- You may have to configure remote folders
#### Windows Config
- Create Directory `C:\data\db\`
- [Documentation](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/ "MongoDB Windows Docs")
#### Mac/OSX
- [Documentation](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/ "MongoDB MacOSX Docs")

## 3) Install FFmpeg
[Download](https://ffmpeg.org/download.html "FFmpeg")
- The app will search for `ffmpeg.exe` in either:
  - `SilentMovie/tools/ffmpeg-3.2/bin/` - *you may have to create this directory*
  - `usr/bin/`
## 4) Install modules
- `npm install` In root directory of SilentMovie