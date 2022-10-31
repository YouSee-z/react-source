  import  React from './react'
  import ReactDOM from './react-dom'

  //实现 class 组件
  //定义一个class 组件
  class ClassComponent extends React.Component{
       constructor(props){
          super(props)  //执行父类的构造函数 
        // 定义属性
       }

    render(){
        return <h1>hello {this.props.name}</h1> //react  =》webpack babel
    }
  }

  //使用
  let element = <ClassComponent name="1"></ClassComponent> // babel=> js React.createElement(ClassComponent)
   console.log(element)
  ReactDOM.render(element,document.getElementById('root'))
 