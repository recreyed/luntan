import Vue from 'vue'
import VueRouter from 'vue-router'
import LinkStart from "@/views/LinkStart";
import { getUserInfo } from "@/api/api";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/linkStart',
  },
  {
    path: '/linkStart',
    component: LinkStart
  },
  //  首页
  {
    path: '/index',
    component: () => import('@/views/Index'),
  },
  // 音乐页
  {
    path: '/creativity',
    component: () => import('@/views/Creativity'),
  },
  // 专题页
  {
    path: '/topic',
    component: () => import('@/views/Topic'),
    children: [
      {
        path: '/topic',
        component: () => import('@/components/TopicList'),
      },
      {
        path: '/topic/:cateId',
        name: 'topicPost',
        component: () => import('@/components/TopicWaterFall'),
      },
    ]
  },
  // 帖子详情页
  {
    path: '/postItem/:id',
    name: 'postItem',
    component: () => import('@/views/PostDetail'),
  },
  // 修改帖子页面
  {
    path: '/changePost/:id',
    name: 'changePost',
    component: () => import('@/views/ChangePost.vue'),
  },
  //  发帖页
  {
    path: '/sendPost',
    component: () => import('@/views/SendPost'),
    meta: {
      needLogin: true
    }
  },

  //  在下边添加你需要的路由=================
  //  聊天页
  {
    path: '/chatWith',
    name: 'chatWith',
    component: () => import('@/views/Chatwith')
  },
  //  聊天详情页
  {
    path: "/chatWithPerson",
    name: "chatWithPerson",
    component: () => import("@/views/ChatWithPerson")
  },
  {
    path: "/sign",
    component: () => import("@/views/Sign")
  },
  //个人中心页面
  {
    path: '/userCenter',
    name: 'userCenter',
    component: () => import("@/views/PersonalCenter"),
  },
  // 设置页
  {
    path: "/setting",
    component: () => import("@/components/Setting")
  },
  // 协议
  {
    path: "/serve",
    component: () => import("@/components/Serve")
  },
  {
    path: "/privacy",
    component: () => import("@/components/Privacy")
  },
  //  修改个人信息
  {
    path: "/modification",
    component: () => import("@/components/Modification"),
    meta: {
      needLogin: true
    }
  },
  //    观看历史
  {
    path: "/watchhistory",
    component: () => import("@/components/WatchHistory")
  },
  //    解梦
  {
    path: "/oneiromancy",
    component: () => import("@/components/Oneiromancy")
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.needLogin) {
    getUserInfo().then(res => {
      if (res.data.state == 200) {
        next()
      } else {
        alert("请先登录")
      }
    })
  } else {
    next()
  }
})
export default router
