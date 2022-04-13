<template>
  <div class="indexHead">
    <!--搜索框-->
    <form action="/">
      <vantSearch
        v-model="value"
        placeholder="请输入搜索关键词"
        @search="onSearch"
      />
    </form>
    <router-link to="/sendPost">
      <vantIcon name="add" />
    </router-link>
  </div>
</template>

<script>
import { Icon,Search } from 'vant';
import { searchList } from "@/api/api";
export default {
  components: {
    "vantIcon": Icon,
    "vantSearch": Search,
  },
  name: "SearchHead",
  data() {
    return {
      // 瀑布流是否可见，默认可见
      value:"",
    };
  },
  methods: {
    onSearch(val) {
      if (!val) {
        this.$store.dispatch("getSearchText", "搜索内容为空");
      }else{
        searchList(val).then(res=>{
          if (res.data.data.total == 0) {
            this.$store.dispatch("getSearchText", "暂无搜索内容");
          }else{
            this.$store.dispatch("getSearchText", "");
            this.$store.dispatch("getSearchMsg", res.data.data.rows.reverse());
          }
        })
      }
      this.$emit("headToIndex", false);
    }
  },
};
</script>


<style scoped lang="less">
//搜索图标
/deep/.van-icon-search {
  font-weight: bold;
}
//发表帖子图标
.van-icon-add {
  display: inline-block;
  position: absolute;
  right: 25px;
  top: 26px;
  font-size: 24px;
}
.indexHead {
  position: relative;
  .van-search {
    padding-top: 20px;
    width: 85%;
    .van-search__content {
      border-radius: 15px;
    }
  }
}
</style>