<!--
 * @Author: Timber
 * @Date: 2021-12-09 21:29:28
 * @LastEditors: Timber
 * @LastEditTime: 2021-12-10 16:48:23
 * @web: www.timberkito.com
 * @Description: Login
-->
<template>
    <div>
        <el-form ref="form" :model="loginForm" class="loginContainer">
            <h3 class="loginTitle">登录系统</h3>
            <el-form-item>
                <el-input type="text" auto-complete="false" v-model="loginForm.username" placeholder="请输入用户名"></el-input>
            </el-form-item>

            <el-form-item>
                <el-input type="password" auto-complete="false" v-model="loginForm.password" placeholder="请输入密码"></el-input>
            </el-form-item>

            <el-form-item>
                <el-input type="text" auto-complete="false" v-model="loginForm.code" placeholder="点击图片更换验证码"></el-input>
            </el-form-item>

            <img :src="captchaUrl">
            <el-checkbox v-model="checked">记住我</el-checkbox>
            <el-button type="primary" style="width: 100%">登陆</el-button>

        </el-form>
    </div>
</template>

<script>
    export default {
        name:"Login",
        data(){
            return{
                captchaUrl:'',
                loginForm:{
                    username:'admin',
                    password:'123',
                    code:'',
                }
            }
        }
    }
</script>

<style>
    .loginContainer{
        border-radius: 15px;
        background-clip: padding-box;
        margin: 188px auto;
        width: 350px;
        padding: 15px 35px 15px;
        background:#fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }
    .loginTitle{
        margin: 0px auto 40px auto;
        text-align: center;
    }

</style>