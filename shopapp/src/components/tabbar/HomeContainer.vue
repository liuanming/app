<template>
  <div>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in LunbotuList" :key="item._id">
        <img :src="'/static/images/'+ item.img_url" alt="">
      </mt-swipe-item>
    </mt-swipe>
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newslist">
        <img src="./../../../static/images/menu1.png" alt="">
        <div class="mui-media-body">新闻资讯</div>
      </router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/sharepicture">
        <img src="./../../../static/images/menu2.png" alt="">
        <div class="mui-media-body">图片分享</div>
      </router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodslist">
        <img src="./../../../static/images/menu3.png" alt="">
        <div class="mui-media-body">商品购买</div>
      </router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
        <img src="./../../../static/images/menu4.png" alt="">
        <div class="mui-media-body">留言反馈</div>
      </a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
        <img src="./../../../static/images/menu5.png" alt="">
        <div class="mui-media-body">视频专区</div>
      </a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
        <img src="./../../../static/images/menu6.png" alt="">
        <div class="mui-media-body">联系我们</div>
      </a></li>
    </ul>
  </div>
</template>

<script>
  import axios from "axios"

  export default {
    data() {
      return {
        LunbotuList: []
      }
    },
    mounted() {
      this.getlunbotu()
    },
    methods: {
      getlunbotu() {
        axios.get("/lunbotus/list").then(result => {
          if (result.data.status == "0") {
            this.LunbotuList = result.data.result
          } else {
            console.log("ww")
          }
        })
      }
    }
  }
</script>

<style scoped>
  .mint-swipe {
    height: 200px;

  }

  .mint-swipe img {
    width: 100%;
    height: 100%;
  }

  .mui-grid-view.mui-grid-9 {
    background-color: white;
  }

  .mui-grid-view.mui-grid-9 img {
    width: 60px;
  }

  .mui-grid-view.mui-grid-9 .mui-table-view-cell {
    border: 0;
  }
</style>
