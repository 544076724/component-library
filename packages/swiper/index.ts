import CDhnSwiper from './src/swiper.vue'
import { App } from 'vue'
import type { SFCWithInstall } from '../utils/types'

CDhnSwiper.install = (app: App): void => {
  app.component(CDhnSwiper.name, CDhnSwiper)
}

const _CDhnSwiper: SFCWithInstall<typeof CDhnSwiper> = CDhnSwiper

export default _CDhnSwiper
