
var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');


var server = http.createServer(function( req,res ){

	console.log( global );


	//icon
	if ( req.url == '/favicon.ico' ) return false;


	//获取路径名字
	var pathName = url.parse(req.url).pathname;

	//获取后缀名
	var extname = path.extname(pathName);

	//判断首页  //http://127.0.0.1:1221/xixi  http://127.0.0.1:1221/xixi/aiai
	if ( pathName.indexOf('.') == -1 ) {

		pathName += '/index.html';   //   /index.html

	}
	//   /xixi/aiai/index.html   //index.html

	//获取根目录路径
	var fileUrl = './' + path.normalize('./src/'+pathName); //  ./src\index.html

	//读取文件，返回Client
	fs.readFile(fileUrl,function( err,data ){

		//处理404 页面
		if (err) {

			fs.readFile('./src/404.html',function( err,data ){

				res.writeHead('404',{'Content-type': 'text/html;charset=utf-8'});
				res.end(data);

			});

		}

		//普通文件
		var mime;
		res.writeHead(200,{'Content-type': 'text/' + mime + ';charset=utf-8'});
		res.end(data);

	});

	res.end('ok');
	
});

server.listen(1221,'localhost');

