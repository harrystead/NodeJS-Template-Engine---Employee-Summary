
const fs = require('fs');
const path = require('path');
const express = require('express');


const app = express();
var port = process.env.PORT || 3000;
var router = express.Router();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/home", function (req, res) {
    res.sendFile(path.join(__dirname, "main.html"));
  });


//-----------------------------------------------------------\\

app.use("/", router);

app.listen(port);
console.log("This server is running on... " + port);


