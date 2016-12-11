/**
 * Created by Administrator on 2016/3/30.
 */

var bf = new Buffer('daidai');

console.log( bf.toString() );

console.log( bf.toString('utf-8',1) );


var bf2 = new Buffer('呆呆');  //注意中文截取的 方式
console.log( bf2 );
console.log( bf2.toString('utf-8',1) );


console.log( bf.toJSON() );