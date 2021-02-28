<template>
  <shuck :show="show" class="content">
    <div class="error-panel server-error error-404">
      <img src="//static.hdslb.com/error/very_sorry.png">
      <div style="text-align: center; padding: 0 0 40px 0;">
        <a-button size="large" type="primary">返回上一页</a-button>
      </div>

    </div>
    <div class="error-split" id="up">
    </div>
    <div class="error-manga">
      <img :src="imgLink">
      <a class="change-img-btn" href="#up">
        <a-button size="large" type="primary" @click="randomImg">换一张</a-button>
      </a>
    </div>
  </shuck>
</template>

<script>
  export default {
    name: "404",
    data() {
      return {
        show: true,
        imgLinks: [],
        imgLink: null
      }
    },
    methods: {
      randomImg() {
        let img = this.imgLinks[parseInt(Math.random() * this.imgLinks.length)].data.img;
        // console.log(img)
        if (img != this.imgLink) {
          this.imgLink = img;
        }else {
          // console.log(img)
          this.randomImg();
        }
      }
    },
    mounted() {
      this.$api.getRequest("/article/getErrImage")
        .then(res => {
          this.imgLinks = res.data.data.data.list;
          this.randomImg();
        })
    }
  }
</script>

<style scoped>
  .change-img-btn > button {
    margin-top: 30px;
  }

  .content {
    padding: 0 40px;
  }

  .error-split {
    width: 100%;
    height: 40px;
    background: url(/static/images/have_rest.png) center no-repeat;
  }

  .error-manga {
    padding: 30px;
    text-align: center;
  }
</style>
