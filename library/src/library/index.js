import Page from './Page'
// 子路由
import BooksPage from './books/index'
import BooksDetailPage from './books/detail/index'
import BorrowPage from './books/borrow/index'
import ManagementPage from './management/index'
import BooksManagementPage from './management/books/index'
const routes = {
  path: '/library',
  name: 'library',
  component: Page,
  children: []
}
routes.children = routes.children
  .concat(BooksPage, BooksDetailPage, BorrowPage)
  .concat(ManagementPage, BooksManagementPage)
export default routes
