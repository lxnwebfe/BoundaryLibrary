import Page from './Page'
// 子路由
import AddBooksPage from './add/index'
const routes = {
  name: 'managementBooks',
  path: 'management/books',
  component: Page,
  children: []
}
routes.children = routes.children.concat(AddBooksPage)
export default routes
