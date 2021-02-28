<template>
    <div class="right-visitor set-x-y">
        <div class="empty">
            <h3><i class="icon-buxing iconfont"></i>&nbsp;访客记录</h3>
            <div class="visitor-list clear">
                <div>
                    <a  class="visitor-list-message"><img src="/images/headPortrait.jpg" style="border-radius: 4px" width="68" alt=""><span>Bright</span></a>
                    <span style="display: block">16:19</span>
                </div>
                <div>
                    <a  class="visitor-list-message"><img src="/images/headPortrait.jpg" style="border-radius: 4px" width="68" alt=""><span>Bright</span></a>
                    <span style="display: block">16:19</span>
                </div>
                <div>
                    <a  class="visitor-list-message"><img src="/images/headPortrait.jpg" style="border-radius: 4px" width="68" alt=""><span>Bright</span></a>
                    <span style="display: block">16:19</span>
                </div>
                <div>
                    <a  class="visitor-list-message"><img src="/images/headPortrait.jpg" style="border-radius: 4px" width="68" alt=""><span>Bright</span></a>
                    <span style="display: block">16:19</span>
                </div>
                <div>
                    <a  class="visitor-list-message"><img src="/images/headPortrait.jpg" style="border-radius: 4px" width="68" alt=""><span>Bright</span></a>
                    <span style="display: block">16:19</span>
                </div>
                <div>
                    <a  class="visitor-list-message"><img src="/images/headPortrait.jpg" style="border-radius: 4px" width="68" alt=""><span>Bright</span></a>
                    <span style="display: block">16:19</span>
                </div>
                <div>
                    <a  class="visitor-list-message"><img src="/images/headPortrait.jpg" style="border-radius: 4px" width="68" alt=""><span>Bright</span></a>
                    <span style="display: block">16:19</span>
                </div>
                <div>
                    <a  class="visitor-list-message"><img src="/images/headPortrait.jpg" style="border-radius: 4px" width="68" alt=""><span>Bright</span></a>
                    <span style="display: block">16:19</span>
                </div>
                <div>
                    <a  class="visitor-list-message"><img src="/images/headPortrait.jpg" style="border-radius: 4px" width="68" alt=""><span>Bright</span></a>
                    <span style="display: block">16:19</span>
                </div>
            </div>
            <div class="visitor-bottom">
                <div ><a class="el-block" ><i class="iconfont icon-fanhui"></i></a><a class="el-block" ><i class="iconfont  icon-gengduo"></i></a></div>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "visitor"
    }
</script>

<style scoped>
    .visitor-list > div{
        float: left;
        margin: 0 8px 7px  8px;
    }
    .visitor-list-message span{
        position: absolute;
        width: 100%;
        color: #fff;
        background-image: linear-gradient(to bottom,transparent,rgba(0,0,0,.7));
        left: 0;
        bottom: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .visitor-list-message{
        position: relative;
        display: block;
    }
    .tally ul li{
        position: absolute;
        transform-origin:50% 50%;
    }
    h3{
        margin: 0 0 5px 8px;
        text-align: left;
    }
</style>