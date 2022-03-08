<template>
<label class="switch">
        <input type="checkbox"
        v-model="is_enabled"
        :true-value="1" :false-value="0">
        <span class="slider"></span>
    </label>
</template>

<style lang="scss">
@import '../assets/scss/toggle.scss'
</style>

<script>
export default {
  props: ['temp', 'isEnabled'],
  data () {
    return {
      temProduct: {},
      is_enabled: JSON.parse(JSON.stringify(this.isEnabled))
    }
  },
  watch: {
    temp: {
      handler () {
        this.temProduct = JSON.parse(JSON.stringify(this.temp))
      },
      deep: true
    },
    is_enabled: {
      handler () {
        this.temProduct.is_enabled = this.is_enabled
        this.updateProduct()
      },
      deep: true
    }
  },
  methods: {
    updateProduct () {
      this.$http.put(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.temProduct.id}`,
        { data: this.temProduct })
        .then(res => {
          this.$emit('get-product')
          alert('已成功修改啟用狀態')
        })
    }
  },
  mounted () {
  }
}
</script>
