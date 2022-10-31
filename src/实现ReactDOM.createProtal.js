

import React from './react'
import ReactDOM from './react-dom'

//Portal 提供了一种将子节点渲染到存在于父组件以外的 DOM 节点的优秀的方案。

// 在工作中  弹框 （全局）
//弹框组件
class Dialog extends React.Component{
    constructor(props){
        super(props)

        //初始话 需要放置 的位置
        // this.dom = document.createElement('div')
        // document.body.appendChild(this.dom )
    }
    //ReactDOM.createPortal(元素（vnode）,位置)
    render(){
        //注意
        return ReactDOM.createPortal( //没有render
            <div className='dialog'>这是弹框</div>,
            document.getElementById('dialog')
        )
    }
}

class App extends React.Component{
    render(){
        return(
            <div>
              <Dialog></Dialog>  
            </div>
        )
    }
}

ReactDOM.render(<App></App>,document.getElementById('root'))