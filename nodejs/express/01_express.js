

var express = require('express');

var app = express();

app.all('/',function ( req,res ) {

		res.json({ 'aa': 'ok' });
		// res.send('您正在get请求all');
	
});


app.get('/news/:id',function ( req,res ) {

	res.send('您正在get请求，id为：'+ req.params.id );

});

app.listen(1221);