

//mongo db 驱动
var MongoClient = require('mongodb').MongoClient;

//数据库的链接地址
var url = 'mongodb://localhsot:27017/student';

//建立连接
MongoClient.connect(url,function( err,db ){

	if( err ){

		console.log('数据库连接失败');

		return ;

	}
	
	console.log('数据库成功连接');

	db.close();

});

