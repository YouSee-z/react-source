import React from './react';
import ReactDOM from './react-dom';

//问题就是我们在工作会出现多次嵌套的形式 ,写的一个类组件返回的是一个函数组件，那么这个 真实dom 找不到
//做一下优化
class Three extends React.Component{
    render(){
        return <div>three:{this.props.num}</div>
    }
}

function Two(props){
    console.log(props)
    return <Three {...props}></Three>
}

class One extends React.Component{
    constructor(props){
        super(props)
        this.state = {num:1}

        setTimeout(() => {
        //   debugger
            this.setState({num:2})
        }, 1000);
    }
    render(){
         return <Two num={this.state.num}></Two>
    }
}

  ReactDOM.render(
      <One></One> ,
    document.getElementById('root')
  );