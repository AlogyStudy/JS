
var express = require('express');

var app = express();

var a = 100;

app.use(function( req,res,next ){

	res.status(200);

	res.set('Content-type','text/html;charset=utf8');

	next();

});

app.get('/',function( req,res,next ){

	a++;
	console.log(a);
	next();
	// res.send(a.toString());

});

app.get('/',function( req,res ){

	a+=10;
	console.log(a);
	// res.send( a.tostring() );

});

app.listen(1221);