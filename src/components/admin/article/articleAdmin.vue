<template>
  <a-layout>
    <a-layout-header :style="{ background: '#fff', padding: 0 }"/>

    <a-layout-content class="content" :style="{ margin: '24px 16px 0',overflow: 'initial',minHeight: 'unset'}">

      <a-table
        :columns="columns"
        rowKey="oid"
        :dataSource="data">
        <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>

        <span slot="customTitle"><a-icon type="smile-o"/> 标题</span>

        <span slot="tags" slot-scope="tags">
            <a-tag color="blue">{{tags}}</a-tag>
        </span>

        <span slot="tags" slot-scope="tags">
            <a-tag color="blue">{{tags}}</a-tag>
        </span>

        <span slot="createdTime" slot-scope="createdTime">
            <a-tag color="blue">{{formatDate(createdTime)}}</a-tag>
        </span>

        <span slot="action" slot-scope="text, record">
              <router-link :to="{name:'issue',params:{oId:record.oid}}">更新</router-link>
              <a-divider type="vertical"/>
            <a-popconfirm
              title="你确定要删除该文章吗?"
              @confirm="deleteArticle({articleId:record.oid})"
              okText="确定"
              cancelText="取消"
            >
              <a href="javascript:void(0)">删除</a>
            </a-popconfirm>
              <a-divider type="vertical"/>
              <a href="javascript:;">置顶</a>
              <a-divider type="vertical"/>
              <a href="javascript:;">评论</a>
              <a-divider type="vertical"/>
        </span>

      </a-table>

    </a-layout-content>

  </a-layout>
</template>

<script>

    const columns = [{
        dataIndex: 'articleTitle',
        slots: {title: 'customTitle'},
        scopedSlots: {customRender: 'name'},
    }, {
        title: '作者',
        dataIndex: 'authorName',
    }, {
        title: '评论',
        dataIndex: 'articleViewCount',
    }, {
        title: '浏览',
        dataIndex: 'articleCommentCount',
    }, {
        title: '标签',
        dataIndex: 'articleTags',
        scopedSlots: {customRender: 'tags'},
    }, {
        title: '日期',
        dataIndex: 'articleCreated',
        scopedSlots: {customRender: 'createdTime'},
    }, {
        title: '管理',
        scopedSlots: {customRender: 'action'},
    }];


    export default {
        name: "articleAdmin",
        data() {
            return {
                data: null,
                columns,
                current: 1,
                pageSize: 10,
            }
        },
        methods: {
            deleteArticle(params){
                this.$api.deleteArticle(params).then((res)=>{
                    this.getArticleList({
                        current: this.current,
                        pageSize: this.pageSize
                    });
                })
            },
            formatDate(time) {
                if (time != null && time != "") {
                    let date = new Date(time);
                    return this.$util.formatTimeToStr(date, "yyyy-MM-dd HH:mm");
                } else {
                    return "";
                }
            },
            getArticleList(page = {}) {
                this.$axios({
                    url: '/article/listArticle',
                    method: 'post',
                    params: page
                }).then((response => {

                    let data = response.data;
                    this.data = data.data.records;

                }))
            }
        },
        mounted() {
            this.getArticleList({
                current: this.current,
                pageSize: this.pageSize
            });
        }
    }
</script>

<style scoped>

</style>
