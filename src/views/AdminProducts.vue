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
              <td>{{product.category}}</td>
              <td>{{product.title}}</td>
              <td>{{product.origin_price}}</td>
              <td>{{product.price}}</td>
              <td>
                <!-- ToggleSwitch-->
                <div id="switch" class="switch" ref="switch">
                      <toggle-switch
                    :is-enabled="product.is_enabled"
                    @get-product="getProducts"
                    ></toggle-switch>
                </div>
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
        <pagi-nation class="d-flex justify-content-center" :pages="pagination" @get-product ="getProducts"></pagi-nation>
      </div>
      <!-- ProductModal -->
      <div id="productModal" ref="productModal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel"
           aria-hidden="true">
      <product-modal
      :temp="temp"
      :product-modal="productModal"
      :is-new="isNew"
      @get-product ="getProducts"></product-modal>
      </div>
      <!-- DelProductModal -->
      <div id="delProductModal" ref="delProductModal" class="modal fade" tabindex="-1"
           aria-labelledby="delProductModalLabel" aria-hidden="true">
      <del-product-modal
      :temp="temp"
      :del-product-modal="delProductModal"
      @get-product ="getProducts"></del-product-modal>
      </div>
</template>

<script>
// /* global bootstrap */
import BsModal from 'bootstrap/js/dist/modal'
import ProductModal from '@/components/ProductModal'
import DelProductModal from '@/components/DelProductModal'
import PagiNation from '@/components/PagiNation'
import ToggleSwitch from '@/components/ToggleSwitch'

export default {
  data () {
    return {
      temp: {
        imagesUrl: []
      },
      products: {},
      pagination: {},
      productModal: '',
      delProductModal: '',
      isNew: true
    }
  },
  components: {
    ProductModal,
    DelProductModal,
    PagiNation,
    ToggleSwitch
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
        this.productModal.show()
        this.isNew = true
      } else if (status === 'edit') {
        // 深拷貝
        this.temp = JSON.parse(JSON.stringify(product))
        this.productModal.show()
        this.isNew = false
      } else if (status === 'delete') {
        this.temp = { ...product }
        this.delProductModal.show()
      }
    }
    // toggleSwitch () {
    //   this.$refs.toggle.toggleSwitch()
    // }
  },
  mounted () {
    this.productModal = new BsModal(this.$refs.productModal)
    this.delProductModal = new BsModal(this.$refs.delProductModal)
    this.getProducts()
    console.log(this.$refs.switch)
  }
}
</script>
