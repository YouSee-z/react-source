import React from './react'
import ReactDOM from './react-dom'


// 子组件中的生命周期

class Counter extends React.Component{ //vue

    constructor(props){
        super(props)
        this.state={num:0}
        //组件初始化;设置我们的状态的和属性
        console.log('counter1.construotr(初始化)')
    }
   
    handleClick =()=>{
        this.setState({num:this.state.num+1})
    }
   


    render(){
        console.log('counter3.render(组件渲染)')
          return (
            <div>
             <p>{this.state.num}</p>
             {/* <ChildrenCounter count={this.state.num}></ChildrenCounter> */}
             <ChildrenCounter count={this.state.num}></ChildrenCounter>
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
        this.state = {id:10,num:props.count}
    }

    static getDerivedStateFromProps(nextPorps,nextState){

        //返回值就是state 并且合并state
         const {count}   = nextPorps
         if(count%2==0){
            return{
                num:count*2
            }
         }else{
            return{
                num:count*3
            }
         }
    }

    render(){
        console.log('ChildrenCounter2.render（子组件渲染）')
        return(<div>childrend:{this.state.num}{this.state.id}</div>)
    }
}

ReactDOM.render(<Counter></Counter>,document.getElementById('root'))


/**
   新的生命周期 = 》   getSnapshotBeforeUpdate  真正的dom更新获取到老的快照

   will


 * 
 * 
 * 
 */