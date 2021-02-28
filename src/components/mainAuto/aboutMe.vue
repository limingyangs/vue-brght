<template>

    <shuck :show="show">
      <markdown-show v-if="show" :text="article.articleContent"></markdown-show>
    </shuck>
<!--    <header><h2>关于我</h2></header>
    <div class="post-body">
      <p>欢迎来到我的博客</p>
      <p>这里是Bright</p>
      <p>本博客目前已在GitHup开源<a href="https://github.com/limingyangs/bright-blogs">@bright-blogs</a>,欢迎各位大佬友链、打赏！</p>
    </div>-->

    <!--  <div class="set-x-y">
          <a-row class="empty">
              <a-table :columns="columns" :dataSource="data" bordered class="a-table">
                  <template slot="name" slot-scope="text">
                      <a href="javascript:">{{text}}</a>
                  </template>
                  <div class="post-header" slot="title" slot-scope="currentPageData">
                      打赏记录
                  </div>
              </a-table>
          </a-row>
      </div>-->
</template>

<script>

    const columns = [{
        title: '时间',
        dataIndex: 'date',
        scopedSlots: {customRender: 'name'},
    }, {
        title: '支持者',
        className: 'column-money',
        dataIndex: 'name',
    }, {
        title: '金额',
        dataIndex: 'money',
    }];

    const data = [{
        key: '1',
        name: 'John Brown',
        money: '￥300,000.00',
        date: '2017/05/05',
    }, {
        key: '2',
        name: 'Jim Green',
        money: '￥1,256,000.00',
        date: '2017/05/05',
    }, {
        key: '3',
        name: 'Joe Black',
        money: '￥120,000.00',
        date: '2017/05/05',
    }];

    export default {
        name: "aboutMe",
        data() {
            return {
                data,
                columns,
                currentPageData: "dasdsa",
                show: false,
                article:{
                    oId: -1,
                    articleTitle: "",
                    articleTags: "",
                    articleAuthorId: "",
                    articleCommentCount: -1,
                    articleViewCount: -1,
                    articleContent: "",
                    articlePutTop: "",
                    articleCreated: -1,
                    articleUpdated: -1,
                    articleSignId: "",
                    articleCommentable: "",
                    articleStatus: -1,
                    genre: -1
                }
            }
        },
        mounted() {
            this.$api.getAboutMe().then((res)=>{
                this.article = res.data.data
                this.show = true
            })

        }
    }
</script>

<style scoped>
  h2 {
    text-align: center;
  }

  .set-x-y {
    padding: 40px;
    margin-bottom: 40px;
  }

  a {
    color: #00BBFF;
  }

  p {
    margin-bottom: 20px;
  }

  .ant-table-title {
    border-color: rgba(0, 0, 0, 0.1) !important;
  }

  .post-header {
    font-weight: 700;
  }
</style>
