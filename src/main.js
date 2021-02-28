// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import  {api} from './request/api'


import * as util from "../static/js/util";

//bilibili404图片地址 https://www.bilibili.com/activity/web/view/data/31

// editor
import MavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import CommentEditor from './components/module/CommentEditor'
import MarkdownShow from './components/module/MarkdownShow';
import Shuck from './components/module/Shuck';

import '../static/css/github-markdown.min.css'

import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js'
import 'highlight.js/styles/agate.css';
//  import 'highlight.js/styles/idea.css';

import VueCookies from 'vue-cookies'
import VueBus from 'vue-bus';



import {Anchor,Avatar,Tooltip,Modal,Affix,Popover,Button,Form,Input,Icon,Row,Spin,Col,Timeline,Table,Layout,Menu,Divider,Tag,Drawer,Popconfirm,List} from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import Message from 'ant-design-vue/lib/message'


Vue.use(MavonEditor);

// Vue.use(MarkdownIt)
Vue.component("markdownShow",MarkdownShow);
Vue.component("commentEditor",CommentEditor);
Vue.component("shuck",Shuck);
//
Vue.prototype.$md = MavonEditor.markdownIt.set({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
          hljs.highlight(lang, str, true).value +
          '</code></pre>';
      } catch (__) {}
    }

    return '<pre class="hljs"><code>' + MarkdownIt().utils.escapeHtml(str) + '</code></pre>';
  }
});

Vue.prototype.$api = api;

//cookies管理
Vue.config.productionTip = false;
Vue.prototype.$message = Message;
Vue.prototype.$util = util;




Vue.use(VueCookies);
Vue.use( Avatar);
Vue.use(VueBus);
Vue.use( Tooltip);
Vue.use( Modal);
Vue.use( Popover);
Vue.use( Affix);
Vue.use( Button);
Vue.use( Form);
Vue.use( Input);
Vue.use( List);
Vue.use( Icon);
Vue.use( Row);
Vue.use( Spin);
Vue.use( Col);
Vue.use( Timeline);
Vue.use( Table);
Vue.use( Message);
Vue.use( Layout);
Vue.use( Menu);
Vue.use( Divider);
Vue.use( Tag);
Vue.use( Drawer);
Vue.use( Anchor);
Vue.use( Popconfirm);




router.beforeEach((to, from, next)=>{
  next();


});


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
