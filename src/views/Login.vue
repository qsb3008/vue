<template>

<div class="main-box">
    <div class="login-box">
    <img src="../assets/images/logo.png" alt="">
    <div class="wrapper">
        <header>
        <div class="admin-img"></div>
        </header>
        <section>
        <el-form  ref="form" :model="metaForm" label-width="120px">
            <el-row>
                <el-col>
                    <el-input v-model="metaForm.username" placeholder="请输入帐号">
                    </el-input>
                </el-col>
            </el-row><br>
            <el-row>
                <el-col>
                    <el-input v-model="metaForm.passwd" type="password" placeholder="请输入密码">
                    </el-input>
                </el-col>
            </el-row><br>
            <el-row>
                <el-col>
                    <el-input v-model="metaForm.vcode" type="text" placeholder="请输入验证码">
                        <template slot="append"><img v-if="imgSrc"  :src="imgSrc" style="position: relative;top:3px;" ></template>
                    </el-input>
                </el-col>
            </el-row><br>
            <el-row>
                <el-col>
                    <el-button class="login-btn"  @click="loginIn">登录</el-button>
                </el-col>
            </el-row>
        </el-form>
        </section>
    </div>
    </div>
</div>

</template>

<script>
import * as cgiService from '../api/cgiService'
export default {
  data () {
    return {
      metaForm: {
        username: '',
        passwd: '',
        vcode: ''
      },
      imgSrc: '',
      yesLoginIn: false,
      noLoginIn: true
    }
  },
  methods: {
    loginIn () {
      cgiService.login(this.metaForm).then(res => {
          console.log(res, 587);
          
        // if (res.code == 0) {
        //   this.$router.replace("/");
        // } else {
        //   this.$message.error(res.msg);
        // }
      });
    }
  },
  created () {
    cgiService.verificationCode().then(res => {
        this.imgSrc = res.img
    })
  }
}
</script>

<style lang="scss">
html,body{
    height: 100%;
    margin: 0;
}
.main-box{
  height: 100%;
  background: url('../assets/images/login-bg.png') no-repeat;
  background-size: 100% 100%;
}
.login-box{
  position: relative;
  max-width: 1110px;
  width: auto;
  height: 100%;
  margin: auto;
  background: url('../assets/images/login-img.png') no-repeat left 50%;
  background-size: 600px;
  .wrapper{
    box-sizing: border-box;
    width: 350px;
    position: absolute;
    right: 50px;
    top: 50%;
    transform: translateY(-50%);
    background: white;
    border-radius: 10px;
    overflow: hidden;
    > header {
      background: #00d8ad;
      height: 86px;
      position: relative;
      .admin-img{
        position: absolute;
        width: 70px;
        height: 70px;
        background: #eaeaea;
        border-radius: 100%;
        left: 50%;
        margin-left: -35px;
        bottom: -35px;

      }
    }
    > section {
      padding: 60px 30px 50px;
    }
  }
  .login-btn{
    color: white;
    width:100%;
    height: 54px;
    background:#00d8ad;
    border-radius: 27px;
    margin-top: 15px;
    &:hover{
      opacity: 0.7;
    }
  }
}
</style>
