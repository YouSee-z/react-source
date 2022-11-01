  // react :dom-diff

  /**
   * 1同级节点进行比较 
   * 2不是同类型
   * 3元素相同 =》key
   * 
   * 
   *  */

  //<div><span></div>      span

  //实现
  // 1 将老的结构  通过map =>映射表 = {key:dom}
  // 2 创建一个lastPlaceIndex = 0 
  // 3 遍历新的结构=》 去老的中查找 =》key   1 复用   2 重新生成


  import React from './react'
  import ReactDOM from './react-dom'

  class Fathers extends React.Component {
          constructor(props) {
              super(props)
              this.state = { list: ['A', 'B', 'C', 'D', 'E', 'F'] }
          }

          render() {
                  return ( <
                      div >
                      <
                      ul > {
                          this.state.list.map((item, index) => < li key = { index } > { item } < /li>)} <
                              /ul> <
                              button onClick = {
                                  () => {
                                      this.setState({ list: ['A', 'C', 'E', 'B', 'G'] })
                                  }
                              } > 更新 < /button> <
                              /div>
                          )
                      }
                  }


                  ReactDOM.render( < Fathers > < /Fathers>,document.getElementById('root'))