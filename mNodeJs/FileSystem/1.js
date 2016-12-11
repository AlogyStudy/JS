/**
 * Created by Administrator on 2016/3/30.
 */


// fs 模块
var fs = require('fs');

/**
 *  fs.open(path, flags[, mode], callback)
 *  path : 打开文件的路径
 *  flags : 打开文件方式   读/写
 *  mode :  设置文件的模式  读/写/执行   4/2/1  0777  所属用户，所属主   默认是 0666  windos下无效果
 *  callback : 回调
 *      err : 文件打开失败错误的信息保存在err ， 如果成功 err 为null.
 *      fd (文件标识): 被打开文件的标识  -- 有点和定时器 类似，执行成功， 返回定时器编号.
 */

fs.open('1.txt','r',function( err,fd ){
    //console.log( err );
    //console.log( fd );
    if( err ){
        console.log('文件载入出错');
    } else {
        console.log('文件打开ok');
        console.log(fd);
    }

});



fs.open('1.txt','r',function( err,fd ){
    console.log( fd );
});
