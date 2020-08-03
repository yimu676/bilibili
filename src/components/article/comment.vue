<template>
 <div class="commentParent">
    <div v-for="(item,index) in commentList" :key="index">
     <div class="commentItem">
       <div class="userImg">
       <img v-if="item.userinfo && item.userinfo.user_img" :src="item.userinfo.user_img" alt />
       <img v-else src="@/assets/default_img.jpg" alt="">
     </div>
     <div class="commentContent">
       <p>
            <span v-if="item.userinfo.name">{{item.userinfo.name}}</span>
            <span v-else>此用户不存在</span>
            <span>{{item.comment_date}}</span>
       </p>
       <div>
         {{item.comment_content}}
         <span class="publishs" @click="publishClick(item.comment_id)">回复</span>
     </div>
     </div>
     </div>
      <div style="padding-left:8.333vw;"><comment-item @PostPublish="publishClick" :commentChild="item.child"></comment-item></div>
  </div>
 </div>
</template>

<script>
import commentItem from './commentItem'
export default {
  data () {
    return {
      commentList: null
    }
  },
  components: {
    commentItem
  },
  methods: {
    async commentData () {
      const res = await this.$http.get('/comment/' + this.$route.params.id)
      if (res.data) {
        this.$emit('lengthselect', res.data.length)
      }
      this.commentList = this.changeCommentData(res.data)
    },
    changeCommentData (data) {
      function fn (temp) {
        const arr1 = []
        for (var i = 0; i < data.length; i++) {
          if (data[i].parent_id === temp) {
            arr1.push(data[i])
            data[i].child = fn(data[i].comment_id)
          }
        }
        return arr1
      }
      return fn(null)
    },
    publishClick (id) {
      this.$emit('publishClick', id)
    }
  },
  created () {
    this.commentData()
  }
}
</script>

<style lang="less">
.commentParent{
  >div{
     border-bottom: 1px solid #e7e7e7;
  }
  padding: 20px 10px;
  .commentItem{
    display: flex;
    padding: 10px 0;
     .userImg{
       margin-right: 10px;
       img{
           width: 35px;
           height: 35px;
          }
      }
  }
  .commentContent{
        flex: 1;
        p{
         font-size: 13px;
         color: #555;
          display: flex;
          justify-content: space-between;
          margin-bottom: 5px;
        }
        div{
          font-size: 13px;
        }
         .publishs{
        position: absolute;
        right: 0;
        color: red;
      }
      }

}

</style>
