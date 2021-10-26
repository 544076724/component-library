import CDhnModal from '../'
import '../../theme-chalk/src/modal.scss'
export default {
  title: 'DHNUI/Modal',
  component: CDhnModal
}


const Template = (args) => ({
  setup() {
    return {
      args
    };
  },
  components: { CDhnModal },
  template: `
    <div>
    
    <c-dhn-modal v-bind="args"   ></c-dhn-modal> 
    </div>
  `,
  methods: {
   
  }
});
export const index: any = Template.bind({});
index.args = {
  showModal:false,
  title:'title33331'
};
