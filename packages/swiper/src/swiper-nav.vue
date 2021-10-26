

<script lang='ts'>
import { h, defineComponent, PropType, inject } from "vue";
import { Pane } from "../../utils/tabs";
import { NOOP } from "@vue/shared";
import { Swiper, SwiperSlide } from "dhn-swiper/vue";
export default defineComponent({
  name: "CDhnSwiperNav",
  components: { Swiper, SwiperSlide },
  props: {
    panes: {
      type: Array as PropType<Pane[]>,
      default: () => [] as Pane[],
    },
    currentIndex: {
      type: Number,
      default: "",
    },
    onTabClick: {
      type: Function as PropType<
        (tab: Pane, tabName: string, ev: Event) => void
      >,
      default: NOOP,
    },
    option: {
      type: Object,
    },
  },
  setup(props) {
    const swiper$: { instance } = { instance: null };
    const updateSwiperState: any = inject("updateSwiperState");
    updateSwiperState(swiper$);
    // const { onTabClick } = props;
    // const swiperTabClick = (pane, tabName, ev) => {
    //   // const index = props.panes.findIndex(
    //   //   (item) => item.props.name === tabName
    //   // );
    //   // swiper$.instance?.slideTo(index);
    //   //   console.log(swiper$.instance?.slieTo)
    //   onTabClick(pane, tabName, ev); //切换
    // };

    return { swiper$ };
  },
  render() {
    const { panes, swiper$, onTabClick, currentIndex, option } = this;

    const tabs = panes.map((pane: any, index) => {
      let tabName = pane.props.name || pane.index || `${index}`;
      pane.index = `${index}`;
      const tabLabelContent = pane.instance.slots.label?.() || pane.props.label;
      const tabindex = pane.active ? 0 : -1;

      let content = h(
        "div",
        {
          class: {
            "c-dhn-tabs__item": true,
            "is-active": pane.active,
            "is-disabled": pane.props.disabled,
          },
          id: `tab-${tabName}`,
          key: `tab-${tabName}`,
          "aria-controls": `pane-${tabName}`,
          role: "tab",
          "aria-selected": pane.active,
          ref: `tab-${tabName}`,
          tabindex: tabindex,
          onClick: (ev) => {
            onTabClick(pane, tabName, ev); //swiper 切换
          },
        },
        [tabLabelContent]
      );
      return h(SwiperSlide, null, {
        default() {
          return content;
        },
      });
     
    });
    // console.log(option,'option')
    return h(
      Swiper,
      {
        // class: "c-dhn-swiper__nav",
        ...option,
        initialSlide: currentIndex,
        onSwiper: (swiper) => {
          swiper$.instance = swiper;
        },
      },
      {
        default() {
          return [tabs];
        },
      }
    );
  },
});
</script>
