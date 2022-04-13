<template>
  <div class="waterShell">
    <div class="fall-list">
      <div ref="line1" class="fall-line left">
        <router-link
          :to="{ name: 'postItem', params: { id: item.postsId } }"
          tag="div"
          v-show="visible"
          class="fall-item"
          :id="item.postsId"
          v-for="(item, index) in data1"
          :key="index"
        >
          <div @click="getPostId(item.postsId)">
            <img :src="item.coverImgUrl" alt="" />
            <p class="van-ellipsis postItemTitle">{{ item.title }}</p>
            <p class="postItemName">{{ item.userName }}</p>
          </div>
        </router-link>
      </div>
      <div ref="line2" class="fall-line right">
        <router-link
          :to="{ name: 'postItem', params: { id: item.postsId } }"
          tag="div"
          v-show="visible"
          class="fall-item"
          :id="item.postsId"
          v-for="(item, index) in data2"
          :key="index"
        >
          <div @click="getPostId(item.postsId)">
            <img :src="item.coverImgUrl" alt="" />
            <p class="van-ellipsis postItemTitle">{{ item.title }}</p>
            <p class="postItemName">{{ item.userName }}</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { topicPost } from "@/api/api";
export default {
  name: "WaterFall",
  data() {
    return {
      visible: true,
      data1: [],
      data2: [],
    };
  },
  methods: {
    //瀑布流排序
    doSort(index, list) {
      if (index < list.length) {
        if (this.$refs.line1.offsetHeight <= this.$refs.line2.offsetHeight) {
          this.data1.push(list[index]);
        } else {
          this.data2.push(list[index]);
        }
        //$nextTick:数据更新后执行
        let that = this;
        this.$nextTick(() => {
          setTimeout(() => {
            that.doSort(index + 1, list);
          }, 10);
        });
      }
    },
    getPostId(postid) {
      this.$store.commit("addPostId", postid);
    },
  },

  created() {
    topicPost(this.$route.params.cateId).then((res) => {
      this.doSort(0, res.data.rows);
    });
  },
};
</script>

<style scoped lang="less">
@import "../assets/fonts/fonts.css";
@keyframes fade {
  from {
    transform: translateY(55%);
    opacity: 0.7;
  }
  to {
    transform: translateY(0);
    opacity: 0.9;
  }
}
.waterShell {
  padding-bottom: 57px;
  font-family: "HarmonyOS";
  .fall-list {
    overflow: hidden;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    align-items: flex-start;

    .fall-line {
      width: 45%;
      box-sizing: border-box;
      .fall-item {
        animation: fade 1s;
        box-sizing: border-box;
        width: 100%;
        margin: 7px 0;
        border: 1px solid rgba(0, 0, 0, 0.05);
        padding-bottom: 10px;
        border-radius: 10px;
        overflow: hidden;
        img {
          width: 100%;
        }
        p {
          margin: 0 0 0 10px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .postItemTitle {
          padding: 5px 0 5px;
          font-size: 18px;
        }
        .postItemName {
          font-size: 13px;
          color: #aaa;
        }
      }
    }
    .left {
      margin-left: 10px;
    }
    .right {
      margin-right: 10px;
    }
  }
}
</style>