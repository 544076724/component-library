<template>
  <div class="c-dhn-date-countdown">
    <ul class="time-down" :class="dateClassName">
      <li v-if="dayLang">
        <span>
          <div class="c-dhn-time-num">{{ timeObj.day }}</div>
          <em class="c-dhn-time" v-if="type !== 'horizontal'">{{ dayLang }}</em>
        </span>
        <em class="c-dhn-time" v-if="dayLang && type === 'horizontal'">{{
          dayLang
        }}</em>
        <em class="no-text" v-if="type == 'vertical'">:</em>
      </li>
      <li>
        <span>
          <div class="c-dhn-time-num">{{ timeObj.hour }}</div>
          <em class="c-dhn-time" v-if="hourLang && type !== 'horizontal'">{{
            hourLang
          }}</em>
        </span>
        <em class="c-dhn-time" v-if="hourLang && type === 'horizontal'">{{
          hourLang
        }}</em>
        <em class="no-text" v-if="type == 'vertical'">:</em>
      </li>
      <li>
        <span>
          <div class="c-dhn-time-num">{{ timeObj.minute }}</div>
          <em class="c-dhn-time" v-if="minLang && type !== 'horizontal'">{{
            minLang
          }}</em>
        </span>
        <em class="c-dhn-time" v-if="minLang && type === 'horizontal'">{{
          minLang
        }}</em>
        <em class="no-text" v-if="type == 'vertical'">:</em>
      </li>
      <li>
        <span>
          <div class="c-dhn-time-num">{{ timeObj.second }}</div>
          <em class="c-dhn-time" v-if="secLang && type !== 'horizontal'">{{
            secLang
          }}</em>
        </span>
        <em class="c-dhn-time" v-if="secLang && type === 'horizontal'">{{
          secLang
        }}</em>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  reactive,
  watch,
  toRefs,
  computed,
} from "vue";
import { getCountdownTime, Time } from "../../utils/time";

interface CountdownTimeObj extends Time {
  countdownTime: number;
}

interface updateTime {
  (time: number): void;
  timer?: number | null;
}

const updateTime: updateTime = function (
  this: { timeObj: CountdownTimeObj },
  time: number
): void {
  if (time) {
    updateTime.timer = window.setTimeout(
      function (this: { timeObj: CountdownTimeObj }) {
        let countdownTime = time - 1;
        this.timeObj = {
          countdownTime: countdownTime,
          ...getCountdownTime(countdownTime),
        };
        updateTime.bind(this)(countdownTime);
      }.bind(this),
      1000
    );
  } else {
    clearTimeout(updateTime.timer!);
    updateTime.timer = null;
    this.timeObj = {
      countdownTime: 0,
      ...getCountdownTime(0),
    };
  }
};

export default defineComponent({
  name: "CDhnDateCountdown",
  props: {
    /** 文字天的多语言 */
    dayLang: {
      type: [Boolean, String],
      default: ":",
    },
    /** 文字小时的语言 */
    hourLang: {
      type: String as PropType<String>,
      default: ":",
    },
    /** 文字分钟的多语言 */
    minLang: {
      type: String as PropType<String>,
      default: ":",
    },
    /** 文字秒的多语言 */
    secLang: {
      type: String as PropType<String>,
      default: "",
    },
    /** 风格模式
     *
     * horizontal 为左右展示
     *
     * vertical 为上下展示
     */
    type: {
      type: String as PropType<String>,
      validator(this: never, val: string) {
        return ["horizontal", "vertical"].includes(val);
      },
      default: "horizontal",
    },
    /** 倒计时的秒数，以秒为单位，会把该时间，转换为天 时分秒 开始倒计时，该项为必填项。 */
    countdownTime: {
      type: Number as PropType<Number>,
      require: true,
    },
  },
  setup(props, { emit }) {
    let state: { timeObj: CountdownTimeObj } = reactive({
      timeObj: {
        day: "00",
        hour: "00",
        minute: "00",
        second: "00",
        countdownTime: props.countdownTime as number,
      },
    });
    watch(
      // 用户观察者 观察外部传入的选中值  发生变化后 进行对应tab 渲染
      () => props.countdownTime,
      (val) => {
        // state.timeObj.countdownTime = val as number;
        updateTime.bind(state)(val as number);
      }
    );
    const dateClassName = computed(() => props.type);
    updateTime.bind(state)(state.timeObj.countdownTime);
    return {
      ...toRefs(state),
      dateClassName,
    };
  },
});
</script>

<style lang="scss" >
</style>





