/**
 * Created by Administrator on 2016/6/2.
 */

var http = require('http');


var sever = http.createServer(function( req,res ){


	console.log( req.url );

	switch ( req.url ) {

		case '/':
			res.end('index.html');
			break;
		case '/xixi':
			res.end('xixi');
			break;
		default:
			res.end('404');
			break;
	}

	res.end('ok');

});


sever.listen(1221,'127.0.0.1');
