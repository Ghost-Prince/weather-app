const express = require("express");     // npm install express
const bodyParser = require("body-parser");      // npm install body-parser
const https = require("https");
const app = express();

const apiKey = ""; // get your api key from openweathermap.org
var url = "https://api.openweathermap.org/data/2.5/weather?q=";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", function (req, res) {
    var city = req.body.CITY;
    var unit = req.body.TEMP_UNIT;
    url += city + "&units=";
    url += unit + "&appid=";
    url += apiKey;
    https.get(url, function (response) {
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            res.send(weatherData);
        });
    });
});

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(3000, function () {
    console.log("Server is running at port 3000.");
});

// https://api.openweathermap.org/data/2.5/weather?q={city}&units={units}&appid={API KEY}