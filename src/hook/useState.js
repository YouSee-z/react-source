import React from './react';
import ReactDOM from './react-dom';



  //hook=》 useState()
   function App(){
       let [num,numSet] =  React.useState(0) // num:默认值  numSet:this.setState()  =>合并steate (没有)
       let [name,setName] = React.useState('悟空')
          console.log( React.useState(0))
       return(
           <div>
               <h1>{num}</h1>
               <h1>{name}</h1>
               <button onClick={()=>{
                   numSet(num+1)
               }}>+</button>
           </div>
       )
   }

   ReactDOM.render(<App></App>,document.getElementById('root'))
