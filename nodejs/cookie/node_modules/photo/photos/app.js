
var express = require('express');

var route = require('./controller/route.js');

//载入app对象
var app = express();


//设置模板引擎
app.set('view engine','ejs');

//静态资源
app.use( express.static('statics') );
app.use( express.static('albums') );


//设置默认的中间件
app.use(route.init);

//首页
app.get('/',route.showIndex);

//相册内容页
app.get('/albums/:name',route.showAblums);

//文件上传 显示view
app.get('/upload',route.showUpload);

//文件上传
app.post('/dopost',route.dopost);

//管理相册
app.get('/admin',route.showAdmin);

//创建相册
app.get('/admin/create',route.createAlbum);


//404
app.use(route.show404);

//监听端口
app.listen(1221);

