import ImgViewConstructor from './imgView.vue'
import { render, createVNode } from "vue"

export type ImgContent = {
  fileName: string,
  url: string
}

function imgView (list: ImgContent[], index: Number) {
  const content = document.createElement('div')
  const vnode = createVNode(
    ImgViewConstructor, 
    {
      imgList: list,
      index: index,
      zIndex: 1000,
      onDestroy () {
        render(null, content)
      },
    }
  )
  render(vnode, content)
  document.body.appendChild(content.firstElementChild!)
}
export default imgView