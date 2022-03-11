<template>
    <div class="toast-container position-fixed pe-3 top-50 start-50 translate-middle" style="z-index:1500">
            <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true"
            v-for="(msg,i) in messages" :key="i">
            <div class="toast-header">
                <span :class="`bg-${msg.style}`" class="p-2 rounded me-2 d-inline-block"></span>
                <strong class="me-auto">{{msg.title}}</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"
                @click="clearToast(i)"></button>
            </div>
                <div class="toast-body d-flex flex-column align-items-center" >
                    <i class="fa-solid fa-circle-check fa-3x mb-3" :class="`${msg.icon} text-${msg.style}`"></i>
                    {{msg.title}}
                </div>
        </div>
    </div>
</template>

<script>
import emitter from '@/libs/emitter.js'

export default {

  data () {
    return {
      messages: []
    }
  },
  methods: {
    toastShow () {
      setTimeout(() => {
        this.messages.shift()
      }, 3000)
    },
    clearToast (index) {
      this.messages.splice(index, 1)
    }
  },
  mounted () {
    emitter.on('push-message', (message) => {
      const { style, title, content, icon } = message
      this.messages.push({ style, title, content, icon })
      this.toastShow()
      console.log(this.messages)
    })
  }
}
</script>
