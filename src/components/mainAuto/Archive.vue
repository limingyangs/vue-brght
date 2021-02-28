<!--归档-->
<template>
  <shuck :show="show" class="content">
    <a-timeline >
      <a-timeline-item >
        <span slot="dot" class="timeline-spot-big"></span>
        目前共计 {{number}} 篇日志。 (゜-゜)つロ 干杯~
      </a-timeline-item>
      <a-timeline-item v-for="(item ,index) in archives" :key="index">

        <span v-if="item.articleCreated==undefined" slot="dot" class="timeline-spot"></span>
        <time :class="{'h1':item.articleCreated==undefined}">{{ item.articleCreated==undefined?item.date: item.articleCreated}}</time>

        <a v-if="item.articleTitle!=undefined" href="javascript:void(0)" class="title">{{ item.articleTitle==undefined?null: item.articleTitle }}</a>
      </a-timeline-item>
    </a-timeline>
  </shuck>
</template>

<script>

    export default {
        name: "Archive",
        data() {
            return {
                show:false,
                archives: null,
                number:null
            }
        },
        methods: {
            getArchive() {
                this.$axios.post("/article/getArchive").then((response => {

                    let data = response.data;
                    this.number = data.length
                    let date = null;
                    let archives = [];
                    for (let i of data) {
                        // console.log(this.$util.formatTimeToStr(i.articleCreated, 'yyyy'))
                        if(date != this.$util.formatTimeToStr(i.articleCreated, 'yyyy')){
                            date = this.$util.formatTimeToStr(i.articleCreated, 'yyyy')
                            archives.push({date:date})
                            i.articleCreated = this.$util.formatTimeToStr(i.articleCreated, 'MM-dd');
                            archives.push(i)
                        }else {
                            i.articleCreated = this.$util.formatTimeToStr(i.articleCreated, 'MM-dd');
                            archives.push(i)
                        }
                    }

                    this.archives = archives;
                    this.show = true

                }))
            },

        },
        mounted() {

            this.getArchive();

        }
    }
</script>

<style scoped>

  time{
    font-size: 12px;
    color: #00BBFF;
  }
  .h1{
    font-size: 22px;
    font-weight: 700;
    color: #555!important;
  }

  .title{
    font-size: 14px;
    color: #666;
  }

  .timeline-spot-big{
    width: 16px;
    height: 16px;
    background-color: #fff;
    border-radius: 50%;
    border: 2px solid #1890ff;
    color: #1890ff;
  }

  .timeline-spot {

    width: 12px;
    height: 12px;
    background-color: #fff;
    border-radius: 50%;
    border: 2px solid #1890ff;
    color: #1890ff;

  }

  .post-time {
    display: inline-block;
    text-align: left;
    margin-left: 20px;
    color: #ffaafc;
  }

  .post-type-normal {
    display: block;
    position: relative;
    margin-bottom: 20px;
  }

  .content .post-header::before {
    content: " ";
    position: absolute;
    left: 0;
    top: 6px;
    width: 6px;
    height: 6px;
    margin-left: -4px;
    background: #bbb;
    border-radius: 50%;
    border: 1px solid #fff;
    transition-duration: .2s;
    transition-timing-function: ease-in-out;
    transition-delay: 0s;
    transition-property: background;
  }

  .content .post-header:hover::before {
    background: #ba1a35;
  }

  .content .post-title {
    margin-left: 20px;
    display: inline-block;
    text-align: left;
    font-size: 14px;
  }

  .content {
    padding: 60px 100px;
    /*margin-left: 55px;*/
  }

  .collection-title h1 {
    margin-left: 20px;
  }

  .post-body::after {
    content: " ";
    position: absolute;
    top: 100px;
    left: 40px;
    margin-left: -2px;
    width: 4px;
    height: calc(73% - 42px);
    background: rgba(255, 227, 50, 0.33);
    z-index: -1;
  }

  .collection-title::before {
    content: " ";
    position: absolute;
    left: 0;
    top: 50%;
    margin-left: -4px;
    margin-top: -4px;
    width: 8px;
    height: 8px;
    background: #bbb;
    border-radius: 50%;
  }

  span {
    display: inline-block;
  }

  .collection-title {
    position: relative;
    margin: 30px 0;
    text-align: left;
  }
</style>
