<template>
  <div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item._id">
        <router-link :to="{path:'/home/newsinfo',query:{'Id':item.id}}">
          <img class="mui-media-object mui-pull-left"
               :src="'/static/images/'+item.img_url">
          <div class="mui-media-body">
            <h1>{{item.title}}</h1>
            <p class="mui-ellipsis">
              <span>发表时间：{{item.add_time}}</span>
              <span>点击次数：{{item.click}}次</span>
            </p>
          </div>
        </router-link>
      </li>

    </ul>
  </div>
</template>

<script>
  import axiox from "axios"

  export default {
    data() {
      return {
        newslist: []
      }
    },
    mounted() {
      this.getnewslist()
    },
    methods: {
      getnewslist() {
        axiox.get("/news/newslist").then(result => {
          if (result.data.status == "0") {
            this.newslist = result.data.result
          }
        })
      }
    }
  }
</script>

<style scoped>
  .mui-table-view img {
    width: 100%;
    height: 100%;
    margin-top: 11px;
  }

  .mui-table-view li h1 {
    font-size: 14px;
  }

  .mui-ellipsis {
    font-size: 12px;
    color: #226aff;
    display: flex;
    justify-content: space-between;
  }
</style>
