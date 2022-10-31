//高阶组件

//写法：就是一个函数  这个函数参数是一个组件 放回值也是一个组件

//作用
//1：复用属性
//2：反向继承  =》第三放组件 =》添加属性，方法


import React from './react';
import ReactDOM from './react-dom';

//1：复用属性
// class Hello extends React.Component{


//     render(){
//         return(
//             <div>
//                 hello
//                 <button onClick={this.props.show}>显示</button>
//                 <button onClick={this.props.hids}>隐藏</button>
//             </div>
//         )
//     }
// }
// //定义高阶组件
// let HeightC = (OldComponent)=>{
//     return class extends React.Component{
//         render(){
//             let state ={
//                 show(){
//                     console.log('show')
//                 },
//                 hids(){
//                     console.log('hids')
//                 }
//             }
//             return(
//                 <OldComponent {...this.props}{...state}></OldComponent>
//             )
//         }
//     }
// }
// let NewHello = HeightC(Hello)

//反向继承=》引入的第三方组件  button  功能比较少 =.
class Button extends React.Component {
    state = {
        name: '悟空'
    }
    render() {
        return (
            <button name={this.state.name}>{this.props.title}</button>
        )
    }
}

//反向继承
const warrper = (OldComponent) => {
    return class extends OldComponent {
        state = {
            num: 0
        }
        handerClick =()=>{
            this.setState({
                num:this.state.num+1
            })
        }
        render() {
            //子类方父类中的方法使用
            let renderElement = super.render() //  {props,children}
            //扩展属性
            let newPorps = {
                ...renderElement,
                onClick:this.handerClick
            }
           
            //React.cloneElement()   =>React.createElement(元素，属性，chidlren)
            return React.cloneElement(renderElement, newPorps, this.state.num)
        }
    }
}

//使用
  let Nbotton =  warrper(Button)
ReactDOM.render(
    <Nbotton title="这是主题"></Nbotton>
    ,
    document.getElementById('root')
);



//

