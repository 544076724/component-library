import CDhnDateCountdown from './src/dateCountdown.vue'
import { App } from 'vue'
import type { SFCWithInstall } from '../utils/types'

CDhnDateCountdown.install = (app: App): void => {
  app.component(CDhnDateCountdown.name, CDhnDateCountdown)
}

const _CDhnDateCountdown: SFCWithInstall<typeof CDhnDateCountdown> = CDhnDateCountdown

export default _CDhnDateCountdown
