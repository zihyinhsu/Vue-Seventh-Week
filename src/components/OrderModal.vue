<template>
    <div
    class="modal fade"
    id="productModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>訂單細節</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-4">
              <h3>用戶資料</h3>
              <table class="table">
                <tbody>
                  <tr>
                    <th style="width: 100px">姓名</th>
                    <td>{{ tempOrder.user?.name }}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{{ tempOrder.user?.email }}</td>
                  </tr>
                  <tr>
                    <th>電話</th>
                    <td>{{ tempOrder.user?.tel }}</td>
                  </tr>
                  <tr>
                    <th>地址</th>
                    <td>{{ tempOrder.user?.address }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-md-8">
              <h3>訂單細節</h3>
              <table class="table">
                <tbody>
                  <tr>
                    <th style="width: 100px">訂單編號</th>
                    <td>{{ tempOrder.id }}</td>
                  </tr>
                  <tr>
                    <th>下單時間</th>
                    <td>{{ orderTime  }}</td>
                  </tr>
                  <!-- <tr>
                    <th>付款時間</th>
                    <td>
                      <span>
                        {{  }}
                      </span>
                      <span>時間不正確</span>
                    </td>
                  </tr> -->
                  <tr>
                    <th>付款狀態</th>
                    <td>
                      <strong  class="text-success" v-if="tempOrder.is_paid"
                        >已付款</strong
                      >
                      <span  class="text-muted" v-else>尚未付款</span>
                    </td>
                  </tr>
                  <tr>
                    <th>總金額</th>
                    <td>
                      NT$ {{ tempOrder.total }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <h3>選購商品</h3>
              <table class="table">
                <thead>
                  <tr></tr>
                </thead>
                <tbody>
                  <tr v-for="product in tempOrder.products" :key="product.id">
                    <th>
                      {{ product.product.title }}
                    </th>
                    <td>{{ product.qty }} / {{ product.product.unit }}</td>
                    <td class="text-end">
                      $ {{ product.final_total }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="d-flex justify-content-end">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    v-model="tempOrder.is_paid"
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    <span v-if="tempOrder.is_paid" >已付款</span>
                    <span v-else>未付款</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-primary"
          @click="$emit('updatePaid',tempOrder)">
            修改付款狀態
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BsModal from 'bootstrap/js/dist/modal'

export default {
  props: ['temp'],
  data () {
    return {
      tempOrder: {},
      orderModal: ''
    }
  },
  watch: {
    temp: {
      handler () {
        this.tempOrder = JSON.parse(JSON.stringify(this.temp))
      },
      deep: true
    }
  },
  computed: {
    // 處理訂單時間
    orderTime () {
      let orderTime = ''
      orderTime = new Date(this.tempOrder.create_at * 1000).toLocaleDateString()
      return orderTime
    }
  },
  methods: {
    openModal () {
      this.orderModal.show()
    },
    closeModal () {
      this.orderModal.hide()
    }
  },
  mounted () {
    this.orderModal = new BsModal(this.$refs.modal)
  }
}
</script>
