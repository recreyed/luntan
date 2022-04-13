<template>
  <div>
    <vantRow type="flex" justify="space-between" class="title">
      <vantCol span="18">
        <h1 class="title-top">消息通知</h1>
      </vantCol>
      <vantCol span="4"><vantIcon name="delete-o" class="delete" /></vantCol>
    </vantRow>
    <vantRow type="flex" justify="space-around">
      <vantCol span="6" class="list">\
        <vantIcon name="chat" class="listicon" />通知
      </vantCol>
      <vantCol span="6" class="list">
        <vantIcon name="smile" class="listicon" />粉丝
      </vantCol>
      <vantCol span="6" class="list">
        <vantIcon name="like" class="listicon" />喜欢
      </vantCol>
    </vantRow>
  </div>
</template>

<script>
import { Col, Row,Icon } from 'vant';
export default {
  components: {
    "vantCol": Col,
    "vantRow": Row,
    "vantIcon":Icon,
  },
  name: "NotificationHeader",
};
</script>

<style scoped lang="less">
@import "../assets/fonts/fonts.css";
.title {
  font-family: "HarmonyOS";
  height: 50px;
  margin-bottom: 20px;
}
.title-top {
  font-size: 25px;
  text-align: left;
  padding-left: 30px;
  width: 100%;
  height: 100%;
  line-height: 70px;
}
.delete {
  font-size: 25px;
  margin-top: 20px;
  margin-right: 20px;
}
.list {
  background-color: #2c3e50;
  color: #fff;
  height: 50px;
  line-height: 50px;
  border-radius: 25px;
  font-weight: 600;
  text-align: center;
  .listicon {
    font-size: 22px;
    margin-right: 9px;
    vertical-align: text-bottom;
  }
}
</style>