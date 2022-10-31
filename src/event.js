 import { updataQueue} from './component'

/**
 * 
 * @param {*} dom  //真实dom  div  span
 * @param {*} eventType  //事件类型 onclick
 * @param {*} handler    //事件的处理函数
 */

export default function addEvent(dom,eventType,handler){
    // 1 document store
    
    let store = dom.store ||(dom.store={}) //button.store ={}

    //2创建映射表
    store[eventType]  =handler
    //获取到dom事件
    if(store[eventType]){  //dom =》document
        //{事件类型：处理方法}
        document[eventType] = dispatchEvent //就是将dom上的事件 放到=》document=》handerl
    }
}


//合成事件
function  dispatchEvent(event){

   let {target,type} = event // event 事件对象  1 target=>真实元素  2 事件类型

   let eventType = `on${type}` //onclick
  
   let {store} = target

   let handler = store && store[eventType] //处理函数
   //合并事件对象
   let  SyntheticBaseEvent = createBaseEvent(event)
   updataQueue.isBatchData = true
   handler&&handler(SyntheticBaseEvent )

    //   //执行列队
      updataQueue.isBatchData = false
      updataQueue.batchUpdata()
}


// 
//合并原生对象  =》兼容
function createBaseEvent(nativeEvent){
     let syntheticBaseEvent = {}
     for(let key in nativeEvent){
        syntheticBaseEvent[key] = nativeEvent[key]
     }
     syntheticBaseEvent.nativeEvent = nativeEvent
     //兼容处理
     syntheticBaseEvent.preventDefault = preventDefault
    return syntheticBaseEvent
}

//处理 默认事件

function preventDefault(event){
    if(!event){ //兼容 ie
      window.event.returnValue= false
    }
    if(event.preventDefault){ //
        event.preventDefault()
    }
}