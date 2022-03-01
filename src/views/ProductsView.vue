<template>
    <h2 class="text-center py-3">產品列表</h2>
    <div class="container">
      <div class="row row-cols-1 row-cols-md-3 g-3"><!-- row決定內層數量 -->
        <div class="col" v-for="product in products" :key="product.id">
          <div class="card h-100">
            <img :src="product.imageUrl" class="card-img-top" alt="..." style="height:300px; object-fit:cover;">
            <div class="card-body d-flex flex-column justify-content-between">
              <h5 class="card-title">{{product.title}}</h5>
              <p class="card-text">{{product.description}}</p>
              <div class="d-flex">
                <router-link :to="`/product/${product.id}`" class="btn btn-outline-primary w-100 me-2">查看詳情</router-link>
                <div class="btn btn-primary w-100" @click="addToCart(product.id)"
                    :disabled="isLoadingItem === product.id">
                    <span v-show="isLoadingItem === product.id"><i class="fas fa-spinner fa-pulse"></i></span>
                    加入購物車</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import emitter from '@/libs/emitter.js'

export default {
  data () {
    return {
      products: [],
      isLoadingItem: ''
    }
  },
  methods: {
    getProducts () {
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`)
        .then((res) => {
          this.products = res.data.products
        }).catch((err) => {
          console.log(err)
        })
    },
    // 加入購物車
    addToCart (id, qty = 1) {
      // 判斷loading的時機
      this.isLoadingItem = id
      this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`, {
        data: {
          product_id: id,
          qty: qty
        }
      })
        .then((res) => {
          this.isLoadingItem = ''
          this.getProducts()
          emitter.emit('get-cart-list')
          alert(res.data.message)
        }).catch((err) => {
          alert(err.data.message)
        })
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>
