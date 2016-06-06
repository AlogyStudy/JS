
var express = require('express');

var app = express();

console.log( express );

app.use( express.static('./src') );


app.listen(1221);
