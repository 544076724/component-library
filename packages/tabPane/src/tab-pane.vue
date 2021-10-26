<template>
  <div
    v-if="shouldBeRender"
    v-show="active"
    class="c-dhn-tab-pane"
    role="tabpanel"
    :aria-hidden="!active"
    :aria-labelledby="`tab-${paneName}`"
  >
    <slot></slot>
  </div>
</template>
<script lang='ts'>
import {
  defineComponent,
  ref,
  computed,
  inject,
  getCurrentInstance,
} from "vue";
import {
  IEPaneProps,
  UpdatePaneStateCallback,
  RootTabs,
} from "../../utils/tabs";

export default defineComponent({
  name: "CDhnTabPane",
  props: {
    /** 选项卡标题 */
    label: {
      type: String,
      default: "",
    },
    /** 与选项卡绑定值 value 对应的标识符，表示选项卡别名 */
    name: {
      type: String,
      default: "",
    },
    /** 是否禁用,默认不被禁用 */
    disabled: Boolean,
    /** 标签是否延迟渲染。
     * 
     *  布尔值为false时 始终被渲染 只是display控制显示隐藏。
     * 
     *  布尔值为true时 首次渲染 未选选中的 不被渲染出来。 后续选中被渲染出来后 之后不被选中后不会卸载 会通过diaplay隐藏
     * 
     *  值为unInstall时  只有被选中才会渲染  未被选中就会从界面卸载 
     */
    lazy: [Boolean, String],
  },
  setup(props: IEPaneProps) {
    const index = ref<string>("");
    const loaded = ref(false);
    //获取 注入的内容
    const rootTabs = inject<RootTabs>("rootTabs");
    const updatePaneState = inject<UpdatePaneStateCallback>("updatePaneState");

    if (!rootTabs || !updatePaneState) {
      throw new Error(`CDhnTabPane must use with CDhnTabs`);
    }

    const active = computed(() => {
      //当前值如果 是选中值 设置被选中
      const active = rootTabs.currentName.value === (props.name || index.value);
      if (active) {
        loaded.value = true;
      }
      return active;
    });

    const paneName = computed((): string => {
      return props.name || index.value;
    });

    const shouldBeRender = computed(() => {
      if (props.lazy === "unInstall") {
        return active.value;
      }
      return !props.lazy || loaded.value || active.value;
    });

    const instance = getCurrentInstance();
    updatePaneState({
      uid: instance?.uid!,
      instance: instance!,
      props,
      paneName,
      active,
      index,
    });

    return {
      index,
      loaded,
      active,
      paneName,
      shouldBeRender,
    };
  },
});
</script>
