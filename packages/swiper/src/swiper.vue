

<script lang="ts">
import {
  h,
  defineComponent,
  ComponentInternalInstance,
  ref,
  PropType,
  getCurrentInstance,
  watch,
  VNode,
  onUpdated,
  onMounted,
  Component,
  Fragment,
  provide,
} from "vue";
import { isPromise } from "@vue/shared";
import SwiperNav from "./swiper-nav.vue";
import {
  BeforeLeave,
  UpdatePaneStateCallback,
  Pane,
  IETabsProps,
  RootTabs,
} from "../../utils/tabs";

// import 'swiper/css';
interface ISwiperProps extends IETabsProps {
  option: object;
}
export default defineComponent({
  name: "CDhnSwiper",
  components: { SwiperNav },
  props: {
    /** 绑定值，选中选项卡的 name
     *  如果tab-pane 都不没有name属性时 默认选中第一个
     */
    modelValue: {
      //双向绑定值
      type: String,
      default: "",
    },
    /**
     * 切换标签之前的钩子函数，该函数接收俩参数(newValue,value),若返回 false 或者返回 Promise 且被 reject，则阻止切换。
     */
    beforeLeave: {
      //跳转前的回调函数
      type: Function as PropType<BeforeLeave>,
      default: null,
    },
    /**
     * 常用配置
     *
     * {
     *
     * centeredSlides:false,  如果为true,则选中项会居中
     *
     * loop:false, 设置为true启用连续循环模式
     *
     * slideToClickedSlide:true,  设置为true则点击slide会过渡到这个slide
     *
     * allowTouchMove:true, 通过将false/true分配给此属性，通过用鼠标抓住它或用手指（在触摸屏上）触摸它来禁用/启用能力移动滑块
     *
     * slidesPerView:3, 可视区域展示多少项
     *
     * spaceBetween:15, 以像素为单位的每项之间的距离
     *
     * }
     *
     * 更多配置传递 可以查看swiper官网
     */
    option: {
      type: Object,
      default: () => {
        return {
          centeredSlides: false,
          loop: false,
          slideToClickedSlide: true,
          allowTouchMove: true,
          slidesPerView: 3,
          spaceBetween: 15,
        };
      },
    },
  },
  emits: [
    /**
     * tab 被选中时触发的函数，始终会被触发
     */
    "tab-click",
    /**
     * input事件，值发生变化触发的函数，当beforeLeave返回值为false时不会触发
     */
    "input",
    /**
     * 内部函数
     */
    "update:modelValue",
  ],
  setup(props: ISwiperProps, { emit, slots }) {
    const currentName = ref(props.modelValue || "0"); //被选中的项
    const currentIndex = ref(0);
    const pane: any[] = [];
    const panes = ref(pane); //tab 的项
    const instance = getCurrentInstance(); //当前实例
    // const nav$ = ref<typeof TabNav>(null as typeof TabNav); //TabNav的组件实例 后续用来做滚动用
    const paneStatesMap = {};
    let swiperInstance: { instance } = { instance: null };
    //注入一个依赖函数  tabpane中使用  在它加载render时 调用这个函数 把它对应的实例存储起来 到父组件
    provide<UpdatePaneStateCallback>("updatePaneState", (pane: Pane) => {
      paneStatesMap[pane.uid] = pane;
    });
    //再注入一个依赖 把props和当前 选中传下去
    provide<RootTabs>("rootTabs", {
      props,
      currentName,
    });

    provide("updateSwiperState", (swiper) => {
      swiperInstance = swiper;
    });
    const changeCurrentName = (value) => {
      currentName.value = value; //更新值
      emit("input", value); //通知外部2.0
      emit("update:modelValue", value); //通知外部3.0语法
    };
    const setCurrentName = (value) => {
      if (currentName.value === value) return;
      const beforeLeave = props.beforeLeave;
      const before = beforeLeave && beforeLeave(value, currentName.value);
      if (before && isPromise(before)) {
        before.then(
          () => {
            changeCurrentName(value);
            let index = panes.value.findIndex(
              (pane) => pane.props.name === value
            );
            swiperInstance.instance?.slideTo(index);
          },
          () => {
            // ignore promise rejection in `before-leave` hook
          }
        );
      } else if (before !== false) {
        changeCurrentName(value);
        let index = panes.value.findIndex((pane) => pane.props.name === value);
        swiperInstance.instance?.slideTo(index);
      }
    };
    watch(
      // 用户观察者 观察外部传入的选中值  发生变化后 进行对应tab 渲染
      () => props.modelValue,
      (modelValue) => {
        setCurrentName(modelValue);
       
      }
    );
    const getPaneInstanceFromSlot = (
      vnode: VNode,
      paneInstanceList: ComponentInternalInstance[] = []
    ) => {
      //子集
      Array.from((vnode.children || []) as ArrayLike<VNode>).forEach((node) => {
        let type = node.type;
        type = (type as Component).name || type;
        if (type === "CDhnTabPane" && node.component) {
          //找到组件 放起来
          paneInstanceList.push(node.component);
        } else if (type === Fragment || type === "template") {
          getPaneInstanceFromSlot(node, paneInstanceList);
        }
      });
      return paneInstanceList;
    };

    const setPaneInstances = (isForceUpdate = false) => {
      //设置 对应的plane 实例
      if (slots.default) {
        //插槽有的情况
        //subTree此组件自己的 vdom 树的根 vnode  获取根vnode下的子集
        const children = instance?.subTree.children;
        //是个放满vnode的类数组对象  转换成数组 找到content内容区域  排除header
        const content = Array.from(children as ArrayLike<VNode>).find(
          ({ props }) => {
            return props?.class === "c-dhn-swipers__content";
          }
        );

        if (!content) return;
        //获取内容的子集 并且替换成 对应我们存入 paneStatesMap 的对象 这里有的属性使我们需要的
        //里面的label 就是我们展示的名称
        const paneInstanceList: Pane[] = getPaneInstanceFromSlot(content).map(
          (paneComponent) => {
            return paneStatesMap[paneComponent.uid];
          }
        );

        const panesChanged = !(
          //首次加载为true   看看 更新后 pane插槽组件  是否还一样  相等的话  就是还一样
          (
            paneInstanceList.length === panes.value.length &&
            paneInstanceList.every(
              (pane, index) => pane.uid === panes.value[index].uid
            )
          )
        );
        if (isForceUpdate || panesChanged) {
          //panesChanged 为false时表示 组件都一样  为true时表示组件不一样了 需要更新
          //强制更新  或者首次更新时头部赋值
          panes.value = paneInstanceList;
          currentIndex.value = paneInstanceList.findIndex(
            (pane) => pane.props.name === currentName.value
          );
        }
      } else if (panes.value.length !== 0) {
        //插槽没有值  没有子集了  清空 tab项 panes
        panes.value = [];
      }
    };
    const handleTabClick = (tab, tabName, event) => {
      if (tab.props.disabled) return;
      setCurrentName(tabName);
      emit("tab-click", tab, event);
    };

    onUpdated(() => {
      //组件更新后  插槽数量更新后  需要插槽重新计算值
      setPaneInstances();
    });
    onMounted(() => {
      //组件挂在完成  设置对应pane 实例   paneStatesMap中有值了 因为组件的初始化 是由上而下的   而挂载完成是由下而上的
      //在父组件 onMounted时 子组件 一定完成了初始化  而子组件tabpane的初始化 会往paneStatesMap写入对应实例  这会再更新setPaneInstances就可以把 header 和对应pane 加载出来了
      setPaneInstances();
    });
    return {
      // nav$,
      currentName,
      panes,
      handleTabClick,
      currentIndex,
    };
  },
  render() {
    const { panes, handleTabClick, currentIndex, option } = this;

    const header = h(
      //表头
      "div",
      {
        class: ["c-dhn-swipers__header"],
      },
      panes.length
        ? h(SwiperNav, {
            currentIndex,
            panes,
            onTabClick: handleTabClick,
            option,
          })
        : ""
    );
    const panels = h(
      //底部内容
      "div",
      {
        class: "c-dhn-swipers__content",
      },

      this.$slots?.default!()
      //有的话就展示默认的
    );
    return h(
      "div",
      {
        class: "c-dhn-swiper",
      },
      [header, panels]
    );
  },
});
</script>

<style  lang="scss">
</style>


