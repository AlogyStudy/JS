/**
 * Created by Administrator on 2016/4/3.
 */


var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');

var server = http.createServer();
//var server = http.createser
server.on('error',function( err ){
    console.log(err);
});
server.on('listening',function(){
    console.log('listening....');
});

var htmlDir = __dirname + '/html/';

server.on('request',function( req,res ){

    var urlStr = url.parse(req.url);


    switch( urlStr.pathname ){
        case '/':
            sendData(htmlDir+'index.html',req,res);
            break;

        case '/user':
            sendData(htmlDir+'user.html',req,res);
            break;

        case '/login':
            sendData(htmlDir+'login.html',req,res);
            break;

        case '/login/check':
            //console.log( req.method );
            //console.log(urlStr);

            //console.log(urlStr);

            //console.log(qs.parse(urlStr.query)); //get请求
            //res.end();

             if( req.method.toUpperCase() == 'POST' ){ //post请求
                var str = '';
                req.on('data',function( chunk ){
                    str += chunk;
                });
                req.on('end',function(){
                    console.log(qs.parse(str));
                });

            }

            break;

        default:
            //其他情况
            res.writeHead(404,{
                'content-type': 'text/html;charset=utf-8'
            });
            res.end('您请求的文件不存在');
            break;
    }
});

function sendData( file,req,res ){
    fs.readFile(file,function( err,data ){
        if( err ){
            res.writeHead(404,{
                'content-type': 'text/html;charset=utf-8'
            });
            res.end('<h1>当前页面找不到');
        } else {
            res.writeHead(200,{
                'content-type': 'text/html;charset=utf-8'
            });
            res.end(data);
        }
    });
}

server.listen(8080,'localhost');

