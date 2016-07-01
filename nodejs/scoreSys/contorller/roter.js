
var url = require('url');

var db = require('../models/db.js');


exports.doadd = function ( req,res,next ) {
	
	//得到用户表单信息
	var queryObj = url.parse(req.url,true).query;
	
	//学号不能够冲突
	db.findAll('banji', {'xuehao': queryObj.xuehao}, {}, function ( err,reslut ) {
		
		if ( err ) {
			
			res.json({'jieguo': '-1'}); //服务器错误
			
			return ;
			
		}
		
		if ( reslut.length > 0 ) {  //判断是否学号冲突 , 如果reslut 为空 就判断  为  没有冲突
			
			res.json({"jieguo": -2}); //-2 	学号冲突
			
			return ;
			
		}
		
		
		// 插入数据
		db.inserOne('banji', queryObj, function ( err, reslut ) {
			
			if ( err ) {
				
				res.json({"jieguo": -1});  //
				
				return ;
	
			}
			
			res.json({"jieguo": 1}); //1  插入成功
			
		});
		
	});
	
	
}



exports.showAll = function ( req,res,next ) {
	
	db.findAll('banji', {}, {'xuehao': -1}, function ( err,reslut ) {
		
		//返回
		res.json({"errno": 0, "reslut": reslut});
		
	});
	
}
