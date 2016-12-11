/**
 * Created by Administrator on 2016/3/30.
 */

var fs = require('fs');

fs.open('1.txt','r+',function( err,fd ){  // r 只读的方式 权限不够.

    /**
     *  //当我们要对打开的文件进行写操作的时候， fs.open(); 打开文件的模式是读写 方式.
     *
     * fs.write(fd, buffer, offset, length[, position], callback)
     *  fd : 打开的文件， 成功的句柄
     *  buffer : 写入的数据 ，把 buffer对象中的数据， 写入到被写入的文件中.
     *  offset : buffer对象中，要写入的数据的起始位置
     *  length : 要写入buffer数据的长度
     *  position : fd中的起始位置。
     *  callback : 回调
     */

    if( err ){
        console.log('打开文件失败');
    } else {
        var bf = new Buffer('123');

        /*fs.write(fd,bf,0,3,1,function( err,len,objBF ){
            console.log( arguments );
        });*/

        fs.write(fd,'1234',5,'utf-8',function(){});

        fs.close(fd,function(){});

    }

});


