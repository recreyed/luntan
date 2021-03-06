import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "../src/assets/iconfont/iconfont.css"

import 'vant/lib/index.css';
import 'ant-design-vue/dist/antd.less';

Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
