import Vue from "vue";
import axios from "axios";
import cookies from 'vue-cookies'

import Message from 'ant-design-vue/lib/message'

Vue.prototype.$axios = axios;

// axios.defaults.baseURL = process.env.VUE_APP_BASE_API;
axios.defaults.baseURL = '/dev-api';

axios.interceptors.request.use(config => {
  return config;
}, err => {
  Message.error('请求超时!');
  // return Promise.resolve(err);
})

axios.interceptors.response.use(data => {
  if (data.status && data.status == 200 && data.data.status == 500) {
    Message.error(data.data.msg);
    return;
  }

  if (data.data.msg && data.data.msg != null) {

    Message.success(data.data.msg);

  }
  return data;
}, err => {
  if (err.response.status == 504 || err.response.status == 404) {
    Message.error('服务器被吃了⊙﹏⊙∥');
  } else if (err.response.status == 403) {
    Message.error('权限不足,请联系管理员!');
  } else if (err.response.status == 401) {
    Message.error(err.response.data.msg);
  } else {
    if (err.response.data.msg) {
      Message.error(err.response.data.msg);
    } else {
      Message.error('未知错误!');
    }
  }
})

axios.create({
  withCredentials: true
});

const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: url,
    data: params,
    transformRequest: [function (data) {

      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      // console.log(ret)
      return ret
    }],
    headers: {
      // 'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization' :cookies.get("token"),
    }
  });
};


const postJsonRequest = (url, params) => {
  return axios({
    method: 'post',
    url: url,
    data: params,
    headers: {
      'Content-Type': 'application/json',
      'Authorization' :cookies.get("token"),
    }
  });
};

const getRequest = (url) => {

  return axios({
    method: 'get',
    url: url,
    headers: {
      'Authorization' :cookies.get("token"),
    }
  })

};

const getFriendshipLink = () => {
  return getRequest('/article/getFriendshipLink')
};

const getAboutMe = () => {
  return getRequest('/article/getAboutMe')
};

const addArticle = (params) => {

  return postRequest('/article/addArticle', params)

};

const getArticle = (id) => {
  return postRequest('/article/getArticle', {oId: id})
};

const deleteArticle = (params) => {
  return postRequest('/api/admin/deleteArticle', params)
};

const updateArticle = (params) => {
  return postJsonRequest('/api/admin/updateArticle', params)
};

const getArticles = (page={}) => {
  return postRequest('/article/getArticles',page)
};

const registerQQUser = (params={}) =>{

  return postRequest('/user/registerQQUser',params)

};

const getAllComment = ()=>{
  return getRequest("/api/admin/getAllComment")
};

const deleteComment = (params={})=>{
  return postRequest("/comment/deleteComment",params)
};

const addReadNum = (params={})=>{
  return postRequest("/article/addReadNum",params)
};

const addPraiseNum = (params={})=>{
  return postRequest("/comment/addPraiseNum",params)
};

export var api = {

  registerQQUser:registerQQUser,
  addPraiseNum:addPraiseNum,
  addReadNum:addReadNum,
  deleteComment:deleteComment,
  getAllComment:getAllComment,
  postRequest: postRequest,
  getRequest: getRequest,
  getFriendshipLink: getFriendshipLink,
  getAboutMe: getAboutMe,
  addArticle: addArticle,
  getArticle: getArticle,
  deleteArticle: deleteArticle,
  updateArticle: updateArticle,
  getArticles: getArticles

};




