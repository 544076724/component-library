import { LuckyWheel } from 'vue-luck-draw/vue3'
import { App } from 'vue'
import type { SFCWithInstall } from '../utils/types'

LuckyWheel.install = (app: App): void => {
  app.component('CDhnWheel', LuckyWheel)
}

const _CDhnWheel: SFCWithInstall<typeof LuckyWheel> = LuckyWheel

export default _CDhnWheel
