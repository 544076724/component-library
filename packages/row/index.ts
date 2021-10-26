import CDhnRow from './src/row.vue'
import { App } from 'vue'
import type { SFCWithInstall } from '../utils/types'

CDhnRow.install = (app: App): void => {
  app.component(CDhnRow.name, CDhnRow)
}

const _CDhnRow: SFCWithInstall<typeof CDhnRow> = CDhnRow

export default _CDhnRow
