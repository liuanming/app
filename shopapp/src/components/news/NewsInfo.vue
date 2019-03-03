<template>
  <div class="newsinfo-container">
    <h3 class="title">{{newsinfolist.title}}</h3>
    <p class="subtitle">
      <span>发表时间：{{newsinfolist.add_time}}</span>
      <span>点击：{{newsinfolist.click}}次</span>
    </p>
    <hr>
    <div class="content" v-html="newsinfolist.content"></div>
    <comment :id="this.id"></comment>
  </div>
</template>

<script>
  import axios from "axios"
  import comment from "./../subcomponents/comment"

  export default {
    data() {
      return {
        id: this.$route.query.Id,
        newsinfolist: []
      }
    },
    mounted() {
      this.getnewsinfo()
    },
    methods: {
      getnewsinfo() {
        var param = {
          id: this.id
        };
        axios.get("/news/newsinfo", {params: param}).then(result => {
          if (result.data.status == "0") {
            this.newsinfolist = result.data.result
          } else {

          }
        })
      }
    },
    components: {
      comment
    }
  }
</script>

<style scoped>
  .newsinfo-container {
    padding: 0 4px;
  }

  .newsinfo-container .title {
    font-size: 16px;
    text-align: center;
    color: red;
    margin: 15px 0;
  }

  .newsinfo-container .subtitle {
    font-size: 13px;
    color: #226aff;
    display: flex;
    justify-content: space-between;
    padding: 0 5px;
  }
</style>
