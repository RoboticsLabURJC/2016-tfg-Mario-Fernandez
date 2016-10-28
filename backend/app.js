var express = require('express');
var multer = require('multer');
var fs = require('fs');
var app = express();

var upload = multer({dest: './uploads/'}).single('file');



app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.get('/api', function (req, res) {
  res.end('file catcher example');
});

app.post('/api', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      return res.end(err.toString());
    }

    res.end('File is uploaded');
  });
});

var PORT = process.env.PORT || 3001;

app.listen(PORT, function () {
  console.log('Working on port ' + PORT);
});
