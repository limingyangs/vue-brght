<template>

</template>

<script>
    export default {
        name: "Global",
        data(){
            return {
                user : this.$cookies.get("user")
            }
        },
        created() {
            // console.log("被创建了")
        }
    }
</script>

<style scoped>

</style>
