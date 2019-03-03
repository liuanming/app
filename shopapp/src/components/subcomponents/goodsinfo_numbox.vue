<template>
  <div class="mui-numbox" data-numbox-min="1" data-numbox-max="9">
    <button class="mui-btn mui-btn-numbox-minus" type="button" @click="reduce">-</button>
    <input id="test" class="mui-input-numbox" type="number" :value="Num">
    <button class="mui-btn mui-btn-numbox-plus" type="button" @click="add">+</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        Num: 1,
      }
    },
    methods: {
      reduce() {
        if (this.Num <= 1) {
          return
        } else {
          this.Num--;
          this.$emit("num", this.Num);
        }
      },
      add() {
        this.Num++;
        this.$emit("num", this.Num);
      }
    }
  }
</script>

<style scoped>

</style>
