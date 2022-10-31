// react 更新机制：this.setState =>组件更新
//vue2
// vue3



import React from './react'
import ReactDOM from './react-dom'

function FunctionC(props){
    console.log('fn render',props)
    return(
        <div>Fn:{props.count}</div>
    )
}

//memo =》检测组件上的属性是否又更新=》重新渲染子组件
let FunctionMemo = React.memo(FunctionC)
console.log(FunctionMemo)
class App extends React.Component{
     state = {num:0}
     inputRef = React.createRef()

     handlerClick =()=>{
         let nextState = this.state.num+parseInt(this.inputRef.current.value)
         this.setState({
             num:nextState
         })
     }
    render(){
        return(
            <div>
                <FunctionMemo count={this.state.num}></FunctionMemo>
                {/* <Counter count={this.state.num}></Counter> */}
                <input ref = {this.inputRef} defaultValue={1}></input>
                <button onClick={this.handlerClick}>+</button>
            </div>
        )
    }
}

//组件更新了 子组件才会调用 render
//React.PureComponent 纯组件 ：核心就是 ComponentShuldUpdate()
// props 和state有改变 =》更新 如果没有 不更新
// class Counter extends React.PureComponent{
//     render(){

//         console.log('render')
//         return(
//             <div>
//                Counter:{this.props.count} 
//             </div>
//         )
//     }
// }

ReactDOM.render(<App></App>,document.getElementById('root'))