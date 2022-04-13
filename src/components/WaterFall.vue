<template>
  <div>
    <vantList
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad">
      <div class="waterShell">
        <div class="fall-list">
          <div ref="line1" class="fall-line left">
            <router-link
              v-for="(item, index) in data1"
              :to="{ name: 'postItem', params: { id: item._id } }"
              :id="item.postsId"
              :key="index"
              v-show="visible"
              tag="div"              
              class="fall-item"
            >
              <div @click="getPostId(item.postsId)">
                <img :src="item.coverImgUrl" alt="" />
                <p class="postItemTitle">{{ item.title }}</p>
                <p class="postItemName">{{ item.userName }}</p>
              </div>
            </router-link>
          </div>
          <div ref="line2" class="fall-line right">
            <router-link
              v-for="(item, index) in data2"
              :to="{ name: 'postItem', params: { id: item._id } }"              
              :id="item.postsId"              
              :key="index"
              v-show="visible"
              tag="div"              
              class="fall-item"
            >
              <div @click="getPostId(item.postsId)">
                <img :src="item.coverImgUrl" alt="" />
                <p class="postItemTitle">{{ item.title }}</p>
                <p class="postItemName">{{ item.userName }}</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </vantList>
  </div>
</template>

<script>
import { List } from 'vant';

export default {
  components: {
    "vantList": List,
  },
  name: "WaterFall",
  data() {
    return {
        visible: true,
        data1: [],
        data2: [],
        // 触底加载
        list: [],
        loading: false,
        finished: false,
        //逆向请求控制
        pagenum: 0,
        // 各页面pagesize
        indexPageSize:10,
        myPostPageSize:5,
        searchPostPageSize:10    
    };
  },
  methods: {
    // 触底加载
    onLoad() {
        if (this.pagenum != 0){
            // 首页瀑布流
            if(this.indexList){
              this.list = this.indexList.splice( (this.pageNum-1)*this.myPostPageSize,this.myPostPageSize )
              this.doSort(0, this.list);
              this.pagenum--;
              // 加载状态结束
              this.loading = false;
              // 数据全部加载完成
              if (this.pagenum <= 0) { this.finished = true; }
            }
            // 个人中心瀑布流
            if(this.myPostList){
              this.list = this.myPostList.splice( (this.pageNum-1)*this.indexPageSize,this.indexPageSize )
              this.doSort(0, this.list);
              this.pagenum--;
              this.loading = false;
              if (this.pagenum <= 0) { this.finished = true; }
            }
            // 搜索结果
            if(this.searchPostList){
              this.data1 = [];
              this.data2 = [];
              this.list = JSON.parse(JSON.stringify(this.searchPostList)).splice( (this.pageNum-1)*this.searchPostPageSize,this.searchPostPageSize );
              this.doSort(0, this.list);
              this.pagenum--;
              this.loading = false;
              if (this.pagenum <= 0) { this.finished = true; }
            }
        }
    },
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
    //进入详情页
    getPostId(postid) {
      this.$store.commit("addPostId", postid);
    },
  },
  props: {
    indexList: { type: Array },// 首页 父传子，传值全部帖子
    myPostList: {type: Array},// 个人中心页
    searchPostList:{type: Array}, //搜索结果页
  },
  watch: {
    indexList: function() {
        this.pagenum = Math.ceil(this.indexList.length / this.indexPageSize);
        this.onLoad();
    },
    myPostList: function(){
        this.pagenum = Math.ceil(this.myPostList.length / this.myPostPageSize);
        this.onLoad();
    },
    searchPostList: function(){
        this.pagenum = Math.ceil(this.searchPostList.length / this.searchPostPageSize);
        this.onLoad();
    }
  },
  created() {}
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
        animation: fade 0.6s;
        box-sizing: border-box;
        width: 100%;
        margin: 7px 0;
        box-shadow: 0 1px 3px 2px rgba(7, 17, 27, 0.1);
        padding-bottom: 10px;
        border-radius: 10px;
        overflow: hidden;
        img {
          width: 100%;
          max-height: 400px;
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