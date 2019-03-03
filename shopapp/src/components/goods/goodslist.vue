<template>
  <div>
    <div class="goods-list">
      <router-link tag="div" class="goods-item" v-for="item in goodslist" :key="item.id" :to="{path:'/home/goodsinfo',query:{'id':item.id}}">
        <img :src="'/static/images/'+ item.img_url">
        <h1 class="title">{{item.title}}</h1>
        <div class="info">
          <p class="price">
            <span class="now">￥{{item.sell_price}}</span>
            <span class="old">￥{{item.market_price}}</span>
          </p>
          <p class="sell">
            <span>热卖中</span>
            <span>剩余60件</span>
          </p>
        </div>
      </router-link>
    </div>
    <mt-button type="danger" size="large">加载更多</mt-button>
  </div>
</template>

<script>
  import axiox from "axios"

  export default {
    data() {
      return {
        goodslist: []
      }
    },
    mounted() {
      this.getgoodslist()
    },
    methods: {
      getgoodslist() {
        axiox.get("/goods/goodslist").then(result => {
          if (result.data.status == "0") {
            this.goodslist = result.data.result
          }
        })
      }
    }
  }
</script>

<style scoped>
  .goods-list {
    display: flex;
    flex-wrap: wrap;
    padding: 7px;
    justify-content: space-between;
  }

  .goods-list .goods-item {
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #cccccc;
    margin: 4px 0;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 308px;
  }

  .goods-list .goods-item img {
    width: 100%;
  }

  .goods-list .goods-item .title {
    font-size: 14px;
    margin: 10px 0;
    line-height: 16px;
  }

  .goods-list .goods-item .info {
    background-color: #eee;
  }

  .goods-list .goods-item .info p {
    margin: 0;
    padding: 5px;
  }

  .goods-list .goods-item .info .price {
  }

  .goods-list .goods-item .info .price .now {
    color: red;
    font-weight: bold;
    font-size: 16px;
  }

  .goods-list .goods-item .info .price .old {
    text-decoration: line-through;
    font-size: 12px;
    margin-left: 10px;
  }

  .goods-list .goods-item .info .sell {
    display: flex;
    justify-content: space-between;
  }
</style>
