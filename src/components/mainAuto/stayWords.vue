<template>
  <div class="stay-words" >

    <shuck :show="show">
      <markdown-show v-if="show" :text="stayWord.articleContent"></markdown-show>
    </shuck>

    <comment
      v-if="show"
      :articleId="stayWord.oId">
    </comment>

  </div>

</template>

<script>

    import comment from '../module/Comment'
    export default {
        name: "stayWords",
        components: {
            comment,
        },
        data() {
            return {
                show:false,
                stayWord: null

            }
        },
        created() {
            this.getStayWords()
        },
        methods: {
            getStayWords() {
                this.$axios.post("/article/getStayWords").then((response => {
                    let date = response.data;
                    if (date.status) {
                        this.stayWord = date.data;
                        this.show = true
                    }
                }))
            }
        }
    }
</script>

<style scoped>


  p {
    margin-bottom: 20px;
  }

  .set-x-y {
    padding: 40px;
    margin-bottom: 40px;
  }

  img {
    display: block;
    margin: auto;
  }
</style>
