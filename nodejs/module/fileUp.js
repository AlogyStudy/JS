

var http = require('http');
var formidable = require('formidable');
var fs = require('fs');


var server = http.createServer(function ( req,res ) {

	if( req.url == '/' ){

		fs.readFile('./statc/test.html',function( err,data ){

			if( err ){

				res.setHeader('Content-type','text/html;charse=utf8');
				res.end('文件读取失败');

			}

			res.end(data);

		});

	}
	else
	//文件上传
	if ( req.url == '/tijiao' && req.method.toLowerCase() == 'post' ) {

		var form = new formidable.IncomingForm();

		//设置上传路径
		form.uploadDir = "./uploads";

		form.parse(req, function(err, fields, files) {
			//fields是普通域，就是普通的文本框、单选按钮、复选按钮、textarea都存在这个对象里面
			//files是上传的文件信息
			console.log(fields);
			console.log(files);
			res.end("ok");

		});

	}

});

server.listen(1221,'localhost');
