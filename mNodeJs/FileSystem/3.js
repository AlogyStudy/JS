/**
 * Created by Administrator on 2016/3/30.
 */

var fs = require('fs');

fs.open('1.txt','r',function( err,fd ){

    if( err ){
        console.log( '文件打开失败' );
    } else {
        //读取文件
        /**
         *  fs.read(fd, buffer, offset, length, position, callback)
         *      fd: 通过open 成功打开一个文件返回的编号.
         *      buffer: buffer 对象
         *      offset: 新的内容添加到buffer中的起始位置
         *      length : 添加到buffer中内容的长度
         *      position: 读取的文件中的起始位置
         *      callback:  回调
         *          err
         *          bufferLength
         *          buffer
         *
         */
        var bf1 = new Buffer('12345678');

        console.log(bf1);

        fs.read(fd,bf1,0,4,null,function( err,newBfLength,newBf ){
            console.log( bf1 );
            console.log( newBfLength );
            console.log( newBf );
        });

    }

});
