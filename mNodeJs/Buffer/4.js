/**
 * Created by Administrator on 2016/3/30.
 */

var bf = new Buffer('daidai');

//console.log( bf );

//var bf2 = bf.slice();

//console.log( bf2 );

/*
var bf3 =  bf.slice(2);

console.log(bf3);
bf3[0] = 2;
console.log( bf3 );
console.log( bf );
*/

var bf4 = new Buffer(10);

bf.copy(bf4);
console.log( bf4 );

bf4[0] = 2;
console.log(bf4);
console.log( bf );