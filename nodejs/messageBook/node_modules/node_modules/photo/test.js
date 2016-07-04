
var http = require('http');
var contorller = require('./controller/t.js');


var server = http.createServer(function( req,res ){

	if( req.url == '/' ){

		contorller.showIndex( req,res );

	} else if ( req.url == '/news' ){

		

	}


});

server.listen(1221,'localhost');