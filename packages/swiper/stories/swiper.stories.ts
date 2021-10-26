import CDhnSwiper from '../'
// import 'swiper/swiper.scss'
import CDhnTabPane from '../../tabPane'
import '../../theme-chalk/src/swiper.scss'
import '../../theme-chalk/src/tab-pane.scss'
export default {
  title: 'DHNUI/Swiper',
  component: CDhnSwiper
}

export const Index = () => ({
  setup () {
    return { }
  },
  components: { CDhnSwiper, CDhnTabPane },
  template: `
  <div style="width:300px;margin:0 auto">
  <c-dhn-swiper v-model="activeName">
   <c-dhn-tab-pane label="用户管理" name="first" :lazy="'unInstall'">用户管理</c-dhn-tab-pane>
   <c-dhn-tab-pane label="配置管理" name="second" :lazy="true">配置管理</c-dhn-tab-pane>
   <c-dhn-tab-pane label="xx管理" name="xx" :lazy="true">xx管理</c-dhn-tab-pane>
   <c-dhn-tab-pane label="ss管理" name="ss" :lazy="true">ss管理</c-dhn-tab-pane>
   <c-dhn-tab-pane label="dd管理" name="dd" :lazy="true">dd管理</c-dhn-tab-pane>
  </c-dhn-swiper>
</div>
  `,
  data () {
    return {
      activeName: 'xx'
    }
  },
})
