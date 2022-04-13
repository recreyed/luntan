import axios from "axios";

//读取所有帖子
export function allPost() {
    return axios.post('/recreyed/postList')
}
//读取所有帖子触底加载用
export function stagePost(pageSize, pageNum) {
    return axios.post('/recreyed/postList',{pageSize,pageNum})
}
//读取专题帖子
export function topicPost(categoryId) {
    return axios.post('/recreyed/postList', {categoryId})
}
// 读取帖子列表（标题搜索）
export function searchList(title) {
    return axios.post('/recreyed/postList', {title})
}
// 我的帖子
export function myPost(pageSize, pageNum) {
    return axios.post('/recreyed/myPost',{pageSize,pageNum})
}
// 读取专题列表
export function topicList() {
    return axios.get('/recreyed/topicList')
}
//读取帖子详情页
export function postDetail(id) {
    return axios.get(`/recreyed/postDetail/${id}`)
}
// 发送帖子
export function addPost(categoryId, title, content, coverImgUrl) {
    return axios.post('/recreyed/sendPost', {categoryId,title,content,coverImgUrl})
}
//登录
export function Login(loginName, password) {
    let data = {loginName,password}
    return axios.post(`/recreyed/login`, data)
}
//退出登录
export function logout() {
    return axios.get("/recreyed/logout")
}
//注册
export function register(loginName, password, userName, sex, remark) {
    let data = {loginName,password,userName,sex,remark}
    return axios.post(`/recreyed/registry`, data)
}
//查看个人信息
export function getUserInfo() {
    return axios.get("/recreyed/loginerInfo")
}
//修改个人信息
export function changeUserInfo(userName, email, phone, sex, remark) {
    let data = {userName, email, phone, sex, remark,avatar}
    return axios.post("/recreyed/changeInfo", data)
}
//修改头像
export function changeUserAvatar(avatar) {
    return axios.post("/recreyed/changeInfo", {avatar})
}
// 音乐
export function recommendMusic() {
    return axios.get(`/music-api/personalized/newsong?limit=25`)
}
// 音乐播放
export function musicPlay(musicId) {
    return axios.get(`/music-api/song/url?id=${musicId}`)
}
// 推荐MV
export function recommendMv() {
    return axios.get(`/music-api/personalized/mv`)
}
//MV排行
export function topListMv() {
    return axios.get(`/music-api/top/mv?limit=22`)
}
//mv播放
export function mvPlay(mvId) {
    return axios.get(`/music-api/mv/url?id=${mvId}`)
}


// *******************************************************************



// 读取帖子评论
export function commendList(id) {
    let formData = new FormData()
    formData.append("postsId", id)
    return axios.post('/baseApi/api/bbs/bbsComment/open/list', formData)
}
// 读取评论回复
export function commendReply(id) {
    let formData = new FormData()
    formData.append("parentId", id)
    return axios.post('/baseApi/api/bbs/bbsComment/open/reply/list', formData)
}

// 删除帖子
export function removePost(id) {
    return axios.post(`/baseApi/api/bbs/bbsPosts/site/remove?ids=${id}`)
}
// 修改帖子
export function changePost(id, title = '', cateId, intro = '', picUrl) {
    return axios.post(`/baseApi/api/bbs/bbsPosts/site/edit?postsId=${id}&title=${title}&categoryId=${cateId}&intro=${intro}&coverImgUrl=${picUrl}`)
}




//智熄机器人
export function robot(question) {
    return axios.get(`/jiSuApi/iqa/query?appkey=13a3b0932ec70af7&question=${question}`)
}


//获取验证码
export function getcode(mobile) {
    return axios.get(`/baseApi/api/short-message/vcode/${mobile}`)
}



//忘记密码
// export function forget(name, password, phone, code) {
//     let formData = new FormData()
//     formData.append("loginName", name)
//     formData.append("password", password)
//     formData.append("phonenumber", phone)
//     formData.append("code", code)
//     return axios.post(`/baseApi/api/password/forget `, formData)
// }


//周公解梦
export function slove(keyword) {
    return axios.get(`/jiSuApi/dream/search?appkey=13a3b0932ec70af7&keyword=${keyword}&pagenum=1&pagesize=10`)
}

//发表评论
export function SendComment(postsId, commentContent) {
    let formData = new FormData()
    formData.append("postsId", postsId)
    formData.append("commentContent", commentContent)
    return axios.post("/baseApi/api/bbs/bbsComment/site/add", formData)
}
// 删除评论
export function DeleteComment(commentid) {
    let formData = new FormData()
    formData.append("ids", commentid)
    return axios.post("/baseApi/api/bbs/bbsComment/site/remove", formData)
}

// 回复评论
export function replycomment(postsId, parentId, commentContent) {
    let formData = new FormData()
    formData.append("postsId", postsId)
    formData.append("parentId", parentId)
    formData.append("commentContent", commentContent)
    return axios.post("/baseApi/api/bbs/bbsComment/site/reply/add", formData)
}
// 查看回复列表
export function replycommentList(parentId) {
    let formData = new FormData()
    formData.append("parentId", parentId)
    return axios.post("/baseApi/api/bbs/bbsComment/open/reply/list", formData)
}

//开屏图
export function linkstart() {
    return axios.get("https://api.uomg.com/api/rand.img2?&format=json")
}
