/**
 * Created by Administrator on 2016/3/30.
 */

/**
 * 类方法， 静态方法
 */

//console.log( Buffer.isEncoding('utf-8') );
//console.log( Buffer.isEncoding('gbk') );

/*

var str1 = 'daidai';

console.log( str1.length );
console.log( Buffer.byteLength(str1) );  //主要出现在非单字节 ， 例如中文

var str2 = 'dadi';
var str3 = '大呆';

var list = [ new Buffer(str2), new Buffer(str3) ];
console.log( list );

var bf = Buffer.concat(list,10);
console.log( bf );
*/

process.stdout.write('请输入内容');

process.stdin.resume();

process.stdin.on('data',function( chunk ){
    //console.log( chunk.toString() );

    console.log( '输入的内容是：' + chunk  );

});


