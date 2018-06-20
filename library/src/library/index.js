import Page from './Page'
// 子路由
import BooksPage from './books/index'
import BooksDetailPage from './books/detail/index'
import BorrowPage from './borrow/index'
import ManagementPage from './management/index'
const routes = {
  path: '/library',
  name: 'library',
  component: Page,
  children: []
}
routes.children = routes.children
  .concat(BooksPage, BooksDetailPage)
  .concat(BorrowPage)
  .concat(ManagementPage)
export default routes
