# vue3-auth-code-input

这是一个基于 Vue 3 和 TypeScript 开发的验证码输入组件，适用于需要用户输入验证码的场景。它提供了灵活的配置选项，以适应不同的需求。

<p align="center">
  <a href="https://www.npmjs.com/package/vue3-auth-code-input">
    <img src="https://img.shields.io/npm/v/vue3-auth-code-input.svg" alt="npm">
  </a>
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/TypeScript-5.2.2-blue.svg" alt="TS">
  </a>
  <a href="https://vuejs.org/">
    <img src="https://img.shields.io/badge/Vue-3.2.37-brightgreen.svg" alt="VUE3">
  </a>
  <a href="https://vitejs.dev/">
    <img src="https://img.shields.io/badge/Vite-5.2.0-brightgreen.svg" alt="VITE">
  </a>
</p>

## 功能特点

- 支持文本和数字类型验证码。
- 自定义验证码长度。
- 支持自定义宽度、高度、边框颜色等样式。
- 支持发送验证码倒计时显示。
- 可以自定义发送验证码按钮的文本和颜色。
- 支持粘贴板自动填充验证码。
- 支持自定义类名。
- 支持自定义插槽。

![line](https://raw.githubusercontent.com/DMaiGit/vue3-auth-code-input/main/public/image/sms-code-line.gif)

![card](https://raw.githubusercontent.com/DMaiGit/vue3-auth-code-input/main/public/image/sms-code-card.gif)

![demo](https://raw.githubusercontent.com/DMaiGit/vue3-auth-code-input/main/public/image/demo.gif)

## Get Start

```bash
npm install vue3-auth-code-input
```

## Props 属性说明

| 属性名             | 类型             | 默认值 | 描述                                   |
| ------------------ | ---------------- | ------ | -------------------------------------- |
| width              | string \| number | -      | 组件宽度,单位：px                               |
| height             | string \| number | -      | 组件高度,单位：px                               |
| v-model:code               | string \| number | -      | 验证码值                               |
| codeHeight         | string \| number | 40      | 验证码输入框高度,单位：px                       |
| length             | number           | 6      | 验证码长度,最少4位                             |
| type               | 'text' \| 'number' | 'text'  | 验证码类型                             |
| title              | string           | -      | 标题文本                               |
| contentText        | string           | -      | 内容文本                               |
| card               | boolean          | false  | 是否以卡片形式展示                     |
| borderColor        | string           | #F1F1F1      | 边框颜色                               |
| activeBorderColor  | string           | #007AFF      | 激活状态下的边框颜色                   |
| color              | string           | #333333      | 文字颜色                               |
| fontSize           | string \| number | 12      | 字体大小,单位：px                               |
| customName         | string           | input-group-user      | 自定义类名                             |
| customItemName     | string           | input-item-user      | 自定义验证码输入项的类名               |
| sendText           | string           | 发送验证码      | 发送验证码按钮的文本                   |
| sendBtnColor       | string           | #007AFF      | 发送验证码按钮的颜色                   |
| sendCountDown      | number           | 120      | 发送验证码的倒计时                     |
| mobile             | string           | -      | 手机号，用于发送验证码，有值时显示传入手机号和按钮                 |

## slot

以下是组件提供的插槽及其描述：

| Name          | Description              |
| ------------- | ------------------------ |
| `header`      | 自定义组件头部区域。       |
| `content-text`| 自定义内容文本区域。       |
| `send`        | 自定义发送验证码按钮区域。 |

## event

| 事件名             | 描述                                   | type                                   |
| ------------------ | -------------------------------------- | -------------------------------------- |
| `update:code`       | 当验证码输入更新时触发，返回最新的验证码值。 | `(code: string \| number) => void` |
| `send`            | 点击发送验证码按钮时触发，返回手机号码。 | `(mobile: string) => void` |

## Ref 方法

当需要从父组件调用子组件的方法时，请使用 `ref` 引用。以下是可用的 `ref` 方法：

| 方法名             | 描述                                   | 参数                              |
| ------------------ | -------------------------------------- | ---------------------------------- |
| `resetSendButton` | 重置发送验证码按钮和倒计时，使其可以再次点击。 | `newCountDown?: number` (可选)      |

## Example 示例

```vue
<template>
  <div>
    <sms-code ref="smsCodeRef" card title="温馨提示" content-text="请获取验证码后填写短信验证码。" mobile="159****8383" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { SmsCode, type ISmsCodeComponentInstance  } from 'vue3-auth-code-input';

const smsCodeRef = ref<ISmsCodeComponentInstance | null>(null);

const resetTheButton = () => {
  smsCodeRef.value!.resetSendButton(60); // 60秒的新倒计时时间
};
</script>
```
