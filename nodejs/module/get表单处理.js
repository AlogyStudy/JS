/**
 * Created by Administrator on 2016/6/2.
 */


var http = require('http');
var fs = require('fs');
var url = require('url');

var setver = http.createServer(function( req,res ){

	var urlObj = url.parse(req.url,true);

	if ( urlObj.pathname == '/' ) {

		//index

		fs.readFile('./statc/test.html',function( err,data ){

			// if( err ) return false;

			res.setHeader("Content-Type","text/html;charset=uft8");

			res.end(data);

		});

	} else if ( urlObj.pathname == '/tijiao' ){

	var str = urlObj.query.name;
		str += urlObj.query.age;


		fs.appendFile('./upload/test.txt',str + '\n',function( err ){

			if( err ) {

				res.setHeader("Content-Type","text/html;charset=uft8");
				res.end('提交失败');
				return false;

			}

			res.setHeader("Content-Type","text/html;charset=uft8");
			res.end('提交成功');

		})

	}

});

console.log(123);

setver.listen(1221,'localhost');
