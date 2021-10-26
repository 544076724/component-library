import CDhnTabs from './src/tabs.vue'
import { App } from 'vue'
import type { SFCWithInstall } from '../utils/types'

CDhnTabs.install = (app: App): void => {
  app.component(CDhnTabs.name, CDhnTabs)
}

const _CDhnTabs: SFCWithInstall<typeof CDhnTabs> = CDhnTabs

export default _CDhnTabs
