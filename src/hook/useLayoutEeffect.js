import React from './react';
import ReactDOM from './react-dom';

//React.useLayoutEffect  在组件 挂载之前执行 =>本质=》微任务
//挂载完毕 更新完毕  将要卸载

function App() {
    let inputRef = React.useRef() //{current:} //获取元素的真实dom
    let style = {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        backgroundColor: 'red'
    }
    //
    // React.useEffect(()=>{
    //  //操作dom
    //  inputRef.current.style.transform="translate(200px)"
    //  inputRef.current.style.transtion="all 3s"

    // },[])
    React.useLayoutEffect(() => {
        console.log('useLayoutEffect')
        inputRef.current.style.transform = "translate(200px)"
        inputRef.current.style.transtion = "all 3s"
    }, [])
    return (
        <div style={style} ref={inputRef}>


        </div>
    )
}



ReactDOM.render(<App></App>, document.getElementById('root'))
