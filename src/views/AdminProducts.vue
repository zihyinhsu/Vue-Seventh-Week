<template>
     <div class="container">
        <div class="text-end mt-4">
          <button class="btn btn-primary">
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
            <tr>
              <td></td>
              <td></td>
              <td class="text-end"></td>
              <td class="text-end"></td>
              <td>
                <span class="text-success">啟用</span>
                <span>未啟用</span>
              </td>
              <td>
                <div class="btn-group">
                  <button type="button" class="btn btn-outline-primary btn-sm">
                    編輯
                  </button>
                  <button type="button" class="btn btn-outline-danger btn-sm">
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- ProductModal -->
      <ProductModal></ProductModal>
      <!-- DelProductModal -->
      <DelProductModal></DelProductModal>
</template>

<script>
/* global bootstrap */
import ProductModal from '@/components/ProductModal.vue'
// import DelProductModal from '@/components/DelProductModal.vue'

export default {
  data () {
    return {
      productModal: ''
    }
  },
  components: {
    ProductModal
    // DelProductModal
  },
  methods: {
    openModal () {
      this.productModal.show()
    }
  },
  mounted () {
    this.productModal = new bootstrap.Modal(this.$refs.productModal, {
      keyboard: false
    })

    this.openModal()
  }
}
</script>
