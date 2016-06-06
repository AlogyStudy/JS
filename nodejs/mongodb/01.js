

//mongo db 驱动
var MongoClient = require('mongodb').MongoClient;

//数据库的链接地址
var url = 'mongodb://localhost:27017/student';

//建立连接
MongoClient.connect(url,function( err,db ){

	if( err ){

		console.log('数据库连接失败');

		return ;

	}

	db.collection('class1').insertOne({'name': 'mm','age': 23},function ( err,result ) {

		if ( err ) {

			console.log('数据插入失败');

			return false;

		}

		console.log('数据插入成功',result);

		db.close();

	});

	console.log('数据库成功连接');

});

