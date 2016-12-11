/**
 * Created by Administrator on 2016/3/30.
 */


var fs = require('fs');

var filedir = './boyaa/source';

fs.watch(filedir,function( ev,file ){

    //console.log( ev + '/' + file );  //这里不需要判断file 是否有内容

    //只要有一个文件发生变化，就需要对这个文件夹下的所有文件进行读取，然后合并。

    fs.readdir(filedir,function( err,dataList ){
        var arr = []; // 用来保存是文件的

        dataList.forEach(function( f ){

           if( f ){
               var info = fs.statSync(filedir+'/'+f);
               if( info.mode == 33206 ){
                   arr.push(filedir+'/'+f);
               }
           }

        });

        //读取数组中的文件内容，并合并。
        var content = '';
        arr.forEach(function( f ){
            var c = fs.readFileSync(f);
            //console.log(c.toString() );
            content += c.toString() + '\n';

        });

        fs.writeFile('./boyaa/js/index.js',content);

    });

});