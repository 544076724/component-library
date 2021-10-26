import CDhnLottie from './src/lottie.vue'
import { App } from 'vue'
import type { SFCWithInstall } from '../utils/types'

CDhnLottie.install = (app: App): void => {
  app.component(CDhnLottie.name, CDhnLottie)
}

const _CDhnLottie: SFCWithInstall<typeof CDhnLottie> = CDhnLottie

export default _CDhnLottie
