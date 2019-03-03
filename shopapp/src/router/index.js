import Vue from 'vue'
import Router from 'vue-router'
import HomeContainer from "./../components/tabbar/HomeContainer"
import MemberContainer from "./../components/tabbar/MemberContainer"
import ShopcarContainer from "./../components/tabbar/ShopcarContainer"
import MyContainer from "./../components/tabbar/MyContainer"
import NewsList from "./../components/news/NewsList"
import NewsInfo from "./../components/news/NewsInfo"
import SharePicture from "./../components/sharepicture/picturelist"
import Goodslist from "./../components/goods/goodslist"
import Goodsinfo from "./../components/goods/goodsinfo"


Vue.use(Router);

export default new Router({
  routes: [
    {path: "/", redirect: "/home"},
    {path: "/home", component: HomeContainer},
    {path: "/member", component: MemberContainer},
    {path: "/shopcar", component: ShopcarContainer},
    {path: "/my", component: MyContainer},
    {path: "/home/newslist", component: NewsList},
    {path: "/home/newsinfo", component: NewsInfo},
    {path: "/home/sharepicture", component: SharePicture},
    {path: "/home/Goodslist", component: Goodslist},
    {path: "/home/Goodsinfo", component: Goodsinfo},
  ],
})
