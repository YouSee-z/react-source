import React from './react';
import ReactDOM from './react-dom';

//useEffect  react-router 6 
//挂载完毕 更新完毕  将要卸载

function  App(){
    let [num,setNum] = React.useState(0)
    //
    React.useEffect(()=>{
      console.log('开启定时器')
      let timer = setTimeout(()=>{
        setNum(num=>num+1)
      },1000)
    },[num])
    return(
        <div>
            <h1>{num}</h1>

        </div>
    )
}



ReactDOM.render(<App></App>, document.getElementById('root'))
