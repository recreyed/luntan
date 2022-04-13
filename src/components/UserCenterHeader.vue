<template>
  <div class="header">
    <div class="message">
      <div class="nologin" v-if="!isLogin" @click="login">
        <span class="noname">登录/注册</span>
        <img
          :src="'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'"
          alt=""
        />

        <vantRow type="flex" class="headerOther">
          <vantCol span="6">
            <span class="number">0</span>
            <br />
            <span class="string">关注</span>
          </vantCol>
          <vantCol span="6">
            <span class="number">0</span>
            <br />
            <span class="string">粉丝</span>
          </vantCol>
          <vantCol span="6">
            <span class="number">0</span>
            <br />
            <span class="string">获赞</span>
          </vantCol>
        </vantRow>
      </div>
      <div v-else class="loginok">
        <span  class="name">{{userInfo.userName}}</span>
        <span  class="other">{{userInfo.remark}}</span>
        <img :src="userInfo.avatar || 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'" alt=""/>
        <antUpload
          class="edit"
          name="file"
          action="/recreyed/saveImage"          
          :showUploadList="false"
          @change="handleChange"
        >
        <antButton class="btn"><vantIcon name="edit" class="pen" /></antButton>
        </antUpload>
        <vantRow type="flex" class="headerOther">
          <vantCol span="6">
            <span class="number">{{ number1 }}</span>
            <br />
            <span class="string">关注</span>
          </vantCol>
          <vantCol span="6">
            <span class="number">{{ number2 }}</span>
            <br />
            <span class="string">粉丝</span>
          </vantCol>
          <vantCol span="6">
            <span class="number">{{ likeNumber }}</span>
            <br />
            <span class="string">获赞</span>
          </vantCol>
        </vantRow>
      </div>
    </div>
  </div>
</template>

<script>
import { Col, Row,Icon } from 'vant';
import { Upload,Button,message } from 'ant-design-vue';
import { mapState } from "vuex";
import { changeUserAvatar } from "@/api/api"
export default {
  components: {
    "vantCol": Col,
    "vantRow": Row,
    "vantIcon":Icon,
    "antUpload":Upload,
    "antButton":Button,
  },
  name: "UserCenterHeader",
  data() {
    return {
      number1: 0,
      number2:0
    };
  },
  methods: {
    login() {
      this.$router.push("/sign");
    },
    // 修改头像
    handleChange(info) {
      if (info.file.status === "done") {
        console.log(info)
        message.success(`头像上传成功`);
        changeUserAvatar(info.file.response.data.url);
        this.$store.dispatch("getUserIsLogin");
      } else if (info.file.status === "error") {
        message.error(`头像上传失败`);
      }
    },
    getRandom() {
      this.number1 = Math.floor(Math.random() * 1001);
      this.number2 = Math.floor(Math.random() * 1001);
    },
  },
  created() {
    this.getRandom();
  },
  computed: {
    ...mapState({
      isLogin: "isLogin",
      userInfo: "userInfo",
      likeNumber: "likeNumber",
    }),
  },
};
</script>

<style scoped lang="less">
.header {
  height: 250px;
  background-color: #eeeeee;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;

  .message {
    .loginok {
      overflow: hidden;
      position: relative;

      .name {
        position: absolute;
        top: 60px;
        left: 15px;
        font-size: 25px;
        font-weight: 700;
        border: 0;
        width: 200px;
        height: 40px;
        background-color: #eeeeee;
      }

      .other {
        position: absolute;
        top: 110px;
        left: 15px;
        font-size: 14px;
        font-weight: 700;
        border: 0;
        width: 200px;
        height: 20px;
        background-color: #eeeeee;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      img {
        width: 80px;
        height: 80px;
        border-radius: 40px;
        float: right;
        margin-top: 50px;
        margin-right: 20px;
      }

      .edit {
        width: 20px;
        height: 20px;
        border-radius: 10px;
        position: absolute;
        top: 110px;
        right: 28px;
        background-color: black;
        color: white;
        overflow: hidden;

        .btn {
          padding: 0;
          color: white;
          border: 0;
          outline: 0;
          width: 20px;
          height: 20px;
          border-radius: 10px;
          background-color: black;
          .pen {
            position: absolute;
            top: -3px;
            left: -1px;
            font-size: 20px;
          }
        }
      }
    }

    .nologin {
      overflow: hidden;
      position: relative;

      .noname {
        position: absolute;
        top: 60px;
        left: 20px;
        font-size: 25px;
        font-weight: 700;
        width: 200px;
        height: 40px;
      }

      img {
        width: 80px;
        height: 80px;
        border-radius: 40px;
        float: right;
        margin-top: 50px;
        margin-right: 20px;
      }
    }

    .headerOther {
      margin-top: 171px;

      .number {
        display: block;
        text-align: center;
        font-size: 25px;
        font-weight: 800;
      }

      .string {
        display: block;
        text-align: center;
        font-size: 14px;
        color: #999999;
        margin-top: -16px;
      }
    }
  }
}
</style>