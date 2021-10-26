import CDhnText from '../'
import '../../theme-chalk/src/text.scss'
export default {
  title: 'DHNUI/Text',
  component: CDhnText
}

const Template  = (args) => ({
  setup () {
    console.log(args)
    return {
      args
    }
  },
  components: { CDhnText },
  template: `
  <div>
    <c-dhn-text  v-bind="args">文字超出超长文字测试dome测试</c-dhn-text>
  </div>
  `
})


export const index:any = Template.bind({});
index.args = {
  weight:true,
  isBreak:true,
};
