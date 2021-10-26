import CDhnSeamlessScroll from './src/seamlessScroll.vue'
import { App } from 'vue'
import type { SFCWithInstall } from '../utils/types'

CDhnSeamlessScroll.install = (app: App): void => {
  app.component(CDhnSeamlessScroll.name, CDhnSeamlessScroll)
}

const _CDhnSeamlessScroll: SFCWithInstall<typeof CDhnSeamlessScroll> = CDhnSeamlessScroll

export default _CDhnSeamlessScroll
