<template>
  <div>
    <header>
      <router-link to="/userCenter">
        <vantIcon name="arrow-left" />
      </router-link>
      <span>观看历史</span>
    </header>
    <div v-for="(item, index) in otherlist" :key="index" class="everylist">
      <div class="left">
        <img :src="item.coverImgUrl" alt="" />
      </div>
      <div class="right">
        <div class="avatar">
          <span>{{ item.userName }}</span>
          <img :src="item.avatar" alt="" />
        </div>
        <span class="title">{{ item.title }}</span>
        <p>{{ item.intro }}</p>
        <span class="time">{{ item.createTime }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from 'vant';
import { postDetail } from "@/api/api";

export default {
  components: {
    "vantIcon":Icon,
  },
  name: "WatchHistory",
  data() {
    return {
      id: [],
      list: [],
      otherlist: JSON.parse(localStorage.getItem("list")),
    };
  },
  created() {
    this.id = Array.from(new Set(this.$store.state.postid));
    for (let i = 0; i < this.id.length; i++) {
      postDetail(this.id[i]).then((res) => {
        this.list.push(res.data.data);
        this.list.reverse;
        // console.log(this.list);
        localStorage.setItem("list", JSON.stringify(this.list));
      });
      console.log(this.list);
    }
  },
};
</script>

<style scoped lang="less">
header {
  height: 40px;
  font-size: 25px;

  span {
    display: inline-block;
    width: 90%;
    text-align: center;
    line-height: 40px;
  }
}
.everylist {
  width: 100%;
  height: 150px;
  border: 1px solid #ddd;
  overflow: hidden;
  margin-top: 20px;
  .left {
    float: left;
    width: 40%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .right {
    float: right;
    width: 60%;
    height: inherit;
    position: relative;
    .avatar {
      float: right;
      margin-top: 10px;
      img {
        width: 30px;
        height: 30px;
        margin-left: 10px;
        border-radius: 15px;
      }
    }
    .title {
      //   float: left;
      width: 80%;
      display: block;
      margin-top: 50px;
      margin-left: 10px;
      font-size: 25px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    p {
      margin-top: 20px;
      width: 200px;
      margin-left: 10px;
      word-wrap: break-word;
      word-break: normal;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .time {
      position: absolute;
      bottom: 0;
      right: -45px;
      font-size: 12px;
    }
  }
}
</style>