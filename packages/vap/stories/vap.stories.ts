import CDhnVap from '../'

export default {
  title: 'DHNUI/Vap',
  component: CDhnVap
}


export const Index = () => ({
  setup() {
    return {  };
  },
  components: { CDhnVap },
  template: `
    <div>
       <c-dhn-vap v-bind="args"></c-dhn-vap>
    </div>
  `,
});
