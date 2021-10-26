import CDhnInfiniteScroll from './src/infiniteScroll'
import { App } from 'vue'
import type { SFCWithInstall } from '../utils/types'


const _CDhnInfiniteScroll: SFCWithInstall<typeof CDhnInfiniteScroll> = CDhnInfiniteScroll as SFCWithInstall<typeof CDhnInfiniteScroll>
_CDhnInfiniteScroll.install = (app: App): void => {
  app.directive('InfiniteScroll', CDhnInfiniteScroll)
}

export default _CDhnInfiniteScroll
