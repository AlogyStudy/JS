
var express = require('express');

var cookieParser = require('cookie-parser');

var app = express();

app.use(cookieParser());


app.get('/',function( req,res ){

	console.log( req.cookies.username );
	if( !req.cookies.username ){

		res.send('您还未登陆');

	} else {

		res.send('您已经登陆了');

	}

	res.send('ok');

});

app.get('/login/:usename',function( req,res ){

	res.cookie('username', req.params.usename, {expires: new Date(Date.now() + 900000)});

	res.send('登陆成功');

});



app.listen(1221);
