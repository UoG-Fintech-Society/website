var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var request = require('superagent')

app.use(express.static(__dirname + '/template'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/',function (req,res){
    res.sendFile("index.html");
});

// Mailchimp settings 
var mailchimpInstance   = 'us16',
    listUniqueId        = '73db9aabe6',
    mailchimpApiKey     = '5e9927aeec9aa3802e5c21a3b2c6ece7-us16';

app.post('/subscribe', function (req, res) {
    request
        .post('https://' + mailchimpInstance + '.api.mailchimp.com/3.0/lists/' + listUniqueId + '/members/')
        .set('Content-Type', 'application/json;charset=utf-8')
        .set('Authorization', 'Basic ' + new Buffer('any:' + mailchimpApiKey ).toString('base64'))
        .send({
          'email_address': req.body.email,
          'status': 'pending'
        })
            .end(function(err, response) {
                if (response.status < 300) {
                    res.send('SENT_CONFIRMATION');
                } else if (response.status === 400 && response.body.title === "Member Exists") {
                    res.send('ALREADY_EXISTS');
                } else {
                    res.send('ERROR');
                }
          });
});

// app.post('/subscribe',function(req,res){
//     fs.appendFile('mailinglist.txt',req.body.email+'\n');
//     res.end();
// });

var portNumber =  process.env.port || process.env.PORT || 3000

app.listen(portNumber, function (){
    console.log("Server running at http://localhost:%d",portNumber);
});

