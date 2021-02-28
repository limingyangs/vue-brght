<template>
  <div>

    <transition name="b-fade">
      <!--      <a href="/blog/more/1#56465156165" target="_blank">aaa</a>-->
      <Iarticle v-if="articles.length > 0" :articles="articles"></Iarticle>
    </transition>
  </div>

</template>

<script>
    import Iarticle from "./NewArticle"

    export default {
        name: "ArticleList",
        components: {Iarticle},
        data() {
            return {
                articles: [
                    /*                {
                                        oid: '1',
                                        //文章标题
                                        articleTitle: 'Hello world',
                                        //文章标签
                                        articleTags: '事件薄',
                                        //文章作者id
                                        articleAuthorId: '1',
                                        //文章评论计数
                                        articleCommentCount: '1',
                                        //文章浏览计数
                                        articleViewCount: '1',
                                        //文章正文内容
                                        articleContent: '欢迎来到我的博客，这是我的第一篇文章，请多指教。',
                                        //文章访问路径
                                        articlePermalink: '1',
                                        //文章是否置顶
                                        articlePutTop: '1',
                                        //文章创建时间
                                        articleCreated: 1562771644498,
                                        //文章更新时间
                                        articleUpdated: '1',
                                        //文章关联的签名档id
                                        articleSignId: '1',
                                        //文章是否可以评论
                                        articleCommentable: '1',
                                        articleImg1URL: '1',
                                        articleStatus: '1',
                                    },*/

                ],
                current: 1,
                pageSize: 5
            }
        },
        methods: {
            requestArticles(page = {}) {
                this.$api.getArticles(page).then((response => {
                    let data = response.data;
                    this.articles = data.data.records;

                }))
            }
        },
        mounted() {
            this.requestArticles({
                current: this.current,
                pageSize: this.pageSize
            });
        }
    }

</script>

<style scoped>
  .b-fade-enter-active {
    transition: opacity 1s ease;
  }

  .b-fade-leave-active {
    transition: opacity .1s ease;
  }

  .b-fade-enter, .b-fade-leave-to /* .b-fade-leave-active below version 2.1.8 */
  {

    opacity: 0;
  }
</style>
