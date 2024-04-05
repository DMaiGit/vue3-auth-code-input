<script lang="ts" setup>
import { withDefaults, ref, toRefs, defineOptions, computed, watch, nextTick } from 'vue';
import { SmsCodePropsType } from './@types/types.d';
import { _debounce } from './lib/common';

defineOptions({ name: 'SmsCode' });
const props = withDefaults(defineProps<SmsCodePropsType>(), {
  width: '',
  height: '',
  code: '',
  codeHeight: 40,
  length: 6,
  type: 'number',
  title: '',
  contentText: '',
  card: false,
  borderColor: '#F1F1F1',
  activeBorderColor: '#007AFF',
  color: '#333333',
  fontSize: 12,
  customName: 'input-group-user',
  customItemName: 'input-item-user',
  sendText: '发送验证码',
  sendBtnColor: '#007AFF',
  sendCountDown: 120,
  mobile: ''
});

const emits = defineEmits(['update:code', 'send']);
const {
  width, height, code, length, title,
  contentText, fontSize, borderColor,
  activeBorderColor, codeHeight, sendText,
  sendBtnColor, mobile, sendCountDown
} = toRefs(props);
const activeInputIndex = ref(-1); // 默认没有输入框是激活的
const localCodeData = ref<string[]>([]);
const localWidth = computed(() => typeof width.value === 'number' ? `${width.value}px` : width.value);
const localHeight = computed(() => typeof height.value === 'number' ? `${height.value}px` : height.value);
const localFontSize = computed(() => typeof fontSize.value === 'number' ? `${fontSize.value}px` : fontSize.value);
const localCodeHeight = computed(() => typeof codeHeight.value === 'number' ? `${codeHeight.value}px` : codeHeight.value);
const countdown = ref(sendCountDown.value); // 倒计时秒数
const isCounting = ref(false); // 是否正在倒计时

// 初始化localCodeData
const initializeLocalCode = () => {
  const initialCodeString = code.value.toString();
  const initialCode = initialCodeString.split('').slice(0, length.value && length.value >=4 ? length.value : 4);
  const filledArray = new Array(length.value).fill('');
  filledArray.forEach((_, index) => {
    filledArray[index] = initialCode[index] || '';
  });
  localCodeData.value = filledArray;
};

const handleInput = (event: Event, index: number) => {
  const inputElement = event.target as HTMLInputElement;
  let value = inputElement.value.trim();

  // 如果输入长度超过1个字符，则清空输入框，并使其失焦，然后重新聚焦
  if (value.length > 1) {
    inputElement.value = ''; // 清空输入框
    localCodeData.value[index] = ''; // 清空绑定的数据
    inputElement.blur(); // 失焦输入框
    // 使用 nextTick 确保 DOM 更新后执行
    nextTick(() => {
      inputElement.focus(); // 重新聚焦到输入框
      inputElement.setSelectionRange(0, 0); // 将光标设置到输入框的开始位置
    });
    return
  } else {
    localCodeData.value[index] = value;
  }

  // 立即更新code值
  emits('update:code', localCodeData.value.join(''));

  // 如果当前输入框非最后一个，且有值，自动跳转到下一个输入框
  if (value && index < localCodeData.value.length - 1) {
    // 获取当前输入框的父级元素（<span>），然后找到下一个兄弟元素（<span>）
    const parentSpan = inputElement.parentElement;
    const nextSpan = parentSpan?.nextElementSibling as HTMLSpanElement | null;
    // 获取下一个span中的input元素并聚焦
    const nextInput = nextSpan?.querySelector('input') as HTMLInputElement | null;
    nextInput?.focus();
  } else if (localCodeData.value.every(val => val !== '')) { // 所有输入框都已填满
    inputElement.blur(); // 当前输入框失焦
    // 尝试关闭键盘，对于移动设备
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }
};
// 防抖 handleKeyDown 方法
const debouncedHandleKeyDown = _debounce(handleKeyDownLogic, 50);

const handleKeyDown = (event: KeyboardEvent, index: number) => {
  debouncedHandleKeyDown(event, index);
};

function handleKeyDownLogic(event: KeyboardEvent, index: number) {
  if (event.key === 'Backspace') {
    const currentInput = event.target as HTMLInputElement;
    // 如果当前输入框为空，且不是第一个，焦点移动到前一个输入框
    if (index > 0 && !localCodeData.value[index]) {
      localCodeData.value[index - 1] = '';
      // 得到当前输入框的父级元素（<span>），然后找到前一个兄弟元素（<span>）
      const parentSpan = currentInput.parentElement;
      const prevSpan = parentSpan?.previousElementSibling as HTMLSpanElement | null;
      // 获取前一个span中的input元素并聚焦
      const prevInput = prevSpan?.querySelector('input') as HTMLInputElement | null;
      prevInput?.focus();
      // 确保将当前输入框的值更新为空字符串
      currentInput.value = '';
    }
    // 在删除操作后更新父组件的code值
    emits('update:code', localCodeData.value.join(''));
  }
}

/** 移出焦点时移除active类 */
const handleInputBlur = () => {
  activeInputIndex.value = -1; // 重置，表示没有输入框处于激活状态
};

/** 获取焦点时激活当前activeClass */
const handleInputFocus = () => {
  // 找到第一个为空的输入索引
  const firstEmptyIndex = localCodeData.value.indexOf('');

  if (firstEmptyIndex !== -1) {
    // 如果有空的输入框，焦点移到第一个空的输入框
    activeInputIndex.value = firstEmptyIndex;
  } else {
    // 如果所有输入框都填了，焦点移到最后一个输入框
    activeInputIndex.value = length.value - 1;
  }

  // 找到目标输入框并聚焦
  const targetInput = document.querySelectorAll('.input-item')[activeInputIndex.value] as HTMLInputElement | null;
  targetInput?.focus();
};

const handlePaste = (event: ClipboardEvent) => {
  const pastedData = event.clipboardData?.getData('text').slice(0, length.value); // 获取剪贴板数据，并根据length截取
  if (pastedData) {
    // 遍历粘贴数据并填充到localCodeData中
    [...pastedData].forEach((char, index) => {
      if (index < length.value) {
        localCodeData.value[index] = char;
      }
    });
    // 更新code
    emits('update:code', localCodeData.value.join(''));
  }
  event.preventDefault(); // 阻止默认粘贴行为
};

const isInputActive = (index: number) => {
  return computed(() => index === activeInputIndex.value); // 计算属性来判断是否为激活状态
};

/** 发送验证码 */
const sendBtnOnClick = () => {
  if (isCounting.value) {
    // 如果正在倒计时，则不执行任何操作
    return;
  }
  isCounting.value = true;
  emits('send', mobile.value);
  /** 开始倒计时 */
  const intervalId = setInterval(() => {
    countdown.value -= 1;
    if (countdown.value <= 0) {
      clearInterval(intervalId);
      resetCountdown();
      isCounting.value = false; // 倒计时结束
    }
  }, 1000);
}

// 重置倒计时
const resetCountdown = () => {
  countdown.value = sendCountDown.value;
  isCounting.value = false;
};

/** 手机号脱敏 */
const sensitiveMobile = computed(() => {
  if (mobile.value.length === 11) {
    return mobile.value.substring(0, 3) + '****' + mobile.value.substring(7);
  }
  return mobile.value;
});

// 监听code和length的变化，重新初始化localCodeData
watch([code, length], initializeLocalCode, { immediate: true });

// 确保在组件初始化时正确设置localCodeData
initializeLocalCode();
</script>

<template>
  <div class="sms-code-wrapper"
    :style="`
      --sms-width: ${localWidth};
      --sms-height: ${localHeight};
      --sms-border-color: ${borderColor};
      --sms-active-border-color: ${activeBorderColor};
      --sms-font-size: ${localFontSize};
      --sms-color: ${color};
      --sms-code-height: ${localCodeHeight};
    `">
    <div class="sms-code-container">
      <slot name="header">
        <div v-if="title" class="header-box">
          {{ title }}
        </div>
      </slot>
      <slot name="content-text">
        <div v-if="contentText" class="content-text" v-html="contentText" />
      </slot>
      <slot name="send">
        <div v-if="sensitiveMobile" class="mobile-box">
          <span class="mobile-text">{{ sensitiveMobile }}</span>
          <button class="send-btn" :class="{disabled: isCounting}" :disabled="isCounting" :style="`background-color: ${sendBtnColor}`" @click="sendBtnOnClick">{{ isCounting? `${countdown}s`: sendText }}</button>
        </div>
      </slot>
      <div class="input-group"  :class="{line: !card, customName}">
        <span class="input-element"
          :class="{'active': isInputActive(inputIndex).value}"
          v-for="(inputValue, inputIndex) in localCodeData"
          :key="inputIndex">
          <input
            class="input-item"
            :class="customItemName"
            :value="inputValue"
            :type="type"
            maxlength="1"
            @blur="handleInputBlur"
            @focus="handleInputFocus"
            @paste="handlePaste"
            @input="handleInput($event, inputIndex)"
            @keydown="handleKeyDown($event, inputIndex)"/>
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sms-code-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 999;
}
.sms-code-container {
  width: var(--sms-width);
  height: var(--sms-height);
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 10px;
  .header-box {
    position: relative;
    padding: 4px 0;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--sms-color);
    font-size: var(--sms-font-size);
    font-weight: bold;
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 1px;
      background-color: var(--sms-border-color, #797979);
    }
  }
  .content-text {
    position: relative;
    padding: 10px;
    color: var(--sms-color);
    font-size: var(--sms-font-size);
    text-align: left;
    &::before {
      content: '\00a0\00a0';
    }
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 1px;
      background-color: var(--sms-border-color, #797979);
    }
  }
  .mobile-box {
    position: relative;
    padding: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    .mobile-text {
      color: var(--sms-color);
      font-size: 16px;
    }
    .send-btn {
      width: 100px;
      height: 30px;
      color: #ffffff;
      font-size: var(--sms-font-size);
      border: none;
      border-radius: 4px;
      &.disabled {
        opacity: 0.5;
      }
    }
  }
  .input-group {
    margin: 10px 0;
    padding: 0 10px;
    flex: 1;
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    color: var(--sms-color);
    font-size: var(--sms-font-size);
    gap: 10px;
    .input-element {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      .input-item {
        width: 100%;
        max-width: 100%;
        height: var(--sms-code-height);
        border: none;
        outline: none;
        text-align: center;
        overflow: hidden;
        color: var(--sms-color);
        font-size: var(--sms-font-size);
        background-color: transparent;
      }
    }
    &:not(.line) {
      .input-element {
        box-sizing: border-box;
        border: 2px solid var(--sms-border-color, #797979);
        border-radius: 4px;
        &.active {
          border-color: var(--sms-active-border-color, #797979);
        }
      }
    }
    &.line {
      .input-element {
        position: relative;
        padding: 4px 0;
        &.active::after {
          background-color: var(--sms-active-border-color, #797979);
        }
        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          width: 100%;
          height: 2px;
          background-color: var(--sms-border-color, #797979);
          border-radius: 10px;
        }
      }
    }
  }
}
</style>
