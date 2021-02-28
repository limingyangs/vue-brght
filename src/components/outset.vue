<template>

  <div class="user-card set-x-y">
    <div class="empty clear">
      <div class="user-portrait clear">
        <div @mouseover="rotateIn=true" @mouseout="rotateIn=false" v-bind:class="{'rotate animated':rotateIn}">
          <img style="border-radius: 50%"
               src="/static/images/head-portrait.jpeg"  alt="">
        </div>
      </div>

      <div class="monicker">
        <span>Bright</span>
        <span>这里什么都没有</span>
      </div>
    </div>
    <div class="connection empty">
      <ul class="">

        <a-tooltip title="QQ群"  placement="top"  :getPopupContainer="getPopupContainer">
          <li>
            <i class="iconfont icon-QQ-circle-fill" ></i>
          </li>
        </a-tooltip>

        <a-tooltip title="QQ邮箱" placement="top" :getPopupContainer="getPopupContainer">
          <li>
            <i class="iconfont icon-youxiang"></i>
          </li>
        </a-tooltip>

        <a-tooltip title="GitHub" placement="top" :getPopupContainer="getPopupContainer">
          <li><i class="iconfont icon-github-fill"> </i></li>
        </a-tooltip>

      </ul>
    </div>
  </div>
</template>
<script>

    export default {
        name: "outset",
        data() {
            return {
                rotateIn: false
            }
        },
        methods: {
            getPopupContainer (trigger) {
                return trigger.parentElement
            },
        }
    }
</script>

<style scoped>


  .rotate {
    animation: rotateIn 1.5s;
  }

  @-webkit-keyframes rotateIn {
    from {
      -webkit-transform-origin: center;
      transform-origin: center;
      -webkit-transform: rotate3d(0, 0, 2, -360deg);
      transform: rotate3d(0, 0, 2, -360deg);
    }
  }

  .user-portrait {
    position:absolute;
    top: -35px;
    left: 50%;
    margin-left: -36px;
  }

  ul {
    justify-content: center;
    margin: 5px 0 auto;
    flex-wrap: wrap;
    width: 225px;
    display: flex;
  }

  ul > li > i {
    font-size: 24px;
  }

  ul > li {
    transition: 0.2s;
    border-radius: 50%;
    width: 35px;
    height: 35px;
    background-color: rgba(0, 0, 0, .3);
    margin: 0 5px;
    cursor: pointer;
    position: relative;
  }

  ul > li:hover {
    color: #fff;
    background-color: #72c1d2;
  }

  .monicker {
    /*float: right;*/
    text-align: center;
    margin-top: 12px;
    padding-top: 40px;
  }

  .user-portrait > div {
    margin: 0 auto;
  }

  .monicker > span:first-child {
    display: block;
    margin-bottom: 5px;
    text-align: center;
    font-weight: 700;
    font-size: 16px;
  }

  .monicker > span:last-child{
    font-size: 12px;
    color: #828282;
    z-index: 0;
    display: inline-block;
  }

  .user-card {
    color: black;
    text-align: center;
    /*overflow: hidden;*/
    padding: 10px;
    border-radius: 4px;
    margin-bottom: 8px;
  }

  .user-Signature h2 {
    text-align: center;
  }

  .user-portrait div {
    width: 68px;
    background-color: #fff;
    padding: 2px;
    border-radius: 50%;
    transition: 2s;
    /*background-color: rgba(0, 0, 0, 0);*/
    /*border: 1px solid rgba(66, 66, 66, 0.3);*/
    overflow: hidden;
  }

  .user-portrait div:hover {
    transition: 2s;
    background-color: rgba(66, 66, 66, 0.5);
  }

  .empty {
    width: 225px;
    margin: 10px auto;
  }

</style>
