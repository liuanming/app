<template>
  <div>
    <div id="slider" class="mui-slider">
      <div id="sliderSegmentedControl"
           class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
           data-scroll="1">
        <div class="mui-scroll" style="transform: translate3d(0px, 0px, 0px) translateZ(0px);">
          <a class="mui-control-item mui-active" href="javascript:;" data-wid="tab-top-subpage-1.html" @click="zero">
            全部
          </a>
          <a class="mui-control-item" href="javascript:;" data-wid="tab-top-subpage-2.html" v-for="item in picturetitle"
             :key="item.id" @click="obtainpicture(item.id)">
            {{item.title}}
          </a>
        </div>
      </div>
    </div>

    <ul class="photo-list">
      <li v-for="item in picturelist" :key="item.id">
        <img v-lazy="'/static/images/'+item.src">
      </li>
    </ul>
  </div>
</template>

<script>
  import axiox from "axios"

  export default {
    data() {
      return {
        picturetitle: [],
        picturelist: []
      }
    },
    mounted() {
      this.getpicture();
      this.zero()
    },
    methods: {
      getpicture() {
        axiox.get("/pictures/picturestitle").then(result => {
          if (result.data.status == "0") {
            this.picturetitle = result.data.result
          }
        })
      },
      zero() {
        var param = {
          id: 0
        };
        axiox.get("/pictures/pictureslist", {params: param}).then(result => {
          if (result.data.status == 0) {
            this.picturelist = result.data.result;
            console.log(result.data.result)
          }
        })
      },
      obtainpicture(id) {
        var param = {
          id: id
        };
        axiox.get("/pictures/pictureslist", {params: param}).then(result => {
          if (result.data.status == 0) {
            this.picturelist = result.data.result;
            console.log(result.data.result)
          }
        })
      }
    }
  }
</script>

<style scoped>
  * {
    touch-action: pan-y;
  }

  img[lazy=loading] {
    width: 40px;
    height: 300px;
    margin: auto;
  }
  .photo-list {
    margin: 0;
    padding: 10px;
  }
  .photo-list li {
    list-style: none;
    text-align: center;
    box-shadow: 0 0 6px #999;
    background-color: #cccccc;
    margin-top: 15px;
  }
  .photo-list img {
    width: 100%;
    vertical-align: middle;
  }
</style>
