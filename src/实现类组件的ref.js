import React from './react';
import ReactDOM from './react-dom';
//类组件获取ref =》是这个类组件的实例
class TextInput extends React.Component{
      constructor(props){
          super(props)
          this.input = React.createRef() //{current：input真实dom}
      }
    getFocus =()=>{
      this.input.current.focus()
    }
    render(){
         return <input ref={this.input}></input>
    }
}
 
class From extends React.Component{

    constructor(props){
        super(props)
        this.classF = React.createRef() //注意 {current：类的实例} //
    }
    getFocus =()=>{
        this.classF.current.getFocus()
    }
    render(){
        return <div>
            <TextInput ref={this.classF}></TextInput>
            <button onClick={this.getFocus}>获取焦点</button>
        </div>
    }
}



ReactDOM.render(<From></From>,document.getElementById('root'))