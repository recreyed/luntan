<template>
  <div class="mainShell">
    <router-link to="/index" tag="div" class="back">
      <span class="iconfont icon-direction_swap_left backIndex"></span>
    </router-link>
    <div id="postMove">
      <div class="barshell" @touchstart="touchstart" @touchmove="touchmove">
        <div id="moveBar"></div>
      </div>
      <div class="postContent">
        <img class="avatar" :src="postInfo.avatar" alt="" />
        <span class="postUser">{{ postInfo.userName }}</span>
        <h3 class="postTitle">{{ postInfo.title }}</h3>
        <div class="postMsg">{{ postInfo.content }}</div>
        <div class="postCover">
          <img :src="postInfo.coverImgUrl" alt="" />
        </div>
        <br />
        <div class="postData">
          <div>{{ postTime | dateFormat }}</div>
          <div>
            <antIcon type="read" />{{ postInfo.readNum }}
          </div>
          <div>
            <antIcon type="like" class="zan" @click="addZan" id="zanIcon" />{{ postInfo.zan }}
          </div>
        </div>
        <!-- 修改删除帖子 -->
        <div class="editPost" v-if="postUserId === userId">
          <router-link :to="{ name: 'changePost', params: { id: this.$route.params.id } }">
            <antTag class="editIcon">修改</antTag>
          </router-link>
          <antTag class="editIcon" @click="delPost">删除</antTag>
        </div>

        <!-- 评论 -->
        <div v-if="isCommend">
          <div style="overflow: hidden">
            <antTextArea placeholder="来一条吧" auto-size v-model="commend" />
            <input
              type="button"
              value="发表"
              @click="sendCommend"
              class="sendbtn"
              :disabled="disabled"
              ref="sendbtn"
            />
          </div>
          <div v-for="(item, index) in commendList" :key="index">
            <div class="commendItem" :id="item.commentId">
              <img :src="item.avatar" alt="" />
              {{ item.commentContent }}
              <antIcon
                type="close"
                style="float: right; margin-top: 7px"
                @click="deleteComment(item.commentId)"
              />
            </div>
          </div>
        </div>
        <div v-else>
          <div style="overflow: hidden">
            <antTextArea
              placeholder="没有评论嗷~ 来一条吧"
              auto-size
              v-model="commend"
            />
            <input
              type="button"
              value="发表"
              @click="sendCommend"
              class="sendbtn"
              :disabled="disabled"
              ref="sendbtn"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Input,Tag,Icon,message } from 'ant-design-vue';
import {
  removePost,
  getUserInfo,
  postDetail,
  commendList,
  SendComment,
  DeleteComment
} from "@/api/api";

export default {
  name: "PostDetail",
  components: {
    "antTextArea": Input.TextArea,
    "antIcon": Icon,
    "antTag": Tag
  },
  data() {
    return {
      isCommend: false,
      commendList: [],
      postInfo: {},
      postTime: "",
      commend: "",
      disabled: true,
      visible: false,
      message: "",

      // 用户ID
      postUserId: "",
      userId: "",
    };
  },
  methods: {
    // 赞样式
    addZan() {
      document.getElementById("zanIcon").style.color = "blue";
    },
    // 返回首页
    toIndex() {
      this.$router.replace("/index");
    },
    showModal() {
      this.visible = true;
    },
    // 检测滑动
    touchstart(e) {
      e.preventDefault();
      this.startY = e.touches[0].clientY;
    },
    touchmove(e) {
      e.preventDefault();
      this.moveY = e.touches[0].clientY;
      //上划
      if (this.moveY - this.startY <= 0) {
        document.getElementById("postMove").setAttribute("class", "postUnfold");
        document.getElementById("postMove").style.top = "0";
        document.getElementById("postMove").style.borderRadius = "0";
      }
      //下滑
      if (this.startY - this.moveY <= 0) {
        document.getElementById("postMove").setAttribute("class", "postFold");
        document.getElementById("postMove").style.top = "55%";
        document.getElementById("postMove").style.borderRadius = "30px";
      }
    },
    // 删除帖子
    delPost() {
      removePost(this.$route.params.id)
        .then((res) => {
          if (res.data.code === 0) {
            message.success("删除成功");
            this.$router.replace("/index");
          }
        })
        .catch((rej) => {
          console.log(rej);
        });
    },
    // 请求评论列表
    getcommendList() {
      commendList(this.$route.params.id).then((res) => {
        if (res.data.total === 0) {
          this.isCommend = false;
        } else {
          this.isCommend = true;
          this.commendList = res.data.rows;
        }
      });
    },
    //  发表评论并且更新评论列表
    sendCommend() {
      SendComment(this.$route.params.id, this.commend)
        .then((res) => {
          console.log(res);
          if (res.data.code == 0) {
            message.success("发表成功");
            this.getcommendList();
            this.commend = "";
          } else {
            message.error(`${res.msg}`);
          }
        })
        .catch(() => {
          console.log(res);
          message.error(`网络繁忙，请稍后再试。。。。`);
        });
    },

    // 删除评论
    deleteComment(id) {
      DeleteComment(id)
        .then((res) => {
          console.log(res);
          if (res.data.code == 0) {
            message.success("删除成功");
            this.getcommendList();
          } else {
            message.error(`${res.msg}`);
          }
        })
        .catch(() => {
          message.error(`网络繁忙，请稍后再试。。。。`);
        });
    },
  },
  // 时间过滤器
  filters: {
    dateFormat(data) {
      let timeDay = data.split(" ")[0];
      let correctDay = String(Number(timeDay.split("-")[2]) - 1);
      return (
        timeDay.split("-")[0] +
        "-" +
        timeDay.split("-")[1] +
        "-" +
        correctDay.padStart(2, "0")
      );
    },
  },
  created() {
    // 帖子详情
    postDetail(this.$route.params.id).then((res) => {
      this.postInfo = res.data.data;
      this.postTime = this.postInfo.createTime;
      this.postUserId = this.postInfo.userId;
    });
    // 获取评论列表
    this.getcommendList();
    // 获取当前登录用户信息
    getUserInfo().then((res) => {
      this.userId = res.data.data._id;
    });
  },
  watch: {
    commend: function (newval) {
      if (newval != "") {
        this.disabled = false;
        this.$refs.sendbtn.style.backgroundColor = "royalblue";
      } else {
        this.disabled = true;
        this.$refs.sendbtn.style.backgroundColor = "";
      }
    },
  },
};
</script>

<style scoped lang="less">
@import url("../assets/fonts/fonts.css");
//上划动画
@keyframes fill {
  from {
    top: 55%;
    border-radius: 30px;
  }
  to {
    top: 0;
    border-radius: 0;
  }
}
//下滑动画
@keyframes unFill {
  from {
    top: 0;
    border-radius: 0;
  }
  to {
    top: 55%;
    border-radius: 30px;
  }
}

.postUnfold {
  animation: fill 0.6s;
}

.postFold {
  animation: unFill 0.6s;
}

.mainShell {
  height: 100vh;
  background: url("http://59.110.124.95:3000/images/1647506269462-detailPic.jpg")
    center center no-repeat;
  background-size: cover;
  .back {
    position: fixed;
    margin-left: 20px;
    padding-top: 5px;
    width: 20%;
    z-index: 40;
    .backIndex {
      font-size: 45px;
    }
  }
  #postMove {
    width: 100%;
    height: 100vh;
    padding: 0 15px;
    position: absolute;
    top: 55%;
    background-color: #fff;
    border-radius: 30px;
    font-family: "HarmonyOS";
    .barshell {
      padding: 20px 0 35px;
      #moveBar {
        margin: auto;
        width: 15%;
        height: 5px;
        background-color: #bbb;
        border-radius: 2px;
      }
    }

    .postContent {
      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 15px;
        vertical-align: middle;
      }
      .postUser {
        font-size: 17px;
        font-weight: bold;
      }
      .postTitle {
        margin: 20px 0 25px;
        font-size: 20px;
        font-weight: bold;
      }
      .postMsg {
        font-size: 16px;
      }

      .postCover {
        margin-top: 15px;
        width: 70%;
        img {
          margin: auto;
          width: 100%;
        }
      }

      .postData {
        display: flex;
        justify-content: flex-end;

        div {
          height: 30px;
          margin: 0 10px;
          line-height: 30px;
        }
      }
      .editPost {
        margin: 10px 0 20px;
        overflow: hidden;
        .editIcon {
          float: right;
        }
      }
      .commendItem {
        // border: 1px solid #000;
        border-bottom: 1px solid #ddd;
        margin: 15px 0;
        padding: 0 10px 10px;

        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
      }
    }
    .sendbtn {
      float: right;
      margin-top: 5px;
      background-color: #bbb;
      color: white;
      border: 0;
      outline: 0;
    }
  }
}
.replybtn {
  height: 28px;
  float: right;
  margin-right: 10px;
  border: 0;
  outline: 0;
  background-color: white;
  color: cornflowerblue;
}
.sendbtn1 {
  position: relative;
  left: 85%;
  margin-top: 10px;
  background-color: rgb(36, 100, 219);
  color: #fff;
  border: 0;
  outline: 0;
}
.replycommendItem {
  width: 90%;
  margin: auto;
  background-color: #eee;
  margin-top: 5px;
}
</style>