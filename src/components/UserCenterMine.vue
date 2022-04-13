<template>
  <div>
    <vantRow type="flex" justify="space-around" class="header">
      <vantCol span="6" style="text-align: center">
        <router-link to="/watchhistory" tag="div">
          <antIcon type="clock-circle" class="icon" />
          <br />
          <span>观看记录</span>
        </router-link>
      </vantCol>

      <vantCol span="6" style="text-align: center">
        <router-link to="/chatwithperson" tag="div">
          <antIcon type="customer-service" class="icon" />
          <br />
          <span>客服中心</span>
        </router-link>
      </vantCol>

      <vantCol span="6" style="text-align: center">
        <router-link to="/setting" tag="div">
          <antIcon type="setting" class="icon" />
          <br />
          <span>设置中心</span>
        </router-link>
      </vantCol>
    </vantRow>
    <div class="mine">
      <div class="mine-top">
        <span class="invitation"> 与我相关 </span>
        <router-link to="/sendPost">
          <antIcon type="plus-circle" theme="filled" class="add" />
        </router-link>
      </div>
      <div class="mine-body">
        <div v-if="isLogin">
          <WaterFall :myPostList="mylist"></WaterFall>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Col, Row } from 'vant';
import { Icon } from 'ant-design-vue';
import WaterFall from "@/components/WaterFall";
import { myPost } from "@/api/api";
import { mapState } from "vuex";
export default {
  name: "UserCenterMine",
  components: {
    WaterFall,
    "vantCol": Col,
    "vantRow": Row,
    "antIcon":Icon,
  },
  data() {
    return {
      mylist: [],
    };
  },
  created() {
    if (this.isLogin) {
        myPost().then(res => {
          this.mylist = res.data.data.rows;
          this.$store.state.likeNumber = 0;
      // if (false) {
      //   for (let i = 0; i < this.mylist.length; i++) {
      //     this.$store.state.likeNumber += Number(this.mylist[i].zan);
      //     // console.log(this.mylist[i].zan)
      //   }
      // }
    });
      }
    
  },
  computed: {
    ...mapState({
      isLogin: "isLogin",
    }),
  },
};
</script>

<style scoped lang="less">
.header {
  margin-top: 20px;

  .icon {
    font-size: 25px;
    font-weight: 700;
    margin-bottom: 10px;
  }

  span {
    font-size: 14px;
  }
}

.mine {
  margin-top: 20px;

  .mine-top {
    overflow: hidden;
    margin: 0 20px;

    .invitation {
      display: inline-block;
      width: 90px;
      height: 40px;
      border-radius: 20px;
      background-color: #2c3e50;
      color: white;
      text-align: center;
      line-height: 40px;
    }

    .add {
      float: right;
      color: #2c3e50;
      font-size: 35px;
      margin-top: 5px;
    }
  }
}
</style>