<template>
    <shuck :show="show">

      <markdownShow :text="article.articleContent"></markdownShow>

    </shuck>

</template>

<script>
    export default {
        name: "friendshipLink",
        data(){
            return{
                show:false,
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
            // console.log(this.$api)
            this.$api.getFriendshipLink().then((res)=>{
                this.article = res.data.data;
                this.show=true
            })



        }
    }

</script>

<style scoped>
  .post-head {
    text-align: center;
  }

  .set-x-y {
    padding: 40px;
    margin-bottom: 40px;

  }

  .set-x-y:before {
    display: block !important;
  }

  a {
    color: #00BBFF;
  }
</style>
