import CDhnAsyncImg from '../'

export default {
  title: 'DHNUI/AsyncImg',
  component: CDhnAsyncImg
}


const Template  = (args) => ({
  setup () {
    return {
      args
    }
  },
  components: { CDhnAsyncImg },
  template: `
    <div style="width:400px;height:400px">
      <c-dhn-async-img v-bind="args" ></c-dhn-async-img>
    </div>
  `
})

export const index:any = Template.bind({});
index.args = {
  imgSrc:'https://awsbj-game2u.pengpengla.com/aig-pepper-h5/ppact-green-live/1.0.0/assets/img/background.4d554385.png',
  asyncImgSrc:'https://awsbj-game2u.pengpengla.com/aig-pepper-h5/ppact-union-war/1.0.0/assets/4847f66a6551f63db516dcebd642d5ed.gif'
};