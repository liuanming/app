<template>
  <div class="box">
    <mt-header fixed title="固定在顶部"></mt-header>
    <transition>
      <router-view></router-view>
    </transition>
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item" to="/member">
        <span class="mui-icon mui-icon-extra mui-icon-extra-custom"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item" to="/shopcar">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge" id="badge">{{this.$store.state.totalnumber}}</span></span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item" to="/my">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">我的</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
  import axios from "axios"

  export default {
    data() {
      return {}
    },
    mounted() {
      this.gettotalnumber()
    },
    methods: {
      gettotalnumber() {
        axios.post("/users/cartchange").then(result => {
          if (result.data.status == "0") {
            this.$store.commit("settotalnumber", result.data.result.number);
          }
        })
      }
    }
  }
</script>
<style scoped>
  .mint-header {
    z-index: 999;
  }

  .box {
    padding-top: 40px;
    overflow-x: hidden;
    padding-bottom: 50px;
    height: 100%;
  }

  .router-link-exact-active {
    color: #007aff;
  }

  .v-enter {
    opacity: 0;
    transform: translateX(100%);
  }

  .v-leave-to {
    opacity: 0;
    transform: translateX(-100%);
    position: absolute;
  }

  .v-enter-active,
  .v-leave-active {
    transition: all 0.5s ease;
  }
</style>
