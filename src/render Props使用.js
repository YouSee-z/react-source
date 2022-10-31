import React from 'react'
import ReactDOM from 'react-dom'

//render props 来实现
class Mouse extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            x: 0,
            y: 0
        }
    }
    handlerMove = (event) => {
        this.setState({
            x: event.clientX,
            y: event.clientY,
        })
    }
    render() {
        return (
            <div onMouseMove={this.handlerMove}>
                {/* <h1>获取始标的坐标</h1>
                <p>
                    当前的位置：{this.state.x} :{this.state.y}
                </p> */}
                {this.props.render(this.state)}
            </div>
        )
    }
}

// //定义一个组件
// //render props 来实现
// //* 根据当前的业务 * 
// class Father extends React.Component {
//     render() {
//         return (
//             <div>
//                 <Mouse render={
//                     (props) => (
//                         <div>
//                             <h1>获取始标的坐标</h1>
//                             <p>
//                                 当前的位置：{props.x} :{props.y}
//                             </p>
//                         </div>
//                     )
//                 }></Mouse>
//             </div>
//         )
//     }
// }

//使用高阶组件=》实现

function WithMouse(OldComponent) {
    return class extends React.Component {
        //公用的属性和方法
        constructor(props) {
            super(props)
            this.state = {
                x: 0,
                y: 0
            }
        }
        handlerMove = (event) => {
            this.setState({
                x: event.clientX,
                y: event.clientY,
            })
        }
        render() {
            return (
                <div onMouseMove={this.handlerMove}>
                    <OldComponent {...this.state}></OldComponent>
                </div>
            )
        }
    }
}

//使用这个高阶组件

function Show(props) {
    return (
        <div>
            <h1>获取始标的坐标</h1>
            <p>
                当前的位置：{props.x} :{props.y}
            </p>
        </div>
    )
}

let Father = WithMouse(Show)


ReactDOM.render(<Father></Father>, document.getElementById('root'))