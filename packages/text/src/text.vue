<template>
  <div class="c-dhn-text" :style="style">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
export default defineComponent({
  name: "CDhnText",
  props: {
    /**
     * 文本是否加粗
     */
    weight: {
      type: Boolean,
      default: false,
    },
    /**
     * 是否折行显示，不折行时超出...
     */
    isBreak: {
      //是否折行
      type: Boolean,
      default: false,
    },

  },
  setup(props, { emit }) {
    const style = computed(() => {
      const { weight, isBreak } = props;
      let style: {
        fontWeight?: string;
        whiteSpace?: string;
        overflow?: string;
        textOverflow?: string;
      } = {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      };
      if (isBreak) {
        style = {};
      }
      if (weight) {
        style.fontWeight = "bold";
      }

      return style;
    });

    return {
      style,
    };
  },
});
</script>

<style  lang="scss">
</style>


