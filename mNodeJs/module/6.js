/**
 * Created by Administrator on 2016/3/25.
 */

/**
 *  __filename : 返回当前模块文件的解析后绝对路径，该属性并非全局，而是模块作用域下的。 (在模块下才能使用)
 *  __dirname : 返回的是当前模块文件所在目录解析后的 绝对路径。 该属性也不是全局的，而是模块作用域下的。
 */

//console.log( __filename );
//console.log( __dirname );


//console.log( global );

//var d = new  Date();
//var arr = new Array(1,2,3);


setInterval(function(){
    var d = new Date();
    console.log( '现在是:' + d.getFullYear() + '年' + d.getMonth()+1 + '月' + 　d.getDate() + '日'
        + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() );
},1000);


