import Vue from 'vue'
import Router from 'vue-router'
import LibraryPage from '@/library/index'
import LibraryAuthPage from '@/library/auth/index'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: []
})
router.addRoutes([{...LibraryPage}, {...LibraryAuthPage}])

export default router
