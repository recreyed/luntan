<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    // 检查登录状态
    this.$store.dispatch("getUserIsLogin");
  },
};
</script>

<style lang="less">
</style>
