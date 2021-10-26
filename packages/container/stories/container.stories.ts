import CDhnContainer from '../'
import '../../theme-chalk/src/container.scss'
export default {
  title: 'DHNUI/Container',
  component: CDhnContainer
}

const Template  = (args) => ({
  setup () {
   
    return {
      args
    }
  },
  components: { CDhnContainer },
  template: `
  <div>
    <c-dhn-container   v-bind="args">
      一个测试
    </c-dhn-container>
  </div>
  `
})

export const index:any = Template.bind({});
index.args = {
};



