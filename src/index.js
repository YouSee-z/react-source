 import React from 'react';
import ReactDOM from 'react-dom';

// 1 :React.createContext() //提供一个全局变量 =》保存数据
let StateDate = React.createContext() // {}

//2 在子组件中通过 React.useContext()
//实现useContext；全局变量
function Child() {
    //子组价获取数据
    console.log(StateDate)
    let {num, setNum}= React.useContext(StateDate) //返回最新的数据
    return (
        <div>
            <h1>{num}</h1>
            <button onClick={() => {
            setNum(num+1)
            }}>点击</button>
        </div>

    )
}

function App() {
    let [num, setNum] = React.useState(0)
    //根组件提供数据
    return (
        <StateDate.Provider value={{ num, setNum }}>
            <div>
                <h1>父亲</h1>
                <Child></Child>

            </div>

        </StateDate.Provider>

    )
}


ReactDOM.render(<App></App>, document.getElementById('root'))
