<template>
    <div class="allLetter">
      <h4>全部私信</h4>
      <ul>
        <router-link to="/chatWithPerson" tag="li">
          <img src="../assets/robot.jpeg" alt="">
          <span class="name">智熄机器人</span>
          <span class="content">你好，我是智熄机器人</span>
        </router-link>
        <router-link to="/oneiromancy" tag="li">
          <img :src="'https://img0.baidu.com/it/u=3061359450,46743588&fm=26&fmt=auto&gp=0.jpg'" alt="">
          <span class="name">周公解梦</span>
          <span class="content">你可以和我聊聊你的梦</span>
        </router-link>
      </ul>
    </div>
</template>

<script>

export default {
name: "PivateLetter",
  data(){
  return {
    msg:{}
  }
  },
  methods:{

  },
}
</script>

<style scoped lang="less">
.allLetter{
  margin-top: 20px;
  h4{
    text-align: left;
    margin-left:20px;
    font-size: 18px;
    margin-bottom: 15px;
  }
  li{
    text-align: left;
    padding-left: 20px;
    overflow: hidden;
    img{
      float: left;
      width: 50px;
      height: 50px;
      border-radius: 25px;
      vertical-align: top;
    }
    .name{
      display: block;
      float: left;
      font-weight: 600;
      margin-left: 10px;
    }
    .content{
      //float: left;
      display: block;
      margin: 30px 60px;
      font-size: 13px;
      color: darkgray;
    }
  }

}

</style>