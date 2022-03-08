import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    component: () => import('../views/FrontView.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: HomeView,
        meta: { title: '首頁' }
      },
      {
        path: 'products',
        component: () => import('../views/ProductsView.vue'),
        meta: { title: '產品列表' }
      },
      {
        path: 'product/:id',
        component: () => import('../views/ProductView.vue'),
        meta: { title: '產品詳情' }
      },
      {
        path: 'login',
        component: () => import('../views/LoginView.vue'),
        meta: { title: '登入頁面' }
      },
      {
        path: 'cart',
        component: () => import('../views/CartView.vue'),
        meta: { title: '購物車' }
      }
    ]
  },
  {
    path: '/admin',
    component: () => import('../views/DashboardView.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/AdminProducts.vue'),
        meta: { title: '後台產品列表' }
      },
      {
        path: 'order',
        component: () => import('../views/AdminOrder.vue'),
        meta: { title: '後台訂單列表' }
      },
      {
        path: 'coupon',
        component: () => import('../views/AdminCoupon.vue'),
        meta: { title: '優惠券' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title
  next()
})

export default router
