<template>


  <div>


    <shuck :show="show" class="content-main">
      <article v-if="article != undefined" class="main-new-article">
        <div class="post-date">
          <div class="post-month">{{$util.formatTimeToStr(article.articleCreated,"MM月")}}</div>
          <div class="post-day">{{$util.formatTimeToStr(article.articleCreated,"dd")}}</div>
        </div>
        <div class="post-badge">
                <span>
                    <a href="javascript:void(0)">
                        <span style="color: #fff">{{ article.articleTags }}</span>
                    </a>
                </span>
        </div>
        <div class="post-body">
          <header class="post-header">
            <h1 id="title" class="post-title">{{ article.articleTitle }}</h1>
            <div class="post-meta">
                        <span class="post-time">
                            <span class="post-meta-item-icon">
                            <i class="iconfont  icon-shijian" style="font-size: 13px"></i>
                            </span>
                            <span class="post-meta-item-text">发表于</span>
                            <time
                              v-if="article.articleCreated">{{$util.formatTimeToStr(article.articleCreated,"HH:mm")}}</time>
                        </span>
              <span class="post-wordcount">
                        <span class="post-meta-divider">•</span>
                        <span class="post-meta-item-icon">
                        <i class="iconfont icon-24"></i>
                        </span>
                        <span class="post-meta-item-text">字数统计</span>
                        <span title="字数统计">{{article.articleContent.length}}</span> </span>
              <span class="leancloud_visitors">
                            <span class="post-meta-divider">•</span> <span
                class="post-meta-item-icon"><i class="iconfont icon-kanguo"></i> </span><span
                class="post-meta-item-text">阅读次数</span> <span
                class="leancloud-visitors-count">{{article.articleViewCount}}</span>
                        </span>
            </div>
          </header>
          <div class="post-body">
            <markdownShow :text="article.articleContent"></markdownShow>

          </div>
          <div class="post-share">
            <ul>
              <li style="line-height: 48px">分享到：</li>
              <li><i class="iconfont  icon-weibo-circle-fill"></i></li>
              <li><i class="iconfont  icon-QQ-circle-fill"></i></li>
              <li><i class="iconfont  icon-weixin-copy"></i></li>
              <li><i class="iconfont  icon-qunfengqqkongjian"></i></li>
            </ul>
          </div>
          <div style="padding:10px 0;margin:10px auto;width:90%;text-align:center">
            <a-button type="primary" @click="dialogVisible = true">赞赏</a-button>
          </div>

          <footer class="post-footer">
            <div class="post-nav">
              <div class="post-nav-next post-nav-item">
                <router-link @click.native="Nearby" v-if="articleNearby.upArticle!==undefined"
                             :to="{name:'more',params:{oId:articleNearby.upArticle.oId}}"><i
                  class="iconfont icon-jiantouyou-copy"></i>{{articleNearby.upArticle.articleTitle}}
                </router-link>
              </div>
              <span class="post-nav-divider"></span>
              <div class="post-nav-prev post-nav-item">
                <router-link @click.native="Nearby" v-if="articleNearby.nextArticle!==undefined"
                             :to="{name:'more',params:{oId:articleNearby.nextArticle.oId}}">
                  {{articleNearby.nextArticle.articleTitle}}<i class="iconfont icon-jiantouyou"></i>
                </router-link>

              </div>
            </div>
          </footer>
        </div>
      </article>
    </shuck>
    <div>
      <div id="comments">
        <!--评论区-->
        <comment
          :articleId="oId">
        </comment>
      </div>

      <!--收钱二维码-->
      <div class="admire" v-show="dialogVisible">
        <div class="admire-header">
          <span>一分也是爱(￣y▽,￣)╭ </span>
          <i @click="dialogVisible=false" class="iconfont icon-x animated"></i>
        </div>
        <div class="admire-body">
          <h4>扫描二维码</h4>
          <img v-bind:src="imgVisible ? '/static/images/IMG_1967.JPG':'/static/images/IMG_1968.JPG' " width="200">
          <div class="admire-chose">
            <a href="javascript:void(0)" @click="imgVisible=false" v-bind:class="{'chosen':!imgVisible}"><img
              src="/static/images/alipay.png" alt=""></a>
            <a href="javascript:void(0)" @click="imgVisible=true" v-bind:class="{'chosen':imgVisible}"><img
              src="/static/images/wechat.png" alt=""></a>
          </div>
        </div>
      </div>

      <div v-if="dialogVisible" class="crape">
      </div>
    </div>

  </div>
</template>

<script>
    import comment from '../module/Comment.vue';
    import commentEditor from '../module/CommentEditor';

    export default {
        name: "TheArticleDetails",
        components: {
            comment,
            commentEditor
        },
        props: ['oId'],
        data() {
            return {
                show: false,
                imgVisible: false,
                dialogVisible: false,
                sentence: "",
                sum: null,
                result: null,
                information: null,
                comment: {
                    details: ""
                },
                flag: false,
                article: undefined,
                comments: null,
                articleNearby: undefined,

            }
        },
        created() {

        },
        methods: {
            Nearby() {

                this.init();
            },
            verifyResult() {
                let reg2 = new RegExp("^[ ]+$");
                if (this.comment.details == null || reg2.test(this.comment.details)) {
                    this.$message.warning('输入内容不能为空');
                    return false;
                }
                return true;
            },
            verify() {
                // console.log("你好啊");
                let i = Math.round(Math.random() * 100);
                let j = Math.round(Math.random() * 100);
                this.sum = i + j;
                return '' + i + " + " + j + " = " + "? ";
            },
            select(data) {

                // console.log(data);

            },
            getArticle(id) {
                this.$api.getArticle(id).then((response => {

                    let data = response.data.data;
                    this.article = {...data.article};
                    this.articleNearby = {...data.articleNearby};
                    this.show = true;

                }))
            },

            init() {
                this.getArticle(this.oId);
                this.$axios({
                    url: 'https://v1.hitokoto.cn/',
                    methods: 'get'
                }).then((response) => {
                    this.sentence = "一言：" + response.data.hitokoto;

                });
            },
            onRead(){

                this.$api.addReadNum({id:this.oId});

            }
        },
        mounted() {
            this.onRead();
            this.init();

            // console.log(this.oId)
            // this.information = this.verify();
        }
    }
</script>


<style scoped>


  .admire-chose img {
    display: inline-block !important;
    height: 25px;
    vertical-align: middle;
    line-height: 40px;
  }


  .admire-chose {
    display: flex;
  }

  .admire-chose a {
    width: 138px;
    height: 45px;
    text-align: center;
    border: 1px solid #e6e6e6;
    border-radius: 2px;
    line-height: 40px;
    cursor: pointer;
    margin-left: 7px;
  }

  .admire-body img {
    display: block;
    margin: auto;
  }

  .admire-body {
    margin-top: 20px;
  }

  .admire-body h4 {
    text-align: center;
    font-size: 16px;
    margin: 5px;
  }

  @keyframes rotateIn {
    from {
      -webkit-transform-origin: center;
      transform-origin: center;
      -webkit-transform: rotate3d(0, 0, 1, -400deg);
      transform: rotate3d(0, 0, 1, -400deg);
    }
  }

  .icon-x:hover {
    animation-name: rotateIn;
  }

  .icon-x {
    height: 14px;
    line-height: 14px;
    float: right;
    cursor: pointer;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.6);
  }

  .admire-header {
    padding: 0 18px;
    font-size: 14px;
    font-weight: 700;
  }

  .crape {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 99999;
  }

  .admire {
    box-shadow: rgba(0, 0, 0, .2) 0 0 5px 0;
    border-radius: 4px;
    -webkit-box-shadow: rgba(0, 0, 0, .2) 0 0 5px 0;
    border-bottom: 1px solid #e7e7e7;
    padding: 20px 0 16px;
    width: 300px;
    height: 353px;
    background: #fff;
    position: fixed;
    left: 50%;
    top: 50%;
    margin-left: -150px;
    margin-top: -172px;
    z-index: 999999;
  }

  .comment-submit {
    width: 70px;
    height: 64px;
    top: 0;
    padding: 4px 15px;
    font-size: 14px;
    color: #fff;
    border-radius: 4px;
    text-align: center;
    min-width: 60px;
    vertical-align: top;
    cursor: pointer;
    background-color: #00a1d6;
    border: 1px solid #00a1d6;
    -webkit-transition: .1s;
    transition: .1s;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    outline: 0;
    display: inline-block;
  }

  .comment-s .text-input {
    width: 500px;
  }

  /*  .text-input {
      border: 1px solid #e1e8ed;
      border-radius: 4px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      padding: 12px;
      resize: none;
      color: #657786;
      width: 48%;
      margin-right: 2%;
      background-color: rgba(118, 222, 233, 0.3);
      display: inline-block;
    }

    .text-input:hover {
      transition: 0.3s;
      background: transparent;
      border-color: #409EFF;
    }

    .comment-s {
      margin-top: 10px;
    }

    form {
      !*display: table;*!
      padding-top: 10px;
      padding-bottom: 30px;
    }*/

  .comment-text input {
    margin-top: 10px;
  }

  #comments {
    margin: 0;
    /*padding: 40px;*/
    border-radius: 5px;
  }

  .post-nav-divider {
    display: table-cell;
    width: 10%;
  }

  .icon-jiantouyou-copy, .icon-jiantouyou {
    margin-left: 5px;
    font-size: 12px;
    font-weight: 700;
  }

  .icon-jiantouyou-copy {
    margin: 0 5px 0 0;
  }

  .post-nav {
    display: table;
    width: 100%;
    margin-top: 15px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }

  .post-nav-item {
    display: table-cell;
    padding: 40px 0 0 0;
    width: 45%;
    vertical-align: top;
  }

  .post-nav-prev {
    text-align: right;
  }

  .post-nav-next a:hover, .post-nav-prev a:hover {
    transition: 0.3s;
    color: #409EFF;
  }

  .icon-kanguo, .icon-24 {
    font-size: 13px;
  }

  .icon-weibo-circle-fill {
    color: #FF763B;
  }

  .icon-QQ-circle-fill {
    color: #56B6E7;
  }

  .icon-weixin-copy {
    color: #7BC549;
  }

  .icon-qunfengqqkongjian {
    color: #FDBE3E;
  }

  .post-body {
    margin-top: 30px;
  }

  .post-share > ul {
    display: flex;
  }

  .post-share {
    margin-top: 15px;
  }

  .post-share i {
    cursor: pointer;
    font-size: 32px;
    margin: 4px;
  }

  .post-date {
    background-color: #97dffd;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .2), 0 1px 5px 0 rgba(0, 0, 0, .12);
    position: absolute;
    top: -30px;
    left: -40px;
    height: 70px;
    width: 70px;
    padding-top: 10px;
    border-radius: 100px;
    color: #fff;
    text-align: center;
    line-height: 1.1;
    display: block;
  }

  .content-main {
    margin-bottom: 40px;
  }

  .post-meta-divider {
    margin: 0 .5em;
  }

  .post-meta-item-icon, .post-meta-item-text {
    margin-right: 3px;
  }

  .post-date .post-day {
    font-size: 30px;
    font-weight: 700;
  }

  .main-new-article {
    position: relative;
    padding: 40px;
    border-radius: 5px;
  }

  .post-header .post-title, .post-header .post-title-link {
    color: #444;
    font-size: 25px;
    font-weight: 700;
  }

  .content-main .post-title-link {
    display: inline-block;
    position: relative;
    color: #555;
    border-bottom: none;
    line-height: 1.2;
    vertical-align: top;
  }

  .post-header .post-title-link::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #000;
    -webkit-transform: scaleX(0);
    -moz-transform: scaleX(0);
    -ms-transform: scaleX(0);
    -o-transform: scaleX(0);
    transform: scaleX(0);
    transition-duration: .2s;
    transition-timing-function: ease-in-out;
    transition-delay: 0s;
  }

  .post-header .post-title-link:hover::before {
    visibility: visible;
    -webkit-transform: scaleX(1);
    -moz-transform: scaleX(1);
    -ms-transform: scaleX(1);
    -o-transform: scaleX(1);
    transform: scaleX(1);
  }

  .post-header {
    margin-bottom: 20px;
    text-align: center;
  }

  .post-badge {
    position: absolute;
    left: -26px;
    top: 105px;
    border-color: #47456d;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .2), 0 1px 5px 0 rgba(0, 0, 0, .12);
    background-color: #97dffd;
    margin: 5px 0 15px 2px;
    font-size: 14px;
    border-radius: 0 4px 4px 0;
    display: inline-block;
    padding: 7px 11px 7px 32px;
    line-height: 1;
  }

  .post-badge:after {
    position: absolute;
    content: "";
    top: 100%;
    left: 0;
    border-top: 0 solid transparent;
    border-right-width: 1em;
    border-right-color: inherit;
    border-right-style: solid;
    border-bottom: 1em solid transparent;
    border-left: 0 solid transparent;
    width: 0;
    height: 0;
  }


</style>
