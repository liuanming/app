<template>
  <div class="goodsinfo-container">

    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter">
      <div class="ball" v-if="ballFlag" ref="ball"></div>
    </transition>

    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in lunbotulist" :key="item.src">
              <img :src="'/static/images/'+ item.src" alt="">
            </mt-swipe-item>
          </mt-swipe>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-header">{{details.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价:
            <del>￥{{details.market_price}}</del>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销售价:<span class="now_price">￥{{details.sell_price}}</span>
          </p>
          <p>购买数量:&nbsp;&nbsp;&nbsp;&nbsp;<numbox @num="getnum"></numbox>
          </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addshopcart">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号:{{details.goods_no}}</p>
          <p>库存情况:{{details.stock_quantity}}</p>
          <p>上架时间:{{details.add_time}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain>图文介绍</mt-button>
        <mt-button type="danger" size="large" plain>商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios"
  import numbox from "./../subcomponents/goodsinfo_numbox"
  import {Toast} from 'mint-ui';

  export default {
    data() {
      return {
        id: this.$route.query.id,
        lunbotulist: [],
        details: [],
        ballFlag: false,
        num: 1
      }
    },
    mounted() {
      this.getlunbotu()
    },
    methods: {
      getlunbotu() {
        var param = {
          id: this.id
        };
        axios.get("/goods/goodsinfo", {params: param}).then(result => {
          if (result.data.status == "0") {
            this.lunbotulist = result.data.result.images;
            this.details = result.data.result.details[0]
          }
        })
      },
      addshopcart() {
        axios.post("/users/addcart", {id: this.id, num: this.num}).then(result => {
          if (result.data.status == "0") {
            this.ballFlag = !this.ballFlag;
            this.gettotalnumber()
          } else {
            Toast('未登录');
          }
        });

      },
      beforeEnter(el) {
        el.style.transform = "translate(0,0)"
      },
      enter(el, done) {
        el.offsetWidth;

        const ballPosition = this.$refs.ball.getBoundingClientRect();
        const badgePosition = document.getElementById("badge").getBoundingClientRect();
        const x = badgePosition.left - ballPosition.left;
        const y = badgePosition.top - ballPosition.top;
        el.style.transform = `translate(${x}px,${y}px)`;
        el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";
        done()
      },
      afterEnter(el) {
        this.ballFlag = !this.ballFlag
      },
      getnum(data) {
        this.num = data;
      },
      gettotalnumber() {
        axios.post("/users/cartchange").then(result => {
          if (result.data.status == "0") {
            this.$store.commit("settotalnumber", result.data.result.number);
          }
        })
      }
    },
    components: {
      numbox
    }
  }
</script>

<style scoped>
  .goodsinfo-container {
    background-color: #eee;
    overflow: hidden;
  }

  .mint-swipe {
    height: 200px;
    text-align: center;
  }

  .mint-swipe img {
    height: 100%;
  }

  .now_price {
    color: red;
  }

  .mui-card-footer {
    display: block;
  }

  .mui-card-footer button {
    margin: 15px 0;
  }

  .ball {
    width: 15px;
    height: 15px;
    background-color: red;
    border-radius: 50%;
    position: absolute;
    z-index: 99;
    top: 408px;
    left: 154px;
  }
</style>
