<template>
  <shuck :show="show">
    <ul>
      <li>
        <commentEditor :disabled="disabled" :placeholder="placeholder" :send-comment="sendComment"></commentEditor>
      </li>

      <li class="no-more-reply" v-if="folder==null||folder.length==0">没有更多信息</li>

      <li :ref="index" class='comment-item' v-for='(item,index) of folder'>
        <div class="commentator-avatar">
          <a :href="item.websiteUrl==null?'javascript:void(0)':item.websiteUrl">
            <img alt="" v-bind:src="item.avatar" class="avatar avatar-48 photo" height="48" width="48">
          </a>
        </div>

        <div class="content" :class="{'first-comment':index==0}">

          <div class="user">
            <a :href="item.websiteUrl==null?'javascript:void(0)':item.websiteUrl"
               :id="item.commentCreated"
               class="name vip-red-name">{{ item.nickname }}</a>

            <span>
            <i class="iconfont"
               :class="item.customerLevel==0?'icon-ic_userlevel_':'icon-ic_userlevel_'+item.customerLevel"></i>
          </span>


          </div>

          <markdownShow v-if="item.status==0" class="md comment-con" :text="item.commentContent"></markdownShow>
          <div v-if="item.status==1" class="md text-con rm">该评论已删除</div>
          <div class="info">
            <span class="floor">{{ item.floor }}#</span>
            <span>来自{{ item.osVersion }}</span>
            <span class="time">{{ $util.getDateDiff(item.commentCreated) }}</span>
            <span @click="onLike(item)" v-if="item.status==0" class="like" :class="{'like_you':item.voting==0}"
                  :test="item.voting">
                        <a-icon type="like"/>
                        <span>{{item.praise }}</span>
                    </span>

            <span @click="onHate(item)" v-if="item.status==0" :class="{'like_you':item.voting==1}" class="hate ">
            <a-icon type="dislike"/>
            <span>{{item.tread}}</span>
          </span>

            <span v-if="item.status==0" class="reply btn-hover btn-highlight" @click="reply(item.oId,item)">回复</span>

          </div>

          <ul class="reply-box">

            <li class="reply-item reply-wrap" v-for="itemChild in item.commentChild">
              <a href="" class="reply-face"><img v-bind:src="itemChild.avatar" alt=""></a>
              <span class="reply-con">
              <a href="" :id="item.commentCreated" style="font-size: 12px">{{itemChild.nickname}}</a>
              <span><i :style="{margin:'0 8px 0 0'}" class="iconfont"
                       :class="itemChild.customerLevel==0?'icon-ic_userlevel_':'icon-ic_userlevel_'+itemChild.customerLevel"></i></span>
              <span v-if="itemChild.originalName !== undefined">回复 <a href="javascript:void(0)">
                @{{ itemChild.originalName}}</a></span>


            </span>

              <markdownShow v-if="itemChild.status==0" class="md text-con"
                            :text="itemChild.commentContent"></markdownShow>
              <div v-if="itemChild.status==1" class="md text-con rm">该评论已删除</div>


              <div class="info">
                <span class="time">{{ $util.getDateDiff(itemChild.commentCreated) }}</span>
                <span :class="{'like_you':itemChild.voting==0}" @click="onLike(itemChild)" v-if="itemChild.status==0"
                      class="like">
                  <a-icon type="like"/>
                 <span>{{itemChild.praise }}</span>
              </span>
                <span :class="{'like_you':itemChild.voting==1}" @click="onHate(itemChild)" v-if="itemChild.status==0"
                      class="hate ">
                <a-icon type="dislike"/>
                <span>{{itemChild.tread}}</span>
              </span>
                <span v-if="itemChild.status==0" class="reply btn-hover btn-highlight"
                      @click="reply(item.oId,itemChild)">回复</span>
              </div>
            </li>
            <li>
              <commentEditor :commentChild="commentChild" :disabled="disabled" :placeholder="placeholderChild"
                             :send-comment="sendCommentChild" v-if="index_ == item.oId"></commentEditor>
            </li>
          </ul>
        </div>
      </li>

    </ul>
  </shuck>
</template>

<script>


  export default {
    name: "Comment",
    props: ['articleId'],
    data() {
      return {
        index_: -1,
        show: true,
        placeholder: '请先登陆...',
        placeholderChild: '请先登陆...',
        toolbars: {
          bold: true, // 粗体
          italic: true, // 斜体
          header: true, // 标题
          underline: true, // 下划线
          strikethrough: true, // 中划线
          mark: true, // 标记
          superscript: false, // 上角标
          subscript: false, // 下角标
          quote: false, // 引用
          ol: true, // 有序列表
          ul: false, // 无序列表
          link: true, // 链接
          imagelink: false, // 图片链接
          code: true, // code
          table: false, // 表格
          fullscreen: false, // 全屏编辑
          readmodel: false, // 沉浸式阅读
          htmlcode: true, // 展示html源码
          help: true, // 帮助
          /* 1.3.5 */
          undo: false, // 上一步
          redo: false, // 下一步
          trash: true, // 清空
          emoji: true,
          emojiTail: true,
          save: false, // 保存（触发events中的save事件）
          /* 1.4.2 */
          navigation: false, // 导航目录
          /* 2.1.8 */
          alignleft: false, // 左对齐
          aligncenter: false, // 居中
          alignright: false, // 右对齐
          /* 2.2.1 */
          subfield: true, // 单双栏模式
          preview: true, // 预览

        },
        disabled: true,
        commentChild: null,
        folder: [],
        // comment:true,
      }
    },
    methods: {
      onLike(row) {
        let data = {};
        let user = this.$cookies.get('user');
        if(user == null){
          this.$message.warn("请先登陆才能点赞！")
          return  false;
        }
        if (row.voting == 1) {
          this.$message.warn("你已经踩过了！");
          return false;
        }
        if (row.voting == 0) {
          this.$message.warn("你已经点过赞了！");
          return false;
        }
        row.voting = 0;
        row.praise++;

        data.userId = user.id;
        data.commentId = row.oId;
        data.status = 0;
        if (row.osVersion) {
          data.fromTab = 1;
        } else {
          data.fromTab = 2;
        }


        this.$api.addPraiseNum(data).then(res => {

          this.$message.success("点赞成功！")
        })
      },
      onHate(row) {
        let data = {};
        let user = this.$cookies.get('user');
        if(user == null){
          this.$message.warn("请先登陆才能踩！")
          return  false;
        }
        if (row.voting == 0) {
          this.$message.warn("你已经点过赞了！");
          return false;
        }
        if (row.voting == 1) {
          this.$message.warn("你已经踩过了！");
          return false;
        }
        row.tread++;
        row.voting = 1;

        data.userId = user.id;
        data.commentId = row.oId;
        data.status = 1;
        if (row.osVersion) {
          data.fromTab = 1;
        } else {
          data.fromTab = 2;
        }

        this.$api.addPraiseNum(data).then(res => {
          this.$message.success("点赞成功！")
        })


      },
      getArticleComment(id) {

        let user = this.$cookies.get('user');
        // console.log(user);
        this.$axios({
          url: '/comment/getArticleComment',
          method: 'post',
          params: {id: id, userId:user==null? null: user.id}
        }).then((response => {

          let data = response.data;

          data.data.forEach((item) => {

            if (item.voting == undefined) {
              item.voting = undefined;
            }
          })

          this.show = true;
          this.folder = data.data;
          this.$nextTick(() => {
            this.locateTheAnchor();
          });


        }))

      },

      commentOff() {
        this.disabled = true;
        this.placeholder = '请先登陆...'
      },
      commentOpen() {
        this.disabled = false;
        this.placeholder = '开始编辑...'
      },
      reply(index, value) {
        this.placeholderChild = '回复 @' + value.nickname + '：'
        this.index_ = index;
        this.commentChild = value;
      },
      sendComment(text) {


        let comment = {
          commentContent: text,
          commentCreated: new Date().getTime(),
          commentPeopleId: this.$cookies.get("user").id,
          commentOnId: this.articleId,
          // floor: this.getFloor(),
          osVersion: this.$util.getOsVersion(),
          commentSharpURL: this.$route.fullPath

        };

        this.$axios(
          {
            url: '/comment/sendComment',
            method: 'post',
            params: comment
          }
        ).then((response => {
          let data = response.data;
          if (data.status) {
            // this.$message.success(data.msg)
            // console.log(data.data)
            this.folder.unshift(data.data)

          } else {
            this.$message.error("评论发送失败！")
            console.error(data.msg)
          }
        }))

      },
      sendCommentChild(commentText, commentChild) {
        let comment = {
          commentContent: commentText,
          commentNameId: this.$cookies.get("user").id,
          commentOnId: this.index_,
          commentArticleId: this.articleId,
          commentOriginalCommentId: commentChild.oId,
          commentOriginalPeopleId: commentChild.commentNameId,
          commentSharpURL: this.$route.fullPath

        };

        this.$axios(
          {
            url: '/comment/sendCommentChild',
            method: 'post',
            params: comment
          }
        ).then((response => {
          let data = response.data;
          if (data.status) {

            this.folder.filter((item, index) => {
              if (item.oId === this.index_) {

                if (this.folder[index].commentChild) {
                  this.folder[index].commentChild.push(data.data);
                } else {
                  let commentChild = [];
                  commentChild.push(data.data)
                  this.$set(this.folder[index], 'commentChild', commentChild);
                }

              }
            })
            this.$message.success(data.msg)
            this.placeholderChild = '开始编辑...'

          } else {
            this.$message.error("评论发送失败！")
            console.error(data.msg)
          }
        }))

      },
      locateTheAnchor() {
        let interval = setTimeout(() => {

          let anchor = document.getElementById(this.$route.query.anchor);

          if (anchor) {

            this.$util.scrollTo(anchor, 500);

          }
          clearTimeout(interval);

        }, 1000);

      }

    },
    mounted() {
      this.getArticleComment(this.articleId)

      this.$bus.on("onExit", this.commentOff);
      this.$bus.on("onLogin", this.commentOpen);
      // this.$emit("haha");
      if (this.$cookies.get('user')) {
        this.commentOpen();
      }


    }
  }
</script>

<style scoped>
  .set-x-y {
    padding: 40px;
    margin-bottom: 40px;
  }

  .first-comment {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    margin-top: 32px;
  }

  .b-button {
    margin-top: 10px;
  }

  .b-button > button {
    float: right;
    margin-left: 5px;
  }

  .editor {

    height: 150px;
    min-height: 150px;
  }


  .text-con {
    font-size: 14px;
    word-break: break-all;
    margin-left: 38px;
  }

  .no-more-reply {
    color: #99a2aa;
    text-align: center;
    padding: 30px 0;
    font-size: 12px;
  }

  .reply-item > .info {
    margin-left: 37px;
  }

  .reply-con {
    font-size: 14px;
  }

  .reply-con > a {
    font-weight: 700;
  }

  .reply-face {
    display: inline-block;
    position: relative;
    margin-right: 10px;
    vertical-align: top;
  }

  .reply-face > img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }

  p {
    margin-bottom: 0;
  }

  .iconfont {
    font-weight: 400;
    margin-left: 8px;
  }

  .like, .hate, .reply {
    cursor: pointer;
  }

  .comment-item > ul {
    left: 10px;
    margin-left: 65px;
  }

  .anticon {
    display: inline-block;
    font-style: normal;
    vertical-align: -0.125em;
    text-align: center;
    text-transform: none;
    line-height: 0;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .commentator-avatar {
    float: left;
    margin: 22px 0 0 5px;
    position: relative;
  }

  .user {
    font-size: 12px;
    font-weight: 700;
    line-height: 18px;
    padding-bottom: 4px;
    display: block;
    word-wrap: break-word;
  }

  .info > span {
    margin-right: 15px;
    font-size: 12px;
    color: #99a2aa;
    line-height: 26px;
  }

  .text {
    line-height: 20px;
    padding: 2px 0;
    font-size: 14px;
    text-shadow: none;
    overflow: hidden;
    word-wrap: break-word;
    word-break: break-word;
  }


  .children .commentator-avatar {
    margin-top: 0px;
  }


  .comment-item > .content {
    position: relative;
    margin-left: 65px;
    padding: 22px 0px 14px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  .children .content {
    padding-bottom: 14px;
    margin-left: 55px;
  }

  .children img {
    width: 38px;
    height: 38px;
  }

  .rm {
    color: #ccc;
  }

  .like_you {
    color: #fb7299 !important;
  }

  img {
    border-radius: 50%;
  }
</style>
