import CDhnAsyncImg from './src/asyncImg.vue'
import { App } from 'vue'
import type { SFCWithInstall } from '../utils/types'

CDhnAsyncImg.install = (app: App): void => {
  app.component(CDhnAsyncImg.name, CDhnAsyncImg)
}

const _CDhnAsyncImg: SFCWithInstall<typeof CDhnAsyncImg> = CDhnAsyncImg

export default _CDhnAsyncImg
