import CDhnVap from './src/vap.vue'
import { App } from 'vue'
import type { SFCWithInstall } from '../utils/types'

CDhnVap.install = (app: App): void => {
  app.component(CDhnVap.name, CDhnVap)
}

const _CDhnVap: SFCWithInstall<typeof CDhnVap> = CDhnVap

export default _CDhnVap
