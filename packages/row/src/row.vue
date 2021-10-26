<template>
  <div
    :class="[
      'c-dhn-row',
      justify !== 'start' ? `is-justify-${justify}` : '',
      type === 'flex' ? 'c-dhn-row--flex' : '',
    ]"
    :style="style"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, provide } from "vue";

export default defineComponent({
  name: "CDhnRow",
  props: {
    /** 栅格间隔 */
    gutter: {
      type: Number,
      default: 0,
    },
    /** 布局方式 flex */
    type: {
      type: String,
      default: "flex",
    },
    /** flex 布局下的水平排列方式  
     * 
     * 可选值：start/end/center/space-around/space-between
     * */
    justify: {
      type: String,
      default: "start",
    },
    /** flex 布局下的垂直排列方式 
     * 
     * 可选值：top/middle/bottom
     * */
    align: {
      type: String,
      default: "top",
    },
  },
  setup(props) {
    //methods
    const gutter = computed(() => props.gutter);
    provide("CDhnRow", {
      gutter,
    });

    const style = computed(() => {
      const ret = {
        marginLeft: "",
        marginRight: "",
      };
      if (props.gutter) {
        ret.marginLeft = `-${props.gutter / 2}px`;
        ret.marginRight = ret.marginLeft;
      }
      return ret;
    });
    return {
      style,
    };
  },
});
</script>

<style lang="scss">
</style>


