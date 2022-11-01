import React from './react';
import ReactDOM from './react-dom';
//实现函数式组件的ref
function TextInput(props, ref) {
    return <input ref={ref}></input>
}
const ForWardTextInput = React.forwardRef(TextInput)  //forwardRef 组件 函数式包装
//  console.log(ForWardTextInput) //
console.log(<ForWardTextInput></ForWardTextInput>)
class From extends React.Component {

    constructor(props) {
        super(props)
        this.classF = React.createRef() //注意 {current：类的实例} //
    }
    getFocus = () => {
        this.classF.current.focus()
    }
    render() {
        return <div>
            <ForWardTextInput ref={this.classF}></ForWardTextInput>
            <button onClick={this.getFocus}>获取焦点</button>
        </div>
    }
}



ReactDOM.render(<From></From>, document.getElementById('root'))