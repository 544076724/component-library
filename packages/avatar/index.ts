import CDhnAvatar from './src/avatar.vue'
import { App } from 'vue'
import type { SFCWithInstall } from '../utils/types'

CDhnAvatar.install = (app: App): void => {
  app.component(CDhnAvatar.name, CDhnAvatar)
}

const _CDhnAvatar: SFCWithInstall<typeof CDhnAvatar> = CDhnAvatar

export default _CDhnAvatar
