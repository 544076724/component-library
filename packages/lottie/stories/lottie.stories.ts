import CDhnLottie from '../'

export default {
  title: 'DHNUI/Lottie',
  component: CDhnLottie
}


export const Index = () => ({
  setup() {
    return {  };
  },
  components: { CDhnLottie },
  template: `
    <div>
       <c-dhn-lottie v-bind="args"></c-dhn-lottie>
    </div>
  `,
});
