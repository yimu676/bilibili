<template>
  <div>
    <login-top middleTop="登陆bilibili">
       <div slot="right" style="font-size:13px" @click="$router.push('/register')">注册</div>
    </login-top>
    <login-text label="账号" placeholder="请输入账号" style="margin:4.167vw 0;" rule="^.{6,16}$" @inputChange="res => model.username = res"></login-text>
    <login-text label="密码" type="password" placeholder="请输入密码" rule="^.{6,16}$"
      @inputChange="res => model.password = res">
    </login-text>

    <login-btn btntext="登陆" @registerSubmit="registerSubmit"></login-btn>
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
      if (rulg.test(this.model.username) && rulg.test(this.model.password)) {
        const res = await this.$http.post('/login', this.model)
        this.$msg.fail(res.data.msg)
        if (res.data.code === 301 || res.data.code === 302) {
          return
        }
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('id', res.data.id)
        setTimeout(() => {
          this.$router.push('/userinfo')
        })
      } else {
        this.$msg.fail('格式不正确')
      }
    }
  }

}
</script>

<style>
</style>
