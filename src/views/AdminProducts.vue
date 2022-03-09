<template>
     <div class="container">
        <div class="text-end mt-4">
          <button class="btn btn-primary" @click="openModal('isNew')">
            建立新的產品
          </button>
        </div>
        <table class="table mt-4">
          <thead>
            <tr>
              <th></th>
              <th width="120">
                分類
              </th>
              <th>產品名稱</th>
              <th width="120">
                原價
              </th>
              <th width="120">
                售價
              </th>
              <th width="100">
                是否啟用
              </th>
              <th width="120">
                編輯
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id">
              <td><img :src="product.imageUrl" style="width:25px; height:25px; object-fit:cover;"></td>
              <td>{{product.category}}</td>
              <td>{{product.title}}</td>
              <td>{{product.origin_price}}</td>
              <td>{{product.price}}</td>
              <td>
                 <!-- ToggleSwitch -->
                    <label class="switch">
                      <input type="checkbox"
                      @change="updateProduct(product.id, product)"
                      v-model="product.is_enabled"
                      :true-value="1" :false-value="0">
                      <span class="slider"></span>
                  </label>
                <!-- ToggleSwitch -->
              </td>
              <td>
                <div class="btn-group">
                  <button type="button" class="btn btn-outline-primary btn-sm" @click="openModal('edit',product)">
                    編輯
                  </button>
                  <button type="button" class="btn btn-outline-danger btn-sm" @click="openModal('delete',product)">
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <pagi-nation class="d-flex justify-content-center"
        :pages="pagination" @update-page ="getProducts"></pagi-nation>
      </div>
      <!-- ProductModal -->
      <product-modal
      :temp="temp"
      :is-new="isNew"
      @get-product ="getProducts" ref="productModal"></product-modal>
      <!-- DelModal -->
      <del-modal
      :temp="temp"
      @get-product ="getProducts" @del-item="delProductItem" ref="delModal"></del-modal>
</template>

<style lang="sass">
@import '../assets/scss/toggle.scss'

</style>

<script>
// /* global bootstrap */
import ProductModal from '@/components/ProductModal'
import DelModal from '@/components/DelModal'
import PagiNation from '@/components/PagiNation'

export default {
  data () {
    return {
      temp: {
        imagesUrl: []
      },
      products: {},
      pagination: {},
      isNew: true
    }
  },
  components: {
    ProductModal,
    DelModal,
    PagiNation
  },
  methods: {
    getProducts (page = 1) {
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products/?page=${page}`)
        .then(res => {
          this.products = res.data.products
          this.pagination = res.data.pagination
        }).catch(err => {
          console.log(err)
        })
    },
    openModal (status, product) {
      if (status === 'isNew') {
        this.temp = {
          imagesUrl: []
        }
        this.$refs.productModal.openModal()
        this.isNew = true
      } else if (status === 'edit') {
        // 深拷貝
        this.temp = JSON.parse(JSON.stringify(product))
        // 如果 this.temp.imagesUrl 不存在
        if (!this.temp.imagesUrl) {
          this.temp.imagesUrl = []
        }
        this.$refs.productModal.openModal()
        this.isNew = false
      } else if (status === 'delete') {
        this.temp = { ...product }
        this.$refs.delModal.openModal()
      }
    },
    updateProduct (id, product) {
      this.temp = product
      this.$http.put(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${id}`,
        { data: this.temp })
        .then(res => {
          alert(res.data.message)
        }).catch((err) => {
          console.dir(err.data.message)
        })
    },
    delProductItem () {
      this.$http.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.temp.id}`)
        .then((res) => {
          this.$refs.delModal.closeModal()
          this.getProducts()
        }).catch((error) => {
          alert(error.data.message)
        })
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>
