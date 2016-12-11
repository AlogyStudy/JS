/**
 * Created by Administrator on 2016/3/25.
 */


   /*
   *  在一个模块中，通过var  定义的变量，其作用域范围是当前模块，外部模块不能够直接的访问。
   *  如果需要一个模块能够访问另一个模块中定义的变量，可以：把一个模块看作一个函数。
   *    1. 把变量作为global对象的一个属性。  但是这样的做法，是不推荐的。(尽量减少全局变量的定义)
   *    2. 使用一个模块对象 module (模块的对象也是局部的而不是全局的)
   *
   * */


//var a = 100;

//global.a = 100;

/**
 *  module : 保存提供和当前模块有关的信息
 *  在module 对象下 ， 有一个子对象， exports 对象
 *  可以通过这个对象把一个模块中的局部变量 对象进行提供访问。
 *
 *
 */

//console.log( module );

var a = 100;
//module.exports.a = a;
exports.a = a;

/***
 *  在模块作用域下，还有一个内置的模块对象， exports , 它其实就是 module.exports。 引用是一样的。
 */

//console.log( module.exports === exports );  //true


