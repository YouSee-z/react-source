import React from './react';
import ReactDOM from './react-dom';

//函数式组件？他就是一个函数

//特点;
//1 函数组件的名称首字母大写   react原生组件  div  span   自定组件 大写
//2 函数式组件的返回值 => 一个react元素 =》 jsx
//3 jsx 是一个父子结构
//4 还有个属性props


//
let el = <h1>hello </h1>   //children :hello  => {}
console.log(el)
//定义函数式组件
function  FuncionComponent(props){
    // return <h1>hello {props.name}</h1>
    return React.createElement('h1',{style:{color:'red'}},66)
}
//函数式组件使用
let element = <FuncionComponent name="100"></FuncionComponent>

//babel => React.createElement(fn,{},100)
let element2 = React.createElement(FuncionComponent, {
    name: "100"
  });
console.log(element)
ReactDOM.render( element2,document.getElementById('root'))