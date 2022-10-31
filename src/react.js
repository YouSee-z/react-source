import { REACT_MEMO, REACT_ELEMENT, REACT_FORWARDREF, REACT_CONTEXT, REACT_PROVIDER } from "./stants";
import { toObject, shallEqual } from './util'
import Component from './component'
import {
   useState,
   useReducer,
   useMemo,
   useCallback,
   useEffect,
   useLayoutEffect,
   useRef
} from './react-dom'
//jsx => bable =>
function createElement(type, config, children) { //ji
   //处理 key ref
   let key, ref

   if (config) {
      key = config.key
      ref = config.ref
      delete config.key
      delete config.key
   }


   //  处理children
   let props = { ...config }
   if (config) {
      // 1 没有children
      // 2 有一个儿子  （1）文本  （2）元素
      // 3多个儿子
      if (arguments.length > 3) { //多个儿子
         props.children = Array.prototype.slice.call(arguments, 2).map(toObject)  // []
      } else if (arguments.length == 3) {
         props.children = toObject(children) // {type:REACT_TEXT,content:666 }
      }
   }

   return { //vonde  =》 react 元素
      $$typeofs: REACT_ELEMENT,
      key,//后面diff 
      ref,// 获取到真实的doM
      type, //类型  div 
      props
   }
}

function createRef() {
   return { current: null }
   //主要一下
}
function forwardRef(render) {
   return {
      $$typeofs: REACT_FORWARDREF,
      render
   }
}

function createContext() { //本质就是一个变量
   let context = {
      $$typeofs: REACT_CONTEXT,
      _currentValue: undefined
   }

   context.Provider = {
      $$typeofs: REACT_PROVIDER,
      _context: context
   }
   context.Consumer = {
      $$typeofs: REACT_CONTEXT,
      _context: context
   }


   return context
}



/*** React.createContext() =>{
 * $$typeof: Symbol(react.context)
 * Consumer:获取数据   vue(inject)
 * Provider:提供数据
 * _currentValue：   null {color: 方法}
 * }
 * 
 * 
 * 
 * 
 * 
 * 
*/
//克隆就的元素 =》扩展属性
function cloneElement(oldElement, props, children) {
   //(1)处理一下children
   if (arguments.length > 3) { //多个儿子
      props.children = Array.prototype.slice.call(arguments, 2).map(toObject)  // []
   } else if (arguments.length == 3) {
      props.children = toObject(children) // {type:REACT_TEXT,content:666 }
   }
   return {
      ...oldElement,
      props
   }
}
//纯组件
class PureComponent extends Component {
   //核心 通过
   shouldComponentUpdate(nextProps, nextState) {
      //如果属性和状态不同进行更新
      //(1)第一次 相同的
      console.log(!shallEqual(this.props, nextProps), 99996)
      return !shallEqual(this.props, nextProps) || !shallEqual(this.state, nextState)
   }
}
//创建一个memo
/**
 * 
 * @param {*} type  函数组件
 * @param {*} compare  比较 属性是否相同
 */
function memo(type, compare = shallEqual) {
   return {
      $$typeofs: REACT_MEMO,
      compare: shallEqual,
      type

   }
} 
// 实现 useImperativeHandle
function useImperativeHandle(ref,factory){
   ref.current = factory()
}
function useContext(context){
   //返回最新的数据
   return context._currentValue
}
const React = {
   createElement,
   Component,
   createRef,
   forwardRef,
   createContext,
   cloneElement,
   PureComponent,
   memo,
   useState,
   useReducer,
   useMemo,
   useCallback,
   useEffect,
   useLayoutEffect,
   useRef,
   useImperativeHandle


}



export default React