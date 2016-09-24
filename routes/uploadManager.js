var options = {
  tmpDir: __dirname + '/../public/uploaded/tmp',
  uploadDir: __dirname + '/../public/uploaded/files',
  uploadUrl: '/uploaded/files/',
  storage: {
    type: 'local'
  },
  maxPostSize: 500000000, // 500 MB
  minFileSize:  1,
  maxFileSize:  5000000000, // 10 GB
  acceptFileTypes:  /\.(gif|jpe?g|png|mov|mp4|qt|avi|ogg|3gp)/i
};

var uploader = require('blueimp-file-upload-expressjs')(options);

module.exports = function(router) {
  router.get('/upload', function(req, res) {
    uploader.get(req, res, function(obj) {
      res.send(JSON.stringify(obj));
    });
  });

  router.post('/upload', function(req, res) {
    uploader.post(req, res, function(obj) {
      res.send(JSON.stringify(obj));
    });
  });

  router.delete('/uploaded/files/:name', function(req, res) {
    uploader.delete(req, res, function(obj) {
      res.send(JSON.stringify(obj));
    });
  });
  return router;
};
