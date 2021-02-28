import Vue from 'vue'
import Router from 'vue-router'
import * as util from "../../static/js/util";
import cookies from 'vue-cookies'
Vue.use(Router);

// 1 创建组件
import Filing from "../components/mainAuto/Archive.vue"
import More from "../components/mainAuto/TheArticleDetails.vue"
import aboutMe from "../components/mainAuto/aboutMe.vue"
import stayWords from "../components/mainAuto/stayWords.vue"
import friendshipLink from "../components/mainAuto/friendshipLink.vue"
import Blog from "../components/blog/blogApp.vue"
import articleList from "../components/mainAuto/ArticleList"
import admin from "../components/admin/adminApp.vue"
import issueArticle from "../components/admin/article/issueArticle.vue"
import articleAdmin from "../components/admin/article/articleAdmin"
import comment from "../components/admin/Comment-list"
import err from "../components/module/404"


/*路由配置*/
export default new Router({

  routes: [
    {path: "/", redirect: '/blog/home'},
    {
      path: '/blog', component: Blog, redirect: '/blog/home', children: [
        {path: 'filing', name: 'filing', component: Filing},
        {path: 'home', name: 'home', component: articleList},
        //文章详情内容
        {path: 'more/:oId', name: 'more', component: More, props: true},
        //关于我
        {path: 'aboutMe', name: 'aboutMe', component: aboutMe},
        //留言板
        {path: 'stayWords', name: 'stayWords', component: stayWords},
        //友情连接
        {path: 'friendshipLink', name: 'friendshipLink', component: friendshipLink},
        {path: "404", name: 'err', component: err}
      ]
    },
    //管理界面
    {
      path: "/admin", component: admin, redirect: '/admin/article-issue', children: [
        //发布文章
        {path: 'article-issue', name: 'issue', component: issueArticle, props: true},
        //管理文章
        {path: 'article-admin', name: 'admin', component: articleAdmin, props: true},
        //文章评论
        {path: 'article-comment', name: 'comment', component: comment, props: true},
      ],
      beforeEnter: (to, from, next) => {
        let user = cookies.get('user');
        if (user != null && user.jurisdiction) {
          next();
        }else {
          next("/blog/404");
        }
      }
    },
    //404
    {path: "*",  redirect: '/blog/404'}

  ],
  //去除#号
  mode: "history",
  scrollBehavior(to, from, savedPosition) {
    util.scrollTo('#app',500);
  }

})
