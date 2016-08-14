
var fs = require('fs');

var request = require('request');
var cheerio = require('cheerio');

//var url = 'http://zzk.cnblogs.com/s?t=b&w='+ key +'&p='+ page;

var iurl = 'http://image.so.com/zj?ch=food&sn=30';

request({uri: iurl}, function( err, res, body ) {
	
//	console.log( res.statusCode ); // 200
	
//	console.log( body );  // body 抓取 数据
	
	// 错误处理
	if ( err && res.statusCode !== 200 ) {
		
		console.log('报错');
		
		return ;
		
	}
	
	// 路径
	var filePath = __dirname + '/data/file.json';
	
	if ( fs.exists(filePath) ) {
		
		fs.unlinkSync(filePath);
		
		console.log('Del file' + filePath);
		
	}
	
	fs.writeFile(filePath, body, 'utf-8', function ( err ) {
		
		if ( err ) {
			
			console.log('读取失败');
			
			return ;
			
		}
		
		console.log('保存成功 ' + filePath);
		
	});
	
  console.log('ok~');
	
});

console.log('启动成功');