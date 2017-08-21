var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

app.use(express.static(__dirname + '/template'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/',function (req,res){
    res.sendFile("index.html");
});

app.post('/subscribe',function(req,res){
    fs.appendFile('mailinglist.txt',req.body.email+'\n');
    res.end();
});

var portNumber =  process.env.port || process.env.PORT || 1337

app.listen(portNumber, function (){
    console.log("Server running at http://localhost:%d",portNumber);
});