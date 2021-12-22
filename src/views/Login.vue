<!--
 * @Author: Timber.Wang
 * @Date: 2021-12-09 21:29:28
 * @LastEditors: Timber.Wang
 * @LastEditTime: 2021-12-22 14:15:25
 * @Description: 登陆组件
-->
<template>
  <div id="building">
    <div>
      <el-form :rules="loginRules"
               v-loading="loading"
               element-loading-text="正在登陆，请稍后"
               element-loading-spinner="el-icon-loading"
               element-loading-background="rgba(0, 0, 0, 0.8)"
               ref="loginForm"
               :model="loginForm"
               class="loginContainer">
        <h2 class="loginTitle">网上办公登录系统</h2>

        <el-form-item prop="username">
          <el-input type="text"
                    auto-complete="false"
                    v-model="loginForm.username"
                    placeholder="请输入用户名"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input type="password"
                    auto-complete="false"
                    v-model="loginForm.password"
                    placeholder="请输入密码"></el-input>
        </el-form-item>

        <el-form-item prop="code">
          <el-input type="text"
                    auto-complete="false"
                    v-model="loginForm.code"
                    placeholder="点击图片更换验证码"
                    style="width: 250px; margin-right: 5px"
                    prop="code"></el-input>
          <img :src="captchaUrl"
               @click="updateCaptcha" />
        </el-form-item>

        <el-checkbox v-model="checked"
                     class="loginRemember">记住我</el-checkbox>
        <el-button type="primary"
                   style="width: 100%"
                   @click="submitLogin">登陆</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data () {
    return {
      loading: false, //加载动画
      checked: true, //记住我按钮

      // 验证码图像接口
      captchaUrl: '/captcha?time=' + new Date(),

      // 登陆提交表单
      loginForm: {
        username: "admin",
        password: "123456",
        code: "",
      },

      // 登陆前端验证
      loginRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: "请输入登录名称", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          {
            min: 3,
            max: 15,
            message: "长度在 3 到 15 个字符",
            trigger: "blur",
          },
        ],
        // 验证验证码是否合法
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },

    };
  },
  methods: {
    // 点击更新验证码
    updateCaptcha () {
      this.captchaUrl = '/captcha?time=' + new Date();
    },

    // 点击登陆事件
    submitLogin () {
      // 使用异步函数
      this.$refs.loginForm.validate(async (valid) => {
        // 判断表单合法性
        if (valid) {
          // 打开加载动画
          this.loading = true;
          this.postRequest('/login', this.loginForm).then(resp => {
            // alert(JSON.stringify(resp));
            // 刷新验证码
            this.updateCaptcha();
            // 关闭加载动画
            this.loading = false;
            // 判断 resp 是否存在
            if (resp) {
              //获取用户 token 令牌
              const tokenStr = resp.obj.tokenHead + resp.obj.token;
              // 存储用户 token 令牌于 sessionStorage
              window.sessionStorage.setItem('tokenStr', tokenStr);
              // 路由跳转 Home
              this.$router.replace('/home');
            }
          })
        } else {
          this.$message.error('请填写登陆信息!');
          return false;
        }
      });
    },
  },
};
</script>

<style>
body {
  margin: 0;
}
#building {
  background: url("../img/bgimg.jpg");
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
}
.loginContainer {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 250px 1200px;
  width: 350px;
  padding: 15px 35px 15px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.loginTitle {
  margin: 0px auto 30px auto;
  text-align: center;
}
.loginRemember {
  text-align: left;
  margin: 0px 0px 15px 0px;
}
.el-form-item__content {
  display: flex;
  align-items: center;
}
</style>