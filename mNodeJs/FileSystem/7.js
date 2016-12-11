/**
 * Created by Administrator on 2016/3/30.
 */


var fs = require('fs');

var filename = '2.new.txt';

fs.watch(filename,function( ev,_fileName ){

     console.log( ev );
     console.log( _fileName );

    if( _fileName ){
        console.log( _fileName + '发生了改变' );
    } else {
        console.log('...');
    }

});

