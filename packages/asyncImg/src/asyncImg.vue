<template>
  <div
    v-bind:style="{
      width: '100%',
      height: '100%',
      background: 'url(' + url + ') no-repeat center/100%',
    }"
  >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "CDhnAsyncImg",
  props: {
    /**
     * 静态图片地址
     */
    imgSrc: {
      type: String,
      require: true,
    },
    /**
     * 动态图的地址，异步加载
     */
    asyncImgSrc: {
      type: String,
      require: true,
    },
  },
  setup(props, { emit }) {
    const url = ref(props.imgSrc);
    Promise.race([
      fetch(`${props.asyncImgSrc}`),
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(500);
        }, 10000);
      }),
    ]).then((res: any) => {
      if (res !== 500) {
        res.arrayBuffer().then((r) => {
          console.log(res);
          let type = "image/*"; // 资源类型
          let blob = new Blob([r as Blob], { type: type });
          let imgSrc = window.URL.createObjectURL(blob);
          url.value = imgSrc;
        });
      }
    });
    return {
      url,
    };
  },
});
</script>

<style  lang="scss">
</style>


