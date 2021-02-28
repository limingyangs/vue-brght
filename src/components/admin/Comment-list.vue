<template>

  <a-layout>
    <a-layout-header :style="{ background: '#fff', padding: 0 }"/>

    <a-layout-content class="content" :style="{ margin: '24px 16px 0',overflow: 'initial',minHeight: 'unset'}">

      <section class="code-box">
        <a-list  :loading="loading" itemLayout="horizontal" :dataSource="data">
          <div
            v-if="showLoadingMore"
            slot="loadMore"
            :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }"
          >
            <a-spin v-if="loadingMore"/>
            <a-button v-else @click="onLoadMore">加载更多</a-button>
          </div>
          <a-list-item slot="renderItem" slot-scope="item, index">

            <a-popconfirm
              slot="actions"
              title="你确认要删除这条评论吗？"
              @confirm="removeComment(item)"
              okText="确定"
              cancelText="取消"
            >
              <a >删除</a>
            </a-popconfirm>


            <a slot="actions"  :href="item.commentSharpURL" >更多</a>
            <a-list-item-meta
              :description="item.commentContent"
            >
              <a slot="title" href="https://www.antdv.com/">{{item.nickname}}</a>
              <a-avatar
                slot="avatar"
                :src="item.avatar"
              />
            </a-list-item-meta>
            <div>
              <div v-if="item.status==1"><a-tag color="#f50">已删除</a-tag></div>
              <div  v-if="item.status==0"><a-tag color="#2db7f5">正常</a-tag></div>

              <div>{{$util.getDateDiff(item.commentCreated)}}</div>
            </div>
          </a-list-item>
        </a-list>
      </section>


    </a-layout-content>

    <a-layout-footer style="textAlign: center">
      Ant Design ©2018 Created by Ant UED
    </a-layout-footer>
  </a-layout>


</template>

<script>
    const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';

    export default {
        name: "Comment-list",
        data() {
            return {
                loading: true,
                loadingMore: false,
                showLoadingMore: true,
                data: [],
            };
        },
        mounted() {

            this.$api.getAllComment().then((res)=>{
                this.loading = false;
                this.data = res.data;
        });

        },
        methods: {

            getData(callback) {
                this.$api.getRequest(fakeDataUrl).then(res => {
                    callback(res)
                })
            },
            removeComment(row){
                // console.log(row)
                if(row.osVersion){

                    this.$api.deleteComment({
                        id:row.oId,
                        tab:'1'
                    }).then((res)=>{
                        this.loading = true;
                        this.$api.getAllComment().then((res)=>{
                            this.loading = false;
                            this.data = res.data;
                        });
                    })

                }else {

                    this.$api.deleteComment({
                        id:row.oId,
                        tab:'2'
                    }).then((res)=>{
                        this.loading = true;
                        this.$api.getAllComment().then((res)=>{
                            this.loading = false;
                            this.data = res.data;
                        });
                    })

                }
            },
            onLoadMore() {
                this.loadingMore = true;
                this.getData(res => {
                    this.data = this.data.concat(res.results);
                    this.loadingMore = false;
                    this.$nextTick(() => {
                        window.dispatchEvent(new Event('resize'));
                    });
                });
            },
        },
    }
</script>

<style scoped>
  .code-box {
    width: 100%;
    padding: 20px;
    border: 1px solid #ebedf0;
    border-radius: 2px;
    display: inline-block;
    width: 100%;
    position: relative;
    margin: 0 0 16px;
    transition: all 0.2s;
    background-color: #fff;
  }
</style>
