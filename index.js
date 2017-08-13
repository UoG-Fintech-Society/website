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

app.listen(1337, function (){
    console.log("Server running at http://localhost:1337");
});