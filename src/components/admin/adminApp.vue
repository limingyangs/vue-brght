<template>

  <a-layout id="components-layout-demo-responsive">
    <a-layout-sider
      breakpoint="lg"
      collapsedWidth="0"
      @collapse="onCollapse"
      @breakpoint="onBreakpoint"
    >
      <div class="logo"/>
      <a-menu
        :defaultSelectedKeys="['1']"
        :defaultOpenKeys="['sub1']"
        mode="inline"
        theme="dark"
        :inlineCollapsed="collapsed"
      >
        <a-menu-item key="1">
          <router-link :to="{name:'comment'}">
            <i class="icon-pinglun iconfont"></i>
            <span class="nav-text">评论管理</span>
          </router-link>
        </a-menu-item>

        <a-sub-menu key="sub1">
          <span slot="title"><i class="icon-24 iconfont"></i><span>文章</span></span>
          <a-menu-item key="2"><router-link :to="{name:'issue'}">发布文章</router-link></a-menu-item>
          <a-menu-item key="3"><router-link :to="{name:'admin'}">文章管理</router-link></a-menu-item>
          <a-menu-item key="4">草稿夹</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <span slot="title"><a-icon type="setting"></a-icon><span>工具</span></span>
          <a-menu-item key="5">偏好设置</a-menu-item>
          <a-menu-item key="6">皮肤管理</a-menu-item>
          <a-menu-item key="7">分类管理</a-menu-item>
          <a-menu-item key="8">导航管理</a-menu-item>
          <a-menu-item key="9">链接管理</a-menu-item>
          <a-menu-item key="10">用户管理</a-menu-item>
          <a-menu-item key="11">插件管理</a-menu-item>
          <a-menu-item key="12">其他</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>

    <router-view ></router-view>


  </a-layout>

</template>

<script>


  export default {
    name: "adminApp",
    components: {
      // ACol
      // editor
    },
    data() {
      return {
        collapsed: false,
        articleContent:'',
        // article: {
        //   articleTitle:'',
        //   articleContent:'',
        //   articleTags:'',
        //   articleViewPwd:null
        // },
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
            'Content-Type': 'multipart/form-data'
          }
        }).post('/api/admin/uploadFile', formdata).then((response) => {
          // console.log(response.msg)
          this.$refs.md.$img2Url(filename, this.$axios.defaults.baseURL + response.data.msg);
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
      sub() {

      },
      /**
       * 发布文章
       */
      release(e) {
        e.preventDefault();
        this.article.validateFields((err, values) => {
          if (!err) {
            values.articleContent = this.articleContent
            this.$axios({
              url:'/api/admin/addArticle',
              method:'post',
              params: values

            }).then((response)=>{
                let data  = response.data;
                if(data.successful){

                }
              // console.log(response)
            })
            // console.log('Received values of form: ', values);
          }
        });
        // console.log(this.article)
      }
    },
    mounted() {
      // console.log(this.article.getValue())


    }
  }
</script>

<!--<style scoped src="/Users/bright/IdeaProjects/bright-blogs/node_modules/ant-design-vue/lib/layout/style/index.css"></style>-->
<!--<style scoped src="/Users/bright/IdeaProjects/bright-blogs/node_modules/ant-design-vue/lib/grid/style/index.css"></style>-->
<!--<style scoped src="/Users/bright/IdeaProjects/bright-blogs/node_modules/ant-design-vue/lib/menu/style/index.css"></style>-->

<style scoped>

  i {
    margin-right: 10px;
    font-size: 15px;
  }

  .content-body > div {
    margin: 15px 0;
  }

  #components-layout-demo-responsive {
    height: 100%;
  }

  #components-layout-demo-responsive .logo {
    height: 32px;
    background: rgba(255, 255, 255, .2);
    margin: 16px;
  }

  #components-layout-demo-fixed-sider .logo {
    height: 32px;
    background: rgba(255, 255, 255, .2);
    margin: 16px;
  }

  label {
    margin-bottom: 10px;
    display: inline-block;
  }

  .but > button {
    float: right;
    margin: 0 2px;
  }

</style>
