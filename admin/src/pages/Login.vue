<template>
  <main class="g-login">
    <h1 class="login-logo">简 书</h1>
    <h3>欢迎来到简书后台管理系统</h3>
    <form class="" role="form" autocomplete="off">
      <div class="form-group">
        <input type="text" name="username" v-model="login.username" class="form-control" placeholder="Username">
      </div>
      <div class="form-group">
        <input type="password" name="password" v-model="login.password" class="form-control" placeholder="Password">
      </div>
      <button type="button" class="u-btn u-btn-primary" @click="btn()">登 陆</button>
    </form>
  </main>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        msg: '我是登陆页面',
        login: {}
      }
    },
    methods: {
      btn: function () {
        this.$http.post('/api/v1/admin/login', this.login).then(response => {
          // success callback
          if (response.data.code === 0) {
            this.$router.push({'name': 'dashboard'})
          }
        }, response => {
          // error callback
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="postcss">
  .g-login {
    max-width: 400px;
    z-index: 100;
    margin: 0 auto;
    padding-top: 40px;

  &
  h3 {
    text-align: center;
    font-size: 16px;
    margin-top: 10px;
    font-weight: 600;
  }

  }
  .login-logo {
    color: #e6e6e6;
    font-size: 170px;
    font-weight: 800;
    letter-spacing: -10px;
    margin-bottom: 0;
    text-align: center;
  }

  .form-group {
    margin-bottom: 15px;
  }

  .form-control {
    background-color: #FFFFFF;
    border: 1px solid #e5e6e7;
    border-radius: 1px;
    color: inherit;
    display: block;
    padding: 6px 12px;
    transition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;
    width: 100%;
    font-size: 14px;
  }
</style>
