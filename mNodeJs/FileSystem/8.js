/**
 * Created by Administrator on 2016/3/30.
 */

var fs = require('fs');

/**
 *  fs.mkdir(path[, mode], callback);
 *
 */

/*

fs.mkdir('./1',function( err ){

    console.log( arguments );

});
*/

/*
fs.rmdir('./1',function(){
    console.log( arguments );
});
*/

fs.readdir('./',function( err,fileList ){

    //console.log( arguments );
    fileList.forEach(function( f ){

        //console.log(fs.statSync(f));
        fs.stat(f,function( err,info ){
            //console.log( arguments );
            //console.log( info.mode );

            switch ( info.mode ){
                case 16822:
                    console.log('[文件夹]'+ f );
                break;
                case 33206:
                    console.log('[文件]'+f);
                break;
                default:
                    console.log('[其它类型]'+f);
                break;
            }
        });

    });

});

