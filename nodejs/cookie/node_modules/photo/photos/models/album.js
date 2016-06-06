//文件模型

var fs = require('fs');

//formidable
var formidable = require('formidable');


/**
 * 读取所有文件夹名字
 * @param callback  callback -- 参数err ,dirname
 */
exports.readFileAlbumsName = function( callback ){

	var reslut = [];
	fs.readdir('./albums',function( err,dongxi ){

		/*for( let i=0; i<dongxi.length; ++i ){

			fs.stat('./albums/'+dongxi[i],function( err,stats ){
				// 16822
				// 33206
				if( stats.mode == 16822 ){
					console.log(i);
					reslut.push( dongxi[i] );
					console.log( reslut )
				}

			});

		}*/

		// 递归
		(function iterator(i){

			//递归出口
			if( i>dongxi.length-1 ){
				//调用回调函数
				callback(err,reslut);
				return ;
			}

			fs.stat('./albums/'+dongxi[i],function( err,stats ){

				if ( stats.mode == 16822 ){

					reslut.push( dongxi[i] );

				}

				//递归点
				iterator(i+1);

			});

		})(0);

	});



};


/**
 * 获取文件夹
 * @param dirname
 * @param callback
 */
exports.getAllImage = function( dirname,callback ){

	//验证文件夹是否存在
	fs.exists('./albums/'+dirname,function( exists ){

		if(!exists){

			callback(1,null);

			return false;
		}

		//所有文件
		var reslut = [];

		fs.readdir('./albums/'+dirname,function( err,dongxi ){

			// 递归
			(function iterator(i){

				//递归出口
				if( i>dongxi.length-1 ){
					//调用回调函数
					callback(err,reslut);
					return ;
				}

				fs.stat('./albums/'+ dirname +'/' + dongxi[i],function( err,stats ){

					//33206 文件夹
					if ( stats.mode == 33206 ){

						reslut.push( '/'+ dirname + '/' + dongxi[i] );

					}

					//递归点
					iterator(i+1);

				});

			})(0);

		});


	});



};


/**
 * 文件上传
 * @param req
 * @param callback
 */
exports.uploadPic = function( req,callback ){

	var form = new formidable.IncomingForm();

	form.uploadDir = './uu';

	form.parse(req,function( err,fields,files ){

		//files 是上传文件信息
		fs.rename(files.tupian.path,'./albums/'+ fields.wenjianjia + '/' + Math.random() + '.jpg',function( err ){

			if( err ) {

				// res.end('err');
				callback(err);
				return false;

			}

		});

		// res.send('ok');
		callback(null);

	});

};

/**
 * 创建相册
 * @param queryStr
 * @param callback
 */
exports.createAlbum = function( queryStr,callback ){

	//文件夹是否存在
	fs.exists('./albums/'+ queryStr,function( exists ){

		if( exists ) {

			callback(1,null);

			return false ;

		}

		//创建文件夹
		fs.mkdir('./albums/'+ queryStr,function( err ){

			if( err ) {

				callback(2,null);

				return false;

			}

			callback(3,null);

		});

	})

};