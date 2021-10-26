import CDhnCol from '../'
import CDhnRow from '../../row'
import '../../theme-chalk/src/col.scss'
import '../../theme-chalk/src/row.scss'
export default {
  title: 'DHNUI/Col',
  component: CDhnCol
}


export const Index = () => ({
  setup() {
    return { justify:'center',gutter:20 };
  },
  components: { CDhnCol,CDhnRow},
  template: `
    <div>
    <c-dhn-row  
    :justify="justify"
    :gutter="gutter"
    type="flex"
    >
       <c-dhn-col :span="8">fdsfsdf</c-dhn-col>
       <c-dhn-col :span="8">持续保持小白菜迟迟不能吃</c-dhn-col>
       <c-dhn-col :span="8">fdsfsdf</c-dhn-col>
       
       </c-dhn-row  >
       
    </div>
  `,
});
