import React from './react';
import ReactDOM from './react-dom';
 //jsx
  let element = <h1 className="title" style={{color:'red'}} key="1">hello</h1>
  // babel=>js方法 React.createElement() =>vnode
  //实现jsx
 let element2 = React.createElement("h1", {
    className: "title",
    style: {
      color: 'red'
    }
  },666,React.createElement('span',{style:{color:'red'}},600));
  //  console.log( element2,111)

 //把vnode=>真实dom 放到指定的位置
ReactDOM.render(
  element2,
  document.getElementById('root')
);


