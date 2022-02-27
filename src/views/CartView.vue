<template>
    <h2 class="text-center py-3">購物車</h2>
    <div class="container">
      <div class="text-end">
          <button class="btn btn-outline-danger" type="button" @click="delAllCart" >
              <span v-show="isLoadingItem === 1"><i class="fas fa-spinner fa-pulse"></i></span>
              清空購物車
          </button>
        </div>
      <table class="table align-middle">
              <thead>
                <tr>
                  <th></th>
                  <th>圖片</th>
                  <th>商品名稱</th>
                  <th>數量/單位</th>
                  <th>單價</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in cartData.carts" :key="item.name">
                    <td>
                      <button type="button" class="btn btn-outline-danger btn-sm" @click="delCartItem(item.id)">
                        <span v-show="isLoadingItem === item.id"><i class="fas fa-spinner fa-pulse"></i></span>
                        x
                      </button>
                    </td>
                  <td style="width: 200px">
                    <div
                    :style="{'backgroundImage' : `url(${item.product.imageUrl})`}"
                      style="
                        height: 100px;
                        background-size: cover;
                        background-position: center;
                      "
                    ></div>
                  </td>
                  <td>{{ item.product.title }}</td>
                  <td>
                      <div class="input-group input-group-sm">
                        <div class="input-group mb-3 w-50">
                          <select id="" class="form-control" v-model="item.qty" @change="updateCartItem(item)"
                          :disabled="isLoadingItem === item.id">
                            <option v-for="num in 20" :key="num+123" >{{num}}</option>
                          </select>
                          <span class="input-group-text" id="basic-addon2"
                            >{{ item.product.unit }}</span
                          >
                        </div>
                      </div>
                    </td>
                  <td>{{ item.product.price }}元</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="4" class="text-end">總計</td>
                  <td>{{ cartData.total }}元</td>
                </tr>
              </tfoot>
        </table>
      <!-- 購買表單 -->
      <div class="d-flex flex-column align-items-center my-4" @submit="onSubmit">
        <form-view ref="form" class="col-md-6" v-slot="{ errors }" >
          <h2 class="mb-4">收件人資料</h2>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <field-view id="email" name="email" type="email" class="form-control"
                :class="{ 'is-invalid': errors['email'] }" rules="email" placeholder="請輸入 Email"
                       v-model="form.user.email" ></field-view>
                <error-message name="email" class="invalid-feedback text-start"></error-message>
              </div>

              <div class="mb-3">
                <label for="name" class="form-label">收件人姓名</label>
                <field-view id="name" name="姓名" type="text" class="form-control" :class="{ 'is-invalid': errors['姓名'] }"
                        placeholder="請輸入姓名" rules="required" v-model="form.user.name"></field-view>
                <error-message name="姓名" class="invalid-feedback"></error-message>
              </div>

              <div class="mb-3">
                <label for="tel" class="form-label">收件人電話</label>
                <field-view id="tel" name="電話" type="text" class="form-control" :class="{ 'is-invalid': errors['電話'] }"
                        placeholder="請輸入電話" :rules="isPhone" v-model="form.user.tel"></field-view>
                <error-message name="電話" class="invalid-feedback"></error-message>
              </div>

              <div class="mb-3">
                <label for="address" class="form-label">收件人地址</label>
                <field-view id="address" name="地址" type="text" class="form-control" :class="{ 'is-invalid': errors['地址'] }"
                        placeholder="請輸入地址" rules="required" v-model="form.user.address"></field-view>
                <error-message name="地址" class="invalid-feedback"></error-message>
              </div>

              <div class="mb-3">
                <label for="message" class="form-label">留言</label>
                <textarea id="message" class="form-control" cols="30" rows="10" v-model="form.message" ></textarea>
              </div>
              <div class="text-end">
                <button type="submit" class="btn btn-primary" @click="onSubmit"
                        >送出訂單</button>
              </div>
            </form-view>
      </div>
    </div>
</template>

<script>
import emitter from '@/libs/emitter.js'

export default {
  data () {
    return {
      cartData: {},
      isLoadingItem: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
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
    },
    updateCartItem (item) {
      this.$http.put(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`, {
        data: {
          product_id: item.id,
          qty: Number(item.qty)
        }
      })
        .then((res) => {
          this.getCartList()
          alert(res.data.message)
        }).catch((err) => {
          alert(err.data.message)
        })
    },
    delCartItem (id) {
      this.isLoadingItem = id
      this.$http.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`)
        .then((res) => {
          this.getCartList()
          emitter.emit('get-cart-list')
          this.isLoadingItem = ''
          alert(res.data.message)
        }).catch((err) => {
          alert(err.data.message)
        })
    },
    delAllCart () {
      this.isLoadingItem = 1
      this.$http.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`)
        .then((res) => {
          this.isLoadingItem = 0
          this.getCartList()
          emitter.emit('get-cart-list')
          alert(res.data.message)
        }).catch((err) => {
          alert(err.data.message)
        })
    },
    // 手機驗證
    isPhone (value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '需要正確的電話號碼'
    },
    // 送出訂單
    onSubmit () {
      this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`, { data: this.form })
        .then((res) => {
          console.log(res)
          alert(res.data.message)
          this.getCartList()
          this.$refs.form.resetForm()
          this.form.message = ''
          this.delAllCart()
        }).catch((err) => {
          console.log(err)
          alert(err.data.message)
        })
    }
  },
  mounted () {
    this.getCartList()
  }
}
</script>
