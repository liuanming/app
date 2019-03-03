<template>
  <div class="shopcar-container">
    <div class="good-list">
      <div class="mui-card" v-for="item in carlist" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <div @click.prevent="carcheck(item.id)">
              <mt-switch v-model="item.checked==1?true:false"></mt-switch>
            </div>
            <img :src="'/static/images/'+item.img_url" alt="">
            <div class="info">
              <h1>{{item.title}}</h1>
              <p>
                <span class="price">￥{{item.sell_price}}</span>
                <shopcar :num="item.productNum" :id="item.id" @change="changenum"></shopcar>
                <a href="#" @click="deletecart(item.id)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner jies">
          <div class="left">
            <p>总计（不含运费）</p>
            <p>已勾选商品 <span class="red">{{this.$store.state.xuannumber}}</span> 件，总价 <span class="red">￥{{this.$store.state.he}}</span>
            </p>
          </div>
          <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import shopcar from "./../subcomponents/shopcartnumbox"
  import axiox from "axios"

  export default {
    data() {
      return {
        asd: false,
        carlist: [],
      }
    },
    mounted() {
      this.getcarlist();
      this.carcheck()
    },
    methods: {
      getcarlist() {
        axiox.post("/users/cartlist").then(result => {
          if (result.data.status == "0") {
            this.carlist = result.data.result;
          }
        })
      },
      changenum(id, leix) {
        axiox.post("/users/cartchange", {id: id, leix: leix}).then(result => {
          if (result.data.status == "0") {
            this.$store.commit("settotalnumber", result.data.result.number);
            this.$store.commit("getxuannumber", result.data.result.xuannumber);
            this.$store.commit("gethe", result.data.result.he);
            this.getcarlist()
          }
        })
      },
      carcheck(id) {
        axiox.post("/users/carcheck", {id: id}).then(result => {
          if (result.data.status == "0") {
            this.$store.commit("getxuannumber", result.data.result.xuannumber);
            this.$store.commit("gethe", result.data.result.he);
            this.getcarlist()
          }
        })
      },
      deletecart(id) {
        axiox.post("/users/deletecart", {id: id}).then(result => {
          if (result.data.status == "0") {
            this.changenum()
          }
        })
      }
    },
    components: {
      shopcar
    }
  }
</script>

<style scoped>
  .shopcar-container {
    background-color: white;
    overflow: hidden;
  }

  .good-list .mui-card-content-inner {
    display: flex;
    align-items: center;
  }

  .good-list .mui-card img {
    min-width: 60px;
    height: 60px;
  }

  .good-list .mui-card .info p {
    margin: 0;
    margin-left: 5px;
  }

  .good-list .mui-card .info h1 {
    font-size: 13px;
    margin-left: 5px;
  }

  .good-list .mui-card .info .price {
    color: red;
    font-weight: bold;
  }

  .mint-switch {
    margin-right: 5px;
  }

  .jies {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .red {
    color: red;
  }
</style>
