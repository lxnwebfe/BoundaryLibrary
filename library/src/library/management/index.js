import Page from './Page'
import ManagementBooksPage from './books/index'
const routes = {
  name: 'management',
  path: 'management',
  component: Page,
  children: []
}
routes.children = routes.children.concat(ManagementBooksPage)
export default routes
