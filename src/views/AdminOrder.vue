<template>
    <div class="container">
        <table class="table mt-4">
            <thead>
                <tr>
                <th scope="col">
                    購買時間
                </th>
                <th>Email</th>
                <th scope="col">
                    購買款項
                </th>
                <th scope="col">
                    應付金額
                </th>
                <th scope="col">
                    是否付款
                </th>
                <th scope="col">
                    編輯
                </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in orders" :key="item.id">
                <td>{{orderTime}}</td>
                <td>{{item.user.email}}</td>
                <td>
                  <ul class="list-unstyled">
                    <li v-for="(product, i) in item.products" :key="i">
                      {{ product.product.title }} 數量：{{ product.qty }}
                      {{ product.product.unit }}
                    </li>
                  </ul>
                </td>
                <td>${{item.total}}元</td>
                <td style="cursor:pointer">
                    <label class="switch">
                      <input type="checkbox"
                      @change="updatePaid(item)"
                      v-model="item.is_paid">
                      <span class="slider"></span>
                  </label>
                <!-- ToggleSwitch -->
                </td>
                <td>
                    <div class="btn-group">
                    <button type="button" class="btn btn-outline-primary btn-sm" @click="openModal('edit',item)">
                        編輯
                    </button>
                    <button type="button" class="btn btn-outline-danger btn-sm" @click="openModal('delete',item)">
                        刪除
                    </button>
                    </div>
                </td>
                </tr>
            </tbody>
            </table>
    </div>
    <order-modal ref="orderModal" :temp="temp" @update-paid="updatePaid"></order-modal>
    <del-modal ref="delModal" :temp="temp" @del-item="delOrder"></del-modal>
    <pagi-nation class="d-flex justify-content-center" :pages="pagination" @update-page ="getOrders"></pagi-nation>
</template>

<style lang="sass">
@import '../assets/scss/toggle.scss'

</style>

<script>
import OrderModal from '@/components/OrderModal'
import PagiNation from '@/components/PagiNation'
import DelModal from '@/components/DelModal'

export default {
  data () {
    return {
      orders: {},
      orderModal: '',
      temp: {},
      pagination: {}
    }
  },
  components: {
    OrderModal,
    PagiNation,
    DelModal
  },
  methods: {
    getOrders (page = 1) {
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders/?page=${page}`)
        .then((res) => {
          this.orders = res.data.orders
          this.pagination = res.data.pagination
        }).catch((err) => {
          alert(err)
        })
    },
    updatePaid (item, page = 1) {
      this.temp = item
      this.$http.put(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`,
        { data: this.temp })
        .then((res) => {
          alert(res.data.message)
          this.$refs.orderModal.closeModal()
          this.getOrders(page)
        }).catch((err) => {
          alert(err.data.message)
        })
    },
    openModal (status, product) {
      if (status === 'edit') {
        this.temp = JSON.parse(JSON.stringify(product))
        this.$refs.orderModal.openModal()
      } else if (status === 'delete') {
        this.temp = { ...product }
        this.$refs.delModal.openModal()
      }
    },
    delOrder () {
      this.$http.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${this.temp.id}`)
        .then((res) => {
          this.$refs.delModal.closeModal()
          this.getOrders()
        }).catch((error) => {
          alert(error.data.message)
        })
    }
  },
  computed: {
    // 處理訂單時間
    orderTime () {
      let orderTime = ''
      this.orders.forEach((item) => {
        orderTime = new Date(item.create_at * 1000).toLocaleDateString()
      })
      return orderTime
    }
  },
  mounted () {
    this.getOrders()
  }
}
</script>
