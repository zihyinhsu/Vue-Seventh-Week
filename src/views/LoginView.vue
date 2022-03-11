<template class="position-relative">
     <div class="container position-absolute top-50 start-50 translate-middle">
        <div class="row justify-content-center">
            <div class="col-3">
                <form id="form" class="form-signin" @submit.prevent="signIn">
                    <h1 class="text-center mb-3">請先登入</h1>
                    <div class="mb-3">
                        <label for="Email address" class="form-label">Email address</label>
                        <input type="email" class="form-control"
                        v-model="user.username"
                        id="Email address" placeholder="name@example.com">
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">password</label>
                        <input type="password" class="form-control" id="password" v-model="user.password">
                    </div>
                    <button type="submit" class="btn btn-primary w-100"  @click="signIn">登入</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    signIn () {
      this.$http.post(`${process.env.VUE_APP_API}/admin/signin`, this.user)
        .then((res) => {
          const { token, expired } = res.data
          // console.log(token)
          // 寫入 cookie token
          document.cookie = `zyToken=${token}; expires=${new Date(expired)}`
          // alert(res.data.message)
          this.$httpMessageState(res, '登入', '已成功登入')
          // 轉址
          this.$router.push('/admin/products')
        }).catch((err) => {
          this.$httpMessageState(err.response, '登入', '請重新登入')
          this.user.password = ''
        })
    }
  },
  mounted () {
  }
}
</script>
