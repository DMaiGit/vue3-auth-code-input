# vue3-verification-code-input

这是一个基于 Vue 3 和 TypeScript 开发的验证码输入组件，适用于需要用户输入验证码的场景。它提供了灵活的配置选项，以适应不同的需求。

## 功能特点

- 支持文本和数字类型验证码。
- 自定义验证码长度。
- 支持自定义宽度、高度、边框颜色等样式。
- 支持发送验证码倒计时显示。
- 可以自定义发送验证码按钮的文本和颜色。
- 支持粘贴板自动填充验证码。
- 支持自定义类名。
- 支持自定义插槽。

![line]('https://github.com/DMaiGit/vue3-verification-code-input/blob/main/public/image/sms-code-line.gif')

![card]('https://github.com/DMaiGit/vue3-verification-code-input/blob/main/public/image/sms-code-card.gif')

![demo]('https://github.com/DMaiGit/vue3-verification-code-input/blob/main/public/PixPin_2024-04-05_22-35-07.gif')

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

## 插槽

- `header`: 自定义组件头部区域。
- `content-text`: 自定义内容文本区域。
- `send`: 自定义发送验证码按钮区域。

## 事件

| 事件名             | 描述                                   | type                                   |
| ------------------ | -------------------------------------- | -------------------------------------- |
| `update:code`       | 当验证码输入更新时触发，返回最新的验证码值。 | `(code: string \| number) => void` |
| `send`            | 点击发送验证码按钮时触发，返回手机号码。 | `(mobile: string) => void` |

## 示例

```html
<sms-code card title="温馨提示" content-text="请获取验证码后填写短信验证码。" mobile="159****8383" />
```

## 安装使用

```bash
npm install vue3-verification-code-input
```
