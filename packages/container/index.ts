import CDhnContainer from './src/container.vue'
import { App } from 'vue'
import type { SFCWithInstall } from '../utils/types'

CDhnContainer.install = (app: App): void => {
  app.component(CDhnContainer.name, CDhnContainer)
}

const _CDhnContainer: SFCWithInstall<typeof CDhnContainer> = CDhnContainer

export default _CDhnContainer
