<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container">
    <router-link class="navbar-brand" to="/">前台</router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link " to="/products">產品列表</router-link>
        </li>
      </ul>
    </div>
     <router-link type="button" class="btn btn-warning me-2" to="/login">登入</router-link>
       <router-link type="button" class="btn btn-outline-primary me-2" to="/admin/products">後台</router-link>
       <span class="me-2 fs-4 text-primary">|</span>
      <router-link type="button" class="btn btn-primary position-relative text-white" to="/cart" >購物車
      <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
        {{cartData.carts.length}}
      </span>
      </router-link>
  </div>
</nav>
</template>

<script>
import emitter from '@/libs/emitter.js'

export default {
  data () {
    return {
      cartData: {
        carts: []
      }
    }
  },
  methods: {
    getCartList () {
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          this.cartData = res.data.data
        }).catch((err) => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.getCartList()
    emitter.on('get-cart-list', () => {
      this.getCartList()
    })
  }
}
</script>
