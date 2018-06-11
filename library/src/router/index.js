import Vue from 'vue'
import Router from 'vue-router'
import ManagementPage from '@/management/index'
import AuthPage from '@/management/auth/index'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: []
})
router.addRoutes([{...AuthPage}, {...ManagementPage}])

export default router
