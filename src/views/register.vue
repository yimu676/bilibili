<template>
  <div>
    <login-top middleTop="注册bilibili"></login-top>
    <login-text label="姓名" style="margin:4.167vw 0"></login-text>
    <login-text label="账号"></login-text>
    <login-text label="密码"></login-text>
  </div>
</template>

<script>
import LoginTop from '../components/commom/LoginTop'
import LoginText from '../components/commom/LoginText'
export default {
  components: {
    LoginTop,
    LoginText
  }

}
</script>

<style>
</style>
