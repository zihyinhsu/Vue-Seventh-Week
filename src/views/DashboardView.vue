<template>
  <admin-navbar></admin-navbar>
  <toast-msg></toast-msg>
  <router-view v-if="checkSuccess"></router-view>
</template>

<script>
import AdminNavbar from '@/components/AdminNavbar.vue'
import ToastMsg from '@/components/ToastMsg.vue'

export default {
  data () {
    return {
      checkSuccess: false
    }
  },
  components: {
    AdminNavbar,
    ToastMsg
  },
  methods: {
    checkLogin () {
      // 取得 Token（Token 僅需要設定一次）
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)zyToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
      // header的夾帶
      this.$http.defaults.headers.common.Authorization = token

      this.$http.post(`${process.env.VUE_APP_API}/api/user/check`)
        .then(() => {
          this.checkSuccess = true
        }).catch(() => {
          alert('尚未登入')
          // 轉址到登入頁
          this.$router.push('/login')
        })
    }
  },
  mounted () {
    this.checkLogin()
  }

}
</script>
