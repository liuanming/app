<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr>
    <textarea placeholder="请输入评论内容（最多评论120字）" maxlength="120" v-model="comment"></textarea>
    <mt-button type="primary" size="large">发表评论</mt-button>

    <div class="cmt-list" v-for="(item,index) in commenslist" :key="item._id">
      <div class="cmt-item">
        <div class="cmt-title">
          第{{index+1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;&nbsp;发表时间：{{item.add_time}}
        </div>
        <div class="cmt-body">
          {{item.content}}
        </div>
      </div>
    </div>

    <mt-button type="danger" size="large" plain class="cmt-duo" @click="morecommens">加载更多</mt-button>

  </div>
</template>

<script>
  import axios from "axios"
  import {Toast} from 'mint-ui';

  export default {
    data() {
      return {
        page: 1,
        commenslist: [],
        comment: "",
        Id: this.$route.query.Id
      }
    },
    mounted() {
      this.getcommens()
    },
    methods: {
      getcommens() {
        var param = {
          id: this.id,
          page: this.page
        };
        axios.get("/news/comment", {params: param}).then(result => {
          if (result.data.status == "0") {
            this.commenslist = this.commenslist.concat(result.data.result)
          } else {

          }
        })
      },
      morecommens() {
        this.page++;
        this.getcommens()
      },
      // publishcomment() {
      //   axios.post("/news/publishcomment", {
      //     comment: this.comment,
      //     Id: this.Id
      //   }).then(result => {
      //     if (result.data.status == "0") {
      //       console.log(result.data.result)
      //       Toast('发表成功');
      //       this.getcommens()
      //     } else {
      //       Toast("当前未登录");
      //     }
      //   })
      // }
    },
    props: ["id"]
  }
</script>

<style scoped>
  .cmt-container {
    padding-bottom: 3px;
  }

  .cmt-container h3 {
    font-size: 18px;
  }

  .cmt-container textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }

  .cmt-container .cmt-list {
    margin: 10px 0;
  }

  .cmt-container .cmt-list .cmt-item {
    font-size: 13px;
  }

  .cmt-container .cmt-list .cmt-item .cmt-title {
    line-height: 30px;
    background-color: #cccccc;
  }

  .cmt-container .cmt-list .cmt-item .cmt-body {
    line-height: 35px;
    text-indent: 2em;
  }
</style>
