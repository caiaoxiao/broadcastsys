<template>
  <div>
    <div id="container">

      <div id="anitOut" class="anitOut">

      </div>

    </div>
    <!---->
    <div class="login">
      <div class="loginLogo">

        <img src="../../assets/img/logo.fw.png" />
      </div>
      <div class="userImg"><img src="../../assets/img/ouba.jpg" /></div>
      <div class="userInfoInput">
        <form class="form-horizontal">
          <div class="form-group">

            <div class="col-sm-12">
              <input type="text" class="form-control" placeholder="请输入用户名">
            </div>
          </div>
          <div class="form-group">

            <div class="col-sm-12">
              <input type="password" class="form-control" placeholder="请输入密码">
            </div>
          </div>
          <div class="form-group">
            <div class=" col-sm-12">
              <div class="checkbox">
                <label>
                  <input type="checkbox"> 记住密码
                </label>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class=" col-sm-12">
              <button type="submit" class="btn btn-primary  btn-block" @click="login">登 录</button>
            </div>
          </div>
        </form>
      </div>

    </div>
  </div>


</template>

<script>

  export default {
    data() {
      return {
          num: 5
      }
    },
    created() {
      this.$nextTick(function() {
        if (!window.ActiveXObject && !!document.createElement("canvas").getContext) {
          /*开发*/
          $.getScript("src/assets/js/cav.js",
            function () {
              $.getScript("src/assets/js/getStart.js")
            })
         /*线上 $.getScript("/static/cav.js",
            function () {
              $.getScript("/static/getStart.js")
            })*/
        }
      })
    },
    methods: {

      login() {
        this.$store.dispatch('Login', {username: 'admin',password: '123456'}).then(() => {
          this.loading = false
          this.$router.push({ path: '/' })
        }).catch(() => {
          this.loading = false
        })
      }
    }
  }
</script>

<style scoped>
  .userImg {
    float: none;
  }
  .userImg>img {
    margin: 0;
  }
  body {
    margin:0px;
    padding:0px;
    overflow:hidden;
    font-family:'Microsoft YaHei';
    font-size:14px;
    height:100%;
  }
  .login {
    width: 350px;
    position: absolute;
    top:50%;
    left:50%;
    -webkit-transform: translateX(-50%) translateY(-50%);
    -moz-transform: translateX(-50%) translateY(-50%);
    -ms-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);
    background: rgba(0,0,0,0.7);
    border-radius: 5px;
  }
  .userInfoInput{padding:0px 20px 20px 20px;}
  .userImg{width:80px;height:80px;border-radius:100%;background-color:#1184b0;padding:2px;
    margin:20px auto;
  }
  .userImg img{width:76px;height:76px;border-radius:100%;
  }
  .loginBtn{padding:10px 0px;}
  .loginLogo{width:80%;margin:15px auto;}
  .loginLogo img{width:100%;}
</style>
