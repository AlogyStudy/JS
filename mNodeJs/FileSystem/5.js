/**
 * Created by Administrator on 2016/3/30.
 */


var fs = require('fs');

var filename = '2.txt';

/*
/!**
 * fs.writeFile(filename, data[, options], callback)
 *!/

var fs = require('fs');




/!**
 *  向一个指定的文件中写入数据，如果该文件不存在则新建，如果存在则新的内容会覆盖，原有的文件内容。
 *!/
/!*

fs.writeFile(filename,'hello1',function( err ){

    if(err) throw err;

    console.log( arguments );

});

/!**
 *  fs.appendFile(filename, data[, options], callback)
 *!/
fs.appendFile(filename,'--daidai',function(){

    console.log(arguments);

});
*!/

//判断当前文件是否存在， 不存在的的话，使用writeFile()， 存在的话，使用appendFile()

//如何判断一个文件是否存在

fs.exists(filename,function( isExists ){
    //console.log( isExists );
    if( !isExists ){
        fs.writeFile(filename,'1234',function( err ){
            if( err ){
                console.log('出错');
            } else {
                console.log('创建新文件成功');
            }
        });
    } else {
        fs.appendFile(filename,'--aaabcddd',function( err ){
            if( err ){
                console.log('新的内容追加失败');
            } else {
                console.log('新的内容追加成功');
            }
        })
    }

});


*/


if( !fs.existsSync(filename) ){
    //文件存在
    fs.writeFileSync(filename,'daidai')
    console.log('新文件创建成功');

} else {
    //文件不存在
    fs.appendFileSync(filename,'-dadai')
    console.log('新内容追加成功');

}


//

