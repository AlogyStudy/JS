
var http = require('http');

var querystring = require('querystring');

var server = http.createServer(function( req,res ){

	var data = '';

	if ( req.url == '/tijiao' && req.method.toLowerCase() == 'post' ) {

		//提交内容 , post请求内容特别多，分为一个个datachunk，就是一块一块的数据。
		//当每个小数据块传输完毕的时候，就触发data时间。
		req.on('data',function( datachunk ){

			data += datachunk.toString();

		});

		//当所有数据传输完毕的时候，就触发end事件。
		req.on('end',function( err ){

			if ( err ) {

				res.end('worng');

				return false;

			}

			res.end('ok');

			console.log( querystring.parse(data) );

		});

	}

});


server.listen(1221,'127.0.0.1');
