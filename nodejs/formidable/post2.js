
var http = require('http');
var fs = require('fs');

var formidable = require('formidable');

var server = http.createServer(function( req,res ){

	if ( req.url == '/tijiao' ) {
		
		var form = new formidable.IncomingForm();

		//设置上传路径
		form.uploadDir = './upload';

		form.parse( req,function( err,fields,files ){

			console.log( fields,files );

			var str = headImg.name;
			var extname = str.slice( str.indexOf('.') );

			fs.rename(files.headImg.path,'./upload/'+ 1111 + extname,function( err ){

				if( err ) {

					res.end('文件上传错误');

				}

			});

			res.end('ok');

		} );
		
	}

});

server.listen(1221,'127.0.0.1');
