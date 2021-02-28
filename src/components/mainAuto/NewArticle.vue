<template>
  <div class="main">

    <div   v-for="item in articles" class="set-x-y">
      <article  class="main-new-article empty">
        <div class="post-date">
          <div class="post-month">{{$util.formatTimeToStr(item.articleCreated,"MM月")}}</div>
          <div class="post-day">{{$util.formatTimeToStr(item.articleCreated,"dd")}}</div>
        </div>
        <div class="post-badge">

                <span>
                    <a href="javascript:void(0)" >
                        <span itemprop="name" style="color: #fff">{{ item.articleTags }}</span>
                    </a>
                </span>

        </div>
        <div class="post-body">
          <header class="post-header">
            <h1 class="post-title" itemprop="name headline">
              <router-link class="post-title-link" :to="{name:'more',params:{oId:item.oId}}">{{item.articleTitle}}</router-link>
            </h1>

            <div class="post-meta">
                        <span class="post-time">
                            <span class="post-meta-item-icon">
                            <i class="iconfont  icon-shijian" style="font-size: 13px"></i>
                            </span>
                            <span class="post-meta-item-text">发表于</span>
                            <time>{{$util.formatTimeToStr(item.articleCreated,"HH:mm")}}</time>
                        </span>
              <span class="post-wordcount">
                        <span class="post-meta-divider">•</span>
                        <span class="post-meta-item-icon">
                        <i class="fa fa-file-word-o"></i>
                        </span>
                        <span class="post-meta-item-text">字数统计</span>
                        <span title="字数统计">{{item.articleContent.length}}</span> </span>
              <span
                class="leancloud_visitors">
                            <span class="post-meta-divider">•</span> <span
                class="post-meta-item-icon"><i class="fa fa-eye"></i> </span><span
                class="post-meta-item-text">阅读次数</span>

                 <span
                   class="leancloud-visitors-count">{{item.articleViewCount}}</span>
                        </span>
            </div>

          </header>
          <div class="post-body" itemprop="articleBody">

            <markdownShow :text="item.articleContent"></markdownShow>

            <div class="post-button text-center">
              <router-link class="btn" :to="{name:'more',params:{oId:item.oId}}">阅读全文 »</router-link>
            </div>
          </div>
        </div>
      </article>
    </div>

  </div>

</template>

<script>


    export default {
        name: 'NewArticle',
        props: ['articles'],
        data() {
            return {

            }
        },
        methods:{

        },
        mounted() {

        }

    }
</script>

<style scoped>
  .post-body {
    margin-top: 30px;
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
  }

  .btn {
    background: #97dffd;
    color: #fff;
    font-size: 13px;
    padding: 6px 15px;
    border-radius: 5px;
    border: none;

    line-height: 2;
  }

  .post-button {
    margin-top: 40px;
  }

  .text-center {
    text-align: center;
  }

  .btn:hover {
    text-decoration: none;
    transition-property: background-color;
    transition-duration: .5s;
    transition-timing-function: ease-in-out;
    transition-delay: 0s;
    line-height: 2;
    background-color: #0f1620;
  }

  .set-x-y {
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

  .set-x-y .post-title-link {
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
