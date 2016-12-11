/**
 * Created by Administrator on 2016/3/24.
 */

/*
var a = 10;

console.log( a );


global.a = 200;

console.log( a );
console.log( global.a );
*/

//__filename : 当前文件被解析后的绝对路径

//console.log( __filename );

/**
 * 模块加载系统
 * requrie('模块');
 */

//require('./2.js');


/***
 * 模块加载机制：
 *  路径
 *      相对路径
 *      绝对路径
 */
//require('e:/wamp/www/miao/module/2.js');

require('./2.js');

//require('2.js'); // 这种 前面没有 ./  是加载node中的核心模块 或者是 node_modules  模块

/**
 * 模块加载的标准
 * 1.首先按照加载的模块名称进行查找
 * 2.如果没有找到，则会在模块文件名后加上.js 的 后缀 , 进行查找。
 * 3.如果还是没有找到，则会在文件名称后加上.json 的后缀，进行查找。
 * 4.如果还是没有，则会在文件名称后加上.node 的后缀，进行查找
 * 文件名称 -> .js -> .josn -> .node
 */
//requrie('./2');  // 是一 2 的文件查找

require('./3');

