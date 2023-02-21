import { ComputedRef, Ref } from 'vue'

export type WindowOrDocumentEventMap = WindowEventMap & DocumentEventMap
export type MaybeRef<T> = T | Ref<T> | ComputedRef<T>
export type ElEvent = Window | EventTarget | Element | null
export type VueInstance = InstanceType<ReturnType<typeof defineComponent>>
export type MaybeElementRef = MaybeRef<Element | VueInstance | undefined | null>

function noop() {}
export function unrefElement(elRef: MaybeElementRef) {
  const plain = unref(elRef)
  return (plain as VueInstance)?.$el ?? plain
}

export function useEventListener<Event extends keyof WindowEventMap>(
  event: Event,
  listener: (this: Window, ev: WindowEventMap[Event]) => void,
  options?: AddEventListenerOptions
): () => void
export function useEventListener<Event extends keyof WindowOrDocumentEventMap>(
  target: HTMLElement | Window,
  event: Event,
  listener: (this: Window, ev: WindowOrDocumentEventMap[Event]) => void,
  options?: AddEventListenerOptions
): () => void
export function useEventListener<T extends HTMLElement, Event extends keyof DocumentEventMap>(
  target: MaybeRef<T | null>,
  event: Event,
  listener: (this: Window, ev: DocumentEventMap[Event]) => void,
  options?: AddEventListenerOptions
): () => void

export function useEventListener(...args: any[]) {
  let target: Element | Window | MaybeRef<EventTarget | null>
  let event: string
  let listener: EventListener
  let options: AddEventListenerOptions

  if (typeof args[0] === 'string') {
    // 不传 el
    ;[event, listener, options] = args
    target = window
  } else {
    ;[target, event, listener, options] = args
  }

  let stop = noop
  if (!target) {
    return stop
  }

  if (isRef(target) && unref(target) === null) {
    onMounted(() => {
      const el = unref(target) as ElEvent
      if (!el) {
        return
      }
      el.addEventListener(event, listener, options)
      stop = () => {
        el.removeEventListener(event, listener, options)
      }
    })
  } else {
    const el = unref(target)
    ;(el as Element | Window).addEventListener(event, listener, options)
    stop = () => {
      ;(el as Element | Window).removeEventListener(event, listener, options)
    }
  }

  if (getCurrentInstance()) {
    onUnmounted(stop)
  }

  return stop
}
