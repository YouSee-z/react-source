import React from './react';
import ReactDOM from './react-dom';


//使用原生组件的ref  div

class Sum extends React.Component{
   constructor(props){
       super(props)
       this.a = React.createRef()//{current:null}
       this.b = React.createRef()//{current:真实dom}
       this.result = React.createRef()
   }

    addSum =()=>{
        console.log( this.a )
        let a = this.a.current.value
        let b = this.b.current.value
        this.result.current.value = a+b
    }
    render(){
        return <div>
            <input ref={this.a}></input> 
            +
            <input ref={this.b}></input>
            <button onClick={this.addSum}>求和</button>
            <input ref={this.result}></input>
        </div>
    }
}
let element = <Sum></Sum>

ReactDOM.render(element,document.getElementById('root'))

