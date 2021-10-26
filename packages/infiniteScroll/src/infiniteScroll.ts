import { nextTick } from 'vue'
import { isFunction } from '@vue/shared'
import throttle from 'lodash/throttle'
import { entries } from '../../utils/utils'
import { getScrollContainer, getOffsetTopDistance } from '../../utils/dom'
import throwError from '../../utils/error'
import { ObjectDirective, ComponentPublicInstance } from 'vue'

export const SCOPE = 'CDhnInfiniteScroll'
export const CHECK_INTERVAL = 50
export const DEFAULT_DELAY = 200
export const DEFAULT_DISTANCE = 0

const attributes = {
  delay: {
    type: Number,
    default: DEFAULT_DELAY
  },
  distance: {
    type: Number,
    default: DEFAULT_DISTANCE
  },
  disabled: {
    type: Boolean,
    default: false
  },
  immediate: {
    type: Boolean,
    default: true
  },
  root: {
    type: Boolean,
    default: false
  }
}

type Attrs = typeof attributes
type ScrollOptions = { [K in keyof Attrs]: Attrs[K]['default'] }
type InfiniteScrollCallback = () => void
type InfiniteScrollEl = HTMLElement & {
  [SCOPE]: {
    container: HTMLElement | Window
    containerEl: HTMLElement
    instance: ComponentPublicInstance
    delay: number // export for test
    lastScrollTop: number
    cb: InfiniteScrollCallback
    onScroll: () => void
    observer?: MutationObserver
  }
}

const getScrollOptions = (
  el: HTMLElement,
  instance: ComponentPublicInstance
): ScrollOptions => {
  return entries(attributes).reduce((acm, [name, option]) => {
    const { type, default: defaultValue } = option
    const attrVal = el.getAttribute(`infinite-scroll-${name}`)
    let value = instance[attrVal!] ?? attrVal ?? defaultValue
    value = value === 'false' ? false : value
    value = type(value)
    acm[name] = Number.isNaN(value) ? defaultValue : value
    return acm
  }, {} as ScrollOptions)
}

const destroyObserver = (el: InfiniteScrollEl) => {
  const { observer } = el[SCOPE]

  if (observer) {
    observer.disconnect()
    delete el[SCOPE].observer
  }
}

const handleScroll = (
  el: InfiniteScrollEl,
  cb: InfiniteScrollCallback,
  oldEl?: InfiniteScrollEl
) => {
  const { container, containerEl, instance, observer, lastScrollTop } = el[
    SCOPE
  ]
  const { disabled, distance } = getScrollOptions(oldEl || el, instance)
  const { clientHeight, scrollHeight, scrollTop } = containerEl
  const delta = scrollTop - lastScrollTop
  el[SCOPE].lastScrollTop = scrollTop

  // trigger only if full check has done and not disabled and scroll down
  if (observer || disabled || delta < 0) return
  let shouldTrigger = false

  if (container === el) {
    shouldTrigger = scrollHeight - (clientHeight + scrollTop) <= distance
  } else {
    // get the scrollHeight since el might be visible overflow
    const { clientTop, scrollHeight: height } = el
    const offsetTop = getOffsetTopDistance(el, containerEl)
    shouldTrigger =
      scrollTop + clientHeight >= offsetTop + clientTop + height - distance
  }

  if (shouldTrigger) {
    cb.call(instance)
  }
}

function checkFull (
  el: InfiniteScrollEl,
  cb: InfiniteScrollCallback,
  oldEl: InfiniteScrollEl
) {
  const { containerEl, instance } = el[SCOPE]
  const { disabled } = getScrollOptions(oldEl || el, instance)

  if (disabled) return

  if (containerEl.scrollHeight <= containerEl.clientHeight) {
    cb.call(instance)
  } else {
    destroyObserver(el)
  }
}

const InfiniteScroll: ObjectDirective<
  InfiniteScrollEl,
  InfiniteScrollCallback
> = {
  async mounted (el, binding) {
    const { instance, value: cb } = binding

    if (!isFunction(cb)) {
      throwError(SCOPE, "'v-infinite-scroll' binding value must be a function")
    }
    // ensure parentNode mounted
    await nextTick()

    const { delay, immediate, root } = getScrollOptions(
      el,
      instance as ComponentPublicInstance
    )
    let oldEl
    if (root) {
      oldEl = el
      el = document.documentElement as InfiniteScrollEl
    }
    const container = getScrollContainer(el, true)
    const containerEl =
      container === window
        ? document.documentElement
        : (container as HTMLElement)
    // const containerEl = document.documentElement;
    const onScroll = throttle(handleScroll.bind(null, el, cb, oldEl), delay)

    if (!container) return

    el[SCOPE] = {
      instance: instance!,
      container,
      containerEl,
      delay,
      cb,
      onScroll,
      lastScrollTop: containerEl.scrollTop
    }

    if (immediate) {
      if (!root) {
        const observer = new MutationObserver(
          throttle(checkFull.bind(null, el, cb, oldEl), CHECK_INTERVAL)
        )
        el[SCOPE].observer = observer
        observer.observe(el, { childList: true, subtree: true })
        checkFull(el, cb, oldEl)
      }
    }

    container.addEventListener('scroll', onScroll)
  },
  unmounted (el, binding) {
    const { instance } = binding
    const { root } = getScrollOptions(el, instance as ComponentPublicInstance)
    if (root) {
      el = document.documentElement as InfiniteScrollEl
    }
    const { container, onScroll } = el[SCOPE]
    container?.removeEventListener('scroll', onScroll)
    destroyObserver(el)
  }
}

export default InfiniteScroll
