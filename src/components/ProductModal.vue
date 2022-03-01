<template>
    <!-- <div id="productModal" ref="productModal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel"
           aria-hidden="true"> -->
        <div class="modal-dialog modal-xl">
          <div class="modal-content border-0">
            <div class="modal-header bg-dark text-white">
              <h5 id="productModalLabel" class="modal-title">
                <span>{{isNew ? '新增' : '編輯'}}產品</span>
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-sm-4">
                  <div class="mb-2">
                    <div class="mb-3">
                      <label for="imageUrl" class="form-label">輸入圖片網址</label>
                      <input type="text" class="form-control" v-model="temProduct.imageUrl"
                             placeholder="請輸入圖片連結">
                    </div>
                    <img class="img-fluid" :src="temProduct.imageUrl" alt="">
                  </div>
                  <div>
                    <button class="btn btn-outline-primary btn-sm d-block w-100">
                      新增圖片
                    </button>
                  </div>
                  <div>
                    <button class="btn btn-outline-danger btn-sm d-block w-100">
                      刪除圖片
                    </button>
                  </div>
                </div>
                <div class="col-sm-8">
                  <div class="mb-3">
                    <label for="title" class="form-label">標題</label>
                    <input id="title" type="text" class="form-control" placeholder="請輸入標題" v-model="temProduct.title">
                  </div>

                  <div class="row">
                    <div class="mb-3 col-md-6">
                      <label for="category" class="form-label">分類</label>
                      <input id="category" type="text" class="form-control"
                             placeholder="請輸入分類" v-model="temProduct.category">
                    </div>
                    <div class="mb-3 col-md-6">
                      <label for="price" class="form-label">單位</label>
                      <input id="unit" type="text" class="form-control" placeholder="請輸入單位"
                      v-model="temProduct.unit">
                    </div>
                  </div>

                  <div class="row">
                    <div class="mb-3 col-md-6">
                      <label for="origin_price" class="form-label">原價</label>
                      <input id="origin_price" type="number" min="0" class="form-control" placeholder="請輸入原價"
                      v-model="temProduct.origin_price">
                    </div>
                    <div class="mb-3 col-md-6">
                      <label for="price" class="form-label">售價</label>
                      <input id="price" type="number" min="0" class="form-control"
                             placeholder="請輸入售價" v-model="temProduct.price">
                    </div>
                  </div>
                  <hr>

                  <div class="mb-3">
                    <label for="description" class="form-label">產品描述</label>
                    <textarea id="description" type="text" class="form-control"
                              placeholder="請輸入產品描述" v-model="temProduct.description">
                    </textarea>
                  </div>
                  <div class="mb-3">
                    <label for="content" class="form-label">說明內容</label>
                    <textarea id="description" type="text" class="form-control"
                              placeholder="請輸入說明內容" v-model="temProduct.content">
                    </textarea>
                  </div>
                  <div class="mb-3">
                    <div class="form-check">
                      <input id="is_enabled" class="form-check-input" type="checkbox"
                             :true-value="1" :false-value="0" v-model="temProduct.is_enabled">
                      <label class="form-check-label" for="is_enabled">是否啟用</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                取消
              </button>
              <button type="button" class="btn btn-primary" @click="updateProduct">
                確認
              </button>
            </div>
          </div>
        </div>
      <!-- </div> -->
</template>

<script>
export default {
  props: ['temp', 'productModal', 'is-new'],
  data () {
    return {
      temProduct: {}
    }
  },
  // 在這裡設監聽的原因 : 因為外層的temp資料要觸發openModal事件，temp才會有資料。
  // 如果我們直接在mounted 裡面 把 this.temProduct 用深拷貝複製 props進來的 temp資料，
  // this.temProduct會呈現空值，因為它拷貝到的是我們觸發openModal事件的狀態。
  // 因此我們可以在子元件內設監聽，一旦外層觸發openModal，子元件內的temp資料有了變化，
  // 就執行this.temProduct = JSON.parse(JSON.stringify(this.temp))
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
    updateProduct () {
      let apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product`
      let method = 'post'
      let alertContent = '已成功新增商品'
      // 如果是編輯狀態
      if (!this.isNew) {
        apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.temProduct.id}`
        method = 'put'
        alertContent = '已成功修改商品'
      }
      this.$http[method](apiUrl, { data: this.temProduct })
        .then(res => {
          this.$emit('get-product')
          alert(alertContent)
          this.productModal.hide()
        })
    }
  },
  mounted () {
  }
}
</script>
