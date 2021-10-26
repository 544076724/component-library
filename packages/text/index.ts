import CDhnText from './src/text.vue'
import { App } from 'vue'
import type { SFCWithInstall } from '../utils/types'

CDhnText.install = (app: App): void => {
  app.component(CDhnText.name, CDhnText)
}

const _CDhnText: SFCWithInstall<typeof CDhnText> = CDhnText

export default _CDhnText
