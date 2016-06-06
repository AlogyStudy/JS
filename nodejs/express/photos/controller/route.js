
var path = require('path');
var url = require('url');

//album 模型
var album = require(__dirname+'/../models/album.js');


/**
 * 设置默认状态200,
 * @param req
 * @param res
 * @param next
 */
exports.init = function( req,res,next ){

	res.status(200);
	res.set('Content-Type','text/html;charset=utf8');

	next();

};

/**
 * 首页
 * @param req
 * @param res
 */
exports.showIndex = function( req,res ){

	album.readFileAlbumsName(function(err, dirname ){

		if( err ){
			res.send('服务器错误');
			return ;
		}

		res.render("index.ejs",{
			'albums': dirname
		});

	});

};

/**
 * 显示相册内容页
 * @param req
 * @param res
 */
exports.showAblums = function( req,res ){

	if(/[\!\@\#\$\%\^\&\*\(\)\_\<\>]/g.test(req.params.name)){
		res.send('非法符号');
		return ;
	}

	album.getAllImage( req.params.name ,function( err,jieguo ){

		if( err ) {

			if( err == 1 ){

				res.send('相册不存在！');

				return ;

			}

			res.send('错误');

			return ;
		}

		res.render('albums.ejs',{
			'albumName': req.params.name,
			'imagesUrl': jieguo
		});

	} );

};

/**
 * 显示上传路由
 * @param req
 * @param res
 */

exports.showUpload = function( req,res ){

	album.readFileAlbumsName(function(err, dirname ){

		if( err ){
			res.send('服务器错误');
			return ;
		}

		res.render("upload.ejs",{
			'albums': dirname
		});

	});

};

/**
 * 文件上传
 * @param req
 * @param res
 */
exports.dopost = function( req,res ){

	album.uploadPic(req,function( err ){

		if( err ) {

			res.send('上传失败');

		} else {

			res.send('上传成功');

		}

	});


};


/**
 * 管理相册
 * @param req
 * @param res
 */
exports.showAdmin = function( req,res ){

	res.render('admin.ejs');

};

/**
 * 创建相册
 * @param req
 * @param res
 */
exports.createAlbum = function( req,res ){

	//创建相册名字
	// res.json({'state': 'ok'});

	var queryStr = url.parse( req.url,true ).query.wenjianjiamingziVal;

	if ( /[\!\#\$\%\^\&\<\>]/g.test( queryStr ) ) {

		res.send('非法字符');

		return ;

	}

	//创建相册
	album.createAlbum(queryStr,function( code ){

		res.json({ 'state': code });

	});

};

/**
 * 404
 * @param req
 * @param res
 */
exports.show404 = function( req,res ){

	res.status(404);
	res.send('没有这个页面');

};

