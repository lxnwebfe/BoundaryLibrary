import Vue from 'vue'
import Router from 'vue-router'
// import managementRoutes from '../management/index'
import ManagementPage from '@/management/index'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: []
})
router.addRoutes([{...ManagementPage}])

export default router
