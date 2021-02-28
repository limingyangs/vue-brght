<template>
    <article class="giligili-item set-x-y">
        <div class="main-article-author empty ">
            <div class="main-article-photo clear post-info">
                <a style="float: left">
                    <img src="/images/headPortrait.jpg" style="border-radius: 50%;" width="50px">
                    <img/>
                </a>
                <div style="float: left;margin-left: 10px">
                    <div class="post-author">
                        <a style="font-size: 16px">Bright</a>
                    </div>
                    <div class="post-meta">
                        <time itemprop="datePublished">19:28</time>
                    </div>
                </div>
            </div>
            <div class="article-content" >
                <a href="#">
                    <p class="article-text">
                        hello
                        <img src="/images/bj.jpg" style="display: block" width="300" height="auto" alt="">
                    </p>
                </a>
            <div class="article-detail clear">
                <span><i class="iconfont icon-kanguo"></i>&nbsp;999</span>
                <span><i class="iconfont icon-xiangqu"></i> &nbsp;999</span>
                <span><i class="iconfont icon-pinglun"></i> &nbsp;999</span>
            </div>
            </div>
        </div>
    </article>
</template>

<script>

    export default {
        name: "tell"
    }
</script>

<style scoped>
.post-author  > a:hover {
    color: #00BBFF;
}
    .post-author{
        -webkit-transition: color .3s ease;
        transition: color .3s ease;
    }
    .article-content{
        padding: 0 60px;
    }
    .article-text img{
        cursor: -webkit-zoom-in;
        cursor: zoom-in;
        max-width: 100%;
        border-radius: 4px;
        box-shadow: rgba(0,0,0,.2) 0 0 5px 0;
        -webkit-box-shadow: rgba(0,0,0,.2) 0 0 5px 0;
        margin-top: 5px;
    }
    .article-text{
        text-align: left;
        margin: 0;
    }
    .article-detail span {
        display: inline-block;
        float: left;
        margin-right: 26px;
        font-size: 13px;
        line-height: 44px;
        color: #99a2aa;
        cursor: pointer;
        -webkit-transition: color .3s ease;
        transition: color .3s ease;
    }
.article-detail span i {
    font-size: 15px;
}
.article-detail span:hover{
    color: #ff85ad;
}
</style>