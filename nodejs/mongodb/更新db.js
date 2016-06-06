
var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/student';


MongoClient.connect(url,function( err,db ){


	if ( err ) {

		console.log('失败');

		return false;

	}

	console.log('ok');


	db.collection('class1').updateOne({'name': 'mlln'},{$set: {'age': 25} },function( err,result ){

		console.log('更改成功');

	});

});