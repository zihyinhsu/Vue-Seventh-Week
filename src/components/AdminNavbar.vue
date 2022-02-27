<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container">
    <router-link class="navbar-brand" to="/admin/products">後台</router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link active" to="/admin/products">後台產品列表</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link active" to="/admin/coupon">後台優惠券</router-link>
        </li>
      </ul>
    </div>
    <div class="btn btn-light me-2" @click="signout">登出</div>
    <router-link type="button" class="btn btn-outline-light" to="/">首頁</router-link>
  </div>
</nav>
</template>

<script>
export default {
  methods: {
    signout () {
      document.cookie = 'zyToken=; expires=;'
      alert('已登出!')
      this.$router.push('/login')
    }
  }
}
</script>
