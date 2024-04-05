<script setup lang="ts">
import { SmsCode } from './components';
</script>

<template>
  <div class="content">
    <sms-code card title="温馨提示" content-text="请获取验证码后填写短信验证码。" mobile="159****8383" />
  </div>
</template>

<style scoped>
.content {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
