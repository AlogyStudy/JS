

var express = require('express');

var app = express();

var pathnames = __dirname;

//静态化资源
app.use(express.static( pathnames ));

app.get('/',function( req,res,next ){

	res.send('get请求');

	next();

});


app.get('/news/:id/:classname',function( req,res ){

	console.log( req );

	// console.log(123);
	res.send('班级id'+ req.params.id + '班级名字' + req.params.classname);

});

app.all('/phot[os]?',function( req,res ){

	res.send('photos');

});

app.all(/student([\d]{1})\/class([\d]{2})$/,function( req,res ){

	console.log( req.params );

	res.jsonp({'user': {}});

});


/*app.all('*',function(){

});

app.all('/haha',function(){

});*/

app.listen(1221);

