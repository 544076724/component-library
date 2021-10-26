import { App } from 'vue'
import CDhnDateCountdown from '../dateCountdown'
import CDhnAvatar from '../avatar'
import CDhnCol from '../col'
import CDhnContainer from '../container'
import CDhnRow from '../row'
import CDhnText from '../text'
import CDhnTabs from '../tabs'
import CDhnSwiper from '../swiper'
import CDhnTabPane from '../tabPane'
import CDhnInfiniteScroll from '../infiniteScroll'
import CDhnSeamlessScroll from '../seamlessScroll'
import CDhnModal from '../modal'
import CDhnLottie from '../lottie'
import CDhnVap from '../vap'
import CDhnWheel from '../wheel'
import CDhnAsyncImg from '../asyncImg'
export {
  CDhnDateCountdown,
  CDhnAvatar,
  CDhnCol,
  CDhnContainer,
  CDhnRow,
  CDhnText,
  CDhnTabs,
  CDhnSwiper,
  CDhnTabPane,
  CDhnInfiniteScroll,
  CDhnSeamlessScroll,
  CDhnModal,
  CDhnLottie,
  CDhnVap,
  CDhnWheel,
  CDhnAsyncImg
}
const components = [
  CDhnDateCountdown,
  CDhnAvatar,
  CDhnCol,
  CDhnContainer,
  CDhnRow,
  CDhnText,
  CDhnTabs,
  CDhnSwiper,
  CDhnTabPane,
  CDhnSeamlessScroll,
  CDhnModal,
  CDhnLottie,
  CDhnVap,
  CDhnWheel,
  CDhnAsyncImg
]
const plugins = [CDhnInfiniteScroll]
const install = (app: App, opt: Object): void => {
  components.forEach(component => {
    app.component(component.name, component)
  })
  plugins.forEach((plugin) => {
    app.use(plugin)
  })
}
export default {
  version: 'independent',
  install
}
