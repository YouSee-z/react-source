  //context ：vue provider inject

  import React from './react'
  import ReactDOM from './react-dom'
  let ColorTheme = React.createContext()
  console.log(ColorTheme) //对象

  // 1提供数据 provider

  //在下层组件中获取数据 
  //1 static contentType = ColorTheme
  //2  ColorTheme.Consumer  他的值 是一个方法  这个方法的参数就是 提供的数据
  class Header extends React.Component{
    static  contextType = ColorTheme  //  給class实例添加一个属性context = 提供的值
    render(){
        return(
            <div style={{margin:'10px',padding:'10px',border:`10px solid ${this.context.color}`}}>
                Header
               <Title></Title>
            </div>
        )
    }
  }

  class Title extends React.Component{
   
    render(){
        return(
            <ColorTheme.Consumer>
              {
                  (value)=>(
                    <div style={{margin:'10px',padding:'10px',border:`10px solid ${value.color}`}}>
                  Title
                   
                </div>
                  )
              }
            </ColorTheme.Consumer>  
        )
    }
  }
  class Main extends React.Component{
    static  contextType = ColorTheme  //  context
    render(){
        return(
            <div style={{margin:'10px',padding:'10px',border:`10px solid ${this.context.color}`}}>
                Main
               <Content></Content>
            </div>
        )
    }
  }

  class Content extends React.Component{
   
    render(){
        return(
            <ColorTheme.Consumer>
              {
                  (value)=>(
                    <div style={{margin:'10px',padding:'10px',border:`10px solid ${value.color}`}}>
                    Content
                    <button onClick={()=>{
                        value.changeColor('red')
                    }}>变红</button>
                    <button  onClick={()=>{
                        value.changeColor('black')
                    }}>变黑</button>
               </div>
                  )
              }
            </ColorTheme.Consumer>  
        )
    }
  }

  class Page extends React.Component{
      constructor(props){
          super(props)
          this.state = {
              color:'red'
          }
      }
      changeColors = (color)=>{
 
         this.setState({color})
        //   this.setState({
        //       color
        //   })
      }
    //1提供数据=》Provider组件
    //React.createElement()
    render(){
        let context = {changeColor:this.changeColors,color:this.state.color}
        return(
            <ColorTheme.Provider value={context}> 
            <div   style={{margin:'10px',padding:'10px',border:`10px solid ${this.state.color}`,width:'300px'}}>
                Page
                <Header></Header>
                <Main></Main>
            </div>
            </ColorTheme.Provider>
        )
    }
  }




  ReactDOM.render(<Page></Page>,document.getElementById('root'))



 /**
  * 1 创建方法
   * 2标识
   * 3处理 Provder组件
  * 
  * 
  * 
  * 
  *  */




