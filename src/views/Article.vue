<template>
  <div v-if="model">
      <nav-bar></nav-bar>
      <div class="detailinfo">
         <div class="video">
              <video controls :src="model.content"></video>
         </div>
         <div class="detailinfotext">
              <div>
              <span>{{model.category.title}}</span>
              <span>{{model.name}}</span>
              </div>
               <div>
                   <span>{{model.userinfo.name}}</span>
                   <span>146.4万次观看</span>
                   <span>5218弹幕</span>
                   <span>{{model.date}}</span>
               </div>
               <div>
                   <p @click="collectionClick" :class="{activeColor:collectionActive}">
                       <span class="icon-star-full"></span>
                       <span>收藏</span>
                   </p>
                   <p @click="subscriptClick" :class="{activeColor:subscritionActive}">
                      <span class="icon-bubble"></span>
                      <span>关注</span>
                  </p>
                    <p>
                       <span class="icon-redo2"></span>
                       <span>分享</span>
                   </p>
               </div>
         </div>
      </div>
      <div class="detailparent">
          <detail class="detailitem"  v-for="(item,index) in commendList" :key="index" :detailitem="item" />
      </div>
      <comment-title :dataLength="lens" @Postcomment="PostSuccess"  ref="commentIpt"/>
      <comment @lengthselect="len => lens = len" ref="commentPulish" @publishClick="PostChildClick" />
  </div>
</template>

<script>
import NavBar from '../components/commom/Navbar'
import Detail from './Detail'
import commentTitle from '../components/article/commentTitle'
import comment from '../components/article/comment'
export default {
  components: {
    NavBar,
    Detail,
    commentTitle,
    comment
  },
  data () {
    return {
      model: null,
      commendList: null,
      lens: null,
      Postcom: {
        comment_content: '',
        comment_date: '',
        parent_id: null,
        article_id: null
      },
      collectionActive: null,
      subscritionActive: null
    }
  },
  methods: {
    // 获取文章信息
    async ariticleitemData () {
      const res = await this.$http.get('/article/' + this.$route.params.id)
      this.model = res.data[0]
      if (this.model) {
        this.subscritionInit()
      }
    },
    // 获取推荐文章
    async commendData () {
      const res = await this.$http.get('/commend')
      this.commendList = res.data
    },
    // 发送评论
    async PostSuccess (res) {
      const date = new Date()
      let m = date.getMonth() + 1
      let d = date.getDate()
      if (m < 10) {
        m = '0' + m
      }
      if (d < 10) {
        d = '0' + d
      }
      const str = `${m}-${d}`
      this.Postcom.comment_content = res
      this.Postcom.comment_date = str
      this.Postcom.article_id = this.$route.params.id
      const result = await this.$http.post('/comment_post/' + localStorage.getItem('id'), this.Postcom)
      this.$refs.commentPulish.commentData()
      this.Postcom.parent_id = null
      if (result.status === 200) {
        this.$msg.fail('评论发表成功')
      }
      this.Postcom.comment_content = ''
    },
    PostChildClick (id) {
      this.Postcom.parent_id = id
      this.$refs.commentIpt.focusIpt()
    },
    // 进入页面获取是否收藏
    async collectionInit () {
      if (localStorage.getItem('token')) {
        const res = await this.$http.get('/collection/' + localStorage.getItem('id'), {
          params: {
            article_id: this.$route.params.id
          }
        })
        this.collectionActive = res.data.success
      }
    },
    // 进入页面获取是否关注
    async subscritionInit () {
      if (localStorage.getItem('token')) {
        const res = await this.$http.get('/sub_scription/' + localStorage.getItem('id'), {
          params: {
            sub_id: this.model.userid
          }
        })
        this.subscritionActive = res.data.success
      }
    },
    // 收藏文章
    async collectionClick () {
      if (localStorage.getItem('token')) {
        const res = await this.$http.post('/collection/' + localStorage.getItem('id'), { article_id: this.$route.params.id })
        if (res.data.msg === '收藏成功') {
          this.collectionActive = true
        } else {
          this.collectionActive = false
        }
      }
    },
    // 关注用户
    async subscriptClick () {
      if (localStorage.getItem('token')) {
        const res = await this.$http.post('/sub_scription/' + localStorage.getItem('id'), { sub_id: this.model.userid })
        if (res.data.msg === '关注成功') {
          this.subscritionActive = true
        } else {
          this.subscritionActive = false
        }
        this.$msg.fail(res.data.msg)
      }
    }
  },
  created () {
    this.ariticleitemData()
    this.commendData()
    this.collectionInit()
  },
  watch: {
    $route () {
      this.ariticleitemData()
      this.commendData()
    }
  }
}
</script>

<style lang="less">
.detailinfo{
    background-color: white;
  .video{
      width: 100%;
      video{
          width: 100%;
      }
  }
  .detailinfotext{
      padding: 4.167vw;
      div:nth-child(1){
      span:nth-child(1){
          padding: 0 2.778vw;
          color: #fb7299;
          background-color: #f4f4f4;
          border-radius: 2.778vw;
      }
      }
      div:nth-child(2){
          padding: 2.778vw 2.778vw;
          span{
              color:#aaa;
              font-size: 3.333vw;
          }
         span:nth-child(1){
              color:black;
              font-size: 4vw;
              padding-right: 2.778vw;
         }
      }
  }
    div:nth-child(3){
        padding:0 2.778vw;
        display:flex;
       p{
           margin-right: 4.167vw;
           display: flex;
           align-items: center;
           color: #757575;
            span:nth-child(1){
                font-size: 5.833vw;
                padding-right: 0.833vw;
            }
            span:nth-child(2){
                font-size: 3.611vw;
            }
       }
        .activeColor{
            color: #fb7299;
        }

    }

    .detailparent{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
      .detailitem{
        margin: 1.389vw 0;
      width: 45%;
    }
  }
}
</style>
