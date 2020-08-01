import Vue from 'vue'
import VueRouter from 'vue-router'
import register from '../views/register.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/register',
  component: register
}]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
