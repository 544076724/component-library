import CDhnCol from './src/col.vue'
import { App } from 'vue'
import type { SFCWithInstall } from '../utils/types'

CDhnCol.install = (app: App): void => {
  app.component(CDhnCol.name, CDhnCol)
}

const _CDhnCol: SFCWithInstall<typeof CDhnCol> = CDhnCol

export default _CDhnCol
