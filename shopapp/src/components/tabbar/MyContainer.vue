<template>
  <div>
    <div class="login-content" v-if="!sessionstate">
      <div class="login-from">
        <div class="login-user">
          <label>账号</label>
          <input type="text" placeholder="请输入账号" v-model="userName">
        </div>
        <div class="login-pwd">
          <label>密码</label>
          <input type="password" placeholder="请输入密码" v-model="userPwd">
        </div>
      </div>
      <div class="login-switch">
        <span>自动登录</span>
        <mt-switch></mt-switch>
      </div>
      <div class="login-login">
        <mt-button type="primary" size="large" @click="login">登录</mt-button>
        <div class="login-link">
          <span>注册账号</span>丨
          <span>忘记密码</span>
        </div>
      </div>
    </div>
    <div class="mui-view" v-if="sessionstate">
      <div class="mui-pages">
        <div id="setting" class="mui-page mui-page-center" style="">
          <!--页面标题栏开始-->

          <!--页面标题栏结束-->
          <!--页面主内容区开始-->
          <div class="mui-page-content">
            <div class="mui-scroll-wrapper" data-scroll="2">
              <div class="mui-scroll"
                   style="transform: translate3d(0px, 0px, 0px) translateZ(0px); transition-duration: 0ms;">
                <ul class="mui-table-view mui-table-view-chevron">
                  <li class="mui-table-view-cell mui-media">
                    <a class="mui-navigate-right" href="javascript:;">
                      <img class="mui-media-object mui-pull-left head-img" id="head-img" :src="'/static/images/'+sessionstate.user_img">
                      <div class="mui-media-body">
                        {{sessionstate.userName}}
                        <p class="mui-ellipsis">账号:{{sessionstate.userId}}</p>
                      </div>
                    </a>
                  </li>
                </ul>
                <ul class="mui-table-view mui-table-view-chevron">
                  <li class="mui-table-view-cell">
                    <a href="javascript:;" class="mui-navigate-right">账号与安全</a>
                  </li>
                </ul>
                <ul class="mui-table-view mui-table-view-chevron">
                  <li class="mui-table-view-cell">
                    <a href="javascript:;" class="mui-navigate-right">新消息通知</a>
                  </li>
                  <li class="mui-table-view-cell">
                    <a href="javascript:;" class="mui-navigate-right">隐私</a>
                  </li>
                  <li class="mui-table-view-cell">
                    <a href="javascript:;" class="mui-navigate-right">通用</a>
                  </li>
                </ul>
                <ul class="mui-table-view mui-table-view-chevron">
                  <li class="mui-table-view-cell">
                    <a href="javascript:;" class="mui-navigate-right">关于MUI <i
                      class="mui-pull-right update">V3.1.0</i></a>
                  </li>
                </ul>
                <ul class="mui-table-view">
                  <li class="mui-table-view-cell" style="text-align: center;">
                    <a class="" @click="logout">退出登录</a>
                  </li>
                </ul>
              </div>
              <div class="mui-scrollbar mui-scrollbar-vertical">
                <div class="mui-scrollbar-indicator"
                     style="transition-duration: 0ms; display: none; height: 617px; transform: translate3d(0px, 0px, 0px) translateZ(0px);"></div>
              </div>
            </div>
          </div>
          <!--页面主内容区结束-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axiox from "axios"

  export default {
    data() {
      return {
        userName: "admin",
        userPwd: "123456",
        sessionstate: ""
      }
    },
    mounted() {
      this.checklogin();
    },
    methods: {
      checklogin() {
        axiox.post("/users/checklogin").then(result => {
          if (result.data.status == "0") {
            this.sessionstate = result.data.result
          }
        })
      },
      login() {
        axiox.post("/users/login", {
          userName: this.userName,
          userPwd: this.userPwd
        }).then(result => {
          if (result.data.status == "0") {
            this.sessionstate = result.data.result
            console.log(this.sessionstate)
          } else {

          }
        })
      },
      logout() {
        axiox.post("/users/logout").then(result => {
          if (result.data.status == "0") {
            this.sessionstate = result.data.result
          } else {
          }
        })
      },
    }
  }
</script>
<style scoped>
  .login-content {
    padding-top: 25px;
    background-color: #efeff4;
    height: 580px;
  }

  .login-from {
  }

  .login-content .login-from input {
    margin: 0;
    width: 320px;
    border: 0;
  }

  .login-content .login-from label {
    width: 60px;
    background-color: white;
    border: 0;
  }

  .login-content .login-from .login-user {
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    border-bottom: 1px solid #cccccc;
    text-align: center;
  }

  .login-content .login-from .login-pwd {
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    text-align: center;
  }

  .login-switch {
    display: flex;
    justify-content: space-between;
    height: 40px;
    background-color: white;
    margin-top: 25px;
    text-align: center;
    line-height: 40px;
    padding-left: 15px;
  }

  .login-login {
    margin-top: 25px;
  }

  .login-login .login-link {
    text-align: center;
    color: #007aff;
    margin-top: 30px;
  }

  .mui-views,
  .mui-view,
  .mui-pages,
  .mui-page,
  .mui-page-content {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: #efeff4;
  }

  .mui-pages {
    top: 46px;
    height: auto;
  }

  .mui-scroll-wrapper,
  .mui-scroll {
    background-color: #efeff4;
  }

  .mui-page.mui-transitioning {
    -webkit-transition: -webkit-transform 300ms ease;
    transition: transform 300ms ease;
  }

  .mui-page-left {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  .mui-ios .mui-page-left {
    -webkit-transform: translate3d(-20%, 0, 0);
    transform: translate3d(-20%, 0, 0);
  }

  .mui-navbar {
    position: fixed;
    right: 0;
    left: 0;
    z-index: 10;
    height: 44px;
    background-color: #f7f7f8;
  }

  .mui-navbar .mui-bar {
    position: absolute;
    background: transparent;
    text-align: center;
  }

  .mui-android .mui-navbar-inner.mui-navbar-left {
    opacity: 0;
  }

  .mui-ios .mui-navbar-left .mui-left,
  .mui-ios .mui-navbar-left .mui-center,
  .mui-ios .mui-navbar-left .mui-right {
    opacity: 0;
  }

  .mui-navbar .mui-btn-nav {
    -webkit-transition: none;
    transition: none;
    -webkit-transition-duration: .0s;
    transition-duration: .0s;
  }

  .mui-navbar .mui-bar .mui-title {
    display: inline-block;
    width: auto;
  }

  .mui-page-shadow {
    position: absolute;
    right: 100%;
    top: 0;
    width: 16px;
    height: 100%;
    z-index: -1;
    content: '';
  }

  .mui-page-shadow {
    background: -webkit-linear-gradient(left, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0) 10%, rgba(0, 0, 0, .01) 50%, rgba(0, 0, 0, .2) 100%);
    background: linear-gradient(to right, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0) 10%, rgba(0, 0, 0, .01) 50%, rgba(0, 0, 0, .2) 100%);
  }

  .mui-navbar-inner.mui-transitioning,
  .mui-navbar-inner .mui-transitioning {
    -webkit-transition: opacity 300ms ease, -webkit-transform 300ms ease;
    transition: opacity 300ms ease, transform 300ms ease;
  }

  .mui-page {
    display: none;
  }

  .mui-pages .mui-page {
    display: block;
  }

  .mui-page .mui-table-view:first-child {
    margin-top: 15px;
  }

  .mui-page .mui-table-view:last-child {
    margin-bottom: 30px;
  }

  .mui-table-view {
    margin-top: 20px;
  }

  .mui-table-view span.mui-pull-right {
    color: #999;
  }

  .mui-table-view-divider {
    background-color: #efeff4;
    font-size: 14px;
  }

  .mui-table-view-divider:before,
  .mui-table-view-divider:after {
    height: 0;
  }

  .head {
    height: 40px;
  }

  #head {
    line-height: 40px;
  }

  .head-img {
    width: 40px;
    height: 40px;
  }

  #head-img1 {
    position: absolute;
    bottom: 10px;
    right: 40px;
    width: 40px;
    height: 40px;
  }

  .update {
    font-style: normal;
    color: #999999;
    margin-right: -25px;
    font-size: 15px
  }

  .mui-fullscreen {
    position: fixed;
    z-index: 20;
    background-color: #000;
  }

  .mui-ios .mui-navbar .mui-bar .mui-title {
    position: static;
  }

  /*问题反馈在setting页面单独的css*/
  #feedback .mui-popover {
    position: fixed;
  }

  #feedback .mui-table-view:last-child {
    margin-bottom: 0px;
  }

  #feedback .mui-table-view:first-child {
    margin-top: 0px;
  }

  .mui-plus.mui-plus-stream .mui-stream-hidden {
    display: none !important;
  }
</style>

