import emitter from '@/libs/emitter'

// title 為預設
export default function (res, title = '更新', content) {
  if (res.data.success) {
    emitter.emit('push-message', {
      style: 'success',
      title: `${title}成功`,
      content: '',
      icon: 'fa-circle-check'
    })
  } else {
    // 有些訊息是字串，有些則是陣列，在此統一格式
    const message = typeof res.data.message === 'string' ? [res.data.message] : res.data.message
    emitter.emit('push-message', {
      style: 'danger',
      title: `${title} 失敗`,
      content: message.join('、'),
      icon: 'fa-circle-xmark'
    })
  }
}
