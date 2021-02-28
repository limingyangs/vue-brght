<template>
  <a-form
    :form="form"
    @submit="handleSubmit"
  >
    <a-form-item
    >
      <a-input
        v-decorator="[
          'email',
          {rules: [{ required: true, message: '请输入正确的邮箱!' }]}
        ]"
        placeholder="Email"
      >
        <a-icon
          slot="prefix"
          type="user"
          style="color:rgba(0,0,0,.25)"
        />

      </a-input>
    </a-form-item>
    <a-form-item
    >
      <a-input
        type="password"
        placeholder="Password"
        v-decorator="[
          'password',
          {rules: [{ required: true, message: '密码不能为空!' }]}
        ]"
      >
        <a-icon
          slot="prefix"
          type="lock"
          style="color: rgba(0,0,0,.25)"
        />
      </a-input>
    </a-form-item>
    <a-form-item
    >
      <a-button
        type="primary"
        block
        size="large"
        html-type="submit"
      >
        登陆
      </a-button>
      <a-row>
        <a-col :span="12">
          没有账号？
          <a @click="register" href="javascript:void(0)" >现在注册!</a>
        </a-col>
        <a-col :span="12">
          <a style="float:right" href="">忘记密码</a>
        </a-col>
      </a-row>
      <a-row>
        <span
          @click="loginQQ"
          style="cursor: pointer" id=""><i data-v-a6b6bb38="" class="iconfont icon-QQ-circle-fill"></i> QQ登录</span>
      </a-row>
      <a-row>
        <a-col>

        </a-col>
      </a-row>
    </a-form-item>

  </a-form>
</template>

<script>



    export default {
        name: "Login",
        props: ['loginSucceed','register'],
        data() {
            return {
                formLayout: 'horizontal',
                form: this.$form.createForm(this),
            }
        },
        methods: {
            loginQQ(){
                // console.log('???')
                // window.open('https://graph.qq.com/oauth2.0/authorize?client_id=101582304&response_type=token&scope=all&redirect_uri=http%3A%2F%2Fbrightli.top%3A8080%2Fblog%2Fhome', 'oauth2Login_10363' ,'height=525,width=585, toolbar=no, menubar=no, scrollbars=no, status=no, location=yes, resizable=yes')
                window.open('https://graph.qq.com/oauth2.0/authorize?client_id=101582304&response_type=token&scope=all&redirect_uri=http://brightli.top/blog/home', 'oauth2Login_10363' ,'height=525,width=585, toolbar=no, menubar=no, scrollbars=no, status=no, location=yes, resizable=yes')
            },
            handleSubmit(e) {

                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err) {


                        this.$axios({
                            url: '/article/login',
                            method: 'post',
                            params: {
                                email: values.email,
                                password: values.password,
                            }
                        }).then((response => {

                            let data = response.data;
                            if (data.successful) {
                                this.$cookies.set('user',data.bean,1000*60*30)
                                this.$cookies.set('token',data.token,1000*60*30)
                                this.$message.success(data.msg);
                                this.loginSucceed();
                                this.$bus.emit("onLogin")
                            } else {
                                // console.log(data)
                                this.$message.error(data.msg);
                            }
                        }))

                    }
                });
            },
        }
    }
</script>

<style scoped>

</style>
