import Page from './Page'
import ManagementBooksPage from './books/index'
import ManagementUsersPage from './users/index'
const routes = {
  name: 'management',
  path: 'management',
  component: Page,
  children: []
}
routes.children = routes.children.concat(ManagementBooksPage, ManagementUsersPage)
export default routes
