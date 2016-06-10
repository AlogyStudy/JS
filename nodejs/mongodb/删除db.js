
var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/student';


MongoClient.connect(url,function( err,db ){

	if ( err ) {

		console.log(-1);

		return false;

	}

	console.log(1);

	db.collection('class1').deleteMany({'age': 25},function( err,reslut ){

		console.log('ok');

	});

});

