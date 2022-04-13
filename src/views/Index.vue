<template>
  <div>
    <SearchHead @headToIndex="fromSearchHead"></SearchHead>
    <SearchMain v-if="!WaterVisible" @mainToIndex="fromSearchMain"></SearchMain>
    <WaterFall v-if="WaterVisible" :indexList="indexPost"></WaterFall>
    <DownNav v-if="WaterVisible" :iconNum="iconIndex"></DownNav>
  </div>
</template>

<script>
import SearchHead from "@/components/SearchHead";
import WaterFall from "@/components/WaterFall"
import DownNav from "@/components/DownNav";
import SearchMain from "@/components/SearchMain";
import { allPost } from "@/api/api";
export default {
  name: "Index",
  components: {
    SearchHead,
    WaterFall,
    SearchMain,
    DownNav,
  },
  data() {
    return {
      // 传给底部栏
      iconIndex: 1,
      // 控制搜索组件是否可见，默认可见
      WaterVisible: true,
      // 主页瀑布流
      indexPost: [],
    };
  },
  methods: {
    // 点击head让瀑布流消失，显示搜索内容
    fromSearchHead(WaterVisibleFromSon) {
      this.WaterVisible = WaterVisibleFromSon;
    },
    // 返回时watch监听WaterVisible，搜索页面消失，显示主页瀑布流
    fromSearchMain(WaterVisible) {
      this.WaterVisible = WaterVisible;
    },
  },
  created() {
    allPost().then(res => {
      this.indexPost = res.data.data.rows.reverse();
    });
  }
};
</script>

<style scoped>
</style>