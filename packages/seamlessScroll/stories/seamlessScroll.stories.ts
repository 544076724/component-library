import CDhnSeamlessScroll from '../'

export default {
  title: 'DHNUI/SeamlessScroll',
  component: CDhnSeamlessScroll
}

export const Index = () => ({
  setup () {
    return {
      listData: [
        {
          title: '无缝滚动第一行无缝滚动第一行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第二行无缝滚动第二行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第三行无缝滚动第三行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第四行无缝滚动第四行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第五行无缝滚动第五行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第六行无缝滚动第六行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第七行无缝滚动第七行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第八行无缝滚动第八行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第九行无缝滚动第九行',
          date: '2017-12-16'
        }
      ]
    }
  },
  components: { CDhnSeamlessScroll },
  template: `
    <div style="height:150px;overflow:hidden">
       <c-dhn-seamlessScroll :data="listData">
        <ul class="item" style="margin:0;padding:0">
          <li v-for="item in listData">
              <span class="title" v-text="item.title"></span><span class="date" v-text="item.date"></span>
          </li>
        </ul>
       </c-dhn-seamlessScroll>
    </div>
  `
})
