<template>
    <div class="container">
        <table class="table mt-4">
            <thead>
                <tr>
                <th width="120">
                    購買時間
                </th>
                <th>Email</th>
                <th width="120">
                    購買款項
                </th>
                <th width="120">
                    應付金額
                </th>
                <th width="100">
                    是否付款
                </th>
                <th width="120">
                    編輯
                </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in orders" :key="item.id">
                <td>{{orderTime}}</td>
                <td>{{item.user.email}}</td>
                <td>{{}}</td>
                <td>{{item.price}}</td>
                <td style="cursor:pointer" @click="item.is_paid ? item.is_paid = 0 : item.is_paid = 1">
                    <span class="text-success fw-bold" v-if="item.is_paid">付款</span>
                    <span v-else>未付款</span>
                </td>
                <td>
                    <div class="btn-group">
                    <button type="button" class="btn btn-outline-primary btn-sm" @click="openModal">
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
</template>

<script>
export default {
  data () {
    return {
      orders: {},
      pagination: {}
    }
  },
  methods: {
    getOrderitems () {
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders`)
        .then((res) => {
          this.orders = res.data.orders
          console.log(this.orders)
          this.pagination = res.data.pagination
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
    this.getOrderitems()
  }
}
</script>
