<template>
  <div style="width: 100%; height: 100%" ref="lavContainer"></div>
</template>

<script lang="ts">
interface VapOption {
  src: string;
  loop?: boolean;
  onLoadError?: () => void;
  config: {
    [propName: string]: unknown;
  };
}
import { defineComponent, PropType } from "vue";
import Vap from "video-animation-player";
export default defineComponent({
  name: "CDhnVap",
  props: {
    /**
     * vap的配置项
     *
     * {
     *
     *  loop:true, //动画是否循环执行
     *
     *  src:'', //对应vap的mp4地址
     *
     *  onLoadError:{ }  //加载失败回调
     *
     *  config:{}   //对应vap文件的 json配置
     *
     * }
     */
    options: {
      type: Object as PropType<VapOption>,
      required: true,
    },
  },
  mounted() {
    new Vap({
      ...this.options,
      container: this.$refs.lavContainer as Element,
      width: (this.$refs.lavContainer as HTMLElement).offsetWidth,
      height: (this.$refs.lavContainer as HTMLElement).offsetHeight,
      mute: true,
    });
  },
});
</script>

<style  lang="scss">
</style>


