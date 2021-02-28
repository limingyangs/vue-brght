<template>


      <div class="editor-top">
        <mavon-editor :externalLink="false" :placeholder="placeholder" defaultOpen="edit" class="editor"  ref='md' codeStyle="agate" :toolbars="toolbars"
                       v-model="commentText"/>
        <div class="b-button clearfix">
          <a-button :disabled="disabled" @click="sendComments(commentText,commentChild),commentText=''">发布</a-button>
        </div>

      </div>


</template>

<script>
    export default {
        name: "CommentEditor",
        props: {
            placeholder:{
              type: String,
              default:''
            },
            disabled: {
                type: Boolean,
                default:true
            },

            sendComment:{
                type:Function
            },
            commentChild:{
                type:Object,
            }
        },


        data() {
            return {
                commentText:'',
                toolbars: {
                    bold: true, // 粗体
                    italic: false, // 斜体
                    header: false, // 标题
                    underline: false, // 下划线
                    strikethrough: true, // 中划线
                    mark: false, // 标记
                    superscript: false, // 上角标
                    subscript: false, // 下角标
                    quote: false, // 引用
                    ol: false, // 有序列表
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
                visible: true

            }
        },
        methods: {
            sendComments(commentText,commentChild){
                commentText = commentText.replace(/(^\s*)|(\s*$)/g, "");
                if (commentText == null || commentText == '') {
                    this.$message.warn("评论内容不能为空！");
                    return false;
                }
                commentText = encodeURI(commentText);
                this.sendComment(commentText,commentChild);
            }
        },
        mounted() {


        }
    }
</script>

<style scoped>


  .editor-top{
    margin-top:  15px ;
  }

  .b-button{
    margin-top: 10px;
  }
  .b-button > button {
    float: right;
  }

  .editor{

    height: 150px;
    min-height: 150px;
  }

</style>
