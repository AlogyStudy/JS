/**
 * Created by Administrator on 2016/4/3.
 */

var http = require('http');
var url = require('url');

var server = http.createServer();

server.on('error',function( err ){
    console.log(err);
});
server.on('listening',function(){
    console.log('客户请求');
});


server.on('request',function( req,res ){


    //console.log( req.url );

    //var urlStr = url.parse( 'http://www.baidu.com:8080/a/index.html?b=a#p=1' );
    //console.log( urlStr );

    var urlStr = url.parse(req.url);

    switch ( urlStr.pathname ){
        case '/':
            //首页
            res.writeHead(200,{
                'Content-type': 'text/html;charset=utf-8'
            });
            res.end('<h1>首页</h1>');
            break;
        case '/user':
            res.writeHead(200,{
                'Content-type': 'text/html;charset=utf-8'
            });
            res.end('<h1>User</h1>');
            break;
        default:
            //处理其它情况
            res.writeHead(404,{
                'Content-type': 'text/html;charset=utf-8'
            });
            res.end('<h1>你访问的网页不存在</h1>');
            break;
    }

});

server.listen(8080,'localhost');
