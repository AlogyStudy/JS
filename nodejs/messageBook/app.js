
var express = require('express');
var db = require('./models/db.js');
var formidable = require('formidable');


var app = express();

// 设置模板引擎
app.set('view engine','ejs');

// 静态化文件
app.use(express.static('./public'));

// 显示留言列表
app.get('/', function ( req,res,next ) {
	
	res.render('index');
	
});


// 处理留言
app.post('/tijiao', function ( req,res,next ) {
	
	var form = new formidable.IncomingForm();
	
	form.parse(req, function ( err, fields ) {
		
		db.insertOne('liuyanben', {
			
			'xingming': fields.xingming,
			'liuyan': fields.liuyan,
			'shijian': new Date()
			
		}, function ( err, reslut ) {
			
			if ( err ) {
				
				res.json('-1'); // -1 charu shibai
				
				return ;
				
			}
			
			res.json('1'); // 1 charu chenggong
			
		});
		
	});
	
});


app.get('/du', function ( req, res, next ) {
	
	var pageSize = 4;
	var page = parseInt( req.query.page );
	
	db.find('liuyanben', {}, {"sort": {"shijian": -1}, 'pageamount': pageSize, 'page': page}, function ( err, reslut ) {
		
		if ( err ) {
			
			res.json('-1');
			
		}
		
		// 获取总条数
		db.getAllCount('liuyanben', function ( num ) {
			
			res.json({'pageNum': num ,"reslut": reslut});
			
		});
		
	});
	
	
	
});

app.listen(80);

console.log('启动成功');
