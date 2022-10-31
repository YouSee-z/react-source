import {REACT_TEXT} from './stants'
export function toObject(element){
    return typeof element =='string'|| typeof element =='number'?
    {type:REACT_TEXT,content:element}:element
}

//写一个方法判断一下组件的属性是否有改变

// export function shallEqual(obj1,obj2){
//     //（1）如果这两个都是对象
//     if(obj1===obj2){
//         return true //不用更新
//     }
//     //（2）如果他们有一个没有
//     if(typeof obj1 !=='object' || obj1 ==null || typeof obj2 !=='object' || obj2 ==null){
//         return false  //需要更新
//     }

//     //(3)判断一下数量
//     let key1 = Object.keys(obj1)
//     let key2 = Object.keys(obj2)
   
//     if(key1.length!==key2.length){
//         return false //需要更新
//     }

//     //（4）数量相同 ，属性是否相同 []  []
//     for(let key of key1)
//     if(!obj2.hasOwnProperty(key) || obj1[key] !==obj2[key]){
//       return false
//     }
//     // Object.hasOwnProptype()
//     return true

// }
export function shallEqual(obj1, obj2) {
      if (obj1 === obj2) {
        return true;
      }
      if (typeof obj1 != "object" || obj1 === null || typeof obj2 != "object" || obj2 === null) {
        return false;
      }
      let keys1 = Object.keys(obj1);
      let keys2 = Object.keys(obj2);
      if (keys1.length !== keys2.length) {
        return false;
      }
      for (let key of keys1) {
        if (!obj2.hasOwnProperty(key) || obj1[key] !== obj2[key]) {
          return false;
        }
      }
      return true;
    }