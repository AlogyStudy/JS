

var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/student';

MongoClient.connect(url,function( err,db ){

	if( err ) {

		console.log('数据库连接失败');

		return false;

	}

	console.log('数据库连接成功');

	//游标
	var cousor = db.collection('class1').find({});

	//遍历游标
	cousor.each(function( err,doc ){

		if ( doc != null ) {

			console.dir( doc );

		}

	});

	db.close();

});
