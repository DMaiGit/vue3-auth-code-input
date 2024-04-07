<script setup lang="ts">
import { SmsCode } from './components';
import { ref } from 'vue';
import type { ISmsCodeComponentInstance } from './components/SmsCode/@types/types.d';
const smsCodeRef = ref<ISmsCodeComponentInstance | null>(null);
const buttonOnReset = () => smsCodeRef.value!.resetSendButton(60);
</script>

<template>
  <div class="content">
    <sms-code ref="smsCodeRef" card title="温馨提示" content-text="请获取验证码后填写短信验证码。" mobile="159****8383" />
    <div>
      <button :style="{'marginTop': '20px'}" @click="buttonOnReset">重置</button>
    </div>
  </div>
</template>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
