import { twoVnode, findDOM } from './react-dom'

export const updataQueue = {
    isBatchData: false,// 标识 是同步更新还是异步更新
    //
    updaters: [],//需要更新的数组
    batchUpdata() {
        updataQueue.updaters.forEach(updater => updater.updataComponent())   //state .num
        updataQueue.isBatchData = false
        updataQueue.updaters.length = 0
    }
}
//更新器
// 获取到最新的数据
class Updater {
    constructor(classInstance) {
        this.classInstance = classInstance //保存类的实例  render
        this.peddingState = []//保存数据
    }
    //添加数据(状态更新)
    addState(partialState) {
        this.peddingState.push(partialState)
        //更新
        this.emitUpdata() //点击了
    }
    //更新
    emitUpdata(newPorps) { //属性更新也要更新组件
        this.nextProps = newPorps //获取到最新的属性
        //判断 一下你是 异步，还是同步
        if (updataQueue.isBatchData) { //异步
            //需要收集setState()=>updater=>this
            updataQueue.updaters.push(this)
        } else {
            //更新组件
            this.updataComponent()
        }

    }
    updataComponent() {
        let { peddingState,nextProps, classInstance } = this
        //获取到数据 =》更新组件
        if (nextProps|| peddingState.length > 0) { // 属性更新了 ，或者状态更新了  =》更新组件
            sholdUpdata(classInstance,nextProps, this.getState())
        }
    }
    //获取到最新的状态
    getState() { //获取到最新的数据 =vnode
        let { peddingState, classInstance } = this  //classInstance component 实例
        let { state } = classInstance //获取到旧的数据
        peddingState.forEach(nestState => {
            state = { ...state, ...nestState } //获取到最新的数据
        })
        //清空数据
        peddingState.length = 0
        console.log(state)
        return state  // num:1
    }
}
//实现React  组件更新原理

//1 初始化的使用 =》h1
//2 更新的时候 获取到新状态 ，把这个新的状态变成vnode(render方法)，在把这个vnode变成真实dom
//3 用新的真实dom替换老的
function sholdUpdata(classInstnce,nextProps, nextState) {

    //添加更新相关的生命周期
    let willUpdata = true
 
    if (classInstnce.shouldComponentUpdate && !classInstnce.shouldComponentUpdate(nextProps, nextState)) {
        willUpdata = false//表示不更新页面
    }
    //赋值一下
    if(nextProps){
      classInstnce.props = nextProps
    }
    classInstnce.state = nextState //获取新的数据 （不管是不是更新，赋值都会执行）
    // willUpdata 为true 更新组件
    if (willUpdata && classInstnce.componentWillUpdate) {
        classInstnce.componentWillUpdate() //将要更新组件
    }
    if(willUpdata){//如果要更新就会更新页面
        classInstnce.forceUpdata() 
    }
    // classInstnce.state = nextState
    //  console.log(nextState)
    // //实现组件更新
    // classInstnce.forceUpdata()
}


class Component {
    // 
    // 子类可以继承  父类的  实例方法  静态方法  原型方法
    static isReactComponent = true
    constructor(props) {
        this.props = props
        this.state = {}
        //创建更新器
        this.updater = new Updater(this) // 
    }
    setState(partialState) {
        // 写一个更新器  
        this.updater.addState(partialState)
    }
    forceUpdata() {
        //1的vnode
     
        let oldVnode = this.oldReaderVnode    //初始化的时候有旧的vnode
        //获取到真正dom=》findDOM中进行处理
           
        // debugger
        let oldDom = findDOM(oldVnode)//就是如果类组件返回的是一个函数组件，就没有真实的dom
           console.log(oldDom)
        if(this.constructor.contextType){
              this.context = this.constructor.contextType._currentValue
        }
        //在这里要进行优化一下
             if(this.constructor.getDerivedStateFromProps){
                 let newState = this.constructor.getDerivedStateFromProps(this.props,this.state)
                 //合并state
                if(newState){
                    this.state = {...this.state,...newState}
                }
             }
             let newVnode = this.render()
              let snapshot = this.getSnapshotBeforeUpdate&&this.getSnapshotBeforeUpdate()
            //   if(snapshot){

            //   }
        //实现组件更新
      
        twoVnode(oldDom.parentNode, oldVnode, newVnode) // 1 旧的真正元素  2 旧的vnode   3新的vnode
        this.oldReaderVnode = newVnode
        //更新后
        if(this.componentDidUpdate){
            this.componentDidUpdate(this.props,this.state,snapshot)//这里传递参数
        }
    }
}


export default Component



