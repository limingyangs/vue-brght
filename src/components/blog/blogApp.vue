<template xmlns:a-col="http://www.w3.org/1999/html">
  <div>
    <div class="shadow"></div>
    <header>
      <AppBar></AppBar>
    </header>
    <div class="markdown" style="width: 1118px;">

      <section class="main-body clear">

            <div id="main-part " class="main-auto ">
              <div id="main-content">
<!--                <transition name="b-fade">-->
                <router-view></router-view>
<!--                </transition>-->
              </div>
            </div>

        <a-affix :offsetTop="50">
          <div class="main-right">
            <outset></outset>
            <sentences></sentences>
            <!--<musicPlayer></musicPlayer>-->
          </div>
        </a-affix>




      </section>

      <!--版权信息头-->
      <div id="foot" class="set-x-y" style="margin: 20px 0;padding: 20px  0">
        <p>Copyright © 2018 Bright Li. All Rights Reserved.丨<a href="http://www.beian.miit.gov.cn/">粤ICP备18120119号</a>
        </p>
        <p><span class="my-face">(●'◡'●)ﾉ</span>本博客已萌萌哒运行了<span id="span_dt_dt">237天16小时15分49秒</span></p>
      </div>

      <!--版权信息尾-->
    </div>
  </div>
</template>

<script>
    import outset from '../outset.vue'
    // import musicPlayer from './components/mainLeft/musicPlayer.vue'
    import AppBar from '../navigation/AppBar.vue'
    // import slideshow from './components/mainAuto/slideshow.vue'
    import sentences from '../mainRight/sentences.vue'

    export default {
        name: "blogApp",
        components: {
            outset,
            // musicPlayer,
            AppBar,
            sentences,
        }
    }
</script>

<style scoped>

</style>
