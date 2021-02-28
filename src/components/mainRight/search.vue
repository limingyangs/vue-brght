<template>
    <div class="main-right-search set-x-y">
        <div class="main-right-frame">
            <input value="" title="搜索" name="search" type="text"> <i
                class="iconfont icon-buchongiconsvg08"></i>
        </div>
    </div>
</template>

<script>
    export default {
        name: "search"
    }
</script>

<style scoped>
    .main-right-frame input {
        height: 18px;
        width: 200px;
        padding: 4px 0 4px 20px;
        color: #19112d;
        font-weight: 700;
        border: none;
        border-bottom: 1px solid #ccc;
        border-radius: 15px;
        box-shadow: inset 0 1px 3px 0 rgba(30, 30, 30, 0.2);
        outline: none;
        opacity: 0.65;
        background-color: rgba(0, 0, 0, 0);
    }
    .main-right-search {
        margin-bottom: 8px;
    }
</style>