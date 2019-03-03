<template>
  <div class="mui-view" v-if="state">
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
                    <img class="mui-media-object mui-pull-left head-img" id="head-img" src="">
                    <div class="mui-media-body">
                      Hello MUI
                      <p class="mui-ellipsis">账号:hellomui</p>
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
                  <a class="">退出登录</a>
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
</template>

<script>
  export default {
    name: "logout"
  }
</script>

<style scoped>

</style>
