import CDhnTabPane from './src/tab-pane.vue'
import { App } from 'vue'
import type { SFCWithInstall } from '../utils/types'

CDhnTabPane.install = (app: App): void => {
  app.component(CDhnTabPane.name, CDhnTabPane)
}

const _CDhnTabPane: SFCWithInstall<typeof CDhnTabPane> = CDhnTabPane

export default _CDhnTabPane
