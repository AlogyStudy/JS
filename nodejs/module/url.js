/**
 * Created by Administrator on 2016/6/2.
 */

var url = require('url');

// console.log( url.parse('http://localhost:8080/a/b/c/1.html?name=ting&age=21') );


// console.log( url.format( url.parse('http://localhost:8080/a/b/c/1.html?name=ting&age=21') ));
console.log( url.resolve('/one/two/three', 'four') );