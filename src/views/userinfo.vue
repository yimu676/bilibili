<template>
  <div class="userinfo">
     <nav-bar></nav-bar>
     <img src="@/assets/bannerTop_new.png" alt="" class="backImg">
     <user-detail :userInfo="model"></user-detail>
     <user-article></user-article>
  </div>
</template>

<script>
import NavBar from '../components/commom/Navbar'
import userDetail from '../components/userComponent/userDetail'
import userArticle from '../components/userComponent/userArticle'
export default {
  data () {
    return {
      model: {}
    }
  },
  components: {
    NavBar,
    userDetail,
    userArticle
  },
  methods: {
    async UserinfoData () {
      const res = await this.$http.get('/user/' + localStorage.getItem('id'), {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      this.model = res.data[0]
    }
  },
  created () {
    this.UserinfoData()
  }
}
</script>

<style lang="less">
.userinfo{
    .backImg{
     height: 100px;
     width: 100%;
    }
}
</style>
