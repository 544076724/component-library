<template>
  <div style="width: 100%; height: 100%" ref="lavContainer"></div>
</template>

<script lang="ts">
interface LottieOption {
  loop?: boolean;
  autoplay?: boolean;
  animationData?: {
    [propName: string]: unknown;
  };
}
import { defineComponent, PropType } from "vue";
import lottie from "lottie-web";
export default defineComponent({
  name: "CDhnLottie",
  props: {
    /**
     * lottie的配置项
     * 
     * {
     * 
     *  loop:true, //动画是否循环执行
     * 
     *  autoplay:true, //是否自动播放
     * 
     *  animationData:{ }  //动画json的配置
     * 
     * }
     */
    options: {
      type: Object as PropType<LottieOption>,
      required: true
    },
  },
  mounted() {
    console.log(this.options.animationData, "ssss");
    lottie.loadAnimation({
      container: this.$refs.lavContainer as Element,
      renderer: "svg",
      loop: this.options.loop !== false,
      autoplay: this.options.autoplay !== false,
      animationData: this.options.animationData,
    });
  },
});
</script>

<style  lang="scss">
</style>


