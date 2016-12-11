/**
 * Created by Administrator on 2016/3/27.
 */

/**
 *  process : 它是一个全局对象 , 返回的是对这个进程有关的信息。
 */
//console.log( process );

/*
console.log( process.argv );

process.argv.forEach(function( i,val ){
    console.log( i + ':' + val );
});
*/
//console.log( process.execPath );

//console.log( process.env );
//console.log( process.version );
//console.log( process.pid );

//console.log( process.title );
//console.log( process.arch );

//console.log( process.chdir() );
//console.log( process.memoryUsage() )
//
//process.stdout.write('hello');
/*

function Log( data ){
    process.stdout.write(data);
}
Log( 'aa' );
*/
/*

//默认情况下，输入流是关闭的，要监听处理输入流数据，首先要开启输入流。
process.stdin.resume();

//用于监听用户的 输入数据
process.stdin.on('data',function( chunk ){
    console.log('用户输入了:' + chunk );
});

*/

var a;
var b;

process.stdout.write('请输入a的值：');
process.stdin.on('data',function( chunk ){
    if( !a ){
        a = Number(chunk);
        process.stdout.write('请输入b的值：');
    } else {
        b = Number(chunk);

        process.stdout.write( '结果是:'+ ( a + b)  );
    }
});

