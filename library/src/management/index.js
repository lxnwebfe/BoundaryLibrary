import Page from './Page'
// 子路由
import BooksPage from './books/index'
import BooksDetailPage from './books/detail/index'
const routes = {
  path: '/management',
  name: 'management',
  component: Page,
  children: []
}
routes.children = routes.children.concat(BooksPage, BooksDetailPage)
export default routes
