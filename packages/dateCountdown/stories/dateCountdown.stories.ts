import CDhnDateCountdown from '../'
import '../../theme-chalk/src/date-countdown.scss'
export default {
  title: 'DHNUI/DateCountdown',
  component: CDhnDateCountdown,
}

const Template = (args) => ({
    setup() {
      return { 
        args
       };
    },
    components: { CDhnDateCountdown },
    template: `
      <div>
        <c-dhn-date-countdown 
        v-bind="args" 
        >
        </c-dhn-date-countdown>
      </div>
    `,
});

export const index:any = Template.bind({});
index.args = {
  dayLang:"天",
  countdownTime:4000
};