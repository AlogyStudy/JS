/**
 * Created by Administrator on 2016/4/3.
 */


/**
 * 搭建一个 HTTP的服务器， 用于处理用户发送的http请求。
 * 需要使用node提供的一个模块  http 模块。
 *
 */

//加载一个http模块
var http = require('http');

//通过http模块下的createServer 创建并返回一个web服务器对象。
var server = http.createServer();

server.on('error',function( err ){
    console.log(err);
});

server.on('listening',function(){
    console.log( 'listening...' );
});

server.listen(8080,'localhost','');

//console.log( server.address() );

server.on('request',function( req,res ){
    console.log('有客户端请求了');
    //console.log(arguments);

    //console.log( req );
    res.setHeader('daidai','daie');

    res.writeHead(200,{
        //'content-type': 'text/plain'
        'content-type': 'text/html;charset=utf-8',

    });

    //res.write('hello');
    res.write('<h1>hello</h1>');

    res.end();

});



