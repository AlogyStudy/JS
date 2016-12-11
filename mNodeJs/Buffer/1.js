/**
 * Created by Administrator on 2016/3/27.
 */

/**
 * Buffer 类
 * 用于操作二进制数据流
 */

//new Buffer(size); size [Number] 创建一个Buffer对象，并为这个对象分配一个大小。
//当我们为Buffer对象分配空间大小以后，其长度是固定的，不能更改。

//var bf = new Buffer(5);

//console.log( bf );

//new Buffer(array)
/*
var bf = new Buffer([1,2,3]);
console.log( bf );
bf[10] = 12;

console.log( bf );
*/

//new Buffer(string,[encoding]);
/*

var bf = new Buffer('daidai','utf-8');
console.log( bf );

for( var i=0; i<bf.length; i++ ){
    //console.log( bf[i].toString(16) );
    console.log( String.fromCharCode(bf[i]) );
}*/

//Buffer 中的length 指的是字节 长度
var str1 = 'daidai';
var bf1 = new Buffer(str1);

console.log( str1.length );
console.log( bf1.length );

var str2 = '呆呆';
var bf2 = new Buffer( str2 );
console.log( str2.length );
console.log( bf2.length );
