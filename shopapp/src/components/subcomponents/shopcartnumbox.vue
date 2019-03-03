<template>
  <div class="mui-numbox" data-numbox-min="1" style="height: 25px">
    <button class="mui-btn mui-btn-numbox-minus" type="button" @click="reduce">-</button>
    <input id="test" class="mui-input-numbox" type="number" v-model="num">
    <button class="mui-btn mui-btn-numbox-plus" type="button" @click="add">+</button>
  </div>
</template>

<script>
  import axios from "axios"
  export default {
    data() {
      return {}
    },
    props: ["num", "id"],
    methods: {
      reduce() {
        if (this.num <= 1) {
          return
        } else {
          this.$emit("change", this.id, "reduce");

        }
      },
      add() {
        this.$emit("change", this.id, "add");

      },
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

</style>
