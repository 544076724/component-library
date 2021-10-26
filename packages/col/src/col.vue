<template>
  <div :class="['c-dhn-col', classList]" :style="style">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from "vue";
interface IColProps {}
export default defineComponent({
  name: "CDhnCol",
  props: {
    /** 栅格占据的列数 共24 row下的col 总span加起来为24 */
    span: {
      type: Number,
      default: 24,
    },
  },
  setup(props: IColProps, { emit }) {
    //methods
    const { gutter } = inject("CDhnRow", { gutter: { value: 0 } });
    const style = computed(() => {
      if (gutter.value) {
        return {
          paddingLeft: gutter.value / 2 + "px",
          paddingRight: gutter.value / 2 + "px",
        };
      }
      return {};
    });
    const classList = computed(() => {
      const ret: string[] = [];
      const pos = ["span", "offset", "pull", "push"] as const;
      pos.forEach((prop) => {
        const size = props[prop];
        if (typeof size === "number" && size > 0) {
          ret.push(
            prop !== "span"
              ? `c-dhn-col-${prop}-${props[prop]}`
              : `c-dhn-col-${props[prop]}`
          );
        }
      });
      // this is for the fix
      if (gutter.value) {
        ret.push("is-guttered");
      }

      return ret;
    });
    return {
      style,
      classList,
    };
  },
});
</script>

<style  lang="scss">
</style>


