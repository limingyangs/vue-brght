<template>
  <a-affix :offset-top="0">
    <div class="main-nva">
      <ul class="main-nva-column clear empty">
        <li>
          <router-link :to="{name:'home'}"><i class=" iconfont icon-shouyefill"></i>&nbsp;首页
          </router-link>
        </li>
        <!--         <li>
                     <router-link to="/tall"><i class=" iconfont icon-talk"></i>&nbsp;说说
                     </router-link>
                 </li>-->
        <li>
          <router-link :to="{name:'filing'}">
            <i class="iconfont icon-xiangce"></i>&nbsp;归档
          </router-link>

        </li>
        <!--  <li>
              <a href="javascript:void(0)"><i class="iconfont icon-wangpan"></i>&nbsp;个人网盘
              </a>
          </li>-->
        <li>
          <router-link :to="{name:'stayWords'}">
            <i class="iconfont icon-bianji"></i>&nbsp;留言板
          </router-link>
        </li>
        <li>
          <router-link :to="{name:'friendshipLink'}">
            <i class="iconfont icon-lianjie"></i>&nbsp;友情链接

          </router-link>

        </li>
        <li>
          <router-link :to="{name:'aboutMe'}">
            <i class="iconfont icon-weibiaoti-"></i>&nbsp;关于我
          </router-link>
        </li>
        <li class="login">
          <div>
            <!--:visible="false"-->
            <a-popover v-if="user == undefined" placement="bottom">
              <template slot="content">
                <a-row class="row">
                  <div>登陆后查看更多内容：</div>
                </a-row>
                <a-row class="row">
                  <img width="320" src="/static/images/20190914214820.gif" alt="">
                </a-row>
                <a-row class="row">
                  <a-button @click.stop @click="loginShow=true" size="large" block type="primary">
                    登陆
                  </a-button>

                  <a-modal
                    destroyOnClose
                    width="380px"
                    :title="title"
                    :visible="loginShow"
                    :footer="null"
                    @cancel="loginShow=false"
                  >


                    <login v-show="!registerShow" :register="register" :loginSucceed="loginSucceed"></login>
                    <register :registerSucceed="registerSucceed" v-show="registerShow" :login="login"></register>

                  </a-modal>

                </a-row>

              </template>
              <a-avatar style="backgroundColor:#fff;color: rgba(0, 0, 0, 0.5);" icon="user"/>
            </a-popover>

            <a-popover v-if="user != undefined" placement="bottom">
              <template slot="content">
                <a-row class="row">
                  <div class="name">{{ user.nickname == null ? user.email : user.nickname }}</div>
                </a-row>
                <a-row :style="{paddingBottom:'20px'}" class="row">
                  <a-col :span="4">
                    <div :style="{fontSize:'12px'}">等级</div>
                  </a-col>
                  <a-col :span="20">
                    <div class="grade clearfix">

                      <div class="bar">

                        <div class="lt" :class="'lv'+user.customerLevel"></div>
                        <div class="rate" :style="{width: (user.userSuffer/suffer[user.customerLevel])*100+'%'}"></div>
                        <div class="num">
                          <div>
                            {{ user.userSuffer }}
                            <span>/{{ suffer[this.user.customerLevel] }}</span>
                          </div>
                        </div>
                      </div>

                    </div>
                  </a-col>
                </a-row>

                <a-row :style="{marginTop:'25px'}" class="row">
                  <div @click.stop @click="exit" class="member-bottom">
                    <a href="javascript:void(0)" class="logout">退出</a>
                  </div>
                </a-row>

              </template>
              <a-avatar :src="user.avatar"/>
            </a-popover>


          </div>
        </li>
      </ul>
    </div>
  </a-affix>

</template>

<script>


    import login from '../module/Login'
    import register from '../module/Register'

    export default {
        name: "AppBar",
        components: {
            login,
            register
        },
        data() {
            return {
                loginShow: false,
                registerShow: false,
                confirmLoading: false,
                title: '登陆bright的个人博客',
                user: undefined,
                suffer: [100, 1500, 3000, 6000, 10000, 20000, 40000]
            }
        },
        methods: {
            registerSucceed(msg) {
                this.loginShow = false;
                this.$message.success(msg);
            },
            loginSucceed() {
                this.loginShow = true;
                this.user = this.$cookies.get("user");
            },
            register() {
                this.title = '注册bright的个人博客';
                this.registerShow = true;
            },
            login() {
                this.title = '登陆bright的个人博客';
                this.registerShow = false;
            },
            exit() {
                this.user = null;
                this.$cookies.remove("user");
                this.$cookies.remove("token");
                this.loginShow = false;
                this.$message.success('退出成功！');
                this.$bus.emit("onExit");
                QC.Login.signOut();
                // this.$commentEditor.data().disabled = true;
            }

        },
        mounted() {


            let QQObj = {};

            let that = this;
            QC.Login({
                // btnId:"qq_login", //插入按钮的节点id
                // redirectURI: 'http://brightli.top:8081/blog/home'
            }, function (reqData, opts) {//登录成功
                QQObj.gender = reqData.gender_type;
                QQObj.nickname = reqData.nickname;
                QQObj.avatar = reqData.figureurl_qq;
                if (QC.Login.check()) {
                    QC.Login.getMe(function (openId, accessToken) {
                        QQObj.openId = openId;
                        QQObj.accessToken = accessToken;

                        that.$api.registerQQUser(QQObj).then((res)=>{

                            that.$cookies.set('user',res.data.data,1000*60*60*24*90);
                            that.$cookies.set('token',res.data.data.accessToken,1000*60*60*24*90);
                            that.loginShow = true;
                            that.user = that.$cookies.get("user");
                            that.$bus.emit("onLogin");

                        })

                        // console.log(QQObj)

                    })
                }

                // //根据返回数据，更换按钮显示状态方法
                // var dom = document.getElementById('qq_login'),
                //     _logoutTemplate = [
                //         //头像
                //         '<span><img src="{figureurl}" class="{size_key}"/></span>',
                //         //昵称
                //         '<span>{nickname}</span>',
                //         //退出
                //         '<span><a href="javascript:QC.Login.signOut();">退出</a></span>'
                //     ].join("");
                //
                // dom && (dom.innerHTML = QC.String.format(_logoutTemplate, {
                //     nickname: QC.String.escHTML(reqData.nickname),
                //     figureurl: reqData.figureurl
                // }));

            }, function (opts) {//注销成功
                // alert('QQ登录 注销成功');

            });



            // QC.Login.signOut()

            this.user = this.$cookies.get("user");

        }
    }
</script>

<style scoped>

  .name {
    text-align: center;
    font-weight: 700;
    font-size: 12px;
  }


  .fl {
    float: left;
  }

  .member-bottom {
    position: absolute;
    width: 115%;
    bottom: -20px;
    left: -16px;
    height: 30px;
    line-height: 30px;
    background-color: #f4f5f7;
    border-radius: 0 0 4px 4px;
    /*margin-top: 25px;*/
  }

  .logout {
    font-size: 12px;
    float: right;
    padding-right: 20px;
    color: #222;
  }

  .num {
    position: absolute;
    right: 0;
    bottom: -24px;
    white-space: nowrap;
    font-size: 12px;
  }

  .num span {
    color: #ccc;
  }

  .rate {
    height: 8px;
    background-color: #f3cb85;
  }

  .lv6 {
    background-position: -153px -224px;
  }

  .lv5 {
    background-position: -153px -188px;
  }

  .lv4 {
    background-position: -153px -152px;
  }

  .lv3 {
    background-position: -153px -116px;
  }


  .lv2 {
    background-position: -153px -80px;
  }

  .lv1 {
    background-position: -153px -44px;
  }

  .lv0 {
    background-position: -153px -8px;
  }


  .lt {
    width: 18px;
    height: 18px;
    border-radius: 9px;
    position: absolute;
    left: -17px;
    top: -6px;
    color: #fff;
    font-size: 12px;
    line-height: 18px;
    text-align: center;
    background-color: #f3cb85;
    background-image: url(/static/images/grade_icon.png);
    background-repeat: no-repeat;
  }

  .grade {
    position: relative;
    /*margin: 24px 0 30px 0;*/
    padding: 0 17px;
  }

  .bar {
    position: relative;
    top: 6px;
    width: 170px;
    height: 8px;
    background: #eee;
  }

  .row {
    margin: 8px 0;
  }

  .login {
    float: right !important;
  }

  .main-nva-column {
    width: 1350px;
    margin: auto;
  }

  .main-nva-column li {
    padding: 2px 17px;
    float: left;
    font-size: 14px;
  }

  .main-nva {
    padding: 2px 0;
    /*margin-bottom: 50px;*/
    background-color: rgba(0, 0, 0, 0.5);
  }

  .main-nva a {
    color: #fff;
  }

  .content {
    width: 335px;
    height: 346px;
  }

</style>
