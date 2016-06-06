

var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');

fs.readFile('./mime.json',function( err,data ){

	console.log( 'mime文件读取成功' );

	var mimeObj = JSON.parse( data );

	var server = http.createServer(function( req,res ){

		var urlObj = url.parse(req.url,true);

		var pathname = urlObj.pathname;

		var extname = path.extname(pathname);

		fs.readFile('./statc/' + pathname,function( err,data ){

			if( err ) {

				res.writeHead(404,{"Content-Type" : "text/plain;charset=UTF-8"});
				res.end("文件不存在");

				return false;

			}

			res.setHeader("Content-Type",mimeObj[extname] + ";charset=UTF-8");

			res.end(data);

		} );




	});

	server.listen(1221,'localhost');


});

