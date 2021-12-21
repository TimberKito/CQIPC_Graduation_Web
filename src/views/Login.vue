<!--
 * @Author: Timber.Wang
 * @Date: 2021-12-09 21:29:28
 * @LastEditors: Timber.Wang
 * @LastEditTime: 2021-12-21 18:17:36
 * @Description: 登陆组件
-->
<template>
  <div>
    <el-form :rules="loginRules"
             ref="loginForm"
             :model="loginForm"
             class="loginContainer">
      <h3 class="loginTitle">登录系统</h3>

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
</template>

<script>
export default {
  name: "Login",
  data () {
    return {
      captchaUrl: '/captcha?time=' + new Date(),
      loginForm: {
        username: "admin",
        password: "123456",
        code: "",
      },
      checked: true,
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
            min: 5,
            max: 15,
            message: "长度在 5 到 15 个字符",
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
          alert('200!');
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
.loginContainer {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 188px auto;
  width: 350px;
  padding: 15px 35px 15px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.loginTitle {
  margin: 0px auto 40px auto;
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