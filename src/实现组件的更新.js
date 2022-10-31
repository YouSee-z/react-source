import  React from './react'
import ReactDOM from './react-dom'

// 实现组件的更新
//组件数据来源：  （1）一个是父组件属性 （2）内部定义的
// 更新数据，更新state 状态 ，只有唯一的方法   setState()
//
class ClassComponent extends React.Component{
     constructor(props){
        super(props)  //执行父类的构造函数 
        this.state = {num:0,id:1} //vue data
      // 定义属性
     }
  //接受的方法
  handleClick  =()=>{  //宏任务
      this.setState({num:this.state.num+1})  //
      // this.setState({num:this.state.num+1}) 
      // this.setState({num:this.state.num+1}) 
  }
  render(){
      return <div>
          <h1>{this.state.num}</h1>
          {/* 事件 */}
          <button onClick={this.handleClick}>+</button>
      </div>
  }
}

//使用
let element = <ClassComponent name="1"></ClassComponent> // babel=> js React.createElement(ClassComponent)
 console.log(element)
ReactDOM.render(element,document.getElementById('root'))
