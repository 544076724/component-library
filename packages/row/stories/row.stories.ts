import CDhnRow from '..'
import CDhnCol from '../../col'
import '../../theme-chalk/src/row.scss'
import '../../theme-chalk/src/col.scss'
export default {
  title: 'DHNUI/Row',
  component: CDhnRow
}

const Template  = (args) => ({
  setup () {
 
    return {
      args
    }
  },
  components: { CDhnRow,CDhnCol },
  template: `
    <div>
      <c-dhn-row  
        v-bind="args"
      >
       <c-dhn-col :span="8">fdsfsdf</c-dhn-col>
       <c-dhn-col :span="8">持续保持小白菜迟迟不能吃</c-dhn-col>
       <c-dhn-col :span="8">fdsfsdf</c-dhn-col>
       
       </c-dhn-row  >
    </div>
  `
})
export const index:any = Template.bind({});
index.args = {
  justify:'justify',
  gutter:10,
  type:'flex'
};