import React from './react';
import ReactDOM from './react-dom';

//memo
//hook =》优化

//1React.memo 检测组件的属性是否有改变
//2 React.useMemo    React.useCallback

function Chilrens({ data, handlerClick }) {
    console.log('children render ', data)
    return ( <
        button onClick = { handlerClick } > { data.num } < /button>
    )
}
let ChildMemo = React.memo(Chilrens)
    //useReducer
function App() {

    let [num, setNum] = React.useState(0)
    let [name, setName] = React.useState('悟空')
        //通过useMemo检测num 值是否改变 1改变了=》APP组件就渲染新的数据 2没有改变渲染旧的数据
    let data = React.useMemo(() => ({ num }), [num])
        //通过useCallback检测num 值是否改变 1改变了=》APP组件就渲染新的handlerClick  2没有改变渲染旧的handlerClick 
    let handlerClick = React.useCallback(() => {
        setNum(num + 1)
    }, [num])
    return ( <
        div >
        <
        ChildMemo data = { data }
        handlerClick = { handlerClick } > < /ChildMemo> <
        input type = "text"
        value = { name }
        onChange = {
            (event) => {
                setName(event.target.value)
            }
        } > < /input>

        <
        /div>
    )
}

ReactDOM.render( < App > < /App>, document.getElementById('root'))