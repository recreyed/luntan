<template>
  <div class="sendShell">
    <router-link class="backIndexShell" to="/index">
      <span class="iconfont icon-direction_swap_left backIndex"></span>
    </router-link>
    <!--发送帖子内容-->
    <div class="sendTitle">Send Your Message</div>
    <antTextArea
      class="postTitle"
      v-model="postTitle"
      placeholder="在此输入标题"
      auto-size
    />
    <antTextArea
      class="postContent"
      v-model="postContent"
      placeholder="文由心生"
      :auto-size="{ minRows: 3, maxRows: 7 }"
    />
    <!--上传图片-->
    <div class="postPic">
      <img :src="postPicUrl" alt="" />
    </div>
    <antUpload
      name="file"
      action="/recreyed/saveImage"
      @change="changePic"
      :showUploadList="false"
    >
    <span class="iconfont icon-upload sendPostUpload"></span>
    </antUpload>
    <div class="postPicRule"><span>单张图片不可超过5Mb</span></div>
    <!--选择专题-->
    <antSelect
      show-search
      placeholder="选择一个专题"
      option-filter-prop="children"
      style="width: 160px"
      @change="changeTopic"
    >
      <antSelectOption v-for="(item, index) in topicList" :key="index" :value="item.categoryId">
         {{item.name}} 
      </antSelectOption>
    </antSelect>
    <!--发送-->
    <div class="sendBtnShell">
      <vantButton class="sendConfirm" type="default" @click="sendConfirm"
        >确认发布</vantButton
      >
    </div>
  </div>
</template>
<script>
import { Button } from 'vant';
import { Input,Upload,Select,message } from 'ant-design-vue';
import { addPost,topicList } from "@/api/api";
export default {
  components: {
    "vantButton": Button,
    "antTextArea": Input.TextArea,
    "antUpload": Upload,
    "antSelect": Select,
    "antSelectOption": Select.Option,
  },
  name: "SendPost",
  data() {
    return {     
      selTopic: "",// 选择的专题      
      postPicUrl: "",// 上传图片的地址
      postTitle: "",// 帖子标题
      postContent: "",// 贴子内容
      topicList: [],
    };
  },
  methods: {
    // 上传图片
    changePic(info) {
      if (info.file.status === "done") {
        message.success(`图片上传成功`);
        this.postPicUrl = info.file.response.data.url;
      } else if (info.file.status === "error") {
        message.error(`图片上传失败`);
      }
    },
    // 选择专题
    changeTopic(value) {
      this.selTopic = value;
    },
    //发布帖子
    sendConfirm() {
      addPost(this.selTopic,this.postTitle,this.postContent,this.postPicUrl).then(res => {
        this.$router.replace("/index");
      });
    },
  },
  created(){
    // 专题列表下拉框
    topicList().then(res=>{ 
      this.topicList = res.data.data;
    })
  },
};
</script>

<style scoped lang="less">
@import "../assets/fonts/fonts.css";
.sendShell {
  margin: 20px 20px 0 20px;
  .backIndexShell {
    .backIndex {
      font-size: 35px;
    }
  }
  .sendTitle {
    margin-top: 20px;
    font-family: "playball";
    font-size: 24px;
  }
  .postTitle {
    margin: 15px 0 10px;
    width: 95%;
  }
  .postContent {
    width: 95%;
  }
  .postPic {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    height: 100px;

    margin-top: 15px;
    img {
      height: 100%;
    }
  }
  .sendPostUpload {
    font-size: 30px;
  }
  .postPicRule {
    margin-top: 10px;
    font-size: 14px;
    color: #aaa;
    margin-bottom: 10px;
  }
  .sendBtnShell {
    display: flex;
    justify-content: center;
    .sendConfirm {
      background-color: #000;
      color: #fff;
      border-radius: 20px;
      width: 70%;
      position: absolute;
      bottom: 50px;
    }
  }
}
</style>