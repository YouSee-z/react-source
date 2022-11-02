import {
    REACT_TEXT,
    MOVE,
    PLACEMENT,
    REACT_FORWARDREF,
    REACT_CONTEXT,
    REACT_PROVIDER,
    REACT_MEMO
} from './stants'
import addEvent from './event'
import React from './react'
//实现hooks
let hookSstate = [] //保存hook数据 function => useState()  [{num:0},{name:'悟空'}]

let hookIndex = 0
console.log(hookSstate, hookIndex)

let schellUpdate //更新
    //初始化react 元素
function render(vdom, container) {
    mount(vdom, container)
        //更新
    schellUpdate = () => {
        hookIndex = 0
        twoVnode(container, vdom, vdom)
    }

}
//useRef
export function useRef(inistalState) {
    hookSstate[hookIndex] = hookSstate[hookIndex] || { current: inistalState }
    return hookSstate[hookIndex++]
}
//定义useState 
export function useState(inistalState) { // inistalState 默认值
    //赋值
    // hookSstate[hookIndex] = hookSstate[hookIndex] || inistalState // 0
    // let currentIndex = hookIndex //
    // //修改值的方法
    // function setState(newState) {  //{num:1}
    //     hookSstate[currentIndex] = newState //获取新值 
    //     //实现页面更新
    //     schellUpdate()
    // }

    // return [hookSstate[hookIndex++], setState]
    return useReducer(null, inistalState)
}
//实现useEffect
export function useEffect(callback, deps) {
    let currentIndex = hookIndex //
    if (hookSstate[hookIndex]) { //获取老的数据
        let [destory, lastDeps] = hookSstate[hookIndex]
        let same = deps.every((dep, index) => dep === lastDeps[index])
        if (same) {
            hookIndex++
        } else {
            //兼容处理
            destory && destory()
            setTimeout(() => {
                hookSstate[currentIndex] = [callback(), deps]
            });
            hookIndex++
        }
    } else { //没有数据  获取最新的数据
        //要在页面渲染完毕，挂载完毕  dom  =>开启宏任务
        setTimeout(() => {
            hookSstate[hookIndex] = [callback(), deps]
        });
        hookIndex++
    }
}

//实现useLayoutEffect
export function useLayoutEffect(callback, deps) {
    let currentIndex = hookIndex //
    if (hookSstate[hookIndex]) { //获取老的数据
        console.log(hookSstate[hookIndex])
        let [destory, lastDeps] = hookSstate[hookIndex]
        let same = deps.every((dep, index) => dep === lastDeps[index])
        if (same) {
            hookIndex++
        } else {
            //兼容处理
            destory && destory()
            queueMicrotask(() => {
                hookSstate[currentIndex] = [callback(), deps]
            });
            hookIndex++
        }
    } else { //没有数据  获取最新的数据
        //  =>开启微任务
        queueMicrotask(() => {
            hookSstate[hookIndex] = [callback(), deps]
        });
        hookIndex++
    }
}


//实现useReducer  =》vuex action state dispatch  
export function useReducer(reducer, inistalState) { // inistalState 默认值
    //赋值
    hookSstate[hookIndex] = hookSstate[hookIndex] || inistalState // 0
    let currentIndex = hookIndex //
        // //修改值的方法
    function dispatch(action) { //{num:1}
        // hookSstate[currentIndex] = reducer(hookSstate[currentIndex], action) //获取新值 
        //获取老的数据
        let oldState = hookSstate[currentIndex]
        if (reducer) { //无reducer 代表useState
            let newState = reducer(oldState, action)
            hookSstate[currentIndex] = newState
        } else { //无reducer 代表useState
            //
            let newState = typeof action == 'function' ? action(oldState) : action
            hookSstate[currentIndex] = newState
        }

        //实现页面更新
        schellUpdate()
    }

    return [hookSstate[hookIndex++], dispatch]
}
//实现useMemo
export function useMemo(factory, deps) { // factory函数：获取到数据  deps；[num]
    //（1）判断一下有没有值
    if (hookSstate[hookIndex]) { //有数据
        let [oldMemo, oldDeps] = hookSstate[hookIndex]
            //判断一下
            //   debugger
        let same = deps.every((dep, index) => dep === oldDeps[index])
        if (same) { //数据一样
            hookIndex++
            return oldMemo
        } else { //不一样
            let newMemo = factory() //{num:0}
            hookSstate[hookIndex++] = [newMemo, deps]
            return newMemo
        }
    } else { //初始化
        let newMemo = factory() //{num:0}
        hookSstate[hookIndex++] = [newMemo, deps]
        return newMemo
    }
}


//实现useCallback
export function useCallback(callback, deps) { // factory函数：获取到数据  deps；[num]
    //（1）判断一下有没有值
    if (hookSstate[hookIndex]) { //有数据
        let [oldCallback, oldDeps] = hookSstate[hookIndex]
            //判断一下
        let same = deps.every((dep, index) => dep === oldDeps[index])
        if (same) { //数据一样
            hookIndex++
            return oldCallback
        } else { //不一样

            hookSstate[hookIndex++] = [callback, deps]
            return callback
        }
    } else { //初始化

        hookSstate[hookIndex++] = [callback, deps]
        return callback
    }
}

function mount(vdom, container) {

    //1 vdom =>真实dom
    let newDom = crateDom(vdom)
        //2 真实dom放到对应的位置  
    if (newDom) container.appendChild(newDom)
        //挂载完毕  componentDidMount
    if (newDom && newDom.componentDidMount) {
        newDom.componentDidMount() //实现挂载
    }

}

function crateDom(vdom) {

    if (typeof vdom == 'string' || typeof vdom == 'number') {
        vdom = {
            type: REACT_TEXT,
            content: vdom
        }
    }
    //vdom =>真实dom   vue3   {type: props}
    const { type, props, content, ref } = vdom
    let dom // 真实的dom
        //1 判断type =》 文本 或者元素  div
    if (type && type.$$typeofs == REACT_MEMO) {
        return mountMemoComponent(vdom)
    } else if (type && type.$$typeofs == REACT_PROVIDER) {
        return mountProverComponent(vdom)
    } else if (type && type.$$typeofs == REACT_CONTEXT) {
        return mountContextComponent(vdom)
    } else if (type && type.$$typeofs == REACT_FORWARDREF) {
        return mountForWardRef(vdom)
    } else if (type == REACT_TEXT) { //文本 66
        dom = document.createTextNode(content) //{type,content:}
    } else if (typeof type == 'function') { //区分 1 函数式组件  2 类组件
        if (type.isReactComponent) { //2 类组件
            return mountClassComponent(vdom)
        }
        return mountFunctionComponent(vdom)
    } else { //元素
        dom = document.createElement(type) // div
    }
    if (props) { //{}
        //问题跟新
        updatePropos(dom, {}, props) //  1 真实dom  2 旧的属性  3 新的属性
            //3 children
        let children = props.children
        if (children) {
            changeChildren(children, dom, props)
        }
    }
    vdom.dom = dom //保存真实dom
    if (ref) ref.current = dom
    return dom

}

//处理Mome组件
function mountMemoComponent(vdom) {
    //  console.log(vdom) //{}
    let { type, props } = vdom //type => Provider{$$typeofs: Symbol(REACT_PROVIDER), _context: {…}}
    let renderVdom = type.type(props)
    vdom.prevProps = props;
    vdom.oldReaderVnode = renderVdom //后面用来更新
    return crateDom(renderVdom)
}

//处理provider组件
function mountProverComponent(vdom) {
    //  console.log(vdom) //{}
    let { type, props } = vdom //type => Provider{$$typeofs: Symbol(REACT_PROVIDER), _context: {…}}

    //获取数据赋值
    let context = type._context //給context =>React.creatContext()
    context._currentValue = props.value //赋值 {color:red}
        //渲染 元素propsc.children
    let renderVdom = props.children
        // if(!renderVdom) return null
        //
    vdom.oldReaderVnode = renderVdom //后面用来更新
    return crateDom(renderVdom)

}
//处理context组件
function mountContextComponent(vdom) {
    let { type, props } = vdom //type => Provider{$$typeofs: Symbol(REACT_PROVIDER), _context: {…}}
    //获取数据
    let context = type._context //給context =>React.creatContext()
        //渲染 元素propsc.children
    let renderVdom = props.children(context._currentValue)
        //

    vdom.oldReaderVnode = renderVdom //后面用来更新
        // if(!renderVdom) return null
    return crateDom(renderVdom)
}
//处理forwardRef组件
function mountForWardRef(vdom) {
    let { type, props, ref } = vdom
    // type: {
    //   $$typeofs: Symbol(React.forward_Ref)
    // type: render()
    // }


    let refVnode = type.render(props, ref) //   函数式组件frorwordref 包裹
        // if(!renderVdom) return null
    return crateDom(refVnode)
}
//处理类组件
function mountClassComponent(vdom) { //React.createElement() =>{}
    let { type, props, ref } = vdom
    //注意 type  是一个类  =》render返回值
    let classInstance = new type()
    if (type.contextType) {
        //需要給这个实例添加一个属性context 
        classInstance.context = type.contextType._currentValue
    }
    //添加卸载的生命周期
    vdom.classInstance = classInstance
    if (ref) ref.current = classInstance
        //组件将要挂载
    if (classInstance.componentWillMount) {
        classInstance.componentWillMount()
    }
    let classVnode = classInstance.render() //获取到vnode
        //在给vdom添加一个属性oldReaderVnode
    vdom.oldReaderVnode = classInstance.oldReaderVnode = classVnode
        //把方法挂载到dom上
    if (!classVnode) return null
    let dom = crateDom(classVnode)
    if (classInstance.componentDidMount) {
        dom.componentDidMount = classInstance.componentDidMount
    }
    return dom

}
//处理函数式组件
function mountFunctionComponent(vdom) {
    let { type, props } = vdom
    // type 调用返回一个虚拟dom
    let functionVdom = type(props) //获取到函数的vnode
        // 函数是组件也一样
    vdom.oldReaderVnode = functionVdom
    return crateDom(functionVdom)

}

//处理children
function changeChildren(children, dom, props) {

    if (typeof children == 'string' || typeof children == 'number') { //react
        children = { type: REACT_TEXT, content: children }
        mount(children, dom)
    } else if (typeof children == 'object' && children.type) { //单个children
        props.children.mountIndex = 0
        mount(children, dom)
    } else if (Array.isArray(children)) { //多个children
        children.forEach((item, index) => {
            item.mountIndex = index
            mount(item, dom)
        })

    }
    // 2多个children =>[]
}
//更新属性
function updatePropos(dom, oldProps, newProps) {
    //
    if (newProps) {
        for (let key in newProps) {
            //处理属性  <div ></div> 注意  children  style:{color:red,fontsize:20} 
            if (key == 'children') {
                continue;
            } else if (key == 'style') {
                //{color:red,fontsize:20}
                let styleObject = newProps[key]
                for (let arr in styleObject) {
                    dom.style[arr] = styleObject[arr]
                }
            } else if (key.startsWith('on')) { //事件
                //  dom[key.toLocaleLowerCase()] = newProps[key]
                // 以后我不再把事件邦定在dom,而是通过事件委托，全部放到document
                addEvent(dom, key.toLocaleLowerCase(), newProps[key])
            } else { //其他属性
                dom[key] = newProps[key]
            }
        }
    }

    //跟新
    if (oldProps) {
        // 旧的属性在新的属性中没有 =>删除
        for (let key in oldProps) {
            if (!newProps[key]) {
                dom[key] = null
            }
        }
    }
}
//实现组件更新
/**
 * 
 * @param {*} parentDom  父节点
 * @param {*} oldVnode    旧vnod
 * @param {*} newVnode    新vnode
 * @param {*} nextDom     插入的位置
 */
//dom-diff 递归比较 
//方法：老的vnode和新的vnode,比对找出新的差异，然后把这个差异最小化操作同步到真实的dom上

export function twoVnode(parentDom, oldVnode, newVnode, nextDom) {

    //   //获取新的真实dom
    //  let newdom = crateDom(newVnode)
    // //  let oldom = oldVnode.dom
    //    let oldom = findDOM(oldVnode) //这里需要修改一下
    //  parentDom.replaceChild(newdom,oldom)
    //更新

    //1 如果老的和新的都没有
    if (!oldVnode && !newVnode) {
        return
        //2如果老的有，新的没有，直接删除
    } else if (oldVnode && !newVnode) {
        unMountVnode(oldVnode) //删除老的
            //如果老的没有新的有，直接添加
    } else if (!oldVnode && newVnode) {
        let newDom = crateDom(newVnode)
        if (nextDom) { //有没有需要插入的位置
            parentDom.insertBefore(newDom, nextDom)
        } else {
            parentDom.appendChild(newDom)
        }
        //挂载完毕
        if (newDom.componentDidMount) {
            newDom.componentDidMount()
        }
        //这里表示两个都有=》判断它的类型 type,如果类型一样，可以复用，如果类型不一样，不能复用
    } else if (oldVnode && newVnode && oldVnode.type !== newVnode.type) {
        //old：div   new:h
        unMountVnode(oldVnode)
        mountVdom(parentDom, newVnode, nextDom)
    } else { //老的有 新的有 类型相同  就可以进行深度的dom-diff并且可以复用当前的dom节点
        updateElement(oldVnode, newVnode)
    }

}
//
function updateElement(oldVnode, newVnode) {

    // （1）都是文本节点， 复用老的文件节点
    if (oldVnode.type.$$typeofs == REACT_MEMO) {
        updateMemoComponent(oldVnode, newVnode)
    } else if (oldVnode.type.$$typeofs == REACT_PROVIDER) {
        updateProviderComponent(oldVnode, newVnode)
    } else if (oldVnode.type.$$typeofs == REACT_CONTEXT) {
        updateContextComponent(oldVnode, newVnode)
    } else if (oldVnode.type == REACT_TEXT && newVnode.type == REACT_TEXT) { // 都为文本
        let currentDom = newVnode.dom = findDOM(oldVnode)
            //获取新的文本的内容
        currentDom.textContent = newVnode.content // {content:55}
    } else if (typeof oldVnode.type == 'string') { //原生组件
        //复用老的节点  》 h
        let currentDom = newVnode.dom = findDOM(oldVnode)
            //更新属性
        updatePropos(currentDom, oldVnode.props, newVnode.props)

        // debugger
        //更新children
        updataChildren(currentDom, oldVnode.props.children, newVnode.props.children)
            //注意一下函数组件 和类组件
    } else if (typeof oldVnode.type === 'function') {
        if (oldVnode.type.isReactComponent) { //类组件
            //复用老的函数
            newVnode.classInstance = oldVnode.classInstance
                //更新类组件
            updataClassComponent(oldVnode, newVnode)
        } else { //函数组件 
            updataFuncionComponent(oldVnode, newVnode)
        }
    }
}

function updateMemoComponent(oldVdom, newVdom) {
    let { type, prevProps } = oldVdom;
    console.log(!type.compare(prevProps, newVdom.props))
    if (!type.compare(prevProps, newVdom.props)) { //判断一下属性是否相同
        let oldDOM = findDOM(oldVdom);
        let parentDOM = oldDOM.parentNode;
        let { type, props } = newVdom;
        let renderVdom = type.type(props);
        twoVnode(parentDOM, oldVdom.oldReaderVnode, renderVdom);
        newVdom.prevProps = props;
        newVdom.oldReaderVnode = renderVdom;
    } else { //属性相同
        newVdom.prevProps = prevProps;
        newVdom.oldReaderVnode = oldVdom.oldReaderVnode;
    }
}
//更新providre组件
function updateProviderComponent(oldVnode, newVnode) {

    let oldDOM = findDOM(oldVnode) //获取老的dom
    let parentDom = oldDOM.parentNode //获取老的父dom
    let { type, props } = newVnode
    let context = type._context
    context._currentValue = props.value //这一步很关键，使用新的属性赋值給_currentValue
    let renderVdom = props.children //新的vnode
    twoVnode(parentDom, oldVnode.oldReaderVnode, renderVdom)
    newVnode.oldReaderVnode = renderVdom
}
//更新context组件
function updateContextComponent(oldVnode, newVnode) {
    let oldDOM = findDOM(oldVnode) //获取到就的真实dom
    let parentDom = oldDOM.parentNode // 父节点
    let { type, props } = newVnode
    let context = type._context
    let renderVdom = props.children(context._currentValue)

    twoVnode(parentDom, oldVnode.oldReaderVnode, renderVdom)
        // oldVnode.oldReaderVnode = renderVdom
    newVnode.oldReaderVnode = renderVdom
}
//更新类组件
function updataClassComponent(oldVnode, newVnode) {
    //复用老的实例
    let classInstance = newVnode.classInstance = oldVnode.classInstance
        //注意在这里需要判断一下 是否需要 就收更新组件的数据
    if (classInstance.componentWillReceiveProps) {
        classInstance.componentWillReceiveProps(newVnode.props)
    }
    //更新  =》去component.js中更新器
    classInstance.updater.emitUpdata(newVnode.props)
}
//更新函数组件
function updataFuncionComponent(oldVnode, newVnode) {
    let parentDom = findDOM(oldVnode).parentNode // 获取老的真实dom的父节点
    let { type, props } = newVnode
    let newRenderVdom = type(props) //获取到新的组件的vnode
    twoVnode(parentDom, oldVnode.oldReaderVnode, newRenderVdom)
        //后面会新的变成就的
    oldVnode.oldReaderVnode = newRenderVdom

}


//更新children
function updataChildren(parentDom, oldChildren, newChildren) {
    //1判断一下 是不是数组
    // debugger
    oldChildren = (Array.isArray(oldChildren) ? oldChildren : [oldChildren]).filter(item => item)
    newChildren = (Array.isArray(newChildren) ? newChildren : [newChildren]).filter(item => item)
        //怎么实现比对  =》 找到有children(最多)的进行循环

    //1构建一个老的map结构  key就收虚拟dom的可以，值就是虚拟dom
    // [111].filter
    let keyedOldMap = {}

    oldChildren.forEach((oldVchlid, index) => {
        //有没有key
        let oldKey = oldVchlid.key ? oldVchlid.key : index
        keyedOldMap[oldKey] = oldVchlid
    });
    //2遍历新的去老的中查找，进行更新 ，注意 （1）有移动
    let patch = [] //需要移动的数据
    let lastPlaceIndex = 0

    newChildren.forEach((newVchild, index) => {
        newVchild.mountIndex = index
            //更加key值去找
        let newKey = newVchild.key ? newVchild.key : index;
        let oldVchlid = keyedOldMap[newKey]
            //就有几种情况
        if (oldVchlid) { //有
            //更新元素
            updateElement(oldVchlid, newVchild)
                //判断一下是否移动  lastPlaceIndex 
            if (oldVchlid.mountIndex < lastPlaceIndex) { //移动
                patch.push({
                    type: MOVE,
                    oldVchlid,
                    newVchild,
                    mountIndex: index //把oldVchild移动到当前的索引处
                })
            }
            //从map中删除掉
            delete keyedOldMap[newKey]
                //比对一下lastPlaceIndex 值
            lastPlaceIndex = Math.max(oldVchlid.mountIndex, newVchild.mountIndex)

        } else { //没有找到 =》插入
            patch.push({
                type: PLACEMENT,
                newVchild,
                mountIndex: index
            })
        }

    })

    // 获取需要移动的元素
    let moveChilren = patch.filter(action => action.type == MOVE).map(action => action.oldVchlid)
        //遍历完成后再map留下的元素就是没有被复用的元素，需要删除

    Object.values(keyedOldMap).concat(moveChilren).forEach(oldChildren => {
        let currentDOM = findDOM(oldChildren)
        parentDom.removeChild(currentDOM)
    })

    //插入
    patch.forEach(action => {
        let { type, oldVchlid, newVchild, mountIndex } = action
        //获取到真实的Dom节点的集合
        let childNodes = parentDom.childNodes;
        if (type === PLACEMENT) {
            let newDOM = crateDom(newVchild) //根据新的虚拟dom创建真实dom
            let childNode = childNodes[mountIndex] //获取原来老的dom中对应的索引的真实dom
            if (childNode) {
                parentDom.insertBefore(newDOM, childNode)
            } else { //后添加
                parentDom.appendChild(newDOM)
            }
        } else if (type == MOVE) {
            let oldDOM = findDOM(oldVchlid)
                //再到集合中找到对应的位置，把它删除
            let childNode = childNodes[mountIndex] //获取原来老的dom中对应的索引的真实dom
            if (childNode) {
                parentDom.insertBefore(oldDOM, childNode)
            } else {
                parentDom.appendChild(oldDOM)
            }
        }
    })

}
//添加新的
function mountVdom(parentDom, newVnode, nextDom) {
    let newDom = crateDom(newVnode)
    if (nextDom) { //有没有需要插入的位置
        parentDom.insertBefore(newDom, nextDom)
    } else {
        parentDom.appendChild(newDom)
    }
    //挂载完毕
    if (newDom.componentDidMount) {
        newDom.componentDidMount()
    }
}
//删除老的
/**
 * 
 * @param {*} vdom  老的vnode节点
 */
function unMountVnode(vdom) {
    let { type, props, ref } = vdom
    //获取老的真实dom
    let currentDOM = findDOM(vdom)
        //卸载操作，如果这个组件是一个类组件，我们还要执行它的卸载操作（卸载的生命周期）
        //问题卸载的生命周期在这个vdom上有吗？在类组件中添加一下
}
//创建一个方法,获取到真正的dom
export function findDOM(vdom) {
    // return vdom.dom
    //在这里来实现  

    //1 如果这个vdom没有值
    if (!vdom) return null
        //2 如果这个vdom上有真实的dom 就返回这个真实的dom 
        //说明这个vdom是一个原生组件的虚拟dom，他会有dom属性指向真实的dom
    if (vdom.dom) {

        return vdom.dom
    } else { //3这个vdom上没有真实的dom属性 =》递归
        // console.log(vdom)
        // debugger
        return findDOM(vdom.oldReaderVnode) //如果没有真实dom 的化，找这个oldReaderVnode=>{}

    }

}

const ReactDOM = {
    render,
    createPortal: render
}


export default ReactDOM