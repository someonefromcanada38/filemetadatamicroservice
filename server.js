var express = require('express');
var multer = require('multer');
var upload = multer({ dest: "./uploads" });

var app = express();
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    console.log('html file served');
    res.sendfile("index.html");
});

app.post('/file', upload.single('check'), function(req,res){
  var filesize = {filesize: req.file.size + " bytes"}
  res.send(filesize);
});

app.listen(process.env.PORT || 8080);