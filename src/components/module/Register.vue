<template>
  <a-form
    :form="form"
    :formLayout="formLayout"
    @submit="registerSubmit"
  >
    <a-form-item
    >
      <a-input
        v-decorator="[
          'registerEmail',
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
          'registerPassword',
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
      <a-input
        placeholder="Email verification code"
        v-decorator="[
          'verificationCode',
          {rules: [{ required: true, message: '请输入正确的验证码!' }]}
        ]"
      >
        <a-icon style="color:rgba(0,0,0,.25)" slot="prefix" type="safety-certificate"/>

        <a-spin v-if="countDownList==0" :spinning="spinning" size="small" slot="suffix">
          <a-icon slot="indicator" type="loading" style="font-size: 12px" spin/>
          <a v-if="countDownList==0" style="font-size: 12px" ref="send" @click="sendCode">{{send}}</a>
        </a-spin>
        <span v-if="countDownList!=0" slot="suffix">{{countDownList}}s</span>
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
        注册
      </a-button>
      <a-row>
        <a-col :span="12">
          已经拥有账户？
          <a @click="login" href="javascript:void(0)">登陆</a>
        </a-col>
      </a-row>
    </a-form-item>

  </a-form>
</template>

<script>
    export default {
        name: "Register",
        props: ['registerSucceed', 'login'],
        data() {
            return {
                formLayout: 'horizontal',
                form: this.$form.createForm(this),
                countDownList: 0,
                spinning: false,
                send: "点击发送",
            }
        },
        methods: {
            registerSubmit(e){
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err) {
                        // console.log('Received values of form: ', values);
                        this.$axios({
                            url: '/article/register',
                            method: 'post',
                            params: {
                                email: values.registerEmail,
                                password: values.registerPassword,
                                verificationCode: values.verificationCode
                            }
                        }).then((response => {
                            let data = response.data;
                            if (data.successful) {

                                this.registerSucceed(data.msg);
                                // console.log(data);
                                this.$cookies.set('token',data.token,1000*60*30)
                                this.$cookies.set('user',data.bean,1000*60*30)
                            } else {

                                this.$message.error(data.msg);
                            }
                        }))
                    }
                });
            },

            sendCode() {

                this.form.validateFields(["email"], (err, values) => {
                    if (!err) {
                        this.spinning = true;
                        this.$axios({
                            url: '/article/sendEmail',
                            method: 'post',
                            params: {email: values.email}
                        }).then((response => {
                            this.spinning = false;
                            let data = response.data;
                            if (data.successful) {
                                this.countDownList = 30;
                                this.countDown();
                                this.send = "重新发送";
                            } else {
                                this.$message.error(data.msg);
                                this.send = "重新发送";
                            }

                        }))

                    }
                })


            },
            countDown() {

                let interval = setInterval(() => {

                    // 如果活动未结束，对时间进行处理
                    if (this.countDownList == 0) {
                        clearInterval(interval);

                    } else {
                        this.countDownList--
                    }
                }, 1000);


            }
        }

    }
</script>

<style scoped>

</style>
