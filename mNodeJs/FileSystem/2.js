/**
 * Created by Administrator on 2016/3/30.
 */

var fs = require('fs');
/*

fs.open('1.txt','r',function( err,fd ){
    console.log( err );
});  // open() 不影响后续的代码执行.

console.log( 'ok' );


*/

var fd = fs.openSync('1.txt','r');

console.log( fd );

