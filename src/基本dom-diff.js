import React from 'react'
import ReactDOM from 'react-dom'


// 子组件中的生命周期

class Counter extends React.Component{ //vue

    constructor(props){
        super(props)
        this.state={num:0}
        //组件初始化;设置我们的状态的和属性
        console.log('counter1.construotr(初始化)')
    }
    // 组件将要挂载
    componentWillMount(){
        console.log('counter2.componentWillMount(将要挂载)')
    }
    //组件挂载完成
    componentDidMount(){
        console.log('counter4.componentDidMount(组件挂载完成)')
        //获取ajax请求，=》this.setState()将数据放到我的状态中
    }
    handleClick =()=>{
        this.setState({num:this.state.num+1})
    }
    //实现组件更新
    shouldComponentUpdate(nextProps,nextState){ // 1父组件上定义的属性  2内部的数据 state
        console.log('counter5.shouldComponentUpdate(组件需要更新)')
        //注意必须要一个返回值 true 去更新组件（页面刷新）  false 不用更新组件
         console.log(nextState)
        return nextState.num%2==0//奇数不更新  偶数更新
    }
    //组件将要更新
    componentWillUpdate(nextProps,nextState){
        console.log('counter6.componentWillUpdate(组件将要更新)')
    }
    //组件更新完毕
    componentDidUpdate(){
        console.log('counter7.componentDidUpdate(组件更新完毕)')
    }
    render(){
        console.log('counter3.render(组件渲染)')
          return (
            <div>
             <p>{this.state.num}</p>
             {/* <ChildrenCounter count={this.state.num}></ChildrenCounter> */}
              {this.state.num==4?null:<ChildrenCounter count={this.state.num}></ChildrenCounter>}
             <button onClick={this.handleClick}>组件更新</button>
            </div>
          )
    }
}
//（1）创建一个子组件
class ChildrenCounter extends React.Component{
    //子组件的生命周期
    constructor(props){
        super(props)
        this.state = {id:10}
    }
    componentWillMount(){ //子组件即将加载
        console.log('ChildrenCounter1.componentWillMount(子组件将要挂载)')
    }
    componentDidMount(){
        console.log('ChildrenCounter3.componentDidMount(子组件挂载完毕)')
    }
    //子组件更新
     //就收的数据  只有组件更新才会调用
     componentWillReceiveProps(nextProps){
        //  console.log(nextProps) //用户的数据
          if(nextProps.count>2){
              console.log(6669)
              this.setState({id:20})
          }
         console.log('ChildrenCounter4.omponentWillReceiveProps(获取数据)')
     }
      //组件需要跟新
     shouldComponentUpdate(nextProps,nextState){ 
        console.log('ChildrenCounter5.shouldComponentUpdate(子组件需要更新吗)')
        console.log(nextProps.count,66669)
         return  nextProps.count%2==0
     }
     //组件将要卸载  将子组件变成表达式
      componentWillUnmount(){
        console.log('ChildrenCounter6.componentWillUnmount(子组件卸载)')
      }

    render(){
        console.log('ChildrenCounter2.render（子组件渲染）')
        return(<div>{this.props.count}</div>)
    }
}

ReactDOM.render(<Counter></Counter>,document.getElementById('root'))


/**
 * 1我们的ajax请求放在那个生命周期中获取数据？
 * componentDidUpdate
 * 如果我们的数据请求在组件挂载之前就完成，
 * 并且调用了setState函数将数据添加到组件状态中，
 * 对于未挂载的组件则会报错。
 * 而在 componentDidMount 函数中进行 AJAX 请求则能有效避免这个问题。
 * 
 * 
 * 
 */


 /** 第一渲染
  * counter1.construotr(初始化)
    counter2.componentWillMount(将要挂载)
    counter3.render(组件渲染)
    ChildrenCounter1.componentWillMount(子组件将要挂载)
    ChildrenCounter2.render（子组件渲染）
    ChildrenCounter3.componentDidMount(子组件挂载完毕)
    counter4.componentDidMount(组件挂载完成)
  * 
  * 
  * 第一次点击
  * counter5.shouldComponentUpdate(组件需要更新) 页面不更新，要这个数据为2才能跟新
  * 
  * 
  * 第二次点击
  * counter5.shouldComponentUpdate(组件需要更新)
    {num: 2}
    counter6.componentWillUpdate(组件将要更新)
    counter3.render(组件渲染)
    ChildrenCounter4.omponentWillReceiveProps(获取数据)
    ChildrenCounter5.shouldComponentUpdate(子组件需要更新吗)
    counter7.componentDidUpdate(组件更新完毕)
  * 
  *  */