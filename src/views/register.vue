<template>
  <div>
    <login-top middleTop="注册bilibili">
      <div slot="right" style="font-size:13px" @click="$router.push('/login')">登陆</div>
    </login-top>
    <login-text label="姓名" style="margin:4.167vw 0" placeholder="请输入姓名" rule="^.{6,16}$"
      @inputChange="res => model.name = res">
    </login-text>
    <login-text label="账号" placeholder="请输入账号" rule="^.{6,16}$" @inputChange="res => model.username = res"></login-text>
    <login-text label="密码" type="password" placeholder="请输入密码" rule="^.{6,16}$"
      @inputChange="res => model.password = res">
    </login-text>

    <login-btn btntext="注册" @registerSubmit="registerSubmit"></login-btn>
  </div>
</template>

<script>
import LoginTop from '../components/commom/LoginTop'
import LoginText from '../components/commom/LoginText'
import LoginBtn from '../components/commom/LoginBtn'
export default {
  data () {
    return {
      model: {
        name: '',
        username: '',
        password: ''
      }

    }
  },
  components: {
    LoginTop,
    LoginText,
    LoginBtn
  },
  methods: {
    async registerSubmit () {
      const rulg = /^.{6,16}$/
      if (rulg.test(this.model.name) && rulg.test(this.model.username) && rulg.test(this.model.password)) {
        const res = await this.$http.post('/register', this.model)
        this.$msg.fail(res.data.msg)
        if (res.data.code === 301 || res.data.code === 302) {
          return
        }
        localStorage.setItem('id', res.data.id)
        localStorage.setItem('token', res.data.objtoken)
        setTimeout(() => {
          this.$router.push('/userinfo')
        }, 1000)
      } else {
        this.$msg.fail('格式不正确')
      }
    }
  }

}
</script>

<style>
</style>
