const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    var cryp = req.body.crypto;
    var fiat = req.body.fiat;
    var amount = req.body.amount;

    var base = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";
    //var final = base + cryp + fiat; //manually concactenates the hyperlink

    var options = {
        url: 'https://apiv2.bitcoinaverage.com/convert/global',
        method: 'GET',
        qs: {
            from: cryp,
            to: fiat,
            amount: amount
        }
    }; //allows to format api parameters as a Javascript Object 

    request(options , function(error, response, body){

        var data = JSON.parse(body);
        var price = data.price;
        var curTime = data.time;

        res.write("<p>" + amount + " " + cryp + " currently sells for " + price + " " + fiat + "</p><br>");
        res.write(String(curTime));

        res.send();
    });

});

app.listen(3000, function(){
    console.log("Server is running on port 3000.");
});