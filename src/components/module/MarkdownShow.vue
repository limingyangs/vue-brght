<template>
  <div  class="markdown-body" v-html="$md.render(text)">

  </div>
</template>

<script>
    export default {
        props:{
            text:{
                type:String,
                default:null | ''
            }
        },
        name: "MarkdownShow"
    }
</script>

<style scoped>

</style>
