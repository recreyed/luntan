import Vue from 'vue'
import Vuex from 'vuex'
import { getUserInfo } from "@/api/api";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //是否登录和个人信息
    isLogin: false,
    userInfo: {},
    //获赞数
    likeNumber: 0,
    // 帖子id
    postid: [],
    // 搜索内容
    searchMsg: [],
    // 搜索信息
    searchText: '',
    //音乐球显示状态
    musicBall: false,
    //控制音乐开始暂停
    musicPlay: false,
  },
  // 同步
  mutations: {
    //更改个人信息
    changeUserInfo(state, payload) {
      state.isLogin = payload.isLogin
      state.userInfo = payload.userInfo
    },
    //搜索内容传值
    changeSearchMsg(state, payload) {
      state.searchMsg = payload;
    },
    //修改搜索信息
    changeSearchText(state, payload) {
      state.searchText = payload;
    },
    // 获取帖子id
    addPostId(state, payload) {
      state.postid.push(payload)
    },
    //修改音乐球显示状态
    changeMusicBall(state, payload) {
      state.musicBall = payload;
    },
    //修改音乐播放状态
    changeMusicPlay(state, payload) {
      state.musicPlay = payload;
    }

  },
  // 异步
  actions: {
    //获取全局登陆状态
    getUserIsLogin(context) {
      getUserInfo().then(res => {
        if (res.data.state == 200) {
          context.commit("changeUserInfo", { isLogin: true, userInfo: res.data.data })
        } else {
          context.commit("changeUserInfo", { isLogin: false, userInfo: {} })
        }
      })
    },
    //搜索传值方法调用
    getSearchMsg(context, payload) {
      context.commit('changeSearchMsg', payload)
    },
    //搜索文字修改方法调用
    getSearchText(context, payload) {
      context.commit('changeSearchText', payload)
    },
    //修改音乐球状态方法调用
    getMusicBall(context, payload) {
      context.commit('changeMusicBall', payload)
    },
    //修改音乐播放状态方法调用
    getMusicPlay(context, payload) {
      context.commit('changeMusicPlay', payload)
    },
  },
  modules: {
  }
})
