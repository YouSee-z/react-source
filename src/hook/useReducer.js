import React from './react';
import ReactDOM from './react-dom';

function reducer(state = { num: 0 }, action) {
    //定义方法
    switch (action.type) {
        case 'ADD':
            return { num: state.num + 1 };
        case 'MIUNS':
            return { num: state.num - 1 };
        default:
            return state
    }
}

//useReducer
function App() {
 
    let [state, dispatch] = React.useReducer(reducer,{num:0})
    return (
        <div>
            <h1>{state.num}</h1>
            <button onClick={()=>dispatch({type:'ADD'})}>+</button>
            <button onClick={()=>dispatch({type:'MIUNS'})}>-</button>
        </div>
    )
}

ReactDOM.render(<App></App>, document.getElementById('root'))
