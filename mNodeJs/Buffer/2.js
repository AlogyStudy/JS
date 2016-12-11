/**
 * Created by Administrator on 2016/3/30.
 */


/**
 * buf.write(要写入的字符串,从Buffer对象中的几位开始写入,写入字符串的长度,字符字符串的编码);
 */


var str = 'daidai';

console.log( new Buffer(str) );

var bf = new Buffer(5);

//bf.write( str ); //
//console.log( bf );
bf.write( str,1 );
console.log( bf );
