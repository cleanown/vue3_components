import MainConstructor from './main.vue'
import { VNode, render, createVNode, shallowReactive, ComponentInternalInstance, ref } from "vue"
type Props = {
  id?: any,
  type?: string,
  message?: string,
  duration?: number,
}
interface MessageHandler {
  close: () => void
}

type MessageContext = {
  id: string
  vnode: VNode
  handler: MessageHandler
  vm: ComponentInternalInstance
}

let seed = 0

const instances: MessageContext[] = shallowReactive([])

const closeMessage = (instance: MessageContext) => {
  const itemIndex = instances.indexOf(instance)
  if (itemIndex === -1) return
  instances.splice(itemIndex, 1)
  const { handler } = instance
  handler.close()
  const topVal = ref(20)
  instances.forEach((item: MessageContext, index: Number) => {
    item.vm.exposed!.top.value = topVal.value
    topVal.value = topVal.value + item.vm.exposed!.height.value + 20
  })
}

export default function MyMessage(options: Props) {
  let id = `my-message${seed++}`
  options.id = id
  const content = document.createElement('div')
  const vnode = createVNode(MainConstructor, {
    ...options, 
    onClose () {
      closeMessage(instance)
    },
    onDestroy () {
      render(null, content)
    },
  })
  render(vnode, content)
  document.body.appendChild(content.firstElementChild!)
  const vm = vnode.component!
  const topVal = ref(20)
  instances.forEach(item => {
    topVal.value = topVal.value + item.vm.exposed!.height.value + 20
  })
  vm.exposed!.top.value = topVal.value
  const handler: MessageHandler = {
    close: () => {
      vm.exposed!.visible.value = false
    }
  }
  const instance: MessageContext = {
    id: id,
    vnode: vnode,
    vm: vm,
    handler: handler
  }
  instances.push(instance)
}