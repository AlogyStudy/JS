/**
 * Created by Administrator on 2016/6/1.
 */


var http = require('http');
var url = require('url');
var crypto = require('crypto');
var fs = require('fs');

var server = http.createServer(function( req,res ){

	var queryObj = url.parse( req.url,true ).query;

	var name = queryObj.name;
	var sex = queryObj.sex;


	res.end('name:'+ name+ '<br/>' + 'sex:'+ sex);

});




server.listen(1221,'127.0.0.1');

