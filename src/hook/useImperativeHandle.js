import React from './react';
import ReactDOM from './react-dom';


//useImperativeHandle:作用将子组件中的操作dom的某个方法暴露给父组件
function Child(props,forWard){
   //操作获取真实dom 的一个方法  获取焦点
   let inputRef = React.useRef() //操作元素的dom

   React.useImperativeHandle(forWard,()=>({
       //暴露的那一个方法
       focus(){
        inputRef.current.focus()
       }
   }))
    return(
        <input ref={inputRef}></input>
    )
}
let ForwChil = React.forwardRef(Child)
function App() {
   
    let inputRef = React.useRef() // =>{current={}}

    let getfocus = ()=>{
        inputRef.current.focus() //  inputRef =>input 真实dom
        // inputRef.current.remove()
    }
    return (
        <div >
            <ForwChil ref={inputRef}></ForwChil>
           <button onClick={getfocus}>获取焦点</button>

        </div>
    )
}



ReactDOM.render(<App></App>, document.getElementById('root'))
