<template>
  <a-layout>
    <a-layout-header :style="{ background: '#fff', padding: 0 }"/>

    <a-layout-content class="content" :style="{ margin: '24px 16px 0',overflow: 'initial',minHeight: 'unset'}">
      <a-form
        :form="article"
        @submit="release"
      >

        <div class="content-body" :style="{ padding: '24px', background: '#fff' }">
          <a-form-item
            label="标题："
          >
            <a-input
              v-decorator="[
          'articleTitle',
          {rules: [{ required: true, message: '请填写标题内容!' }]}
        ]"
            />
          </a-form-item>

          <a-form-item
            label="正文"
          >
            <mavon-editor ref='md' @imgAdd="imgAdd" codeStyle="agate" :toolbars="toolbars"
                          v-model="articleContent"
            />
          </a-form-item>

          <a-form-item
            label="标签"
          >

            <a-input
              v-decorator="[
          'articleTags',
          {rules: [{ required: true, message: '请填写标签内容!' }]}
        ]"
            />
          </a-form-item>

          <a-form-item
            label="访问密码"
          >

            <a-input
              v-decorator="[
          'articleViewPwd'
        ]"
            />
          </a-form-item>


          <a-form-item
          >
            <a-button
              type="primary"
              html-type="submit"
            >
              {{ oId == null? '发布':'更新' }}
            </a-button>
          </a-form-item>
        </div>

      </a-form>

    </a-layout-content>

    <a-layout-footer style="textAlign: center">
      Ant Design ©2018 Created by Ant UED
    </a-layout-footer>
  </a-layout>
</template>

<script>
  import cookies from "vue-cookies";

  export default {
    name: "issueArticle",
    props: {
      oId: {
        type: Number,
        default: null
      }
    },
    data() {
      return {
        collapsed: false,
        articleContent: '',
        article: this.$form.createForm(this),
        toolbars: {
          bold: true, // 粗体
          italic: true, // 斜体
          header: true, // 标题
          underline: true, // 下划线
          strikethrough: true, // 中划线
          mark: true, // 标记
          superscript: true, // 上角标
          subscript: true, // 下角标
          quote: true, // 引用
          ol: true, // 有序列表
          ul: true, // 无序列表
          link: true, // 链接
          imagelink: true, // 图片链接
          code: true, // code
          table: true, // 表格
          fullscreen: true, // 全屏编辑
          readmodel: true, // 沉浸式阅读
          htmlcode: true, // 展示html源码
          help: true, // 帮助
          /* 1.3.5 */
          emoji: true,
          undo: true, // 上一步
          redo: true, // 下一步
          trash: true, // 清空
          save: true, // 保存（触发events中的save事件）
          /* 1.4.2 */
          navigation: true, // 导航目录
          /* 2.1.8 */
          alignleft: true, // 左对齐
          aligncenter: true, // 居中
          alignright: true, // 右对齐
          /* 2.2.1 */
          subfield: true, // 单双栏模式
          preview: true, // 预览

        },
      }
    },
    methods: {
      imgAdd(filename, imgFile) {
        let formdata = new FormData();
        formdata.append('photo', imgFile);
        this.$axios.create({
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': this.$cookies.get("token")
          }
        }).post('/api/admin/uploadFile', formdata).then((response) => {
          // console.log(response.msg)
          // this.$refs.md.$img2Url(filename, this.$axios.defaults.baseURL + response.data.msg);
          this.$refs.md.$img2Url(filename,  response.data.msg);
        })
      },
      onCollapse(collapsed, type) {
        // console.log(collapsed, type);
      },
      onBreakpoint(broken) {
        // console.log(broken);
      },
      toggleCollapsed() {
        this.collapsed = !this.collapsed
      },
      /**
       * 发布文章
       */
      release(e) {
        e.preventDefault();
        this.article.validateFields((err, values) => {
          if (!err) {
            values.articleContent = this.articleContent;
            if (this.oId == null) {

              this.$api.addArticle(values).then((res) => {
                this.$router.push("/api/admin/article-admin")
              })

            } else {
              values.oId = this.oId;
              this.$api.updateArticle(values).then((res) => {
                this.$router.push("/api/admin/article-admin")
              })

            }
          }
        });
        // console.log(this.article)
      },
      setArticle(article) {
        this.article.setFieldsValue({

          articleTitle: article.articleTitle,
          articleTags: article.articleTags,

        })
        this.articleContent = article.articleContent
      }
    },
    mounted() {
      if (this.oId != null) {

        this.$api.getArticle(this.oId).then((res) => {
          this.setArticle(res.data.data.article)
        })

      }
    }
  }
</script>

<style scoped>

</style>
