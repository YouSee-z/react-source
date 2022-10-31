import React from 'react'
import ReactDOM from 'react-dom'


class ScrollList extends React.Component{
    constructor(props){
        super(props)
        this.state = {list:[]}
        this.container = React.createRef()
    }
    addmessage =()=>{
     this.setState(
         state=>({list:[`${state.list.length}`,...state.list]}))  
    }
    getSnapshotBeforeUpdate(){ //作用： 真正的dom更新获取到老的快照
          return{
             prevScrollTop:this.container.current.scrollTop,
             prevScrollHeight: this.container.current.scrollHeight,//上一个dom 内容高度
          }
    }

    // getSnapshotBeforeUpdate 返回值=》  componentDidUpdate参数
    componentDidUpdate(nextPorps,nextState,{prevScrollTop,prevScrollHeight}){
             //重新计算
             this.container.current.scrollTop = prevScrollTop+(this.container.current.scrollHeight-prevScrollHeight)
    }
     componentDidMount(){
         this.tiner = window.setInterval(()=>{
               this.addmessage()
         },1000)
     }
    render(){
        let type ={
              height:'100px',
              width:'200px',
              border:'1px solid red',
              overflow:'auto'
        }
        return(
            <div style={type} ref = {this.container}>
                {this.state.list.map((item,index)=>
                    <div key={index}>{item}</div>
                    )}
            </div>
        )
    }
}

ReactDOM.render(<ScrollList></ScrollList>,document.getElementById('root'))


/**
   新的生命周期 = 》   getSnapshotBeforeUpdate  真正的dom更新获取到老的快照

   will


 * 
 * 
 * 
 */