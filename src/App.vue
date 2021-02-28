<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>

    export default {
        name: 'app',
        mounted() {
            // console.log(this.$refs['carousel']).goToPage(100)
            // console.log(this.$vuescroll)
            // console.log(this.$global.user)
            // this.$md.set({ breaks: false });
        }
    }
</script>

<style>
  #foot {
    text-align: center;
  }

  .main-body > div {
    float: left;
  }

  .iconfont {
    font-size: 20px;
    vertical-align: middle;
  }

  .v-note-wrapper {
    height: 600px;
  }

  .main-auto {
    margin: 0 8px;
    padding: 0 8px;
    width: 784px;
    min-height: 784px;
  }

  .main-right {
    width: 300px;
  }

  .main-right > div {

    margin-bottom: 8px;

  }


[v-cloak]{
  display: none;
}

  .text-con,.comment-con {
    font-size: 14px!important;

  }

  .text-con p ,.comment-con p{
    margin: 0;
  }

  .md p {
    margin-bottom: 0!important;
  }

  .markdown-body pre{
    background-color:rgba(51,51,51,0.9) !important;
  }

  /*去掉markdown h2的下划线*/
  .markdown-body  h2,.markdown-body  h1,.markdown-body  h3,.markdown-body  h4,.markdown-body  h5{
    border: none;
  }

</style>
