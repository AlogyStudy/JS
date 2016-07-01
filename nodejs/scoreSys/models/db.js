

//mongodb 驱动 
var MongoClient = require('mongodb').MongoClient;

//数据库连接地址
var dataUrl = 'mongodb://localhost:27017/score';

var ObjectId = require('mongodb').ObjectID;


//插入数据库
exports.inserOne = function ( collection,data, cb ) {
	
	MongoClient.connect(dataUrl, function ( err,db ) {
		
		if ( err ) {
			
			console.log('数据库连接失败');
			
			db.close();
			return ;
			
		}
		
		console.log('数据库连接成功');
		
		//执行插入
		db.collection(collection).insertOne(data, function ( err, relust ) {
			
			cb(err, relust);
			
			db.close();
			
		});
		
	});
	
}

//检索数据
exports.findAll = function ( collection, tiaojian, paixu, cb ) {
	
	MongoClient.connect(dataUrl, function ( err,db ) {
		
		if ( err ) {
			
			console.log('数据库连接失败');
			
			cb(err,null);
			
			db.close();
			
			return ;
			
		}
		
		console.log('数据库连接成功');
		
		//查询数据库返回 一个游标
		var cursor = db.collection(collection).find(tiaojian).sort(paixu);
		
		var reslut = [];
		
		//游标遍历
		cursor.each(function ( err,doc ) {
			
			if ( doc != null ) {
				
				reslut.push(doc);
				
			} else {
				
				
				cb(null,reslut);  //返回 数据， 可以使用  参数返回 .
				
				db.close();
				
			}
			
		});
		
	});
	
}
