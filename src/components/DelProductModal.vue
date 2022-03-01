<template>
    <!-- <div id="delProductModal" ref="delProductModal" class="modal fade" tabindex="-1"
           aria-labelledby="delProductModalLabel" aria-hidden="true"> -->
        <div class="modal-dialog">
          <div class="modal-content border-0">
            <div class="modal-header bg-danger text-white">
              <h5 id="delProductModalLabel" class="modal-title">
                <span>刪除產品</span>
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              是否刪除
              <strong class="text-danger">{{temp.title}}</strong> 商品(刪除後將無法恢復)。
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                取消
              </button>
              <button type="button" class="btn btn-danger" @click="delProductItem">
                確認刪除
              </button>
            </div>
          </div>
        </div>
      <!-- </div> -->
</template>

<script>
export default {
  props: ['temp', 'delProductModal'],
  data () {
    return {
      temProduct: {}
    }
  },
  watch: {
    temp: {
      // 控制器
      handler () {
        // 解決單向數據流的綁定問題，就是淺/深拷貝並指定一個新變數
        this.temProduct = JSON.parse(JSON.stringify(this.temp))
      },
      // 定義是否為深層監聽
      deep: true
    }
  },
  methods: {
    delProductItem () {
      this.$http.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.temProduct.id}`)
        .then((res) => {
          this.$emit('get-product')
          this.delProductModal.hide()
        }).catch((error) => {
          alert(error.data.message)
        })
    }
  }
}
</script>
