import CDhnTabs from '../'
import CDhnTabPane from '../../tabPane'
import '../../theme-chalk/src/tabs.scss'
import '../../theme-chalk/src/tab-pane.scss'
export default {
  title: 'DHNUI/Tabs',
  component: CDhnTabs
}


export const Index = () => ({
  components: { CDhnTabs, CDhnTabPane },
  template: `
    <div>
       <c-dhn-tabs v-model="activeName">
        <c-dhn-tab-pane label="用户管理" name="first" :lazy="'unInstall'">用户管理</c-dhn-tab-pane>
        <c-dhn-tab-pane label="配置管理" name="second" :lazy="true">配置管理</c-dhn-tab-pane>
       </c-dhn-tabs>
    </div>
  `,
  data(){
    return {
      activeName:'first'
    }
  }
})
