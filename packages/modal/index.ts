import CDhnModal from './src/modal.vue'
import { App } from 'vue'
import type { SFCWithInstall } from '../utils/types'

CDhnModal.install = (app: App): void => {
  app.component(CDhnModal.name, CDhnModal)
}

const _CDhnModal: SFCWithInstall<typeof CDhnModal> = CDhnModal
export default _CDhnModal
